import React, { useState, useEffect } from "react";
import Web3 from "web3";
import VendorContractABI from "./VendorContractABI.json";

const AdminDashboard = () => {
    const [account, setAccount] = useState("");
    const [contract, setContract] = useState(null);
    const [vendorList, setVendorList] = useState([]);
    const [newVendor, setNewVendor] = useState({ address: "", name: "" });

    const contractAddress = "0xYourContractAddressHere"; // Replace with deployed contract address

    // Initialize Web3 and Contract
    useEffect(() => {
        const initWeb3 = async () => {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                await window.ethereum.request({ method: "eth_requestAccounts" });
                const accounts = await web3.eth.getAccounts();
                setAccount(accounts[0]);

                const contractInstance = new web3.eth.Contract(VendorContractABI, contractAddress);
                setContract(contractInstance);
            } else {
                alert("Please install MetaMask to interact with the blockchain!");
            }
        };

        initWeb3();
    }, []);

    // Fetch Vendors
    useEffect(() => {
        const fetchVendors = async () => {
            if (contract) {
                const vendors = await contract.methods.getAllVendors().call();
                setVendorList(vendors);
            }
        };

        fetchVendors();
    }, [contract]);

    // Add a new vendor
    const addVendor = async () => {
        if (contract && newVendor.address && newVendor.name) {
            await contract.methods.addVendor(newVendor.address, newVendor.name).send({ from: account });
            alert("Vendor added successfully!");
            setNewVendor({ address: "", name: "" });
            window.location.reload(); // Refresh to show updated vendor list
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Connected Account: {account}</p>

            <h2>Add New Vendor</h2>
            <input
                type="text"
                placeholder="Vendor Address"
                value={newVendor.address}
                onChange={(e) => setNewVendor({ ...newVendor, address: e.target.value })}
            />
            <input
                type="text"
                placeholder="Vendor Name"
                value={newVendor.name}
                onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
            />
            <button onClick={addVendor}>Add Vendor</button>

            <h2>Vendor List</h2>
            <ul>
                {vendorList.map((vendor, index) => (
                    <li key={index}>{vendor}</li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
