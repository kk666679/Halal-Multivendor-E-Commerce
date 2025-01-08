// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Smart Contract: Vendor Management
contract VendorContract {
    // Events
    event VendorAdded(address indexed vendorAddress, string vendorName);
    event VendorRemoved(address indexed vendorAddress);
    event FundsWithdrawn(address indexed vendorAddress, uint256 amount);

    // State Variables
    address public owner;
    mapping(address => Vendor) public vendors;
    address[] public vendorList;

    struct Vendor {
        string name;
        bool isRegistered;
        uint256 balance;
    }

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can execute this action");
        _;
    }

    modifier onlyRegisteredVendor() {
        require(vendors[msg.sender].isRegistered, "Only registered vendors can execute this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Add a new vendor
    function addVendor(address vendorAddress, string memory vendorName) external onlyOwner {
        require(!vendors[vendorAddress].isRegistered, "Vendor is already registered");
        vendors[vendorAddress] = Vendor(vendorName, true, 0);
        vendorList.push(vendorAddress);
        emit VendorAdded(vendorAddress, vendorName);
    }

    // Remove an existing vendor
    function removeVendor(address vendorAddress) external onlyOwner {
        require(vendors[vendorAddress].isRegistered, "Vendor is not registered");
        delete vendors[vendorAddress];
        emit VendorRemoved(vendorAddress);
    }

    // Deposit funds to the vendor's account
    function depositFunds() external payable onlyRegisteredVendor {
        vendors[msg.sender].balance += msg.value;
    }

    // Withdraw funds from the vendor's account
    function withdrawFunds(uint256 amount) external onlyRegisteredVendor {
        require(vendors[msg.sender].balance >= amount, "Insufficient balance");
        vendors[msg.sender].balance -= amount;
        payable(msg.sender).transfer(amount);
        emit FundsWithdrawn(msg.sender, amount);
    }

    // Get the list of all vendors
    function getAllVendors() external view returns (address[] memory) {
        return vendorList;
    }
}
