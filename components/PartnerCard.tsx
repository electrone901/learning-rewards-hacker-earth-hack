import { Text, VStack, HStack, Image, Box, SimpleGrid } from '@chakra-ui/react'
import styles from '../styles/Home.module.css'
import RewardPill from './RewardPill'

type QuestCardProps = {
  title: string
  handleClick: (e: any) => void
  isLocked?: boolean
}

export default function QuestCard({
  task,
  handleClick,
  isLocked,
}: QuestCardProps) {
  return (
    <HStack
      className={isLocked ? styles.lockedQuest : styles.questCard}
      onClick={handleClick}
    >
      <VStack alignItems="flex-start" gap={3} opacity={isLocked ? 0.55 : 1}>
        <HStack>
          <Box w="100px">
            <Image
              src={task.image ? task.image : '/coin.svg'}
              style={{ borderRadius: '50%' }}
              alt="task.image "
            ></Image>
          </Box>
          <VStack alignItems="flex-start">
            <Text className={styles.title}>{task.name}</Text>
            <Text className={(styles.subtitle, styles.limitCharacters)}>
              {task.description}
            </Text>
            <HStack>
              <RewardPill imageUrl="/l.png" label={task.level} />
              <RewardPill imageUrl="/coin.png" label={task.nft_reward} />
              <RewardPill imageUrl="/badgeicon.png" label="100Points" />
              <RewardPill
                imageUrl="/badgeicon.png"
                label={`Entry fee: ${task.fee}`}
              />
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </HStack>
  )
}
