// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Whitelist.sol";

contract TestWhitelist {

  function testItWhitelistsAnAddress() public {
    Whitelist contrat = Whitelist(DeployedAddresses.Whitelist());

    contrat.whitelist(address(0x123456789));

    address expected = address(0x123456789);

    Assert.equal(contrat.getAddresses()[0], expected, "It should whitelist the address 0x123456789.");
  }

}
