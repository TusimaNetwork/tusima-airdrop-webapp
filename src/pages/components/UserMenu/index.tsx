
import UIKitUserMenu from './UserMenu'
import ConnectWalletButton from './ConnectWalletButton'
import { useEffect, useState,  } from 'react'
import { useAccount, useDisconnect, } from 'wagmi'
import UserMenuItem from './styles'
import {
  useAccountModal,
} from '@rainbow-me/rainbowkit';

const UserMenuItems = () => {
  const {openAccountModal} =useAccountModal()
  const { disconnect } = useDisconnect()

  return (
    <>
      {/* <UserMenuItem onClick={openAccountModal}>
      <span> {'Wallet'}</span> 
      </UserMenuItem> */}
      <UserMenuItem as="button" onClick={()=>disconnect()} >
        <span>{'Disconnect'}</span>
      </UserMenuItem>
    </>
  )
}
const UserMenu = () => {
  const { address: account } = useAccount()
  // const { hasPendingTransactions, pendingNumber } = usePendingTransactions()
  const [userMenuText, setUserMenuText] = useState<string>('')

  
  // useEffect(() => {
  //   if (hasPendingTransactions) {
  //     setUserMenuText(`${pendingNumber} Pending`)
  //   } else {
  //     setUserMenuText('')
  //   }
  // }, [hasPendingTransactions, pendingNumber])

  if (account) {
    return (
      <UIKitUserMenu account={account} text={userMenuText} >
      {({ isOpen }) => (isOpen ? <UserMenuItems /> : null)}
    </UIKitUserMenu>
    )
  }
  return (
    <ConnectWalletButton >
        <>Connect Wallet</>
    </ConnectWalletButton>
  )
}

export default UserMenu
