import { useWriteClaimed } from "hooks/useClaimed"
import { parseUnits } from "viem"
import Button from "./Button"

 const ClaimButton: React.FC<{
  onClickFun: any
  proof: any
  airDrop: any
  disabled: boolean
  buttonText: string
}> = ({ onClickFun, proof, disabled, airDrop, buttonText }) => {
  const { onClaimed, isLoading } = useWriteClaimed({
    proof,
    amount: airDrop?.amount,
  })

  
  const onClick = () =>{
    console.log(proof && airDrop && onClaimed && !disabled)
    proof && airDrop && onClaimed && !disabled ? onClaimed() : onClickFun()
  }

  return (
    <Button isLoading={isLoading} disabled={disabled} onClick={onClick}>
      {buttonText}
    </Button>
  )
}
export default ClaimButton