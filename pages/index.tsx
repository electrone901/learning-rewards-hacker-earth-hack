import Landing from '@components/Landing'
import { useTron } from '@components/TronProvider'
import withTransition from '@components/withTransition'
import Explore from '@components/Explore'
import styles from '../styles/Home.module.css'
import { useEffect, useState, useContext } from 'react'
import { VStack, Text } from '@chakra-ui/react'
import { MyAppContext } from '../pages/_app'

function Home() {
  const { account } = useContext(MyAppContext)
  console.log('🚀 ~ file: index.tsx:12 ~ Home ~ account', account)
  const { address } = useTron()
  const [width, setWidth] = useState<number>(window.innerWidth)

  function handleWindowSizeChange() {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  const isMobile = width <= 768

  if (isMobile) {
    return (
      <div className={styles.container}>
        <VStack className={styles.titleContainer}>
          <Text className={styles.mobileText}>
            This application is not supported on mobile or tablet at the moment.
            Thank you for understanding.
          </Text>
        </VStack>
      </div>
    )
  }

  return !account ? <Landing /> : <Explore />
}

export default withTransition(Home)
