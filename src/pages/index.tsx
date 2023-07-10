import type { NextPage } from 'next';
import { styled } from 'styled-components';
import ImageIcon from './Image'
import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import UserMenu from './components/UserMenu';
import Spaced from './components/Spaced';
// import Tokens from 'config/tokens.json'
import { useAccount, useChainId } from 'wagmi';
import dynamic from 'next/dynamic';
import {
  useAccountModal,
} from '@rainbow-me/rainbowkit';
import { useReadClaimedUser } from 'hooks/useClaimed';
import {StandardMerkleTree} from '@openzeppelin/merkle-tree'
import { ChainId } from 'config/chains';
import { useSwitchDefaultNetwork } from 'hooks/useSwitchDefaultNetwork';
import Link from 'next/link';
import { formatUnits } from 'viem';
const TimeCountdown = dynamic(import("./components/TimeCountdown"), { ssr: false });

const UserMenu = dynamic(import("./components/UserMenu"), { ssr: false });
const ClaimButton = dynamic(import("./components/Button/ClaimButton"), { ssr: false });
const Home: NextPage = () => {
  const { address } = useAccount()
  const [tokens,setTokens] = useState(null)
  

  const chainId = useChainId()
  const { openAccountModal } = useAccountModal()
  const { switchNetwork } = useSwitchDefaultNetwork(ChainId.chainId)
  const [userTip, setUserTip] = useState('')
  const [buttonText, setButtonText] = useState('Loading...')
  const [showTime, setShowTime] = useState('')
  const [diffTime,setDiffTime] = useState(false)
  

  const fetchTokens=useCallback(async()=>{
   fetch('https://raw.githubusercontent.com/TusimaNetwork/tusima-airdrop-merkledata/test/airdrop.json').then(res=>res.json()).then(setTokens)
  },[])
  useEffect(()=>{
    fetchTokens().catch(console.log)
  },[])
  const [proof,airDrop] = useMemo(() => {
    if (address &&  tokens) {
      const merkletree = StandardMerkleTree.load(tokens); 
      var deployerProof=null;
      var airdrop = null
      for (const [i, v] of merkletree.entries()) {
        if (v[0] === address) {
          deployerProof = merkletree.getProof(i);
          airdrop={amount:v[1]}
        }
      }
      return [deployerProof,airdrop] 
    }
    return [null,null] 
  }, [address, tokens])

  const { isDrop, startTime, endTime } = useReadClaimedUser(address)

  const isStart = useMemo(() => Date.now() >= Number(startTime || 0) * 1000, [startTime,diffTime])
  const isEnd = useMemo(() => Date.now() > Number(endTime || 0) * 1000, [endTime,diffTime])

  useEffect(()=>{
    const diffTime = (Number(startTime || 0) * 1000) - Date.now()
    if(startTime && diffTime > 0){
      const timeId = setTimeout(() => setDiffTime(true), diffTime+100);
      return ()=>clearTimeout(timeId)
    }
  },[startTime])

  useEffect(()=>{
    const diffTime = (Number(endTime || 0) * 1000) - Date.now()
    if(diffTime && diffTime > 0){
      const timeId = setTimeout(() => setDiffTime(true), diffTime+100);
      return ()=>clearTimeout(timeId)
    }
  },[endTime])
  const onClickFun = () => {
    if (!address) {
      openAccountModal()
    }
    if (chainId !== ChainId.chainId) {
      switchNetwork()
    }
  }

  const disabled = useMemo(() => {
    if (airDrop && isStart && !isEnd && !isDrop) {
      return false
    }
    return true
  }, [isDrop, isStart, airDrop, isEnd])

  useEffect(() => {
    let tipArr = []
    if (!address) {
      tipArr = ['Wallet Connect']
    } else if (chainId !== ChainId.chainId) {
      //链错误
      tipArr = ['Error Network']
    } else if (!airDrop) {
      //用户没领取资格
      tipArr = ['No eligible', 'This wallet isn’t eligible']
    } else if (!isStart) {
      //有领取资格，没到开始时间
      tipArr = ['Claimed', `You can claim  <span>${formatUnits(airDrop.amount,18)}</span> $COLLAB`]
    }else if(isDrop) {
      tipArr = ['Claimed', `You have claimed  <span>${formatUnits(airDrop.amount,18)}</span> $COLLAB`]
    } else if (isEnd) {
      //有领取资格，已过期
      tipArr = ['Claim', 'Overtime cannot be claimed']
    } else {
      tipArr = ['Claim', `You can claim <span>${formatUnits(airDrop.amount,18)}</span> $COLLAB`]
    } 
    setButtonText(tipArr[0])
    setUserTip(tipArr[1])
  }, [address, chainId, airDrop, isStart, isEnd, isDrop,diffTime])


  useEffect(() => {
    // if (!isStart) {
    //   setShowTime(newDateFormat(new Date(Number(startTime || 0) * 1000)))
    // } else {
      setShowTime(newDateFormat(new Date(Number(endTime || 0) * 1000)))
    // }
  }, [endTime])
  return (
    <HomeWarper>
      <HomeContent>
        <TopHeader>
          <ImageIcon name={'tusima-logo'} width={120} height={36} />
          <UserMenu />
        </TopHeader>
        <Spaced size='125' />
        <HeadBigTitle>
          <p>Airdrop rewards for</p>
          <p><span>Tusima DAO</span> & <span>Collab.Land</span></p>
        </HeadBigTitle>
        <Spaced size='60' />
         <HeadTimeTitle>
         <ShowTimeBox>
          <div>
            Claiming will be live until:
          </div>
          <div>

          {showTime}
          </div>
            {/* <TimeCountdown deadline={new Date(Number(endTime || 0) * 1000)}/> */}
            {/* 96d 02h 06m */}
          </ShowTimeBox>
        </HeadTimeTitle>
        <Spaced size='25'/>
        <HeadSubTitle>
        After the wallet is linked, airdrop will be automatically checked 
        </HeadSubTitle>
        
        <Spaced size='60' />
        <TipsBox>
          <TipsItem style={{width:'calc(50% - 150px)'}}>
          <ClaimButtonLine>
              {!isStart && airDrop ? <TimeCountdown deadline={new Date(Number(startTime || 0) * 1000)}/>:<ClaimButton buttonText={buttonText} disabled={disabled} onClickFun={onClickFun} proof={proof} airDrop={airDrop} />}
            </ClaimButtonLine>
            <Spaced size='36' />
            <ClaimMessageLine dangerouslySetInnerHTML={{__html:userTip}}/>
          </TipsItem>
          <TipsItem style={{flex:1}}>
            <HeadSubMinItem style={{color:'#999'}}>
            If you are not eligible:
            </HeadSubMinItem>
            <Spaced size='16'/>
<HeadSubMinItem>
        Step<span>1</span>: <Link href={'https://docs.google.com/spreadsheets/d/1ij-wO5J8VyJkh5Ky2ZABVtcUFomM_2EkPrPyknxIQG4/edit#gid=1682018229'} target='_blank'>Check</Link> your eligibility to claim $COLLAB  
        </HeadSubMinItem>
        <HeadSubMinItem>
        Step<span>2</span>: Connect your Discord account on the <Link href={'https://testnet.tusima.network/tdao'} target='_blank'>Tusima testnet </Link>
        </HeadSubMinItem>
        <HeadSubMinItem>
        Step<span>3</span>: Please be patient for a day
        </HeadSubMinItem>
          </TipsItem>
        </TipsBox>
        
        <Spaced size='200' />
      </HomeContent>
    </HomeWarper>
  );
};

export default Home;


export const newDateFormat = (date) => {
  const arr1 = new Date(date).toDateString().split(' ')
  arr1.shift()
  return [arr1.join('-'), new Date(date).toLocaleTimeString()].join(' ')
}


const TipsBox=styled.div`
  display: flex;
  align-items: center;
`
const TipsItem=styled.div`
  /* flex:1; */
`
const ShowTimeBox = styled.div`
background: #1D1D1D;
border-radius: 12px;
padding:8px 20px;
display: flex;
gap: 30px;
`
const ClaimMessageLine = styled.div`
font-size: 14px;
font-weight: 400;
color: #FFFFFF;
span{
  font-weight: bold;
}
`
const ClaimButtonLine = styled.div`
  display: flex;
  align-items: center;
  gap:20px;
`
// const ClaimButtonBox = styled(Button)<{disabled:boolean}>`
//   cursor: pointer;
//   width: 220px;
//   height: 60px;
//   border-radius: 30px;
//   background: linear-gradient(270deg, rgba(24, 241, 149, 1),rgba(31, 183, 255, 1));
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 18px;
//   font-weight: 600;
//   color: #292929;
//   gap:10px;
//   opacity:${({ disabled }) => {
//     console.log({disabled},'button',disabled ? 0.5 : 1)
//     return !disabled ? 1:0.5
//   }};
// `

const HeadTimeTitle = styled.div`
  font-size: 36px;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 36px;
  display: flex;
  align-items: center;
  gap:35px;
`
const HeadSubTitle = styled.div`
  font-size: 36px;
  font-weight: 300;
  color: #999999;
  line-height: 36px;
  margin-bottom: 10px;
`
const HeadSubMinItem = styled.div`
  font-size: 14px;
  font-weight: 300;
  color: #fff;
  line-height: 24px;
  display: flex;
  align-items: center;
  font-family: Poppins-SemiBold, Poppins;
font-weight: 600;
  a{
    display:inline-block;
    margin: 0 10px;
    color:#18F195 ;
    text-decoration: underline;
  }
  span{
    display:inline-block;
    width: 14px;
    margin-left: 10px;
    text-align: center;
  }
`
const HeadSubMinTitle = styled.div`
  font-size: 26px;
  font-weight: 300;
  color: #fff;
  line-height: 36px;
  display: flex;
  align-items: center;
  a{
    display: block;
    margin: 0 10px;
    color:#18F195 ;
    text-decoration: underline;
  }
  span{
    display: block;
    width: 14px;
    margin-left: 10px;
    text-align: center;
  }
`
const HeadBigTitle = styled.div`
  font-size: 55px;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 70px;
  span{
    color: #18F195;
    &:last-child{
      color:#F5C348;
    }
  }
  p{
    padding:0;
    margin: 0;
  }
`
const HomeContent = styled.div`
  width: 1062px;
  margin: 0 auto;
  font-family: Poppins-Light, Poppins;
`

const TopHeader = styled.div`
  margin: 18px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const HomeWarper = styled.div`
`


