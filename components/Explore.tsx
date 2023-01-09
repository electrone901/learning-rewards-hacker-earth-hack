import {
  Text,
  VStack,
  SimpleGrid,
  Spinner,
  Box,
  Center,
  useColorModeValue,
  Heading,
  Stack,
  Image,
  Button,
  Flex,
} from '@chakra-ui/react'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import withTransition from '@components/withTransition'
import ProjectDetails from '@components/ProjectDetails'
import QuestCard from './QuestCard'
import { useEffect, useState } from 'react'

import Error404 from '@components/404'

const JOURNEY_API_URL =
  process.env.NEXT_PUBLIC_ENV === 'prod'
    ? process.env.NEXT_PUBLIC_API_PROD
    : process.env.NEXT_PUBLIC_API_DEV

function Explore() {
  const router = useRouter()

  const [fetchedQuests, setFetchedQuests] = useState<any>([])
  const [isLoading, setLoading] = useState<boolean>(false)

  // fetches quest
  useEffect(() => {
    async function fetchQuests() {
      setLoading(true)
      try {
        const response = await fetch(`${JOURNEY_API_URL}/api/quests`)
        const { quests } = await response.json()
        console.log('fetched quests: ', quests)
        setFetchedQuests(quests)
      } catch (err) {
        console.log(err)
      }
      setLoading(false)
    }
    fetchQuests()
  }, [])

  // function handleClick(e: any, id: string) {
  //   e.preventDefault()
  //   router.push(`/quest/${id}`)
  // }

  // if (isLoading)
  //   return (
  //     <VStack className={styles.loadingContainer}>
  //       <Spinner color="white" size="xl" />
  //     </VStack>
  //   )

  // if (fetchedQuests.length === 0) return <Error404 />

  function getStarted(e) {
    e.preventDefault()
    router.push('/tasks')
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.showcase}>
          <div className={styles.showcaseContent}>
            <h1>Learning rewards is simple, educational, and rewarding.</h1>
            <p></p>
            <p>Learn and earn tokens, NFTS, and Experience points.</p>

            <Button
              fontSize={'bg'}
              rounded={'full'}
              bg={'blue.400'}
              color={'white'}
              boxShadow={
                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
              }
              _hover={{
                bg: 'blue.500',
              }}
              _focus={{
                bg: 'blue.500',
              }}
              onClick={getStarted}
            >
              Get Started Now
            </Button>
          </div>
        </div>

        {/*  */}

        {/* <ProjectDetails /> */}
        {/* old */}

        {/* HOW IT WORKS*/}
        <Center py={12}>
          <Flex minWidth="max-content" alignItems="center" gap="6">
            <Box
              role={'group'}
              p={6}
              maxW={'330px'}
              w={'full'}
              bg={useColorModeValue('white', 'gray.800')}
              boxShadow={'2xl'}
              rounded={'lg'}
              pos={'relative'}
              zIndex={1}
            >
              <Box
                rounded={'lg'}
                mt={-12}
                pos={'relative'}
                height={'230px'}
                _after={{
                  transition: 'all .3s ease',
                  content: '""',
                  w: 'full',
                  h: 'full',
                  pos: 'absolute',
                  top: 5,
                  left: 0,
                  // backgroundImage: `url(https://m.media-amazon.com/images/I/31qu4ixHZ3L._SY355_.jpg)`,
                  filter: 'blur(15px)',
                  zIndex: -1,
                }}
                _groupHover={{
                  _after: {
                    filter: 'blur(20px)',
                  },
                }}
              >
                <Image
                  rounded={'lg'}
                  height={230}
                  width={282}
                  objectFit={'cover'}
                  src="./group0.png"
                  alt="user"
                />
              </Box>
              <Stack pt={10} align={'center'}>
                <Heading
                  fontSize={'2xl'}
                  fontFamily={'body'}
                  color={'gray.500'}
                >
                  Join Our Community
                </Heading>
                <Text
                  textAlign={'center'}
                  color={useColorModeValue('gray.700', 'gray.400')}
                  px={3}
                >
                  Discovery is dedicated space for your community to come
                  together, ask and answer questions, and have open-ended
                  conversations.
                </Text>

                <Stack direction={'row'} align={'center'}>
                  <Button
                    flex={1}
                    fontSize={'sm'}
                    rounded={'full'}
                    bg={'blue.400'}
                    color={'black'}
                    boxShadow={
                      '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                    }
                    _hover={{
                      bg: 'blue.500',
                    }}
                    _focus={{
                      bg: 'blue.500',
                    }}
                    onClick={getStarted}
                  >
                    Explore Tasks
                  </Button>
                </Stack>
              </Stack>
            </Box>

            <Box
              role={'group'}
              p={6}
              maxW={'330px'}
              w={'full'}
              bg={useColorModeValue('white', 'gray.800')}
              boxShadow={'2xl'}
              rounded={'lg'}
              pos={'relative'}
              zIndex={1}
            >
              <Box
                rounded={'lg'}
                mt={-12}
                pos={'relative'}
                height={'230px'}
                _after={{
                  transition: 'all .3s ease',
                  content: '""',
                  w: 'full',
                  h: 'full',
                  pos: 'absolute',
                  top: 5,
                  left: 0,
                  // backgroundImage: `url(https://m.media-amazon.com/images/I/31qu4ixHZ3L._SY355_.jpg)`,
                  filter: 'blur(15px)',
                  zIndex: -1,
                }}
                _groupHover={{
                  _after: {
                    filter: 'blur(20px)',
                  },
                }}
              >
                <Image
                  rounded={'lg'}
                  height={230}
                  width={282}
                  objectFit={'cover'}
                  src="./group1.png"
                  alt="user"
                />
              </Box>
              <Stack pt={10} align={'center'}>
                <Heading
                  fontSize={'2xl'}
                  fontFamily={'body'}
                  color={'gray.500'}
                >
                  Learn And Earn
                </Heading>
                <Text
                  textAlign={'center'}
                  color={useColorModeValue('gray.700', 'gray.400')}
                  px={3}
                >
                  Just by reading blogs about crypto and completing a short
                  quiz, eligible users will be rewarded with a bit of that
                  specific crypto!
                </Text>

                <Stack direction={'row'} align={'center'}>
                  <Button
                    flex={1}
                    fontSize={'sm'}
                    rounded={'full'}
                    bg={'blue.400'}
                    color={'black'}
                    boxShadow={
                      '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                    }
                    _hover={{
                      bg: 'blue.500',
                    }}
                    _focus={{
                      bg: 'blue.500',
                    }}
                    onClick={getStarted}
                  >
                    Join Discord
                  </Button>
                </Stack>
              </Stack>
            </Box>

            <Box
              role={'group'}
              p={6}
              maxW={'330px'}
              w={'full'}
              bg={useColorModeValue('white', 'gray.800')}
              boxShadow={'2xl'}
              rounded={'lg'}
              pos={'relative'}
              zIndex={1}
            >
              <Box
                rounded={'lg'}
                mt={-12}
                pos={'relative'}
                height={'230px'}
                _after={{
                  transition: 'all .3s ease',
                  content: '""',
                  w: 'full',
                  h: 'full',
                  pos: 'absolute',
                  top: 5,
                  left: 0,
                  // backgroundImage: `url(https://m.media-amazon.com/images/I/31qu4ixHZ3L._SY355_.jpg)`,
                  filter: 'blur(15px)',
                  zIndex: -1,
                }}
                _groupHover={{
                  _after: {
                    filter: 'blur(20px)',
                  },
                }}
              >
                <Image
                  rounded={'lg'}
                  height={230}
                  width={282}
                  objectFit={'cover'}
                  src="./group2.png"
                  alt="user"
                />
              </Box>
              <Stack pt={10} align={'center'}>
                <Heading
                  fontSize={'2xl'}
                  fontFamily={'body'}
                  color={'gray.500'}
                >
                  Create Content & Earn
                </Heading>
                <Text
                  textAlign={'center'}
                  color={useColorModeValue('gray.700', 'gray.400')}
                  px={3}
                >
                  When you completed a few tasks, you will be ready to start
                  creating quizz, tutorial and more. Eligible users will be
                  rewarded!
                </Text>

                <Stack direction={'row'} align={'center'}>
                  <Button
                    flex={1}
                    fontSize={'sm'}
                    rounded={'full'}
                    bg={'blue.400'}
                    color={'black'}
                    boxShadow={
                      '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                    }
                    _hover={{
                      bg: 'blue.500',
                    }}
                    _focus={{
                      bg: 'blue.500',
                    }}
                    onClick={getStarted}
                  >
                    Create a Tasks
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Flex>
        </Center>
        <Image objectFit={'cover'} src="./lear.png" alt="user" pt={8} />
      </main>
    </div>
  )
}

export default withTransition(Explore)
