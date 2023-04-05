require('dotenv').config();

const Web3 = require('web3');

const apikey = process.env['apikey']
const network = 'goerli';

const node = `https://eth.getblock.io/${apikey}/${network}/`
const web3 = new Web3(node)

// console.log(web3)

const accountTo = web3.eth.accounts.create();
// console.log(accountTo); 
// console.log(accountTo.address);
// const balance = web3.eth.getBalance(accountTo.address);
// console.log(balance)
const privateKey = process.env['privateKey'];
const accountsFrom = web3.eth.accounts.privateKeyToAccount(privateKey);
// // console.log(accountsFrom);
const createSignedTx = async(rawTx)=>{
    rawTx.gas = await web3.eth.estimateGas(rawTx);
    return await accountsFrom.signTransaction(rawTx);
}

const sendSignedTx = async(signedTx)=>{
    web3.eth.sendSignedTransaction(signedTx.rawTransaction).then(console.log)
}

const amountTo = "0.01"
const rawTx = {
    to:accountTo.address,
    value:web3.utils.toWei(amountTo, 'ether')
}
createSignedTx(rawTx).then(sendSignedTx)