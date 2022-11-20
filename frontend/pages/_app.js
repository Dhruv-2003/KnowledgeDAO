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
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

// const wallabyChain: Chain = {
//   id: 31415,
//   name: "Filecoin — Wallaby testnet",
//   network: "Filecoin — Wallaby testnet",
//   nativeCurrency: {
//     decimals: 18,
//     name: "Test Filecoin",
//     symbol: "tFIL",
//   },
//   rpcUrls: {
//     default: "https://wallaby.node.glif.io/rpc/v0",
//   },
//   blockExplorers: {
//     default: {
//       name: "Wallaby Explorer",
//       url: "https://explorer.glif.io/wallaby",
//     },
//   },
//   testnet: true,
// };

// const { chains, provider } = configureChains(
//   [wallabyChain],
//   [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
// );

// const { connectors } = getDefaultWallets({
//   appName: "My RainbowKit App",
//   chains,
// });

// const wagmiClient = createClient({
//   autoConnect: true,
//   connectors,
//   provider,
// });

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
// function MyApp({ Component, pageProps }) {
//   return(
//   // <WagmiConfig client={wagmiClient}>
//     {/* <RainbowKitProvider chains={chains}> */}
//       <Component {...pageProps} />
//     {/* </RainbowKitProvider> */}
//   {/* </WagmiConfig>); */}
// }

export default MyApp;