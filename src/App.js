import "./App.css";
import Header from "./Components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Bridge from "./Components/Bridge";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const binanceChain = {
  id: 97,
  name: "Binance",
  network: "BSC",
  nativeCurrency: {
    decimals: 18,
    name: "tBNB",
    symbol: "tBNB",
  },
  rpcUrls: {
    default: "https://data-seed-prebsc-1-s1.binance.org:8545",
  },
  blockExplorers: {
    default: { name: "Bsc", url: "https://testnet.bscscan.com" },
  },
  iconUrls: ["https://bscscan.com/images/svg/brands/bnb.svg"],
  testnet: false,
};
const trustChain = {
  id: 7867,
  name: "TrustChain",
  network: "TRC",
  nativeCurrency: {
    decimals: 18,
    name: "TRC",
    symbol: "TRC",
  },
  rpcUrls: {
    default: "https://testnet-rpc.trustcoin.om/",
  },
  blockExplorers: {
    default: { name: "TRC", url: "https://testexplorer.trustcoin.om/" },
  },
  iconUrls: ["https://bscscan.com/images/svg/brands/bnb.svg"],
  testnet: false,
};

function App() {
  const defaultChains = [chain.ropsten, binanceChain, trustChain];
  const { chains, provider } = configureChains(defaultChains, [
    jsonRpcProvider({
      rpc: () => ({ http: "https://data-seed-prebsc-1-s1.binance.org:8545" }),
    }),
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider(),
  ]);

  const { connectors } = getDefaultWallets({
    appName: "Trust Coins",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return (
    <div className="App">
      <div className="wrapper">
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            <Header />
            <Bridge />
          </RainbowKitProvider>
        </WagmiConfig>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
