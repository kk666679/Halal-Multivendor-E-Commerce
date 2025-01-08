const express = require("express");
const Web3 = require("web3");
const VendorContractABI = require("./VendorContractABI.json");

const app = express();
const port = 3000;

const web3 = new Web3("https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID"); // Replace with your Infura URL
const contractAddress = "0xYourContractAddressHere"; // Replace with deployed contract address
const contract = new web3.eth.Contract(VendorContractABI, contractAddress);

// Middleware
app.use(express.json());

// API: Get all vendors
app.get("/vendors", async (req, res) => {
    try {
        const vendors = await contract.methods.getAllVendors().call();
        res.json(vendors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API: Add vendor (requires private key)
app.post("/vendors", async (req, res) => {
    const { privateKey, vendorAddress, vendorName } = req.body;

    try {
        const account = web3.eth.accounts.privateKeyToAccount(privateKey);
        const tx = contract.methods.addVendor(vendorAddress, vendorName);
        const gas = await tx.estimateGas({ from: account.address });

        const signedTx = await account.signTransaction({
            to: contractAddress,
            data: tx.encodeABI(),
            gas,
        });

        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        res.json({ receipt });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
