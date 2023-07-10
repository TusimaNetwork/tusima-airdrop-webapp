import { ethers } from "ethers"
import web3 from 'web3'
export const hashToken = ({account, amount }) => {
	const weiValues = ethers.utils.parseUnits(amount.toString(), "ether") 
  return web3.utils.soliditySha3(
	{ t: "address", v: account },
	{ t: "uint256", v: weiValues },
      )
}

export const solidityKeccak256 = ({account, amount})=>{
	const weiValues = ethers.utils.parseUnits(amount.toString(), "ether")
	return web3.utils.soliditySha3(
		{ t: "address", v: account },
		{ t: "uint256", v: weiValues },
	      )
}

//.slice(2)