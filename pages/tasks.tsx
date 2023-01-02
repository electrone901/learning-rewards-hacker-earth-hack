import { useState, useContext, useEffect } from 'react'
import { Text, VStack, HStack, Image, Box, SimpleGrid } from '@chakra-ui/react'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import withTransition from '@components/withTransition'
import { MyAppContext } from '../pages/_app'
import QuestCard from '@components/Card'
import PartnerCard from '@components/PartnerCard'

// tasks we need all tasks, account, onclick we need to pass the taskID
function Explore() {
  const router = useRouter()

  const { account, contract, allTasks, setAllTasks } = useContext(MyAppContext)
  console.log('🚀 ~ file: tasks.tsx:15 ~ Explore ~ contract', contract)
  console.log('🚀 ~ file: tasks.tsx:15 ~ Explore ~ allTasks', allTasks)

  const getAllTasks = async (contract) => {
    const allTasks = await contract?.getAllTasks()
    setAllTasks(allTasks)
    console.log('🚀Landing.tsx:79 ~ getAllTasks ~ allTasks', allTasks)
  }

  useEffect(() => {
    if (account && contract) {
      getAllTasks(contract)
    }
  }, [])

  // here fetch all tasks
  const data = [
    {
      image:
        'https://img.freepik.com/premium-vector/funny-cartoon-emoji-design-happy-smile-face-vector-illustration-new-nft-collection_155957-1298.jpg?w=2000',
      name: 'Aleo Basics',
      description:
        'Aleo Basics concepts to get started in your journey with Aleo.',
      nft_reward: '0.99 KLAY',
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
      nft_reward: '0.99 KLAY',
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
      nft_reward: '0.99 KLAY',
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
      nft_reward: '0.99 KLAY',
      nft_badge_img: '',
      points: '100LE',
      creator: '',
      material: 'json',
      completed_users: [],
      id: 1,
      level: 'Beginner',
      fee: '10',
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

  function handleClick(e) {
    e.preventDefault()
    router.push('/quest/V2zbf8iYGGGzFnkXQ6tB')
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Text className={styles.title}>Explore Partners</Text>
        <SimpleGrid columns={2} gap={5} pt={10}>
          {data.map((task, idx) => (
            <PartnerCard task={task} key={idx} handleClick={handleClick} />
          ))}
        </SimpleGrid>
      </main>
    </div>
  )
}

export default withTransition(Explore)
