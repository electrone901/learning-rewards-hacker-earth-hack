import {
  VStack,
  Text,
  HStack,
  Button,
  Image,
  useToast,
  Box,
  Spinner,
  Link as ChakraLink,
} from '@chakra-ui/react'
import Quiz from '../../components/Quiz'
import { useTron } from '@components/TronProvider'
import styles from '@styles/Quest.module.css'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { CheckCircleIcon, LockIcon } from '@chakra-ui/icons'
import withTransition from '@components/withTransition'
import Error404 from '@components/404'
import Confetti from 'react-confetti'
import { FaTwitter } from 'react-icons/fa'
import {
  toastClaimFailure,
  toastClaimSuccess,
  toastVerifyFailure,
  toastVerifySuccess,
} from '@utils/toast'

const JOURNEY_API_URL =
  process.env.NEXT_PUBLIC_ENV === 'prod'
    ? process.env.NEXT_PUBLIC_API_PROD
    : process.env.NEXT_PUBLIC_API_DEV

function Quest() {
  const { address } = useTron()

  const toast = useToast()
  const router = useRouter()
  const { id: questId } = router.query

  const [fetchedUser, setFetchedUser] = useState<any>()
  const [fetchedQuest, setFetchedQuest] = useState<any>()

  const [isQuestLoading, setQuestLoading] = useState<boolean>(false)
  const [isStartLoading, setStartLoading] = useState<boolean>(false)
  const [isVerifyLoading, setVerifyLoading] = useState<boolean>(false)
  const [isClaimLoading, setClaimLoading] = useState<boolean>(false)

  const connectTwitter = useCallback(
    (e: any) => {
      e.preventDefault()
      router.push('/twitter')
    },
    [router],
  )

  const fetchUser = useCallback(async () => {
    if (!address) return
    try {
      const response = await fetch(`${JOURNEY_API_URL}/api/users/${address}`)
      if (response.status === 200) {
        const user = await response.json()
        setFetchedUser(user)
        return user
      }
    } catch (err) {
      console.log(err)
    }
  }, [address])

  const fetchQuest = useCallback(async () => {
    if (!questId) return
    setQuestLoading(true)
    try {
      const response = await fetch(`${JOURNEY_API_URL}/api/quests/${questId}`)
      if (response.status === 200) {
        const quest = await response.json()
        setFetchedQuest(quest)
      }
    } catch (err) {
      console.log(err)
    }
    setQuestLoading(false)
  }, [questId])

  // increment current setp and update user quest status
  const updateQuestStatus = useCallback(
    async (isRewarded?: boolean) => {
      if (!fetchedUser) return

      const fetchedStep = fetchedUser.quests[questId as string].currentStep
      const newQuests = JSON.parse(JSON.stringify(fetchedUser.quests))

      const isCompleted = fetchedStep === fetchedQuest.numSteps - 1

      if (isRewarded) {
        newQuests[questId as string].status = 'rewarded'
      } else {
        newQuests[questId as string].currentStep = fetchedStep + 1

        if (isCompleted) {
          newQuests[questId as string].status = 'completed'
        }
      }

      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address: address,
          quests: newQuests,
        }),
      }

      const response = await fetch(
        `${JOURNEY_API_URL}/api/users/${address}`,
        requestOptions,
      )

      if (response.status === 200) {
        await fetchUser()
      }
    },
    [address, fetchUser, fetchedQuest, fetchedUser, questId],
  )

  // check quest has completed and update quest status
  const verifyQuest = useCallback(async () => {
    setVerifyLoading(true)
    try {
      const response = await fetch(
        `${JOURNEY_API_URL}/api/verify/${questId}/${address}`,
      )
      if (response.status === 200) {
        toastVerifySuccess(toast)
        await updateQuestStatus()
      } else {
        toastVerifyFailure(toast)
      }
    } catch (err) {
      console.log(err)
    }
    setVerifyLoading(false)
  }, [address, questId, toast, updateQuestStatus])

  // update user quest status
  const startQuest = useCallback(async () => {
    setStartLoading(true)
    if (!address || !questId) return
    try {
      const newQuests = JSON.parse(JSON.stringify(fetchedUser.quests))

      // add new quest status into user's quests map
      newQuests[questId as string] = {
        questId: questId,
        startedAt: new Date().getTime(),
        currentStep: 0,
        status: 'in_progress',
      }

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address: address,
          newQuests: newQuests,
        }),
      }

      const response = await fetch(
        `${JOURNEY_API_URL}/api/users/startQuest`,
        requestOptions,
      )

      if (response.status === 200) {
        await fetchUser()
      }
    } catch (err) {
      console.log(err)
    }
    setStartLoading(false)
  }, [address, fetchUser, fetchedUser, questId])

  // claim quest reward
  const claimReward = useCallback(async () => {
    setClaimLoading(true)
    try {
      const response = await fetch(
        `${JOURNEY_API_URL}/api/claim/${questId}/${address}`,
      )
      if (response.status === 200) {
        toastClaimSuccess(toast)
        await updateQuestStatus(true)
        await fetchQuest()
      } else {
        toastClaimFailure(toast)
      }
    } catch (err) {
      console.log(err)
    }
    setClaimLoading(false)
  }, [address, fetchQuest, questId, toast, updateQuestStatus])

  const isQuestCompleted = useMemo(
    () =>
      fetchedUser &&
      fetchedUser.quests &&
      fetchedUser.quests[questId as string] &&
      fetchedUser.quests[questId as string].status === 'completed',
    [fetchedUser, questId],
  )

  const isQuestRewarded = useMemo(
    () =>
      fetchedUser &&
      fetchedUser.quests &&
      fetchedUser.quests[questId as string] &&
      fetchedUser.quests[questId as string].status === 'rewarded',
    [fetchedUser, questId],
  )

  const isQuestActive = useMemo(
    () => (fetchedUser ? !!fetchedUser.quests[questId as string] : false),
    [fetchedUser, questId],
  )

  const currentStep = useMemo(
    () =>
      fetchedUser && fetchedUser.quests[questId as string]
        ? Number(fetchedUser.quests[questId as string].currentStep)
        : 0,
    [fetchedUser, questId],
  )

  const questSteps = useMemo(
    () => (fetchedQuest ? Object.values(fetchedQuest.steps) : []),
    [fetchedQuest],
  )

  // set fetched quest on initial render
  // useEffect(() => {
  //   if (!fetchedQuest) {
  //     fetchQuest();
  //   }
  //   if (!fetchedUser) {
  //     fetchUser();
  //   }
  // }, [fetchQuest, fetchUser, fetchedQuest, fetchedUser, questId]);

  // if (isQuestLoading)
  //   return (
  //     <VStack className={styles.loadingContainer}>
  //       <Spinner color="white" size="xl" />
  //     </VStack>
  //   );

  // if (!fetchedUser || !fetchedQuest) return <Error404 />;

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
    },
    {
      image:
        'https://media.nft.crypto.com/4c0476f6-5e01-42d4-b5a2-3ae9a4d5b90a/original.jpeg',
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
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfwwTQ8KyDbviaaR3nR5uDHEnB2pxEr0gWQA&usqp=CAU',
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
    },
    {
      image:
        'https://media.nft.crypto.com/5908fada-92da-4b61-b34a-bfe8153bad39/original.png?d=sm-cover',
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
    },

    // IPFS => json upload it to it & store cid on the contract
    // quizes,
    // 1 questions
    //   - multi choice
    //   - correct answer

    // bounties -  challenges
    // tutorials: github_link
  ]
  return (
    <VStack className={styles.container}>
      <Quiz title="YAY" />

      {isQuestRewarded && (
        <Confetti width={1450} height={1000} numberOfPieces={100} />
      )}
      {fetchedQuest && (
        <HStack alignItems="flex-start" gap={6}>
          <VStack
            className={
              isQuestCompleted
                ? `${styles.rewardContainer} ${styles.questCompleted}`
                : styles.rewardContainer
            }
          >
            <Text className={styles.rewardTitle}>Quest Reward</Text>
            {fetchedQuest.token_reward && (
              <RewardStep
                title={`$${fetchedQuest.token_reward.amount} in ${fetchedQuest.token_reward.symbol}`}
                description="Tokens will be airdropped into your wallet."
                stepNum={1}
              />
            )}
            {fetchedQuest.nft_reward && (
              <RewardStep
                title={`${fetchedQuest.nft_reward.title}`}
                description={`${fetchedQuest.nft_reward.description}`}
                imageUrl={`${fetchedQuest.nft_reward.image_url}`}
                stepNum={2}
              />
            )}
            {fetchedQuest.xp && (
              <RewardStep
                title={`${fetchedQuest.xp} XP`}
                description="Collect experience points to level up on Journey."
                stepNum={3}
              />
            )}
            <Button
              className={styles.primaryButton}
              onClick={claimReward}
              isDisabled={!isQuestCompleted || isQuestRewarded}
            >
              {isQuestRewarded ? (
                'Reward claimed'
              ) : isClaimLoading ? (
                <Spinner />
              ) : (
                'Claim Reward'
              )}
            </Button>
          </VStack>
          <VStack className={styles.questContainer}>
            <HStack pb="1rem" gap={2}>
              <Image
                src={fetchedQuest.partner.image_url}
                alt="hi"
                className={styles.dappLogo}
              ></Image>
              <VStack className={styles.questTitleContainer}>
                <Text className={styles.questTitle}>{fetchedQuest.title}</Text>
                <Text className={styles.questSubtitle}>
                  {fetchedQuest.description}
                </Text>
              </VStack>
            </HStack>
            <HStack width="100%" justifyContent="space-between" pb=".5rem">
              <Text>
                My progress:{' '}
                {isQuestRewarded || isQuestCompleted
                  ? 'Completed!'
                  : !isQuestActive
                  ? 'Not Started'
                  : `${currentStep}/${questSteps.length} completed`}
              </Text>
              <HStack>
                <Text>
                  {fetchedQuest.completed_users.length} users rewarded
                </Text>
              </HStack>
            </HStack>

            <Box className={styles.divider} />
            <VStack pt=".5rem" gap={2}>
              {data.map((item, stepIdx) => (
                <QuestStep
                  key={stepIdx}
                  stepNum={stepIdx + 1}
                  title={item.name}
                  user={fetchedUser}
                  startUrl={item.image}
                  description={item.description}
                  verifyQuest={verifyQuest}
                  startQuest={startQuest}
                  connectTwitter={connectTwitter}
                  isStartLoading={isStartLoading}
                  isVerifyLoading={isVerifyLoading}
                  isCompleted={currentStep > stepIdx}
                  isLocked={currentStep < stepIdx}
                  isQuestActive={isQuestActive}
                  // isTwitter={isTwitter}
                />
              ))}
            </VStack>
          </VStack>
        </HStack>
      )}
    </VStack>
  )
}

export default withTransition(Quest)

type QuestStepProps = {
  stepNum: number
  title: string
  description: string
  startUrl: string
  user: any
  verifyQuest: () => {}
  startQuest: () => {}
  connectTwitter: (e: any) => void
  isStartLoading: boolean
  isVerifyLoading: boolean
  isCompleted?: boolean
  isLocked?: boolean
  isQuestActive?: boolean
  isTwitter?: boolean
}

function QuestStep({
  stepNum,
  title,
  description,
  startUrl,
  user,
  verifyQuest,
  startQuest,
  connectTwitter,
  isCompleted,
  isLocked,
  isQuestActive,
  isStartLoading,
  isVerifyLoading,
  isTwitter,
}: QuestStepProps) {
  return (
    <HStack
      className={styles.questStep}
      opacity={isLocked || isCompleted ? 0.55 : 1}
    >
      <Box minWidth="20px">
        {isLocked ? (
          <LockIcon />
        ) : isCompleted ? (
          <CheckCircleIcon />
        ) : (
          <Text>{stepNum}</Text>
        )}
      </Box>
      <VStack alignItems="flex-start" width="100%">
        <Text className={styles.questStepTitle}>{title}</Text>
        <Text className={styles.questStepDesc}>
          {description} Start{' '}
          <ChakraLink href={startUrl} isExternal>
            <Text as="span" fontWeight={700} color="#bdbdbd">
              here
            </Text>
          </ChakraLink>
          .
        </Text>
      </VStack>
      <HStack w="120px">
        {!isQuestActive && stepNum === 1 ? (
          <Button
            className={styles.primaryButton}
            onClick={startQuest}
            isDisabled={isLocked}
          >
            {isStartLoading ? <Spinner /> : 'Start'}
          </Button>
        ) : user && !user.twitter.user_id && isTwitter ? (
          <Button
            className={styles.twitterButton}
            onClick={connectTwitter}
            isDisabled={isLocked}
          >
            <HStack>
              <FaTwitter />
              <Text>Connect</Text>
            </HStack>
          </Button>
        ) : (
          !isCompleted && (
            <Button
              className={styles.secondaryButton}
              onClick={verifyQuest}
              isDisabled={isLocked}
            >
              {isVerifyLoading && !isCompleted && !isLocked ? (
                <Spinner />
              ) : (
                'Verify'
              )}
            </Button>
          )
        )}
      </HStack>
    </HStack>
  )
}

type RewardStepProps = {
  stepNum: number
  title: string
  description: string
  imageUrl?: string
}

function RewardStep({
  stepNum,
  title,
  description,
  imageUrl,
}: RewardStepProps) {
  return (
    <HStack className={styles.rewardStep}>
      <Box minWidth="20px">
        <Text>{stepNum}</Text>
      </Box>
      <VStack alignItems="flex-start" width="100%">
        <Text className={styles.questStepTitle}>{title}</Text>
        <Text className={styles.questStepDesc}>{description}</Text>

        {imageUrl && (
          <HStack width="90%" justifyContent="center" pt="1rem">
            <Image src={imageUrl} alt="nft image" className={styles.nftImage} />
          </HStack>
        )}
      </VStack>
    </HStack>
  )
}
