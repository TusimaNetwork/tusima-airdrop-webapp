import React from "react"
import { useConnectModal } from "@rainbow-me/rainbowkit";
import ConnectButton from "./styles";



const ConnectWallet:React.FC<{loading?:boolean,children?:any}>=({loading,children})=>{
  const { openConnectModal } = useConnectModal();
  return <ConnectButton onClick={openConnectModal}>
    {children || 'Connect Wallet'}
  </ConnectButton>
 }
export default ConnectWallet






