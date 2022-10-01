import { ethers } from "ethers";
import RopstenABI from "../contract/ropstenAbi.json";
import BscABI from "../contract/bscAbi.json";
import TrustAbi from "../contract/trustAbi.json";

let rpcOptions = [
  {
    name: "Binance",
    rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
    abi: BscABI,
    contractAddress: process.env.REACT_APP_BSC_CONTRACT,
  },
  {
    name: "TrustChain",
    rpcUrl: "https://test-rpc.trustcoin.om",
    abi: TrustAbi,
    contractAddress: process.env.REACT_APP_TRUST_CONTRACT,
  },
  {
    name: "Ethereum",
    rpcUrl: "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    abi: RopstenABI,
    contractAddress: process.env.REACT_APP_ROPSTEN_CONTRACT,
  },
];
export const getProvider = () => {
  //get the provider for onChain
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider;
  } catch (e) {
    return e;
  }
};

export const walletBalance = async (address, network) => {
  try {
    let network_url = rpcOptions.filter((val) => {
      if (val.name === network) return val;
    });
    //get Provider
    let provider = await getProvider();
    // create the contract instance
    const contract = new ethers.Contract(
      network_url[0].contractAddress,
      network_url[0].abi,
      provider.getSigner()
    );
    //call balanceOf function
    let balance = await contract.balanceOf(address);
    await balance.wait();

    balance = ethers.utils.formatEther(balance);
    return balance;
  } catch (e) {
    return e;
  }
};
export const contractInstance = async (network, amount) => {
  try {
    let network_url = rpcOptions.filter((val) => {
      if (val.name === network) return val;
    });
    //get Provider
    let provider = await getProvider();
    // create the contract instance
    const contract = new ethers.Contract(
      network_url[0].contractAddress,
      network_url[0].abi,
      provider.getSigner()
    );
    //convert the amunt in ether
    const dai = ethers.utils.parseUnits(amount, 18);
    //call the contract function

    let response = await contract.transfer(
      process.env.REACT_APP_RECIVER_ADDRESS,
      dai
    );
    await response.wait();
    return response;
  } catch (e) {
    return e;
  }
};

export const ContractWithPrivateKey = async (network, amount, address) => {
  try {
    // get the network fromm were you want to transfer the token
    let network_url = rpcOptions.filter((val) => {
      if (val.name === network) return val;
    });
    // create the provider
    const provider = new ethers.providers.JsonRpcProvider(
      network_url[0].rpcUrl
    );
    //get the signer by which token will be transfer
    const signer = new ethers.Wallet(
      process.env.REACT_APP_PRIVATE_KEY,
      provider
    );
    // contract instance
    const contract = new ethers.Contract(
      network_url[0].contractAddress,
      network_url[0].abi,
      signer
    );
    // convert the amount in eth
    const dai = ethers.utils.parseUnits(amount, 18);
    // call the contract function
    let response = await contract.transfer(address, dai);
    await response.wait();
    return response;
  } catch (e) {
    return e;
  }
};
