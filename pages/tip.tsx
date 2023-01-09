import React from 'react'
import withTransition from '@components/withTransition'
import AwardNfts from '../components/award-nfts/AwardNfts'
import { Button } from '@chakra-ui/react'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'

function tip(props) {
  const router = useRouter()
  const goHome = () => {
    router.push('/')
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.showcase2}>
          <div className="">
            <Button onClick={goHome}>Go back home</Button>
          </div>
          <AwardNfts />
        </div>
      </main>
    </div>
  )
}

export default withTransition(tip)
