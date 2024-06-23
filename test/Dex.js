const { expect } = require("chai");
const { ethers } = require("hardhat");

describe(" DAO DEX", function () {
  let  dex, token, owner, addr1, addr2;

  beforeEach(async function () {
    const DEX = await ethers.getContractFactory("DEX");
    const Token = await ethers.getContractFactory("MyToken");

    [owner, addr1, addr2] = await ethers.getSigners();
    dex = await DEX.deploy();
    token = await Token.deploy("Token", "TKN");
    //console.log(dex.target, token.target);
  });

  it("should deploy the token and DEX contracts", async function () {
    const tokenAddress = await token.target;
    const dexAddress = await dex.target;

    expect(tokenAddress).to.properAddress;
    expect(dexAddress).to.properAddress;
  });

  it("Owner deposit ERC20 tokens", async function () {
    const depositAmount = ethers.parseEther("100");
    //console.log(await dex.nextOrderId());
    await token.connect(owner).approve(dex.target, depositAmount);

    expect(dex.connect(owner).depositTokens(token.target, depositAmount));
  });
  // Depositing ETH
  it("User deposit ETH", async function () {
    const depositAmountInWei = ethers.parseUnits("100", "wei");

    await dex.connect(owner).depositFunds(100, { value: depositAmountInWei });
  });

  it("User create a buy order", async function () {
    const depositAmount = ethers.parseEther("100");

    const orderAmount = ethers.parseUnits("10", "wei");
    const price = ethers.parseUnits("1", "wei");

    await token.connect(owner).approve(dex.target, depositAmount);
    await dex.connect(owner).depositTokens(token.target, depositAmount);

    //console.log(token.target, orderAmount, price, true);
    await expect(
      dex.connect(owner).createOrder(token.target, orderAmount, price, true)
    );
  });

  it("Owner create a sell order", async function () {
    const depositAmount = ethers.parseEther("100");
    const orderAmount = ethers.parseUnits("10", "wei");
    const price = ethers.parseUnits("1", "wei");

    await token.connect(owner).approve(dex.target, depositAmount);
    await dex.connect(owner).depositTokens(token.target, depositAmount);
    await dex
      .connect(owner)
      .createOrder(token.target, orderAmount, price, false);

  });

  it("should match orders correctly and trasfers funds", async function () {
    const depositAmount = ethers.parseUnits("100", "wei");
    const orderAmount = ethers.parseUnits("10", "wei");
    const price = ethers.parseUnits("1", "wei");

    await token.connect(owner).approve(dex.target, depositAmount);
    await dex.connect(owner).depositTokens(token.target, depositAmount);

    //console.log("Sell order id", await dex.nextOrderId());

    await expect(dex.connect(owner).createOrder(token.target, orderAmount, price, false))
       

    await token.connect(addr1).approve(dex.target, depositAmount);
    await dex.connect(addr1).depositFunds(100, { value: depositAmount });

    //console.log("Buy order id", await dex.nextOrderId());
    const add0OwnerBalb = await dex.deposits("0x0000000000000000000000000000000000000000", owner.address);
    const add0addrBalb = await dex.deposits("0x0000000000000000000000000000000000000000", addr1.address);
    //console.log("add0 before", add0OwnerBalb, add0addrBalb);
    await expect(dex.connect(addr1).createOrder(token.target, orderAmount, price, true))
       

    const ownerTokenBalanceBefore = await dex.deposits(token.target, owner.address);
    const addr1TokenBalanceBefore = await dex.deposits(token.target, addr1.address);

    const add0OwnerBal = await dex.deposits("0x0000000000000000000000000000000000000000", owner.address);
    const add0addrBal = await dex.deposits("0x0000000000000000000000000000000000000000", addr1.address);
    //console.log("add0 after", add0OwnerBal, add0addrBal);

    //console.log("before", ownerTokenBalanceBefore, addr1TokenBalanceBefore);

     await (dex.matchOrders(1,0))
        

    const ownerTokenBalanceAfter = await dex.deposits(token.target, owner.address);
    const addr1TokenBalanceAfter = await dex.deposits(token.target, addr1.address);

    //console.log("after", ownerTokenBalanceAfter, addr1TokenBalanceAfter);

    expect(ownerTokenBalanceAfter).to.equal(depositAmount-(orderAmount));
    expect(addr1TokenBalanceAfter).to.equal(orderAmount);
});
});
