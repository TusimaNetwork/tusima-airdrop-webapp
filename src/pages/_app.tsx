import type { AppProps } from "next/app"
import { configureChains, createConfig, WagmiConfig } from "wagmi"
import {
  connectorsForWallets,
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit"

import {
  optimismGoerli
} from "wagmi/chains"

import { publicProvider } from "wagmi/providers/public"
import '../styles/globals.css'
import "@rainbow-me/rainbowkit/styles.css"

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [optimismGoerli],
  [publicProvider()]
)

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ""

const { wallets } = getDefaultWallets({
  appName: "tusima-airdorp-webapp",
  chains,
  projectId,
})

const connectors = connectorsForWallets([
  ...wallets,
])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

const Providers: React.FC<React.PropsWithChildren<{ children: React.ReactNode }>> = ({
  children,
}) => {
  return <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider 
        theme={darkTheme({
          accentColor: "#5FFF82",
          accentColorForeground: "#000",
          borderRadius: "small",
          fontStack: "system",
          overlayBlur: "small",
        })} chains={chains}>
        {children}
      </RainbowKitProvider>
  </WagmiConfig>
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers >
      <Component {...pageProps} />
    </Providers>

  )
}

export default MyApp
