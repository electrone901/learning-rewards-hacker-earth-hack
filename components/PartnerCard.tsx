import { Text, VStack, HStack, Image, Box, SimpleGrid } from '@chakra-ui/react'
import styles from '../styles/Home.module.css'
import RewardPill from './RewardPill'

type QuestCardProps = {
  task: any
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
      onClick={() => handleClick(task)}
    >
      <VStack alignItems="flex-start" gap={3} opacity={isLocked ? 0.55 : 1}>
        <HStack>
          <Image
            borderRadius="full"
            boxSize="120px"
            src={task.image ? task.image : '/coin.svg'}
            alt="Dan Abramov"
          />

          <VStack alignItems="flex-start">
            <Text className={styles.title}>{task.title}</Text>
            <Text className={(styles.subtitle, styles.limitCharacters)}>
              {task.description}
            </Text>
            <HStack>
              <RewardPill imageUrl="/l.png" label={`Level: ${task.level}`} />
              {/* <RewardPill imageUrl="/coin.png" label={task.reward} /> */}
              <RewardPill
                imageUrl="/coin.png"
                label={`Rewards: ${task.reward} klay`}
              />
              <RewardPill
                imageUrl="/badgeicon.png"
                label={task.experiencePoint}
              />
              <RewardPill
                imageUrl="/badgeicon.png"
                label={`Entry fee: ${task.price} klay`}
              />
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </HStack>
  )
}
