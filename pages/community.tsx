import {
  VStack,
  Text,
  HStack,
  Image,
  Link as ChakraLink,
  Spinner,
} from '@chakra-ui/react'
import withTransition from '@components/withTransition'
import styles from '@styles/Community.module.css'
import { useCallback, useEffect, useMemo, useState, useContext } from 'react'
import Landing from '@components/Landing'
import { useTron } from '@components/TronProvider'
import { abridgeAddress } from '@utils/abridgeAddress'
import { users } from '@data/users'
import { MyAppContext } from '../pages/_app'

const JOURNEY_API_URL =
  process.env.NEXT_PUBLIC_ENV === 'prod'
    ? process.env.NEXT_PUBLIC_API_PROD
    : process.env.NEXT_PUBLIC_API_DEV

function Community() {
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
  const { address } = useTron()
  const [fetchedUsers, setFetchedUsers] = useState<any>([])
  const [isUsersLoading, setUsersLoading] = useState<boolean>(false)

  const fetchUsers = useCallback(async () => {
    setUsersLoading(true)
    try {
      const response = await fetch(`${JOURNEY_API_URL}/api/users`)
      if (response.status === 200) {
        const users = await response.json()
        console.log('🚀 ~ file: community.tsx:34 ~ fetchUsers ~ users', users)
        setFetchedUsers(users)
      }
    } catch (err) {
      console.log(err)
    }
    setUsersLoading(false)
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const filteredUsers = useMemo(() => {
    if (fetchedUsers.length == 0) return users
    const newUsers = JSON.parse(JSON.stringify(users))
    newUsers.push(...fetchedUsers)
    return newUsers
  }, [fetchedUsers])

  if (!account) return <Landing />

  if (isUsersLoading)
    return (
      <VStack className={styles.loadingContainer}>
        <Spinner color="white" size="xl" />
      </VStack>
    )

  // if (fetchedUsers.length === 0) return <Error404 />;

  return (
    <VStack className={styles.container}>
      <VStack w="100%" pb="2rem">
        <Text className={styles.title}>Community Leaderboard</Text>
        <Text className={styles.subtitle}>
          A community for newcomers and developers to collaborate and monetize
          their skills while learning and working on Open Source projects
          through bounties.
        </Text>
      </VStack>
      <HStack alignItems="flex-start" gap="1rem">
        <VStack>
          <HStack className={styles.tableHeaderContainer}>
            <Text className={styles.tableHeader1}>Rank</Text>
            <Text className={styles.tableHeader2}>Team Member</Text>
            <Text className={styles.tableHeader3}>Address</Text>
            <Text className={styles.tableHeader4}>Experience Points</Text>
            <Text className={styles.tableHeader6}>Date joined</Text>
            {/* <Text className={styles.tableHeader5}>Tier</Text>
             */}
          </HStack>
          {filteredUsers
            .sort((a, b) => b.xp - a.xp)
            .map(({ username, img, address, xp, joinedAt, id }, idx) => (
              <HStack key={id} className={styles.tableRowContainer}>
                {/* {idx === 0 ? (
                  <VStack className={styles.tableHeader1}>
                    <Image
                      alt="badge"
                      src="/1st.png"
                      width="40px"
                      height="40px"
                    />
                  </VStack>
                ) : idx === 1 ? (
                  <VStack className={styles.tableHeader1}>
                    <Image
                      alt="badge"
                      src="/2nd.png"
                      width="40px"
                      height="40px"
                    />
                  </VStack>
                ) : idx === 2 ? (
                  <VStack className={styles.tableHeader1}>
                    <Image
                      alt="badge"
                      src="/3rd.png"
                      width="40px"
                      height="40px"
                    />
                  </VStack>
                ) : (
                  <Text className={styles.tableHeader1}>{idx}</Text>
                )} */}

                <Text className={styles.tableHeader1}>{idx + 1}</Text>

                <VStack className={styles.tableHeader2}>
                  <Image
                    alt="badge"
                    src={img}
                    width="60px"
                    height="60px"
                    style={{ borderRadius: '50%', objectFit: 'cover' }}
                  />
                </VStack>
                <Text className={styles.tableHeader3}>
                  {abridgeAddress(address)}
                </Text>
                <Text className={styles.tableHeader4}>{xp}</Text>
                <Text className={styles.tableHeader6}>{joinedAt}</Text>
              </HStack>
            ))}
        </VStack>
      </HStack>
    </VStack>
  )
}

export default withTransition(Community)
