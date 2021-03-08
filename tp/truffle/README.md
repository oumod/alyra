# Install NPM packages
$ npm install @truffle/hdwallet-provider\
$ npm install dotenv

# Create a file named .env containing
MNEMONIC=<your mnemonic>\
RINKEBY_URL=<Rinkeby testnet URL>\
ROPSTEN_URL=<Ropsten testnet URL>

# Deploy
$ truffle deploy --network rinkeby\
$ truffle deploy --network ropsten
