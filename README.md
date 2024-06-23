# oneDAO Dex Project

# Procedure to run the project and tests

1. Install the dependencies: `npm install`
2. Compile the contracts: `npx hardhat compile`
3. Run the tests: `npx hardhat test`
4. Run the Hardhat node: `npx hardhat node`
5. Deploy the contracts: `npx hardhat ignition deploy ./ignition/modules/Dex.js --network localhost`
6. Copy the deployed "Contract address" and paste it in the `DEX_ADDRESS` field of `dex.js` in the `\oneDAO\frontend\` folder
7. Copy the `dex.json` (ABI) from the `oneDao\artifacts\contracts\Dex.sol\` and paste it in `dex.js` in the `\oneDAO\frontend\` folder
8. Run the frontend: open with browser/liveServer: `index.html`
9. Connect the accounts in Metamask
10. Deposit ERC20 tokens, or deposit funds
11. You can see existing orders. You can match your order with the order ID and transfer your funds
