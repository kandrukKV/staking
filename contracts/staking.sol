//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "./interfaces/IERC20.sol";

contract STAKING {
  IERC20 private rewardsToken;
  IERC20 private stakingToken;

  uint256 public _totalStaked;
  uint256 public _stakePeriod; //время через которое начисляется процент
  uint256 public _earningPercentage; //базовый процент для начисления ревордов
  address public _owner;

  struct StakeTransaction {
    uint256 amount;
    uint256 timestamp;
  }

  struct StakerInfo {
    uint256 balance;
    uint256 claimedValue;
    StakeTransaction[] transactions;
  }

  mapping(address => StakerInfo) private _staker;

  event Staked(uint256 amount, uint256 time, address indexed sender);
  event Claimed(uint256 amount, uint256 time, address indexed sender);
  event Unstaked(uint256 amount, uint256 time, address indexed sender);

  constructor(address _stakingToken, address _rewardsToken) {
    stakingToken = IERC20(_stakingToken);
    rewardsToken = IERC20(_rewardsToken);
    _owner = msg.sender;
    _stakePeriod = 120;
    _earningPercentage = 20;
  }

  modifier onlyOwner() {
    require(_owner == msg.sender, "You aren't owner");
    _;
  }

  function changeStakePeriod(uint256 period)
    external
    onlyOwner
    returns (uint256)
  {
    _stakePeriod = period;
    return _stakePeriod;
  }

  function changeEarningPercentage(uint256 percent)
    external
    onlyOwner
    returns (uint256)
  {
    _earningPercentage = percent;
    return _earningPercentage;
  }

  function stake(uint256 _amount) external returns (uint256) {
    require(_amount > 0, "Amount sould be more than zerro.");
    stakingToken.transferFrom(msg.sender, address(this), _amount);
    _totalStaked += _amount;
    _staker[msg.sender].balance += _amount;
    _staker[msg.sender].transactions.push(
      StakeTransaction({ amount: _amount, timestamp: block.timestamp })
    );

    emit Staked(_amount, block.timestamp, msg.sender);

    return _staker[msg.sender].balance;
  }

  function claim() public {
    uint256 claimAmount = calcClaimValue(msg.sender);
    require(claimAmount > 0, "Nothing to claim");
    rewardsToken.transfer(msg.sender, claimAmount);
    _staker[msg.sender].claimedValue += claimAmount;
    emit Claimed(claimAmount, block.timestamp, msg.sender);
  }

  function unStake(uint256 amount) external {
    require(amount > 0, "unstake amount should be greater than 0");

    uint256 unlockedTokensAmount = calcUnlockedTokens();

    require(amount <= unlockedTokensAmount, "The maximum value is exceeded");

    StakerInfo storage staker = _staker[msg.sender];

    uint256 valueForCharge = amount;
    stakingToken.transfer(msg.sender, amount);
    _totalStaked -= amount;
    staker.balance -= amount;

    while (valueForCharge > 0) {
      if (valueForCharge >= staker.transactions[0].amount) {
        staker.transactions.pop();
        valueForCharge -= staker.transactions[0].amount;
      } else {
        staker.transactions[0].amount -= valueForCharge;
        valueForCharge = 0;
      }
    }

    emit Unstaked(amount, block.timestamp, msg.sender);
  }

  function calcUnlockedTokens() public view returns (uint256) {
    uint256 unlockedTokens;

    StakeTransaction[] memory transactions = _staker[msg.sender].transactions;

    for (uint256 i = 0; i < transactions.length; i++) {
      if ((block.timestamp - transactions[i].timestamp) > _stakePeriod) {
        unlockedTokens += transactions[i].amount;
      }
    }
    return unlockedTokens;
  }

  function _quantityClaimForPeriod(uint256 amount)
    public
    view
    returns (uint256)
  {
    return (amount * _earningPercentage) / 100;
  }

  function calcClaimValue(address _sender) public view returns (uint256) {
    StakeTransaction[] memory transactions = _staker[_sender].transactions;
    uint256 claimAmount;

    for (uint256 i = 0; i < transactions.length; i++) {
      if ((block.timestamp - transactions[i].timestamp) > _stakePeriod) {
        claimAmount += _quantityClaimForPeriod(transactions[i].amount);
      }
    }

    claimAmount -= _staker[_sender].claimedValue;

    return claimAmount;
  }

  function getTransactionTS(address _sender) public view returns (uint256) {
    StakeTransaction[] memory transactions = _staker[_sender].transactions;
    return block.timestamp - transactions[0].timestamp;
  }

  function getStakerInfo(address staker)
    public
    view
    returns (StakerInfo memory)
  {
    return _staker[staker];
  }
}
