import React, { useState, useEffect } from "react";
import Transactions from "../../contracts/Transactions.json";
import Web3 from "web3";
import { ethers } from "ethers";
import axios from "axios";
import AdminCards from "./Card";
import Web3Modal from "web3modal";

const Admin = () => {
  const [amt, setAmt] = useState(22);
  const [sender_balance, setSenderBalance] = useState("");
  const [sender_address, setSenderAddress] = useState();
  const [receiver_address, setReceiverAddress] = useState(
    "0x4818D5Ada814403528012fbe76A574580e0021dc"
  );
  const [transactions, setTransactions] = useState({});
  const [account, setAccount] = useState("");
  const [value, setValue] = React.useState(0);
  const [txs, setTxs] = useState([]);
  const [admindata, setData] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function loadBlockChain() {
    console.log("Loading web3...");
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    // get account address
    const accounts = await provider.listAccounts();
    console.log(accounts);
    setAccount(accounts[0]);

    // get balance of account address
    const balance = await provider.getBalance(accounts[0]);
    console.log(balance);
    // convert balance to ether
    const etherString = ethers.utils.formatEther(balance);
    console.log(etherString);
    setSenderBalance(etherString);

    const networkId = await provider.getNetwork();
    console.log(networkId);

    // const deployedNetwork = Transactions.networks[networkId.chainId];
    // console.log(deployedNetwork);

    // if (deployedNetwork) {
    const transactions = new ethers.Contract(
      "0xB73C933F84DD272972Fd247aDACA670C35d52179",
      Transactions.abi,
      signer
    );
    console.log("transactions" + transactions);
    setTransactions(transactions);
    // } else {
    //   alert("Smart contract not deployed to detected network.");
    // }
  }
  useEffect(() => {
    loadBlockChain();
    axios
      .get("https://claimpe.onrender.com/insurance", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("data", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div className="text-center my-5">
        <p>Your account: {account}</p>
        <p> Sender Bal: {sender_balance}</p>
      </div>
      {admindata.map((item) => (
        <AdminCards item={item} />
      ))}
    </div>
  );
};

export default Admin;
