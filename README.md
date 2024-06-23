
# oneDAO Dex Project

## Procedure to run the project and tests

1. Install the dependencies: `npm install`
2. Compile the contracts: `npx hardhat compile`
3. Run the tests: `npx hardhat test`
4. Run the Hardhat node: `npx hardhat node`
5. Deploy the contracts: `npx hardhat ignition deploy ./ignition/modules/Dex.js --network localhost`
6. Copy the deployed "Contract address" and paste it in the  `dex.js` field of  `DEX_ADDRESS` in the `\oneDAO\frontend\` folder
7. Copy the `dex.json` (ABI) from the `oneDao\artifacts\contracts\Dex.sol\` and paste it in `dex.js` in the field of `DEX_ABI ` in the `\oneDAO\frontend\` folder
8. Run the frontend: open with browser/liveServer: `index.html`
9. Connect the accounts in Metamask
10. Optional : (Local network wallet) In Metamask, set the RPC URL to `http://127.0.0.1:8545/` and the chain ID to `31337`. Import Hardhat node accounts using private keys in Metamask.
11. Deposit ERC20 tokens or funds (make sure you have funds in your wallet)
12. Create an order to buy or sell tokens
13. View existing orders and match your order with the order ID to transfer your funds.

