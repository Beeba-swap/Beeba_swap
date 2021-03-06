// SPDX-License-Identifier: beebaswap
pragma solidity ^0.8.3;

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function mint(address tokenOwner,uint amount) external;
    function burn(uint256 amount) external returns (bool);
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
interface liquidity{
    function tranfertouser(address account,uint256 TokenBtoA) external returns (bool);
}

contract Payable {
    address tracker_0x_address = 0x09B1e29c99B7d2F1f653f2ac0e3ce8cBd92D436D;
    mapping ( address => uint256 ) public balances;
    // Payable address can receive Ether
    address payable public owner;
    // Payable constructor can receive Ether

    constructor() payable {
        owner = payable(msg.sender);
    }

    // Function to deposit Ether into this contract.
    // Call this function along with some Ether.
    // The balance of this contract will be automatically updated.
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}

    function deposit(uint256 token) public payable{
         balances[msg.sender]+= token;
         IERC20(tracker_0x_address).transferFrom(msg.sender, address(this), token);
    }

    // Call this function along with some Ether.
    // The function will throw an error since this function is not payable.
    function notPayable() public {}

    // Function to withdraw all Ether from this contract.
    function withdraw() public {
        // get the amount of Ether stored in this contract
        uint amount = address(this).balance;

        // send all Ether to owner
        // Owner can receive Ether since the address of owner is payable
        (bool success, ) = owner.call{value: amount}("");
        require(success, "Failed to send Ether");
        
        uint256 amounts = balances[owner];
        balances[owner] = 0;
        IERC20(tracker_0x_address).transfer(owner, amounts);
    }

    // Function to transfer Ether from this contract to address from input
    function transfer(address payable _to, uint _amount) public payable{
        
        // Note that "to" is declared as payable
        (bool success, ) = _to.call{value: _amount}("");
        require(success, "Failed to send Ether");
    }
    function balanceofether() public view returns(uint){
        return address(this).balance;
    }
    function balanceOftoken() public view returns(uint256){
         return IERC20(tracker_0x_address).balanceOf(address(this));
    }
    function buytoken(uint256 caltoken) public payable{
        require(IERC20(tracker_0x_address).balanceOf(address(this)) >= caltoken,"Supply Token low");
        balances[owner] = balances[owner]-caltoken;//balance?????????contract
        IERC20(tracker_0x_address).transfer(msg.sender, caltoken);
    }
    function selltoken(uint256 token,uint256 calether) public{
        balances[owner]+= token;
        uint256 allowance = IERC20(tracker_0x_address).allowance(msg.sender,address(this));
        require(allowance >= token,"Check the token allowance");
        IERC20(tracker_0x_address).transferFrom(msg.sender,address(this),token);
        (bool success,) = msg.sender.call{value: calether}("");
        require(success, "Failed to send Ether");
        
        
    }
  
    function swaptoken(address addressliqidityB,uint256 TokenBtoA,uint256 amount,uint256 etherAtoB) public payable{
        require(address(this).balance >= etherAtoB,"Supply Ether low");
        balances[owner]+= amount;
        require(IERC20(tracker_0x_address).transferFrom(msg.sender, address(this), amount),"tranfer user->tokena wrong"); 
        liquidity(addressliqidityB).tranfertouser(msg.sender,TokenBtoA);
        (bool success,) = addressliqidityB.call{value: etherAtoB}("");
         require(success, "Failed to send Ether");

    }
    
    function tranfertouser(address account,uint256 TokenBtoA) public returns(bool){
        require(IERC20(tracker_0x_address).balanceOf(address(this)) >= TokenBtoA,"Supply low");
        balances[owner] = balances[owner]-TokenBtoA;
        IERC20(tracker_0x_address).transfer(account, TokenBtoA);
        return true;
    }
    
    function _safeTransferFrom(
        IERC20 token,
        address sender,
        address recipient,
        uint256 amount
    ) private {
        bool sent = token.transferFrom(sender, recipient, amount);
        require(sent, "Token transfer failed");
    }
}
