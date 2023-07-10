import {
  useSwitchNetwork as useSwitchNetworkFun,
} from "wagmi";
import { useMemo } from "react";

export const useSwitchDefaultNetwork = (chainId?:any) => {
  
  const {
    isLoading: isSwitchLoading,
    switchNetwork,
    isSuccess
  } = useSwitchNetworkFun({
    chainId,
  })


  
  return useMemo(
    () => ({isSwitchLoading, switchNetwork}),
    [isSwitchLoading,switchNetwork]
  )
}