// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "./ReputationNFT.sol";

/**
 * @title LendingPool
 * @author TrustLend Team
 * @notice P2P lending contract for TrustLend. Manages loan requests,
 *         direct funding from lenders to borrowers, trust-score-gated limits,
 *         interest accrual, and auto-scoring on repayment.
 */
contract LendingPool is Ownable, ReentrancyGuard, Pausable {
    using SafeERC20 for IERC20;

    /* ══════════════════════════════════════════
       ENUMS
    ═══════════════════════════════════════════ */

    enum LoanStatus { None, Active, Repaid, Defaulted, Liquidated }
    enum LoanPath  { VouchBacked, Collateral, TrustOnly }
    enum LoanRequestStatus { Pending, Funded, Cancelled, Expired }

    /* ══════════════════════════════════════════
       STRUCTS
    ═══════════════════════════════════════════ */

    struct Loan {
        address    borrower;
        address    lender;
        uint256    amount;
        uint256    repaidAmount;
        uint256    interestRate;
        uint256    startTime;
        uint256    dueDate;
        uint8      installmentsPaid;
        uint8      totalInstallments;
        LoanStatus status;
        LoanPath   path;
    }

    struct LoanRequest {
        uint256           requestId;
        address           borrower;
        uint256           amount;
        uint256           durationDays;
        uint256           interestRate;
        LoanPath          path;
        LoanRequestStatus status;
        uint256           createdAt;
        uint256           expiresAt;
        address           funder;
    }

    /* ══════════════════════════════════════════
       STATE
    ═══════════════════════════════════════════ */

    IERC20 public immutable trustToken;
    address public reputationNFT;

    mapping(address => Loan) private _loans;
    mapping(address => uint8) public trustScores;
    
    // P2P Request State
    mapping(uint256 => LoanRequest) public loanRequests;
    mapping(address => uint256) public borrowerPendingRequestId;
    mapping(uint256 => uint256) public collateralEscrow; // requestId => collateral staked
    mapping(address => uint256) public borrowerCollateral; // active collateral per borrower
    uint256 public requestCount;

    uint256 public totalActiveLoans;
    uint256 public totalFundedAmount;
    uint256 private _activeInterestSum;

    /* ══════════════════════════════════════════
       CONSTANTS
    ═══════════════════════════════════════════ */

    uint256 private constant RATE_VOUCH      = 420;   // 4.2%
    uint256 private constant RATE_COLLATERAL = 280;   // 2.8%
    uint256 private constant RATE_TRUST_ONLY = 710;   // 7.1%

    uint256 private constant LIMIT_BRONZE    = 10    * 1e18;
    uint256 private constant LIMIT_SILVER    = 200   * 1e18;
    uint256 private constant LIMIT_GOLD      = 500   * 1e18;
    uint256 private constant LIMIT_PLATINUM  = 1000  * 1e18;

    uint8 private constant DEFAULT_INSTALLMENTS = 4;
    uint8 private constant SCORE_ONTIME = 8;
    uint8 private constant SCORE_EARLY  = 12;
    uint8 private constant SCORE_LATE   = 3;
    uint8 private constant MAX_SCORE = 100;

    /* ══════════════════════════════════════════
       EVENTS
    ═══════════════════════════════════════════ */

    event LoanRequested(uint256 indexed requestId, address indexed borrower, uint256 amount, uint256 interestRate, LoanPath path, uint256 expiresAt);
    event LoanFunded(uint256 indexed requestId, address indexed lender, address indexed borrower, uint256 amount, uint256 timestamp);
    event LoanRequestCancelled(uint256 indexed requestId, address indexed borrower);
    
    event RepaymentMade(address indexed borrower, address indexed lender, uint256 amount, uint256 remaining, uint8 newTrustScore);
    event TrustScoreUpdated(address indexed borrower, uint8 oldScore, uint8 newScore);
    event LoanDefaulted(address indexed borrower, uint256 amount, uint256 outstandingDebt);

    /* ══════════════════════════════════════════
       CONSTRUCTOR
    ═══════════════════════════════════════════ */

    constructor(address _trustToken, address _reputationNFT) Ownable(msg.sender) {
        trustToken = IERC20(_trustToken);
        reputationNFT = _reputationNFT;
    }

    /* ══════════════════════════════════════════
       P2P FLOW FUNCTIONS
    ═══════════════════════════════════════════ */

    /**
     * @notice Borrower submits a loan request to the marketplace.
     */
    function submitLoanRequest(
        uint256 amount,
        uint256 durationDays,
        uint8   path
    ) external nonReentrant whenNotPaused {
        require(amount > 0, "LendingPool: zero amount");
        require(durationDays > 0 && durationDays <= 365, "LendingPool: invalid duration");
        require(path <= uint8(LoanPath.TrustOnly), "LendingPool: invalid path");
        require(_loans[msg.sender].status != LoanStatus.Active, "LendingPool: active loan exists");
        require(borrowerPendingRequestId[msg.sender] == 0, "LendingPool: pending request exists");

        uint256 limit = getBorrowLimit(msg.sender);
        
        LoanPath loanPath = LoanPath(path);
        
        // Pathway-specific overrides
        if (loanPath == LoanPath.TrustOnly) {
            // TrustOnly is strictly capped at 10 TRUST for early reputation building
            uint256 trustOnlyCap = LIMIT_BRONZE; 
            if (limit > trustOnlyCap) limit = trustOnlyCap;
            require(amount <= limit, "LendingPool: exceeds trust-only cap (10)");
        } else {
            require(amount <= limit, "LendingPool: exceeds trust limit");
        }

        requestCount++;
        uint256 requestId = requestCount;

        // Logic for Collateral Pathway: Lock borrower funds as escrow
        if (loanPath == LoanPath.Collateral) {
            // 106% collateral staking for high-value loans
            uint256 collateralAmount = (amount * 106) / 100;
            trustToken.safeTransferFrom(msg.sender, address(this), collateralAmount);
            collateralEscrow[requestId] = collateralAmount;
        }

        uint256 rate = _rateForPath(loanPath);

        loanRequests[requestId] = LoanRequest({
            requestId: requestId,
            borrower: msg.sender,
            amount: amount,
            durationDays: durationDays,
            interestRate: rate,
            path: loanPath,
            status: LoanRequestStatus.Pending,
            createdAt: block.timestamp,
            expiresAt: block.timestamp + 48 hours,
            funder: address(0)
        });

        borrowerPendingRequestId[msg.sender] = requestId;

        emit LoanRequested(requestId, msg.sender, amount, rate, loanPath, block.timestamp + 48 hours);
    }

    /**
     * @notice Lender funds a pending loan request.
     */
    function fundLoanRequest(uint256 requestId) external nonReentrant whenNotPaused {
        LoanRequest storage req = loanRequests[requestId];
        require(req.status == LoanRequestStatus.Pending, "LendingPool: not pending");
        require(block.timestamp <= req.expiresAt, "LendingPool: request expired");
        require(req.borrower != msg.sender, "LendingPool: cannot fund own request");

        // Execute transfer from lender to borrower
        trustToken.safeTransferFrom(msg.sender, req.borrower, req.amount);

        // Update request status
        req.status = LoanRequestStatus.Funded;
        req.funder = msg.sender;
        borrowerPendingRequestId[req.borrower] = 0;

        // Move collateral from request escrow to active loan if exists
        if (req.path == LoanPath.Collateral) {
            borrowerCollateral[req.borrower] = collateralEscrow[requestId];
            collateralEscrow[requestId] = 0;
        }

        // Initialize active loan
        uint256 dueDate = block.timestamp + (req.durationDays * 1 days);
        _loans[req.borrower] = Loan({
            borrower: req.borrower,
            lender: msg.sender,
            amount: req.amount,
            repaidAmount: 0,
            interestRate: req.interestRate,
            startTime: block.timestamp,
            dueDate: dueDate,
            installmentsPaid: 0,
            totalInstallments: DEFAULT_INSTALLMENTS,
            status: LoanStatus.Active,
            path: req.path
        });

        totalActiveLoans++;
        totalFundedAmount += req.amount;
        _activeInterestSum += req.interestRate;

        // Mint Reputation NFT if needed
        try ReputationNFT(reputationNFT).mintReputationNFT(req.borrower) {} catch {}

        emit LoanFunded(requestId, msg.sender, req.borrower, req.amount, block.timestamp);
    }

    /**
     * @notice Borrower cancels their own pending request.
     */
    function cancelLoanRequest(uint256 requestId) external {
        LoanRequest storage req = loanRequests[requestId];
        require(req.borrower == msg.sender, "LendingPool: not your request");
        require(req.status == LoanRequestStatus.Pending, "LendingPool: not pending");

        req.status = LoanRequestStatus.Cancelled;
        borrowerPendingRequestId[msg.sender] = 0;

        emit LoanRequestCancelled(requestId, msg.sender);
    }

    /**
     * @notice Borrower submits a collateralized loan request (Staking path).
     * @param loanAmount Amount to borrow.
     * @param collateralAmount Amount to lock as collateral (must be >= 106% of loanAmount).
     */
    function submitCollateralRequest(
        uint256 loanAmount,
        uint256 collateralAmount,
        uint256 durationDays
    ) external nonReentrant whenNotPaused {
        require(loanAmount > 0, "LendingPool: zero amount");
        require(collateralAmount >= (loanAmount * 106) / 100, "LendingPool: insuffient collateral (106% required)");
        require(durationDays > 0 && durationDays <= 365, "LendingPool: invalid duration");
        require(_loans[msg.sender].status != LoanStatus.Active, "LendingPool: active loan exists");
        require(borrowerPendingRequestId[msg.sender] == 0, "LendingPool: pending request exists");

        // Transfer collateral to contract
        trustToken.safeTransferFrom(msg.sender, address(this), collateralAmount);

        uint256 rate = RATE_COLLATERAL;

        requestCount++;
        uint256 requestId = requestCount;

        loanRequests[requestId] = LoanRequest({
            requestId: requestId,
            borrower: msg.sender,
            amount: loanAmount,
            durationDays: durationDays,
            interestRate: rate,
            path: LoanPath.Collateral,
            status: LoanRequestStatus.Pending,
            createdAt: block.timestamp,
            expiresAt: block.timestamp + 48 hours,
            funder: address(0)
        });

        borrowerPendingRequestId[msg.sender] = requestId;
        // We store the collateral amount in a mapping or reusable field?
        // Let's add a mapping for collateral.
        collateralEscrow[requestId] = collateralAmount;

        emit LoanRequested(requestId, msg.sender, loanAmount, rate, LoanPath.Collateral, block.timestamp + 48 hours);
    }

    /**
     * @notice Process repayment - goes directly to the lender.
     */
    function makeRepayment(uint256 amount) external nonReentrant whenNotPaused {
        Loan storage loan = _loans[msg.sender];
        require(loan.status == LoanStatus.Active, "LendingPool: no active loan");
        require(amount > 0, "LendingPool: zero repayment");

        uint256 totalOwed = _totalOwed(loan);
        uint256 remaining = totalOwed - loan.repaidAmount;
        require(amount <= remaining, "LendingPool: overpayment");

        // Direct transfer to lender
        trustToken.safeTransferFrom(msg.sender, loan.lender, amount);

        loan.repaidAmount += amount;
        loan.installmentsPaid++;

        if (loan.repaidAmount >= totalOwed) {
            loan.status = LoanStatus.Repaid;
            totalActiveLoans--;
            _activeInterestSum -= loan.interestRate;
            _increaseTrustScore(msg.sender);

            // Refund collateral if path is Collateral
            if (loan.path == LoanPath.Collateral) {
                // Find the original request Id to get collateral amount
                // This is a bit tricky since we don't store it in Loan struct.
                // Let's assume we store it in a mapping indexed by borrower.
                uint256 col = borrowerCollateral[msg.sender];
                if (col > 0) {
                    borrowerCollateral[msg.sender] = 0;
                    trustToken.safeTransfer(msg.sender, col);
                }
            }
        }

        uint8 currentScore = trustScores[msg.sender];
        remaining = totalOwed - loan.repaidAmount;

        emit RepaymentMade(msg.sender, loan.lender, amount, remaining, currentScore);
    }

    /* ══════════════════════════════════════════
       ADMIN / INTERNAL
    ═══════════════════════════════════════════ */

    function updateTrustScore(address borrower, uint8 newScore) external onlyOwner {
        require(newScore <= MAX_SCORE, "LendingPool: score > 100");
        uint8 oldScore = trustScores[borrower];
        trustScores[borrower] = newScore;
        emit TrustScoreUpdated(borrower, oldScore, newScore);
    }

    function markDefault(address borrower) external onlyOwner {
        Loan storage loan = _loans[borrower];
        require(loan.status == LoanStatus.Active, "LendingPool: not active");
        loan.status = LoanStatus.Defaulted;
        totalActiveLoans--;
        _activeInterestSum -= loan.interestRate;

        // Liquidate collateral if exists
        if (loan.path == LoanPath.Collateral) {
            uint256 col = borrowerCollateral[borrower];
            if (col > 0) {
                borrowerCollateral[borrower] = 0;
                trustToken.safeTransfer(loan.lender, col);
            }
        }

        uint8 oldScore = trustScores[borrower];
        uint8 penalty  = oldScore >= 15 ? oldScore - 15 : 0;
        trustScores[borrower] = penalty;

        try ReputationNFT(reputationNFT).updateReputation(borrower, penalty, loan.amount, false) {} catch {}
        emit LoanDefaulted(borrower, loan.amount, _totalOwed(loan) - loan.repaidAmount);
    }

    function initializeUser() external nonReentrant whenNotPaused {
        require(trustScores[msg.sender] == 0, "LendingPool: already initialized");
        trustScores[msg.sender] = 30;
        try ReputationNFT(reputationNFT).mintReputationNFT(msg.sender) {} catch {}
        emit TrustScoreUpdated(msg.sender, 0, 30);
    }

    function pause() external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }

    function _increaseTrustScore(address borrower) internal {
        Loan storage loan = _loans[borrower];
        uint8 bump;
        if (block.timestamp <= loan.startTime + ((loan.dueDate - loan.startTime) * 75) / 100) bump = SCORE_EARLY;
        else if (block.timestamp <= loan.dueDate) bump = SCORE_ONTIME;
        else bump = SCORE_LATE;

        uint8 oldScore = trustScores[borrower];
        uint8 newScore = oldScore + bump > MAX_SCORE ? MAX_SCORE : oldScore + bump;
        trustScores[borrower] = newScore;
        try ReputationNFT(reputationNFT).updateReputation(borrower, newScore, loan.amount, bump >= SCORE_ONTIME) {} catch {}
        emit TrustScoreUpdated(borrower, oldScore, newScore);
    }

    function _totalOwed(Loan storage loan) internal view returns (uint256) {
        return loan.amount + (loan.amount * loan.interestRate) / 10_000;
    }

    function _rateForPath(LoanPath p) internal pure returns (uint256) {
        if (p == LoanPath.VouchBacked) return RATE_VOUCH;
        if (p == LoanPath.Collateral)  return RATE_COLLATERAL;
        return RATE_TRUST_ONLY;
    }

    /* ══════════════════════════════════════════
       VIEW FUNCTIONS
    ═══════════════════════════════════════════ */

    function getLoan(address borrower) external view returns (Loan memory) { return _loans[borrower]; }
    
    function getOpenRequests() external view returns (LoanRequest[] memory) {
        uint256 openCount = 0;
        for (uint256 i = 1; i <= requestCount; i++) {
            if (loanRequests[i].status == LoanRequestStatus.Pending && block.timestamp <= loanRequests[i].expiresAt) {
                openCount++;
            }
        }
        LoanRequest[] memory open = new LoanRequest[](openCount);
        uint256 index = 0;
        // Search backwards for newest first
        for (uint256 i = requestCount; i >= 1; i--) {
            if (loanRequests[i].status == LoanRequestStatus.Pending && block.timestamp <= loanRequests[i].expiresAt) {
                open[index] = loanRequests[i];
                index++;
            }
        }
        return open;
    }

    function getBorrowerRequest(address borrower) external view returns (LoanRequest memory) {
        uint256 requestId = borrowerPendingRequestId[borrower];
        if (requestId == 0) return LoanRequest(0, address(0), 0, 0, 0, LoanPath.VouchBacked, LoanRequestStatus.Cancelled, 0, 0, address(0));
        return loanRequests[requestId];
    }

    function getTrustScore(address borrower) external view returns (uint8) { return trustScores[borrower]; }
    function getBorrowLimit(address borrower) public view returns (uint256) {
        uint8 score = trustScores[borrower];
        if (score >= 90) return LIMIT_PLATINUM;
        if (score >= 70) return LIMIT_GOLD;
        if (score >= 50) return LIMIT_SILVER;
        if (score >= 30) return LIMIT_BRONZE;
        return 0;
    }

    function getPoolStats() external view returns (uint256 funded, uint256 active, uint256 requests, uint256 avgRate) {
        funded = totalFundedAmount;
        active = totalActiveLoans;
        requests = 0; 
        for(uint256 i=1; i<=requestCount; i++) {
            if (loanRequests[i].status == LoanRequestStatus.Pending) requests++;
        }
        avgRate = totalActiveLoans > 0 ? _activeInterestSum / totalActiveLoans : 0;
    }

    function getTotalOwed(address borrower) external view returns (uint256) {
        Loan storage loan = _loans[borrower];
        if (loan.status != LoanStatus.Active) return 0;
        return _totalOwed(loan);
    }
}
