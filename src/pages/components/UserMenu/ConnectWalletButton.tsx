// @ts-ignore
// eslint-disable-next-line import/extensions
import { SkewCardLight } from "components/Card";
import styled from 'styled-components'
import {
  useConnectModal,
} from '@rainbow-me/rainbowkit';
import LightButton from "../LightButton";
const ConnectWalletButton = ({ children, ...props }: any) => {
  const { openConnectModal } = useConnectModal();
  return (
    <>
      <MenuBox onClick={openConnectModal} {...props}>
        <span>{children || 'Connect Wallet'}</span>
      </MenuBox>
    </>
  )
}

export default ConnectWalletButton

const MenuBox=styled(LightButton)`
  width: 158px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  &:hover{
   span{
    background: linear-gradient(270deg, #4ECFB1 0%, #6ADD83 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
   } 
  }
`