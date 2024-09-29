let web3;
let contract;
let account;

const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE"; // You'll get this after deploying
const contractABI = []; // Paste your contract ABI here

async function init() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            web3 = new Web3(window.ethereum);

            // Get the user's account
            const accounts = await web3.eth.getAccounts();
            account = accounts[0];
            document.getElementById('account').textContent = account;

            // Create contract instance
            contract = new web3.eth.Contract(contractABI, contractAddress);

            // Fetch and display market items
            await fetchMarketItems();
        } catch (error) {
            console.error("Error initializing Web3", error);
        }
    } else {
        console.log('Please install MetaMask!');
    }
}

async function fetchMarketItems() {
    try {
        const items = await contract.methods.fetchMarketItems().call();
        const itemsList = document.getElementById('itemsList');
        itemsList.innerHTML = '';
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `Item ID: ${item.itemId}, Price: ${web3.utils.fromWei(item.price, 'ether')} ETH`;
            itemsList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching market items", error);
    }
}

window.addEventListener('load', init);