import { Button, useToast } from '@chakra-ui/react'
import { toastClaimFailure, toastClaimSuccess } from '@utils/toast'

import styles from '../styles/Home.module.css'
import RewardPill from './RewardPill'
import { useEffect, useState, useContext } from 'react'
import { MyAppContext } from 'pages/_app'

type QuestCardProps = {
  title: string
  selectedTask: any
}

function TotalCorrect(props) {
  var style = {
    display: 'inline-block',
    padding: '1em',
    background: '#eee',
    margin: '0 2em 0 0',
    color: 'black',
    width: '15rem',
  }
  return <h2 style={style}>Correct: {props.correct}</h2>
}

function TotalIncorrect(props) {
  var style = {
    display: 'inline-block',
    padding: '1em',
    background: '#eee',
    width: '15rem',
    color: 'black',
  }
  return <h2 style={style}>Incorrect: {props.incorrect}</h2>
}

function Question(props) {
  var style = {}
  return (
    <h1 style={{ color: 'white', fontSize: '1.3rem', paddingBottom: '1rem' }}>
      {props?.dataSet?.question}
    </h1>
  )
}

function Answer(props) {
  return (
    <div>
      <button
        className={styles.test}
        onClick={() => props.handleClick(props.choice)}
      >
        {props.answer}
      </button>
    </div>
  )
}

function AnswerList(props) {
  var answers = []
  for (let i = 0; i < props?.dataSet?.answers.length; i++) {
    answers.push(
      <Answer
        key={i}
        choice={i}
        handleClick={props.handleClick}
        answer={props.dataSet.answers[i]}
      />,
    )
  }
  return <div style={{ paddingBottom: '10rem' }}>{answers}</div>
}

function QuizArea(props) {
  return (
    <div
      style={{
        padding: '0 2em',
      }}
    >
      <Question dataSet={props.dataSet} />
      <AnswerList dataSet={props.dataSet} handleClick={props.handleClick} />
    </div>
  )
}

function ScoreArea(props) {
  return (
    <div
      style={{
        width: '100%',
        padding: '2em',
        display: 'block',
        float: 'left',
      }}
    >
      <TotalCorrect correct={props.correct} />
      <TotalIncorrect incorrect={props.incorrect} />
    </div>
  )
}

export default function Quiz({ selectedTask, title }: QuestCardProps) {
  const [current, setCurrent] = useState<number>(0)
  const [dataSet, setDataSet] = useState<any[]>([])
  const [displayResults, setDisplayResults] = useState<boolean>(false)
  const [correct, setCorrect] = useState<number>(0)
  const [incorrect, setIncorrect] = useState<number>(0)
  const toast = useToast()
  console.log('🚀 ~ file: Quiz.tsx:109 ~ Quiz ~ toast', toast)
  const { contract, setIsQuestSuccessfullycompleted, account } = useContext(
    MyAppContext,
  )

  useEffect(() => {
    if (selectedTask?.questionsArray) setDataSet(selectedTask.questionsArray)
    // toastClaimSuccess(toast)
  }, [])

  const isNinetyOrGreater = () => {
    const totalQuestions = dataSet.length - 1
    const percentage = (90 * totalQuestions) / 100
    dataSet
    if (dataSet.length > 0) {
      if (current == dataSet.length) {
        if (correct >= percentage) {
          setIsQuestSuccessfullycompleted(true)
        }
      }
    }

    return percentage
  }

  const handleClick = (choice) => {
    if (choice + 1 == dataSet[current].correct) {
      setCorrect(correct + 1)
    } else {
      setIncorrect(incorrect + 1)
    }

    if (current == dataSet.length) {
      setDisplayResults(true)
    } else {
      setCurrent(current + 1)
    }
  }

  const claimRewards = async () => {
    try {
      if (contract) {
        const id = selectedTask.id
        console.log(' id', id)
        const arrayAnswers = [1, 4, 1]
        const response = await contract.completeQuiz(id, arrayAnswers)
        console.log('1__response', response)
        // const res = await contract.transferReward(id)
        // console.log('2____  res', res)
        // toastClaimSuccess()

        // if (response.status === 200) {
        //   await updateQuestStatus(true)
        //   await fetchQuest()
        // } else {
        //   toastClaimFailure(toast)
        // }
      }
    } catch (err) {
      console.log(err)
    }
    // setClaimLoading(false)
  }

  const reset = () => {
    setCorrect(0)
    setCurrent(0)
    setIncorrect(0)
  }

  return (
    <div style={{ textAlign: 'center' }}>
      {current == dataSet?.length ? (
        <>
          {correct >= isNinetyOrGreater() ? (
            <div
              style={{
                paddingTop: '5rem',
              }}
            >
              <Button
                flex={1}
                fontSize={'bg'}
                bg={'blue.400'}
                color={'white'}
                boxShadow={
                  '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                }
                width={'15rem'}
                height={'3.5rem'}
                _hover={{
                  bg: 'red',
                  backgroundColor: 'red',
                }}
                _focus={{
                  bg: 'blue.500',
                }}
                onClick={claimRewards}
              >
                Claim Rewards
              </Button>

              <p
                style={{
                  paddingTop: '5rem',
                  paddingBottom: '2rem',
                  fontSize: '1.2rem',
                }}
              >
                Congratulations! You are eligible to claim the rewards.
              </p>
            </div>
          ) : (
            <Button
              flex={1}
              fontSize={'bg'}
              bg={'blue.400'}
              color={'white'}
              boxShadow={
                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
              }
              width={'15rem'}
              height={'3.5rem'}
              _hover={{
                bg: 'blue.500',
              }}
              _focus={{
                bg: 'blue.500',
              }}
              onClick={reset}
            >
              Try again
            </Button>
          )}
        </>
      ) : (
        ''
      )}

      {current == dataSet?.length - 1 ? (
        ''
      ) : (
        <p
          style={{
            paddingTop: '5rem',
            paddingBottom: '2rem',
            fontSize: '1.3rem',
          }}
        >
          Acquire cryptoassets in a fun and low risk way, by taking lessons and
          testing your knowledge.
        </p>
      )}

      <ScoreArea correct={correct} incorrect={incorrect} />
      <QuizArea handleClick={handleClick} dataSet={dataSet[current]} />
    </div>
  )
}
