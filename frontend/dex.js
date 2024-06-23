const DEX_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Deposit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "orderId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "trader",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "isBuyOrder",
        "type": "bool"
      }
    ],
    "name": "NewOrder",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "buyOrderId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "sellOrderId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "trader",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "OrderMatched",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isBuyOrder",
        "type": "bool"
      }
    ],
    "name": "createOrder",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_fund",
        "type": "uint256"
      }
    ],
    "name": "depositFunds",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "depositTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "deposits",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "buyOrderId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "sellOrderId",
        "type": "uint256"
      }
    ],
    "name": "matchOrders",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextOrderId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "orders",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "trader",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isBuyOrder",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]; // Replace with your DEX ABI
const DEX_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your DEX contract address

let web3;
let orders;
if (typeof window.ethereum !== "undefined") {
  web3 = new Web3(window.ethereum);

  window.ethereum
    .request({ method: "eth_requestAccounts" })
    .then(() => {
      web3.eth
        .getAccounts()
        .then((accounts) => {
          console.log("Available accounts:", accounts);
          accounts.forEach((account) => {
            let option = document.createElement("option");
            option.value = account;
            option.text = account;
            accountSelect.appendChild(option);
          });
          userAccount = accounts[0];
          console.log("Default user account:", userAccount);
        })
        .catch((error) => {
          console.error("Error getting accounts:", error);
        });
    })
    .catch((error) => {
      console.error("User denied account access", error);
    });
} else {
  alert("Please install MetaMask to use this DApp!");
}

let userAccount;
const accountSelect = document.getElementById("accountSelect");

accountSelect.addEventListener("change", function () {
  userAccount = this.value; 
  console.log("Selected account:", userAccount);

  const selectedAccountElement = document.getElementById("selectedAccount");
  selectedAccountElement.textContent = userAccount;
});

const dexContract = new web3.eth.Contract(DEX_ABI, DEX_ADDRESS);
const IERC20_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

document
  .getElementById("depositFundsForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    let amountEther = document.getElementById("depositFundsAmount").value;
    let amountWEi = web3.utils.toWei(amountEther, "ether");

    try {
      const gasEstimate = await dexContract.methods
        .depositFunds(amountWEi)
        .estimateGas({
          value: web3.utils.toWei(amountEther, "ether"),
          from: userAccount,
        });

      await dexContract.methods.depositFunds(amountWEi).send({
        value: web3.utils.toWei(amountEther, "ether"),
        from: userAccount,
        gas: gasEstimate,
      });

      alert("Deposit successful!");
    } catch (error) {
      alert("Deposit failed: " + error.message);
    }
  });

document
  .getElementById("depositTokensForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const token = document.getElementById("depositToken").value;
    const amount = document.getElementById("depositTokenAmount").value;

    try {
      const tokenContract = new web3.eth.Contract(IERC20_ABI, token);
      await tokenContract.methods
        .approve(DEX_ADDRESS, amount)
        .send({ from: userAccount });

      const gasEstimate = await dexContract.methods
        .depositTokens(token, amount)
        .estimateGas({ from: userAccount });

      await dexContract.methods
        .depositTokens(token, amount)
        .send({ from: userAccount, gas: gasEstimate });

      alert("Deposit successful!");
    } catch (error) {
      alert("Deposit failed: " + error.message);
    }
  });

// Create order
document.getElementById("createOrderForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Extract values from the form
  const token = document.getElementById("orderToken").value;
  const amount = document.getElementById("orderAmount").value;
  const price = document.getElementById("orderPrice").value;
  const isBuyOrder = document.getElementById("isBuyOrder").value === "true";

  try {
    // Estimate gas required for the transaction
    const gasEstimate = await dexContract.methods
      .createOrder(token, amount, price, isBuyOrder)
      .estimateGas({ from: userAccount });

    // Create order with the estimated gas
    await dexContract.methods
      .createOrder(token, amount, price, isBuyOrder)
      .send({ from: userAccount, gas: gasEstimate })
      .then((res) => {
        console.log("Order created successfully:", res);
        alert("Order created successfully!");
      });
  } catch (error) {
    
    if (error.message.includes('Insufficient ETH balance')) {
      alert("Order creation failed: Insufficient ETH balance. Please add more ETH to your account and try again.");
    } else {
      alert("Order creation failed: " + error.message);
    }
  }
});


// Match orders
document
  .getElementById("matchOrdersForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const buyOrderId = document.getElementById("buyOrderId").value;
    const sellOrderId = document.getElementById("sellOrderId").value;

    await dexContract.methods
      .matchOrders(buyOrderId, sellOrderId)
      .send({ from: userAccount });
    alert("Orders matched and trasfered successfully!");
  });
async function getOrders() {
  orders = await dexContract.methods.nextOrderId().call();
  console.log("Next order ID: " + orders);
}
getOrders();

document.getElementById("nextOrder").addEventListener("click", async () => {
  const nextOrderId = await dexContract.methods.nextOrderId().call();
  alert("Next order ID: " + nextOrderId);
});
document.getElementById("getOrders").addEventListener("click", async () => {
  const numOrders = orders;
  const buyOrderListElement = document.getElementById("buyOrderList");
  const sellOrderListElement = document.getElementById("sellOrderList");

  buyOrderListElement.innerHTML = "";
  sellOrderListElement.innerHTML = "";
  for (let i = 0; i < numOrders; i++) {
    try {
      const order = await dexContract.methods.orders(i).call();

      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <p>Order ID: ${order.id}</p>
        <p>Trader: ${order.trader}</p>
        <p>Token: ${order.token}</p>
        <p>Amount: ${order.amount}</p>
        <p>Price: ${order.price}</p>
        <p>Is buy order: ${order.isBuyOrder ? "Yes" : "No"}</p>
      `;

      if (order.isBuyOrder) {
        buyOrderListElement.appendChild(listItem);
      } else {
        sellOrderListElement.appendChild(listItem);
      }
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  }
});

document.getElementById("depositForm").addEventListener("submit", async () => {
  const token = document.getElementById("depositTokenAddress").value;
  const deposits = await dexContract.methods
    .deposits(token, userAccount)
    .call();
  alert("Deposits: " + deposits);
});
