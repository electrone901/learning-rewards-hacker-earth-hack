import { Text, VStack, HStack, Image, Box, SimpleGrid } from "@chakra-ui/react";
import styles from "../styles/Home.module.css";
import RewardPill from "./RewardPill";

type QuestCardProps = {
  title: string;
  description: string;
  image_url: string;
  handleClick: (e: any) => void;
  isLocked?: boolean;
};

export default function QuestCard({
  title,
  description,
  image_url,
  handleClick,
  isLocked,
}: QuestCardProps) {
  return (
    <HStack
      className={isLocked ? styles.lockedQuest : styles.questCard}
      onClick={handleClick}
    >
      <VStack alignItems="flex-start" gap={3} opacity={isLocked ? 0.55 : 1}>
        <VStack alignItems="flex-start">
          <HStack>
            <Box w="36px">
              <Image src="/sun.png" alt="sunswap"></Image>
            </Box>
            <Text className={styles.title}>{title}</Text>
          </HStack>
          <Text className={styles.subtitle}>{description}</Text>
        </VStack>
        <HStack>
          <RewardPill imageUrl="/coin.svg" label="$10 SUN" />
          <RewardPill imageUrl="/badge.svg" label="NFT Badge" />
          <RewardPill imageUrl="/sparkle.svg" label="1000 XP" />
        </HStack>
      </VStack>
      <Box w={144} opacity={isLocked ? 0.55 : 1}>
        <Image src={image_url} alt="tronnaut" borderRadius={20}></Image>
      </Box>
    </HStack>
  );
}
