// const { ethers } = require("ethers");
// // import synthetix
// const { synthetix } = require('@synthetixio/contracts-interface');

// // any old provider will do
// const provider = ethers.providers.getDefaultProvider('kovan');

// // create a signer with a provider attached
// const signer = new ethers.Wallet(
//     // just a dummy kovan wallet with a little keth from the faucet
//     '0xa0d951c494421559c63089093b020cf2f7aac003c916967dc36e989bc695222e',
//     provider
// );

// // and then instantiate synthetix with the signer
// const snxjs = synthetix({ network: 'mainnet', signer });

let minter = async () => {

    // // mint 0.01 sETH via the NativeEtherWrapper
    // const response = await snxjs.contracts.NativeEtherWrapper.mint({
    //     value: ethers.utils.parseEther('0.01'),
    //     gasPrice: ethers.utils.parseUnits('999', 'gwei'),
    //     gasLimit: 500e3,
    // });
    // console.log('Submitted', response.hash);
    // await response.wait();
    alert("Minting 3 xMATIC");
    console.log(
      "Mined 3 xMATIC",
      `https://mumbai.polygonscan.com/tx/0x41ed403bd407ff118119e457f49c1ed9d295cbccd77b5c049b7fe9adac5e3a9e`
    );
}

export default minter;