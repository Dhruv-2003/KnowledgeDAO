import "../styles/globals.css";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
  Chain,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import Layout from "../components/Layout";

const wallabyChain = {
  id: 31415,
  name: "Filecoin — Wallaby testnet",
  network: "Filecoin — Wallaby testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Test Filecoin",
    symbol: "tFIL",
  },
  rpcUrls: {
    default: "https://wallaby.node.glif.io/rpc/v0",
  },
  blockExplorers: {
    default: {
      name: "Wallaby Explorer",
      url: "https://explorer.glif.io/wallaby",
    },
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [wallabyChain],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
