const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("DexModule", (m) => {
  const DEX = m.contract("DEX", [], {});
  return { DEX };
});
