import Link from 'next/link'
import styles from '@styles/Navbar.module.css'
import { Button, HStack, Image, Spinner, Text, VStack } from '@chakra-ui/react'
import { useTron } from './TronProvider'
import { abridgeAddress } from '@utils/abridgeAddress'
import { useState, useContext } from 'react'
import { handleDisconnect } from '@utils/web3'
import { useRouter } from 'next/router'
import { MyAppContext } from '../pages/_app'

const Navbar = ({ account, setAccount, userUD }) => {
  console.log('🚀 ~ file: Navbar.tsx:12 ~ Navbar ~ userUD', userUD)
  const { address, setAddress } = useTron()
  const router = useRouter()
  const [isHover, setIsHover] = useState<boolean>(false)
  const [isHoverUD, setIsHoverUD] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(false)

  const { setUserUD } = useContext(MyAppContext)

  if (!account) return

  function handleNavigate() {
    router.push('/')
  }

  function onClickDisconnect() {
    window.localStorage.removeItem('ACCOUNT')
    window.localStorage.setItem('isWalletConnected', 'false')
    setAccount(undefined)
    router.push('/')
  }

  const userLogOut = () => {
    setUserUD('')
  }

  return (
    <HStack className={styles.navbarContainer}>
      <VStack w="100%">
        <HStack className={styles.navbar}>
          <Link href="/">
            <Image
              src="/logo2.png"
              alt="Logo"
              cursor="pointer"
              className={styles.logo}
            ></Image>
          </Link>
          <HStack className={styles.navLeftSection}>
            <Link href="/tasks">
              <Text>Tasks</Text>
            </Link>

            <Link href="/create">
              <Text>Create Tasks</Text>
            </Link>
            <Link href="/profile">
              <Text>My Profile</Text>
            </Link>
            <Link href="/community">
              <Text>Leaderboard</Text>
            </Link>

            {account && (
              <Button
                className={styles.addressPill}
                onClick={onClickDisconnect}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
              >
                {isLoading ? (
                  <Spinner color="white" />
                ) : isHover ? (
                  'Disconnect'
                ) : (
                  abridgeAddress(account)
                )}
              </Button>
            )}

            {userUD && (
              <Button
                className={styles.addressPill}
                onClick={userLogOut}
                onMouseEnter={() => setIsHoverUD(true)}
                onMouseLeave={() => setIsHoverUD(false)}
              >
                {isLoading ? (
                  <Spinner color="white" />
                ) : isHoverUD ? (
                  'Disconnect'
                ) : (
                  `${userUD.idToken.sub}`
                )}
              </Button>
            )}
          </HStack>
        </HStack>
      </VStack>
    </HStack>
  )
}

export default Navbar
