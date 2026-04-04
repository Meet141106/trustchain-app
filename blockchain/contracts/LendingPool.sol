// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title LendingPool
 * @notice Core contract managing all loans in TrustLend.
 *
 * Flow:
 *  1. Lenders call depositLiquidity() to add tokens to the pool.
 *  2. Borrowers call createLoan() to request a loan (status = Pending).
 *  3. Owner calls approveLoan() → tokens sent to borrower (status = Active).
 *  4. Borrower calls repayLoan() → tokens returned (status = Repaid).
 */
contract LendingPool is Ownable {
    IERC20 public token;
    uint256 public totalLiquidity;
    uint256 public nextLoanId;

    enum LoanStatus { Pending, Active, Repaid, Defaulted }

    struct Loan {
        uint256 id;
        address borrower;
        uint256 amount;
        LoanStatus status;
        uint256 createdAt;
    }

    mapping(uint256 => Loan) public loans;
    // borrower → list of their loan IDs
    mapping(address => uint256[]) public borrowerLoans;
    // lender → total deposited
    mapping(address => uint256) public lenderDeposits;

    /* ── Events ── */
    event LiquidityDeposited(address indexed lender, uint256 amount);
    event LoanCreated(uint256 indexed loanId, address indexed borrower, uint256 amount);
    event LoanApproved(uint256 indexed loanId, address indexed borrower, uint256 amount);
    event LoanRepaid(uint256 indexed loanId, address indexed borrower, uint256 amount);
    event LoanDefaulted(uint256 indexed loanId, address indexed borrower);

    constructor(address _token) Ownable(msg.sender) {
        require(_token != address(0), "Invalid token address");
        token = IERC20(_token);
    }

    /* ──────────────────────────────────────
       LENDER FUNCTIONS
    ────────────────────────────────────── */

    /**
     * @notice Lender deposits tokens into the pool to fund future loans.
     * @param amount Amount of TLD tokens to deposit.
     */
    function depositLiquidity(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        totalLiquidity += amount;
        lenderDeposits[msg.sender] += amount;

        emit LiquidityDeposited(msg.sender, amount);
    }

    /* ──────────────────────────────────────
       BORROWER FUNCTIONS
    ────────────────────────────────────── */

    /**
     * @notice Borrower requests a loan. Loan starts in Pending state.
     * @param amount Token amount to borrow.
     * @return loanId The ID of the newly created loan.
     */
    function createLoan(uint256 amount) external returns (uint256) {
        require(amount > 0, "Loan amount must be greater than 0");

        uint256 loanId = nextLoanId;
        nextLoanId++;

        loans[loanId] = Loan({
            id: loanId,
            borrower: msg.sender,
            amount: amount,
            status: LoanStatus.Pending,
            createdAt: block.timestamp
        });

        borrowerLoans[msg.sender].push(loanId);

        emit LoanCreated(loanId, msg.sender, amount);
        return loanId;
    }

    /**
     * @notice Borrower repays their active loan.
     * @param loanId ID of the loan to repay.
     */
    function repayLoan(uint256 loanId) external {
        Loan storage loan = loans[loanId];

        require(loan.status == LoanStatus.Active, "Loan is not active");
        require(loan.borrower == msg.sender, "Not the borrower");
        require(token.transferFrom(msg.sender, address(this), loan.amount), "Repayment transfer failed");

        loan.status = LoanStatus.Repaid;
        totalLiquidity += loan.amount;

        emit LoanRepaid(loanId, msg.sender, loan.amount);
    }

    /* ──────────────────────────────────────
       ADMIN FUNCTIONS
    ────────────────────────────────────── */

    /**
     * @notice Owner approves and funds a pending loan.
     * @param loanId The pending loan to approve.
     */
    function approveLoan(uint256 loanId) external onlyOwner {
        Loan storage loan = loans[loanId];

        require(loan.status == LoanStatus.Pending, "Loan is not pending");
        require(totalLiquidity >= loan.amount, "Insufficient liquidity in pool");

        loan.status = LoanStatus.Active;
        totalLiquidity -= loan.amount;

        require(token.transfer(loan.borrower, loan.amount), "Disbursement failed");

        emit LoanApproved(loanId, loan.borrower, loan.amount);
    }

    /**
     * @notice Owner marks an active loan as defaulted.
     * @param loanId The loan to mark as defaulted.
     */
    function markDefault(uint256 loanId) external onlyOwner {
        Loan storage loan = loans[loanId];
        require(loan.status == LoanStatus.Active, "Loan is not active");

        loan.status = LoanStatus.Defaulted;
        emit LoanDefaulted(loanId, loan.borrower);
    }

    /* ──────────────────────────────────────
       VIEW FUNCTIONS
    ────────────────────────────────────── */

    function getLoan(uint256 loanId) external view returns (Loan memory) {
        return loans[loanId];
    }

    function getBorrowerLoans(address borrower) external view returns (uint256[] memory) {
        return borrowerLoans[borrower];
    }

    function getPoolBalance() external view returns (uint256) {
        return token.balanceOf(address(this));
    }
}
