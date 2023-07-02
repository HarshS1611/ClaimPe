import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Transactions from "../../contracts/Transactions.json";
import Web3 from "web3";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import axios from "axios";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Payment = () => {
  let paystorage = localStorage.getItem("payableAmount");
  const [amt, setAmt] = useState(paystorage / 10);
  const [sender_balance, setSenderBalance] = useState("");
  const [sender_address, setSenderAddress] = useState();
  const [receiver_address, setReceiverAddress] = useState(
    "0x4818D5Ada814403528012fbe76A574580e0021dc"
  );
  const [transactions, setTransactions] = useState({});
  const [account, setAccount] = useState("");
  const [value, setValue] = React.useState(0);
  const [txs, setTxs] = useState([]);
  const [from_admin, setFromAdmin] = useState("");
  const ethervalue = [];

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
  }, []);

  // const stake = async () => {
  //   console.log(amt)
  //   // transactions.methods.send(receiver_address, amt).send({ from: account });
  //     transactions.methods.stake(receiver_address, amt).send({ from: account }).on('transactionHash', (hash) => {
  //       console.log("sent" + hash);
  //     })
  // }
  const startPayment = async ({ setTxs, ether, to_addr }) => {
    try {
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");

      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      ethers.utils.getAddress(to_addr);

      console.log(ethers.utils.parseEther(ether).toString());

      const tx = await signer.sendTransaction({
        to: to_addr,
        value: ethers.utils.parseEther(ether),
      });
      ethervalue.push({
        ether,
        to_addr,
      });
      const tx_from = tx.from;

      await axios
        .post(
          "https://claimpe.onrender.com/insurance",
          {
            amount: ether,
            receiver: to_addr,
            sender: tx_from,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      console.log({ ether, to_addr, tx_from });
      console.log("tx", tx);
      console.log("ethervalue", ethervalue);
      setTxs([tx]);
    } catch (err) {
      console.log(err);
    }
  };

  const stake = async () => {
    console.log(amt);
    // transactions.methods.send(receiver_address, amt).send({ from: account });
    await startPayment({
      setTxs,
      ether: amt.toString(),
      to_addr: receiver_address,
    });
  };

  return (
    <div>
      <div className="flex flex-col text-center items-center">
        <h1 className="my-10 text-3xl">Choose your payment method</h1>
        Amount to be staked : {amt} eth
        <Box>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Crypto" {...a11yProps(0)} />
              <Tab label="UPI" {...a11yProps(1)} />
              <Tab label="Online Banking" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <p>Your account: {account}</p>
            <p> Sender Bal: {sender_balance}</p>
            <p>Receivers address: {receiver_address}</p>
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
        </Box>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => {
            stake();
          }}
        >
          Pay
        </Button>
      </div>
    </div>
  );
};

export default Payment;
