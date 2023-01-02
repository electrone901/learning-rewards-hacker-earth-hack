import { Button, VStack, Image, Select, Text, Input } from '@chakra-ui/react'
import { handleConnect } from '@utils/web3'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import withTransition from './withTransition'

function CreateContentFirstPart({
  setShowFirstPart,
  setTitle,
  setImage,
  image,
  setDescription,
  setLevel,
  setRewardAmount,
  setExperiencePoint,
  setSubscriptionFee,
}) {
 
  // const [tittle, setTitle] = useState<string>('')
  // const [image, setImage] = useState<string>('')
  // const [description, setDescription] = useState<string>('')
  // const [level, setLevel] = useState<string>('')
  // const [rewardAmount, setRewardAmount] = useState<string>('')
  // const [experiencePoint, setExperiencePoint] = useState<string>('')

  const handleImage = async (event) => {
    setImage(event.target.files[0])
  }

  return (
    <div style={{ width: '80%' }}>
      <div style={{ paddingTop: '.5rem', paddingBottom: '1rem' }}>
        <label htmlFor="formFileImage5" className={styles.upload}>
          + Upload Image
        </label>
        <input
          type="file"
          id="formFileImage5"
          onChange={handleImage}
          defaultValue={image}
          style={{ display: 'none' }}
          required
        />
      </div>

      <div style={{ paddingTop: '.5rem' }}>
        <Text mb="8px">Title</Text>
        <Input
          // value={question}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          size="md"
        />

        <Text mb="8px" style={{ paddingTop: '1rem' }}>
          Description
        </Text>
        <Input
          // value={question}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          size="md"
        />

        <Text mb="8px" style={{ paddingTop: '1rem' }}>
          Level
        </Text>
        <Select
          placeholder="Select level"
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="Beginner">Beginner</option>
          <option value="Medium">Medium</option>
          <option value="Advance">Advance</option>
        </Select>

        <Text mb="8px" style={{ paddingTop: '1rem' }}>
          Reward Amount
        </Text>
        <Input
          // value={question}
          onChange={(e) => setRewardAmount(e.target.value)}
          placeholder="Reward Amount"
          size="md"
        />

        <Text mb="8px" style={{ paddingTop: '1rem' }}>
          Subscription Fee
        </Text>
        <Input
          // value={question}
          onChange={(e) => setSubscriptionFee(e.target.value)}
          placeholder="Subscription Fee"
          size="md"
        />
      </div>

      <Button
        className={styles.savePost}
        variant="outline"
        onClick={() => setShowFirstPart()}
      >
        Next
      </Button>
    </div>
  )
}

export default withTransition(CreateContentFirstPart)
