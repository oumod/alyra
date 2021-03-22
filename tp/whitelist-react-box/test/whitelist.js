const { expectRevert, expectEvent } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const Whitelist = artifacts.require("Whitelist");

contract("Whitelist", accounts => {
  const owner = accounts[0];
  const whitelisted = accounts[1];
  const notOwner = accounts[2];

  beforeEach(async () => {
    this.whitelistInstance = await Whitelist.new({ from: owner });
    //this.whitelistInstance = await Whitelist.deployed();
  });

  it("should revert when not owner", async () => {
    await expectRevert.unspecified(this.whitelistInstance.whitelist(whitelisted, { from: notOwner }));
  });

  it("should revert when already whitelisted", async () => {
    await this.whitelistInstance.whitelist(whitelisted, { from: owner });
    const isWhitelisted = await this.whitelistInstance._whitelist(whitelisted);
    expect(isWhitelisted).to.be.true;
    await expectRevert(this.whitelistInstance.whitelist(whitelisted, { from: owner }), "This address is already whitelisted !");
  });

  it("should whitelist address", async () => {
    const addressesBefore = await this.whitelistInstance.getAddresses();
    const isWhitelistedBefore = await this.whitelistInstance._whitelist(whitelisted);

    await this.whitelistInstance.whitelist(whitelisted, { from: owner });

    const addressesAfter = await this.whitelistInstance.getAddresses();
    const isWhitelistedAfter = await this.whitelistInstance._whitelist(whitelisted);

    expect(addressesBefore.length).to.equal(0);
    expect(isWhitelistedBefore).to.be.false;
    expect(addressesAfter.length).to.equal(1);
    expect(isWhitelistedAfter).to.be.true;
    expect(addressesAfter[0]).to.equal(whitelisted);
  });

  it("should whitelist with event", async () => {
    const receipt = await this.whitelistInstance.whitelist(whitelisted, { from: owner });

    expectEvent(receipt, 'Whitelisted', {
      _address: whitelisted,
    });
  });

  it("should getAddresses", async () => {
    await this.whitelistInstance.whitelist(owner, { from: owner });
    await this.whitelistInstance.whitelist(whitelisted, { from: owner });
    let addresses = await this.whitelistInstance.getAddresses();
    let tab = [owner, whitelisted];
    expect(addresses.toString()).to.equal(tab.toLocaleString());
    expect(addresses).to.eql(tab);
    expect(addresses).to.be.an('array').that.includes(whitelisted);
  });
});
