import { useAccount, useNetwork, useDisconnect } from 'wagmi'
import WalletModal from '../web3/WalletModal'
import { MyAppContext } from '../../pages/_app'
import { ethers } from 'ethers'
import { ABI } from '../../abis/ABI'
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
import { useEffect, useContext } from 'react'
import styles from '../../styles/Navbar.module.css'

type ConnectWalletProps = {
  isMobile?: boolean
  size?: string
}

const CHAIN_ID_BAOBAB = 1001
const CHAIN_ID_MUMBAI = 80001

const ConnectWallet = ({ isMobile, size }: ConnectWalletProps) => {
  const { data } = useAccount()
  console.log('____ data', data)
  const { activeChain, switchNetwork } = useNetwork()
  console.log('____ activeChain', activeChain)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { disconnect } = useDisconnect()

  const {
    account,
    setAccount,
    contract,
    setContract,
    provider,
    setProvider,
    signer,
    setSigner,
  } = useContext(MyAppContext)
  console.log('_____ contract', contract)
  console.log(
    '🚀 ~ file: ConnectWallet.tsx:47 ~ ConnectWal ~ provider',
    provider,
  )

  const getContract = async () => {
    const tempSigner = await provider.getSigner()
    console.log('___tempSigner', tempSigner)
    setSigner(tempSigner)

    if (activeChain?.id == CHAIN_ID_BAOBAB) {
      console.log('1001 network? ', activeChain.id)
      const deployedContract = '0x70bE996181753b9A767753C4d91030573c638295'
      let contract = new ethers.Contract(deployedContract, ABI, signer)
      setContract(contract)
    } else if (activeChain?.id == CHAIN_ID_MUMBAI) {
      console.log('80001 network? ', activeChain.id)
      const deployedContract = '0x1b91ec002a6db58adD892d264Bd0b7FBc377C13d'
      let contract = new ethers.Contract(deployedContract, ABI, signer)
      setContract(contract)
    } else {
      alert('Please connect to Klaytn Test Network!')
    }
  }

  const connectWithCoinbase = async (e) => {
    e.preventDefault()
    const r = await onOpen()
  }

  useEffect(() => {
    if (data) {
      console.log('INSIDEdata', data)
      setAccount(data.address)
      setProvider(data.connector)
      window.localStorage.setItem('isWalletConnected', true)
      const fetchedAddress = window.localStorage.getItem('ACCOUNT')
      if (!account && fetchedAddress) setAccount(fetchedAddress)
      if (account && account !== fetchedAddress)
        window.localStorage.setItem('ACCOUNT', account)
      getContract()
    }

    if (activeChain?.id !== CHAIN_ID_MUMBAI && switchNetwork)
      switchNetwork(CHAIN_ID_BAOBAB)
  }, [activeChain])

  return (
    <>
      {!isMobile ? (
        <>
          {!data ? (
            <Button
              className={styles.connectButtonCoinbase}
              onClick={connectWithCoinbase}
              size={size}
            >
              Connect with Coinbase
            </Button>
          ) : activeChain?.id === CHAIN_ID_BAOBAB ? (
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
              <button className={styles.button} onClick={onOpen}>
                Connect with Coinbase
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