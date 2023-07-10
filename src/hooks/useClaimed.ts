import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi"
import { useMemo } from "react"
import { claimed_contract } from "config/contract"

export const useReadClaimedUser = (address) => {

  const {
    data:randId,
  } = useContractRead({
    ...claimed_contract,
    functionName: "currRound",
    watch:true,
  })

  const {
    data:round,
    isLoading: isReadEndTimeLoading,
  } = useContractRead({
    ...claimed_contract,
    functionName: "roundMap",
    watch:true,
    args:[
      randId
    ]
  })
  const [startTime,endTime] = round || []
// console.log({round})
  // const {
  //   data:startTime,
  //   isLoading: isReadStartTimeLoading,
  // } = useContractRead({
  //   ...claimed_contract,
  //   functionName: "startTime",
  //   watch:true
  // })

  const {
    data,
    isLoading: isReadLoading,
    isError
  } = useContractRead({
    ...claimed_contract,
    functionName: "claimed",
    args: [address,randId],
    watch:true
  })

  return {
    isReadLoading:isReadLoading || isReadEndTimeLoading,
    isDrop: data,
    endTime:endTime?.toString(),
    startTime:startTime?.toString(),
  }
}
export const useWriteClaimed = ({ proof, amount }) => {
  const writeParams = {
    ...claimed_contract,
    functionName: "claim",
    args: [proof, amount],
  }

  const { config: wirteConfig } = usePrepareContractWrite(writeParams)
  const {
    data: tx,
    write: onClaimed,
    isLoading: isClaimedLoading,
  } = useContractWrite({
    ...wirteConfig,
  })

  const { isLoading: isWaitLoading } = useWaitForTransaction({
    hash: tx?.hash,
  })

  const isLoading = useMemo(
    () => isWaitLoading || isClaimedLoading,
    [isClaimedLoading, isWaitLoading]
  )

  return useMemo(
    () => ({
      onClaimed,
      isLoading,
    }),
    [onClaimed, isLoading]
  )
}
