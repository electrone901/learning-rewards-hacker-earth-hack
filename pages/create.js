import {
  Box,
  Button,
  useColorModeValue,
  VStack,
  Spinner,
  useToast,
  Text,
  Input,
} from '@chakra-ui/react'
import { NFTStorage, File } from 'nft.storage'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { toastCreateTaskSuccess } from '@utils/toast'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import CreateContentFirstPart from '@components/CreateContentFirstPart'
import withTransition from '@components/withTransition'
import { apiKey } from '../components/APIKEYS'
import { MyAppContext } from './_app'
import { ethers } from 'ethers'

const CustomeInput = ({ setTempOption }) => {
  return (
    <div style={{ paddingLeft: '3rem', paddingTop: '1rem', width: '80%' }}>
      <Input
        onChange={(e) => setTempOption(e.target.value)}
        placeholder="Option"
        size="sm"
      />
    </div>
  )
}

function Create() {
  const { account, contract } = useContext(MyAppContext)
  const dummyData = [
    {
      question: 'How do you connect to the Klaytn blockchain?',
      answers: [
        'You can connect to the Klaytn blockchain by installing the Klaytn Wallet app on your mobile device or by using a browser extension like MetaMask on your desktop.',
        'You can connect to the Klaytn blockchain by connecting to a public node using an API or by running your own node and connecting to it.',
        'You can connect to the Klaytn blockchain by sending a connection request to the Klaytn team and waiting for their approval.',
        'You can connect to the Klaytn blockchain by purchasing a Klaytn token and using it to access the network.',
      ],
      correct: 1,
    },
    {
      question:
        'What do you need to consider when connecting to the Klaytn blockchain?',
      answers: [
        'You need to consider the type of node you want to connect to (e.g. public or private) and whether you want to use an API or run your own node.',
        'You need to consider the type of device you are using and whether it is compatible with the Klaytn Wallet app or a browser extension like MetaMask.',
        'You need to consider the amount of Klaytn tokens you have and whether you have enough to access the network.',
        'All of the above.',
      ],
      correct: 4,
    },

    {
      question: 'What is the Klaytn Wallet app?',
      answers: [
        'The Klaytn Wallet app is a mobile app that allows you to manage your Klaytn accounts, send and receive KLAY tokens, and interact with dApps on the Klaytn blockchain.',
        'The Klaytn Wallet app is a desktop application that allows you to connect to the Klaytn blockchain and manage your KLAY tokens.',
        'The Klaytn Wallet app is a browser extension that allows you to connect to the Klaytn blockchain and interact with dApps.',
        'The Klaytn Wallet app is a tool for developers to test and debug their dApps on the Klaytn blockchain.',
      ],
      correct: 1,
    },
  ]
  const [creatingQuiz, setCreatingQuiz] = useState(false)
  //   - show success

  // First part
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [level, setLevel] = useState('')
  const [rewardAmount, setRewardAmount] = useState('')
  const [experiencePoint, setExperiencePoint] = useState('')
  const [subscriptionFee, setSubscriptionFee] = useState('')
  const router = useRouter()
  const toast = useToast()
  const [isLoading, setLoading] = useState(false)

  // Second part
  const [data, setData] = useState([])
  const [showFirstPart, setShowFirstPart] = useState(true)
  const [question, setQuestion] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [option1, setOption1] = useState('')
  const [tempOption, setTempOption] = useState('')
  const [optionArray, setOptionArray] = useState([])
  const [optionList, setOptionList] = useState([])

  const SaveAllAndPublish = async () => {
    if (!account || !contract) alert('Please connect your wallet!')
    try {
      setCreatingQuiz(true)
      setLoading(true)
      const rewardAmountInt = Number(rewardAmount)
      const subscriptionFeeInt = Number(subscriptionFee)

      const obj = {
        image: image
          ? image
          : 'https://images.unsplash.com/photo-1534705867302-2a41394d2a3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',

        title: title ? title : 'KLAYTN 2022: A YEAR QUIZ',
        description: description
          ? description
          : 'Klaynt Basics concepts to get started in your journey with Klaynt.',
        rewardAmount: rewardAmount ? rewardAmount : '0.99 USDC',
        experiencePoint: experiencePoint ? experiencePoint : '100XP',
        level: level ? level : 1,
        creator: account
          ? account
          : '0xf4eA652F5B7b55f1493631Ea4aFAA63Fe0acc27C',
        subscriptionFee: subscriptionFee ? subscriptionFee : '0.2',
        questionsArray: data ? data : dummyData,
      }

      const client = new NFTStorage({ token: apiKey })
      const metadata = await client.store({
        name: title ? title : 'Getting Started with Klaynt Basics',
        description: JSON.stringify(obj),
        image: new File([image], 'imageName', { type: 'image/*' }),
      })

      if (metadata) {
        const url = metadata?.url.substring(7)
        const fullUrl = `https://cloudflare-ipfs.com/ipfs/${url}`
        console.log('fullUrl', fullUrl)
        const isProject = false
        const arrayAnswers = [1, 4, 1]
        const saveToContract = await contract.addTask(
          fullUrl,
          rewardAmountInt,
          subscriptionFeeInt,
          isProject,
          arrayAnswers,
          { value: ethers.utils.parseEther(rewardAmount) },
        )

        const tx = await saveToContract.wait()
        if (tx?.to) {
          toastCreateTaskSuccess(toast)
          console.log('___tx__', tx)
          const transationId = tx?.to
          console.log('transationId', transationId)
          const event = contract.on('taskAdded')
          console.log(event)
          router.push('/tasks')
        }

        // on  success display a button 'See Transaction'
        //  href https://baobab.scope.klaytn.com/tx/ + txID 0x014ce3aa8bd20739287837f03d7319159310028e21a6b43f8b90a9ea540279a8
      }
    } catch (error) {
      console.log(error)
    }
  }

  const saveQuestion = (e) => {
    e.preventDefault()
    // make sure tempOption is not empty
    if (tempOption !== '') {
      // then push the current option & reset setTempOption
      optionArray.push(tempOption)
      setTempOption('')
    }

    //  create cur obj
    const obj = {
      question: question,
      answers: optionArray,
      correct: correctAnswer,
    }
    console.log('saveQuestion ~ obj', obj)
    // push it to setData
    setData([...data, obj])
    setQuestion('')
    setOptionArray([])
    setCorrectAnswer('')
    setTempOption('')
    setOptionList([])
  }

  const onAddBtnClick = (e) => {
    // first check tempOption not empty
    if (tempOption === '') {
      alert('Option cannot be blank!')
      return
    }

    // then push the current option & reset setTempOption
    optionArray.push(tempOption)
    setTempOption('')

    // to display all options
    setOptionList(
      optionList.concat(
        <CustomeInput
          e={e}
          tempOption={tempOption}
          setTempOption={setTempOption}
          key={optionList.length}
        />,
      ),
    )
  }

  return (
    <div style={{ padding: '10rem 10rem ' }}>
      <Box style={{ padding: '1rem', fontSize: '2.2rem' }}>
        <Text
          className={styles.title}
          style={{ paddingTop: '3rem', fontSize: '2.2rem' }}
        >
          Create your quiz and give incentives to resolve it.
        </Text>
        <Text
          className={styles.title}
          style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}
        >
          All the subscription fee is added to the reward pool.
        </Text>
      </Box>

      <div style={{ display: 'flex' }}>
        <Box bg="gray" w="50%" p={10} color="white" minHeight="50rem">
          {showFirstPart ? (
            <CreateContentFirstPart
              setShowFirstPart={setShowFirstPart}
              setTitle={setTitle}
              setImage={setImage}
              image={image}
              setDescription={setDescription}
              setLevel={setLevel}
              setRewardAmount={setRewardAmount}
              setExperiencePoint={setExperiencePoint}
              setSubscriptionFee={setSubscriptionFee}
            />
          ) : (
            <>
              {/* SECOND PART */}
              <Text mb="8px">Question</Text>
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                size="md"
              />

              <div
                style={{
                  paddingLeft: '3rem',
                  paddingTop: '.5rem',
                  width: '80%',
                }}
              >
                <Text mb="8px">Correct Answer</Text>
                <Input
                  value={correctAnswer}
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                  placeContent="Answer"
                  size="sm"
                />
              </div>

              <div
                style={{
                  paddingLeft: '3rem',
                  paddingTop: '1rem',
                  width: '80%',
                }}
              >
                <Text mb="8px">Options</Text>
                <Input
                  onChange={(e) => setTempOption(e.target.value)}
                  placeContent="Option"
                  size="sm"
                />
              </div>

              {optionList}
              <button
                onClick={onAddBtnClick}
                style={{ marginLeft: '3rem', marginTop: '0.5rem' }}
              >
                + Add Option
              </button>
              <br />
              <br />

              <button
                onClick={saveQuestion}
                className={styles.savePost}
                style={{ marginTop: '0.5rem', padding: '1rem' }}
              >
                Save Question
              </button>
              <br />
              <br />

              <Button
                className={styles.btnBack}
                variant="outline"
                onClick={() => setShowFirstPart(true)}
              >
                Back
              </Button>
              <Button
                className={styles.savePost}
                variant="outline"
                onClick={SaveAllAndPublish}
              >
                Save All & Publish
              </Button>
              <br />
              <br />

              {isLoading ? (
                <VStack className={styles.loadingContainer}>
                  <Spinner color="white" size="xl" />
                  <p>Uploading....</p>
                </VStack>
              ) : (
                ''
              )}
            </>
          )}
        </Box>

        <Box
          bg="#5b10ff"
          w="50%"
          p={40}
          color="white"
          style={{ paddingTop: '3rem' }}
        >
          {data.length ? (
            data.map((question, idx) => (
              <div
                key={idx}
                style={{
                  paddingBottom: '1rem',
                }}
              >
                <h1
                  style={{
                    color: 'white',
                    fontSize: '1.3rem',
                  }}
                >
                  {`${idx + 1}.-`} {question.question}
                </h1>

                {question.answers
                  ? question.answers.map((answer, idx) => (
                      <p key={idx} style={{ paddingLeft: '.5rem' }}>
                        {`${idx + 1}.-`} {answer}
                      </p>
                    ))
                  : ''}
              </div>
            ))
          ) : (
            <h1
              style={{
                color: 'white',
                fontSize: '1.3rem',
              }}
            >
              Your quiz will display here!
            </h1>
          )}
        </Box>
      </div>
    </div>
  )
}

export default withTransition(Create)
