require('dotenv').config();
var Contract = require('web3-eth-contract');
Contract.setProvider(process.env.ROPSTEN_URL);
const jsonInterface = [{"inputs":[],"name":"get","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const address = "0x8cD906ff391b25304E0572b92028bE24eC1eABFb";
const simpleStorage = new Contract(jsonInterface, address);
simpleStorage.methods.get().call((err, data) => {
  console.log(`data=${data}`);
});
