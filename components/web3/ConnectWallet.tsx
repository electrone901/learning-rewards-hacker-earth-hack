import { useAccount, useNetwork, useDisconnect } from 'wagmi'
import WalletModal from '../web3/WalletModal'
import {
  Button,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { abridgeAddress } from '@utils/abridgeAddress'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useEffect } from 'react'
import styles from '../../styles/Navbar.module.css'

type ConnectWalletProps = {
  isMobile?: boolean
  size?: string
}

const CHAIN_ID = 80001

const ConnectWallet = ({ isMobile, size }: ConnectWalletProps) => {
  const { data } = useAccount()
  console.log('__data', data)
  const { activeChain, switchNetwork } = useNetwork()
  console.log('___switchNetwork', switchNetwork)
  console.log(' ____activeChain', activeChain)
  const {
    isOpen: connectIsOpen,
    onOpen: connectOnOpen,
    onClose: connectOnClose,
  } = useDisclosure()
  const { isOpen, onOpen, onClose } = useDisclosure()
  console.log(' ______onClose', onClose)
  console.log(' ______onOpen', onOpen)
  console.log(' ______isOpen', isOpen)

  const { disconnect } = useDisconnect()
  console.log(' ______disconnect', disconnect)

  const test = () => {
    console.log('🚀 ~ file: ConnectWallet.tsx:37 ~ test ~ test')
  }

  useEffect(() => {
    if (activeChain?.id !== CHAIN_ID && switchNetwork) switchNetwork(CHAIN_ID)
  }, [activeChain])

  return (
    <>
      {!isMobile ? (
        <>
          {!data ? (
            <Button
              className={styles.connectButton}
              onClick={onOpen}
              size={size}
            >
              Connect Wallet
            </Button>
          ) : activeChain?.id === CHAIN_ID ? (
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    isActive={isOpen}
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    style={{
                      color: '#4b4f56',
                      borderRadius: '0',
                      overflow: 'hidden',
                    }}
                  >
                    Account: {abridgeAddress(data?.address)}
                  </MenuButton>
                  <MenuList
                    color="black"
                    style={{
                      color: '#4b4f56',
                      borderRadius: '0',
                      width: '100%',
                    }}
                  >
                    <MenuItem>
                      <Link
                        href="/mypage"
                        style={{
                          textDecoration: 'none',
                        }}
                      >
                        View My Collection
                      </Link>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        disconnect()
                      }}
                    >
                      Disconnect Wallet
                    </MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>
          ) : (
            <Button
              style={{
                color: '#4b4f56',
                borderRadius: '0',
              }}
              onClick={() => switchNetwork && switchNetwork(CHAIN_ID)}
            >
              Switch Network
            </Button>
          )}
        </>
      ) : (
        <>
          {!data ? (
            <VStack marginTop="20" spacing="24px" alignItems="flex-start">
              <button className={styles.button} onClick={connectOnOpen}>
                Connect Wallet
              </button>
            </VStack>
          ) : (
            <VStack marginTop="20" spacing="24px" alignItems="flex-start">
              <Link href="/mypage">
                <button className={styles.button}>View My Collection</button>
              </Link>
              <Link
                onClick={() => {
                  disconnect()
                }}
              >
                <button className={styles.button}>Disconnect Wallet</button>
              </Link>
            </VStack>
          )}
        </>
      )}

      <WalletModal isOpen={isOpen} closeModal={onClose} />
    </>
  )
}

export default ConnectWallet
