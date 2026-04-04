// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title VouchSystem
 * @notice Peer vouching: users stake tokens to back a borrower's credibility.
 */
contract VouchSystem is Ownable {
    IERC20 public token;
    address public treasury;
    uint256 public nextVouchId;

    struct Vouch {
        uint256 id;
        address voucher;
        address borrower;
        uint256 amount;
        bool released;
        bool slashed;
    }

    mapping(uint256 => Vouch) public vouches;
    mapping(address => uint256[]) public borrowerVouches;
    mapping(address => uint256) public totalStakedBy;
    
    mapping(address => uint8) public vouchGiven;     // max 3
    mapping(address => uint8) public vouchReceived;  // max 3
    
    mapping(address => mapping(address => uint8)) public vouchRequests;
    mapping(address => mapping(address => bool)) public establishedVouches;
    
    mapping(uint256 => uint256) public loanStake;
    mapping(uint256 => mapping(address => uint256)) public individualLoanStake;

    /* ── Events ── */
    event VouchRequested(address indexed from, address indexed to, uint256 timestamp);
    event VouchAccepted(address indexed borrower, address indexed voucher);
    event VouchRejected(address indexed borrower, address indexed voucher);
    
    event VouchStaked(
        uint256 indexed vouchId,
        address indexed voucher,
        address indexed borrower,
        uint256 amount
    );
    event StakeCommitted(address indexed voucher, address indexed borrower, uint256 requestId, uint256 stakeAmount, uint256 totalStaked);
    event VouchReleased(uint256 indexed vouchId, address indexed voucher, uint256 amount);
    event VouchSlashed(uint256 indexed vouchId, address indexed voucher, uint256 amount);

    constructor(address _token, address _treasury) Ownable(msg.sender) {
        require(_token != address(0), "Invalid token");
        require(_treasury != address(0), "Invalid treasury");
        token = IERC20(_token);
        treasury = _treasury;
    }

    /* ── Vouch Network ── */

    function requestVouch(address to) external {
        require(to != msg.sender, "Cannot vouch for yourself");
        require(vouchReceived[msg.sender] < 3, "Max 3 vouchers reached");
        require(vouchGiven[to] < 3, "Target limit reached");
        require(vouchRequests[msg.sender][to] == 0, "Request exists");
        require(!establishedVouches[msg.sender][to], "Already vouched");

        vouchRequests[msg.sender][to] = 1;
        emit VouchRequested(msg.sender, to, block.timestamp);
    }

    function acceptVouch(address borrower) external {
        require(vouchRequests[borrower][msg.sender] == 1, "No request");
        require(vouchGiven[msg.sender] < 3, "You at limit");
        require(vouchReceived[borrower] < 3, "Borrower at limit");

        vouchRequests[borrower][msg.sender] = 0;
        establishedVouches[borrower][msg.sender] = true;
        vouchGiven[msg.sender]++;
        vouchReceived[borrower]++;

        emit VouchAccepted(borrower, msg.sender);
    }

    function rejectVouch(address borrower) external {
        require(vouchRequests[borrower][msg.sender] == 1, "No request");
        vouchRequests[borrower][msg.sender] = 0;
        emit VouchRejected(borrower, msg.sender);
    }

    /* ── Loan Staking ── */

    function stakeForLoan(address borrower, uint256 requestId, uint256 stakeAmount) external {
        require(establishedVouches[borrower][msg.sender], "Not voucher");
        require(stakeAmount >= 10 * 10**18, "Min stake 10");
        
        require(token.transferFrom(msg.sender, address(this), stakeAmount), "Failed");

        loanStake[requestId] += stakeAmount;
        individualLoanStake[requestId][msg.sender] += stakeAmount;
        totalStakedBy[msg.sender] += stakeAmount;

        emit StakeCommitted(msg.sender, borrower, requestId, stakeAmount, loanStake[requestId]);
    }

    function stakeForBorrower(address borrower, uint256 amount) external returns (uint256) {
        require(amount > 0 && borrower != msg.sender, "Invalid stake");
        require(token.transferFrom(msg.sender, address(this), amount), "Failed");

        uint256 vouchId = nextVouchId++;
        vouches[vouchId] = Vouch({
            id: vouchId,
            voucher: msg.sender,
            borrower: borrower,
            amount: amount,
            released: false,
            slashed: false
        });

        borrowerVouches[borrower].push(vouchId);
        totalStakedBy[msg.sender] += amount;
        emit VouchStaked(vouchId, msg.sender, borrower, amount);
        return vouchId;
    }

    /* ── Admin ── */

    function releaseStake(uint256 vouchId) external onlyOwner {
        Vouch storage v = vouches[vouchId];
        require(!v.released && !v.slashed, "Settled");
        v.released = true;
        totalStakedBy[v.voucher] -= v.amount;
        token.transfer(v.voucher, v.amount);
        emit VouchReleased(vouchId, v.voucher, v.amount);
    }

    function slashStake(uint256 vouchId) external onlyOwner {
        Vouch storage v = vouches[vouchId];
        require(!v.released && !v.slashed, "Settled");
        v.slashed = true;
        totalStakedBy[v.voucher] -= v.amount;
        token.transfer(treasury, v.amount);
        emit VouchSlashed(vouchId, v.voucher, v.amount);
    }

    function setTreasury(address _t) external onlyOwner { treasury = _t; }

    /* ── View ── */

    function getVouch(uint256 id) external view returns (Vouch memory) { return vouches[id]; }
    function getBorrowerVouches(address b) external view returns (uint256[] memory) { return borrowerVouches[b]; }
    function getTotalActiveStake(address b) external view returns (uint256 total) {
        uint256[] memory ids = borrowerVouches[b];
        for (uint256 i = 0; i < ids.length; i++) {
            Vouch storage v = vouches[ids[i]];
            if (!v.released && !v.slashed) total += v.amount;
        }
    }
}
