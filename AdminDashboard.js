import React, { useState, useEffect } from "react";
import Web3 from "web3";
import VendorContractABI from "./VendorContractABI.json";

const AdminDashboard = () => {
    const [account, setAccount] = useState("");
    const [contract, setContract] = useState(null);
    const [vendorList, setVendorList] = useState([]);
    const [newVendor, setNewVendor] = useState({ address: "", name: "" });
    const [loading, setLoading] = useState(true);

    const contractAddress = "0xYourContractAddressHere"; // Replace with deployed contract address

    // Initialize Web3 and Contract
    useEffect(() => {
        const initWeb3 = async () => {
            try {
                if (window.ethereum) {
                    const web3 = new Web3(window.ethereum);
                    await window.ethereum.request({ method: "eth_requestAccounts" });
                    const accounts = await web3.eth.getAccounts();
                    setAccount(accounts[0]);

                    const contractInstance = new web3.eth.Contract(
                        VendorContractABI,
                        contractAddress
                    );
                    setContract(contractInstance);
                } else {
                    alert("Please install MetaMask to interact with the blockchain!");
                }
            } catch (error) {
                console.error("Web3 initialization error:", error);
                alert("Error connecting to blockchain");
            } finally {
                setLoading(false);
            }
        };

        initWeb3();
    }, []);

    // Fetch Vendors
    useEffect(() => {
        const fetchVendors = async () => {
            if (contract) {
                try {
                    const vendors = await contract.methods.getAllVendors().call();
                    setVendorList(vendors);
                } catch (error) {
                    console.error("Error fetching vendors:", error);
                }
            }
        };

        fetchVendors();
    }, [contract]);

    // Add a new vendor
    const addVendor = async () => {
        if (!contract || !newVendor.address || !newVendor.name) return;

        try {
            await contract.methods
                .addVendor(newVendor.address, newVendor.name)
                .send({ from: account });
            
            // Refresh vendor list without page reload
            const updatedVendors = await contract.methods.getAllVendors().call();
            setVendorList(updatedVendors);
            
            setNewVendor({ address: "", name: "" });
            alert("Vendor added successfully!");
        } catch (error) {
            console.error("Error adding vendor:", error);
            alert("Failed to add vendor");
        }
    };

    if (loading) return <div>Loading blockchain connection...</div>;

    return (
        <div className="admin-dashboard">
            <h1>Shopify Admin Dashboard</h1>
            <div className="account-info">
                <p>Connected Account: {account}</p>
            </div>

            <div className="add-vendor-form">
                <h2>Add New Vendor</h2>
                <div className="form-group">
                    <label>Vendor Address:</label>
                    <input
                        type="text"
                        value={newVendor.address}
                        onChange={(e) => setNewVendor({ ...newVendor, address: e.target.value })}
                        placeholder="0x..."
                    />
                </div>
                <div className="form-group">
                    <label>Vendor Name:</label>
                    <input
                        type="text"
                        value={newVendor.name}
                        onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
                        placeholder="Vendor Business Name"
                    />
                </div>
                <button 
                    onClick={addVendor}
                    disabled={!newVendor.address || !newVendor.name}
                >
                    Add Vendor
                </button>
            </div>

            <div className="vendor-list">
                <h2>Registered Vendors</h2>
                {vendorList.length === 0 ? (
                    <p>No vendors registered yet</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Address</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vendorList.map((vendor, index) => (
                                <tr key={index}>
                                    <td>{vendor.address}</td>
                                    <td>{vendor.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
