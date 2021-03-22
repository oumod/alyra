# TP DApp Système d’une liste blanche
Exemple d'utilisation de la box react de Truffle pour implémenter une IHM gérant une liste d'autorisations via un Smart Contract.
Exemple de configuration Truffle
Exemples de Tests Unitaires.

## Initialisation de la box react
```
$ mkdir whitelist-react-box
$ cd whitelist-react-box
$ truffle unbox react
$ npm init
```

## Suppression du Smart Contract exemple
1. dans le répertoire `contracts`, supprimer le fichier `SimpleStorage.sol`
1. dans le fichier `contracts/2_deploy_contracts.js`, remplacer  `SimpleStorage` par `Whitelist`


## Ajout et déploiement du Smart Contract Whitelist
1. Ajouter la libraire de smart contracts d'openzeppelin (le contrat Whitelist hérite de Ownable)
```console
$ npm install @openzeppelin/contracts --save
```
1. dans le répertoire `contracts`, créer un fichier `Whitelist.sol` avec le contenu du contrat
1. dans le fichier `truffle-config.js`, configurer le réseau (ganache) et préciser la version du compilateur utilisée dans le contrat
```js
  networks: {
    ganache: {
      host: "localhost",
      port: 7545,
      network_id: 5777
    }
  },
  compilers: {
    solc: {
      version: "0.6.11",    // version imposée par le contrat
    }
  }
```
1. compiler et déployer
```console
$ truffle compile
$ truffle migrate --network ganache
```

## Codage de l'IHM
1.
```console
$ cd client
$ npm install
$ npm i react-bootstrap bootstrap

```
1. dans le fichier `client/src/App.js`, importer les librairies `bootstrap`
```
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
```
1. remplacer `SimpleStorage` par `Whitelist`
```diff
< import SimpleStorageContract from "./contracts/SimpleStorage.json";
---
> import Whitelist from "./contracts/Whitelist.json";
```
```diff
<   state = { storageValue: 0, web3: null, accounts: null, contract: null };
---
>   state = { web3: null, accounts: null, contract: null, whitelist: null };
```
```diff
<      const deployedNetwork = SimpleStorageContract.networks[networkId];
<      const instance = new web3.eth.Contract(
<        SimpleStorageContract.abi,
---
>      const deployedNetwork = Whitelist.networks[networkId];
>      const instance = new web3.eth.Contract(
>        Whitelist.abi,
```
1. remplacer la fonction `runExample` par `getAddresses`, qui récupère la liste des adresses et met à jour le `state`
```diff
<       this.setState({ web3, accounts, contract: instance }, this.runExample);
---
>       this.setState({ web3, accounts, contract: instance }, this.getAddresses);
```
```js
  getAddresses = async () => {
    const { contract } = this.state;

    // récupérer la liste des comptes autorisés
    const whitelist = await contract.methods.getAddresses().call();
    // Mettre à jour le state 
    this.setState({ whitelist: whitelist });
  };
```
1. ajouter la fonction `whitelist` appelant la fonction du Smart Contract portant le même nom, et qui permet d'ajouter une adresse à la liste blanche
```js
  whitelist = async () => {
    const { accounts, contract } = this.state;
    const address = this.address.value;

    // Interaction avec le smart contract pour ajouter un compte 
    await contract.methods.whitelist(address).send({ from: accounts[0] });
    // Récupérer la liste des comptes autorisés
    this.getAddresses();
  }
```
1. écrire la fonction `render()`
1. dans le répertoire `test`, remplacer les tests de `SimpleStorage` par des tests pour `Whitelist`
```console
$ npm i @openzeppelin/test-helpers --save
$ npm i solidity-coverage --save
```
1. dans le fichier `truffle-config.js`, ajouter le plugin de code coverage
```js
plugins: ["solidity-coverage"]
```
1. ajouter les libraries, lancer les tests et lancer la DApp
```
$ truffle test test/whitelist.js --network ganache
$ truffle run coverage
$ npm run start
```


## TODO Traiter les warnings
- You are accessing the MetaMask window.web3.currentProvider shim. This property is deprecated; use window.ethereum instead. For details, see: https://docs.metamask.io/guide/provider-migration.html#replacing-window-web3 inpage.js:1:15337
- MetaMask: The event 'data' is deprecated and will be removed in the future. Use 'message' instead.
For more information, see: https://eips.ethereum.org/EIPS/eip-1193#message inpage.js:1:8704
- MetaMask: 'ethereum.enable()' is deprecated and may be removed in the future. Please use the 'eth_requestAccounts' RPC method instead.
For more information, see: https://eips.ethereum.org/EIPS/eip-1102