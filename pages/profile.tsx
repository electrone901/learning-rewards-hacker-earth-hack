import {
  Button,
  Input,
  Text,
  Link as ChakraLink,
  VStack,
  HStack,
  Image,
  Box,
  SimpleGrid,
  Spinner,
} from '@chakra-ui/react'
import { CopyIcon } from '@chakra-ui/icons'
import Landing from '@components/Landing'
import { useTron } from '@components/TronProvider'
import withTransition from '@components/withTransition'
import { useCallback, useEffect, useMemo, useState, useContext } from 'react'
import { MyAppContext } from '../pages/_app'
import styles from '@styles/Profile.module.css'
import PartnerCard from '@components/PartnerCard'
import { abridgeAddress } from '@utils/abridgeAddress'

import RewardPill from '@components/RewardPill'
import Error404 from '@components/404'
import Link from 'next/link'
import { useRouter } from 'next/router'

const JOURNEY_API_URL =
  process.env.NEXT_PUBLIC_ENV === 'prod'
    ? process.env.NEXT_PUBLIC_API_PROD
    : process.env.NEXT_PUBLIC_API_DEV

function Profile() {
  const { address } = useTron()
  const router = useRouter()
  const {
    account,
    setAccount,
    contract,
    setContract,
    provider,
    setProvider,
    signer,
    setSigner,
    allTasks,
    setAllTasks,
  } = useContext(MyAppContext)

  const [fetchedUser, setFetchedUser] = useState<any>()
  const [fetchedQuests, setFetchedQuests] = useState<any[]>([])
  const [isQuestsLoading, setQuestsLoading] = useState<boolean>(false)
  const [isUserLoading, setUserLoading] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [newUsername, setNewUsername] = useState<string>('')

  const connectTwitter = useCallback(
    (e: any) => {
      e.preventDefault()
      router.push('/twitter')
    },
    [router],
  )

  const goToExplore = useCallback(
    (e: any) => {
      e.preventDefault()
      router.push('/')
    },
    [router],
  )

  const fetchQuests = useCallback(async () => {
    setQuestsLoading(true)
    try {
      const response = await fetch(`${JOURNEY_API_URL}/api/quests`)
      if (response.status === 200) {
        const { quests } = await response.json()
        setFetchedQuests(quests)
      }
    } catch (err) {
      console.log(err)
    }
    setQuestsLoading(false)
  }, [])

  const fetchUser = useCallback(async () => {
    if (!address) return
    setUserLoading(true)
    try {
      const response = await fetch(`${JOURNEY_API_URL}/api/users/${address}`)
      if (response.status === 200) {
        const user = await response.json()
        setFetchedUser(user)
      }
    } catch (err) {
      console.log(err)
    }
    setUserLoading(false)
  }, [address])

  function handleUsernameChange(e) {
    e.preventDefault()
    setNewUsername(e.target.value)
  }

  const updateUsername = useCallback(async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address: address,
          newUsername: newUsername,
        }),
      }

      const response = await fetch(
        `${JOURNEY_API_URL}/api/users/username`,
        requestOptions,
      )

      if (response.status === 200) {
        await fetchUser()
      }
    } catch (e) {
      console.log(e)
    }
  }, [address, fetchUser, newUsername])

  async function handleEditMode() {
    if (isEditing) {
      await updateUsername()
      setIsEditing(false)
    } else {
      setIsEditing(true)
    }
  }

  useEffect(() => {
    if (!fetchedUser) {
      fetchUser()
    }
    if (fetchedQuests.length === 0) {
      fetchQuests()
    }
  }, [fetchQuests, fetchUser, fetchedQuests, fetchedUser])

  const completedQuests = useMemo(() => {
    if (!fetchedUser || fetchedQuests.length === 0) return []
    const userQuests = Object.keys(fetchedUser.quests)
    const completedQuestIds = userQuests.filter(
      (questId) => fetchedUser.quests[questId].status === 'rewarded',
    )
    return fetchedQuests.filter((quest) => completedQuestIds.includes(quest.id))
  }, [fetchedQuests, fetchedUser])

  const username = useMemo(() => {
    if (!fetchedUser) return ''
    return fetchedUser.username
  }, [fetchedUser])

  const isJourneyCompleted = useMemo(() => {
    let completed
    if (fetchedQuests.length === 0) return false
    fetchedQuests.forEach((q) => {
      if (q.id === 'SOEKIWe2g0JDOKTZBl6N') {
        if (q.completed_users.includes(address)) {
          completed = true
        }
      }
    })
    return completed
  }, [address, fetchedQuests])

  if (!account) return <Landing />

  if (isUserLoading || isQuestsLoading)
    return (
      <VStack className={styles.loadingContainer}>
        <Spinner color="white" size="xl" />
      </VStack>
    )

  // if (!fetchedUser || fetchedQuests.length === 0) return <Error404 />

  const data = [
    {
      image:
        'https://img.freepik.com/premium-vector/funny-cartoon-emoji-design-happy-smile-face-vector-illustration-new-nft-collection_155957-1298.jpg?w=2000',
      name: 'Aleo Basics',
      description:
        'Aleo Basics concepts to get started in your journey with Aleo.',
      nft_reward: '0.99 USDC',
      nft_badge_img: '',
      points: '100LE',
      creator: '',
      material: 'json',
      completed_users: [],
      id: 1,
      level: 'Beginner',
    },
    {
      image:
        'https://media.nft.crypto.com/4c0476f6-5e01-42d4-b5a2-3ae9a4d5b90a/original.jpeg',
      name: 'Aleo Smart Contracts',
      description:
        'Aleo Basics concepts to get started in your journey with Aleo.',
      nft_reward: '0.99 USDC',
      nft_badge_img: '',
      points: '100LE',
      creator: '',
      material: 'json',
      completed_users: [],
      id: 1,
      level: 'Medium',
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfwwTQ8KyDbviaaR3nR5uDHEnB2pxEr0gWQA&usqp=CAU',
      name: 'Hello World Aleo!',
      description:
        'Aleo Basics concepts to get started in your journey with Aleo.',
      nft_reward: '0.99 USDC',
      nft_badge_img: '',
      points: '100LE',
      creator: '',
      material: 'json',
      completed_users: [],
      id: 1,
      level: 'Advanced',
    },
    {
      image:
        'https://media.nft.crypto.com/5908fada-92da-4b61-b34a-bfe8153bad39/original.png?d=sm-cover',
      name: 'Advance Aleo!',
      description:
        'Aleo Basics concepts to get started in your journey with Aleo. s Marieke mentioned recently that we need to go back to real utility, especially in the current turmoil. Our goal is to solve a long-lasting pain: Recruitment, that exists in all companies, with web3 technology',
      nft_reward: '0.99 USDC',
      nft_badge_img: '',
      points: '100LE',
      creator: '',
      material: 'json',
      completed_users: [],
      id: 1,
      level: 'Beginner',
    },
    {
      image:
        'https://media.nft.crypto.com/5908fada-92da-4b61-b34a-bfe8153bad39/original.png?d=sm-cover',
      name: 'Advance Aleo!',
      description:
        'Aleo Basics concepts to get started in your journey with Aleo. s Marieke mentioned recently that we need to go back to real utility, especially in the current turmoil. Our goal is to solve a long-lasting pain: Recruitment, that exists in all companies, with web3 technology',
      nft_reward: '0.99 USDC',
      nft_badge_img: '',
      points: '100LE',
      creator: '',
      material: 'json',
      completed_users: [],
      id: 1,
      level: 'Beginner',
    },
    {
      image:
        'https://media.nft.crypto.com/5908fada-92da-4b61-b34a-bfe8153bad39/original.png?d=sm-cover',
      name: 'Advance Aleo!',
      description:
        'Aleo Basics concepts to get started in your journey with Aleo. s Marieke mentioned recently that we need to go back to real utility, especially in the current turmoil. Our goal is to solve a long-lasting pain: Recruitment, that exists in all companies, with web3 technology',
      nft_reward: '0.99 USDC',
      nft_badge_img: '',
      points: '100LE',
      creator: '',
      material: 'json',
      completed_users: [],
      id: 1,
      level: 'Beginner',
    },

    // IPFS => json upload it to it & store cid on the contract
    // quizes,
    // 1 questions
    //   - multi choice
    //   - correct answer

    // bounties -  challenges
    // tutorials: github_link
  ]

  function handleClick(task) {
    console.log('1 task', task)
    // setSelectedTask(task)
    // router.push('/quest/V2zbf8iYGGGzFnkXQ6tB')
  }

  return (
    <VStack pt="9rem" pb="9rem">
      <Image
        style={{
          border: '3px solid white',
          borderRadius: '50%',
          width: '127px',
          height: '130px',
        }}
        src="https://pbs.twimg.com/media/Fbg3zilXkAEvyrb?format=jpg&name=large"
        alt="userImage"
      />
      <div className={styles.profileItem}>
        <p className={styles.profileParaghap}>Task completed: 6 </p>
        <p className={styles.profileParaghap}>
          0x5e1b802905c9730C8474eED020F800CC38A6A42E
          <CopyIcon style={{ marginLeft: '.8rem' }} />
        </p>
      </div>

      <section id="task">
        <h1
          style={{
            color: 'white',
            fontSize: '1.4rem',
            paddingTop: '2rem',
          }}
        >
          All completed tasks details.
        </h1>

        <SimpleGrid columns={2} gap={5} pt={10}>
          {data.map((task, idx) => (
            <PartnerCard task={task} key={idx} handleClick={handleClick} />
          ))}
        </SimpleGrid>
      </section>
    </VStack>
  )
}

export default withTransition(Profile)
