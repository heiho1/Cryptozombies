import Web3 from 'web3';
import zombies from './cryptozombies_abi.js';

// eslint-disable-next-line
const getContract = new Promise(function (resolve, reject) {
    const web3 = new Web3(window.web3.currentProvider);
    // eslint-disable-next-line
    console.log('Contract address', zombies.address);
    // eslint-disable-next-line
    console.log('Got contract ABI', zombies.ABI);
    const contract = new web3.eth.Contract(zombies.ABI, zombies.address);
    resolve(contract);
});

export default getContract;