import {
  Button,
  Input,
  Text,
  Link as ChakraLink,
  VStack,
  HStack,
  Spinner,
  Box,
} from "@chakra-ui/react";
import { useTron } from "@components/TronProvider";
import withTransition from "@components/withTransition";
import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "@styles/Quest.module.css";
import SuccessLottie from "@components/SuccessLottie";
import { useRouter } from "next/router";
import Error404 from "@components/404";

function Twitter() {
  const { address } = useTron();
  const router = useRouter();
  const [fetchedUser, setFetchedUser] = useState<any>();
  const [tweetURL, setTweetURL] = useState("");
  const [isVerified, setVerified] = useState(false);
  const [username, setUsername] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isUserLoading, setUserLoading] = useState(false);

  const goToExplore = useCallback(
    (e: any) => {
      e.preventDefault();
      router.push("/");
    },
    [router]
  );

  const fetchUser = useCallback(async () => {
    if (!address) return;
    setUserLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8888/api/users/${address}`
      );
      if (response.status === 200) {
        const user = await response.json();
        setFetchedUser(user);
      }
    } catch (err) {
      console.log(err);
    }
    setUserLoading(false);
  }, [address]);

  const authLink = useMemo(() => {
    if (!fetchedUser) return "";
    return `https://twitter.com/intent/tweet?text=Verifying+uuid:${fetchedUser.uuid}`;
  }, [fetchedUser]);

  async function verifyTwitter() {
    setLoading(true);
    try {
      const tweetId = tweetURL.split("/")[5];
      const response = await fetch(
        `http://localhost:8888/api/twitter/tweet/${tweetId}`
      );

      if (response.status === 200) {
        const data = await response.json();
        setVerified(true);
        setUsername(data.username);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  function handleURLChange(e) {
    setTweetURL(e.target.value);
  }

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (isUserLoading)
    return (
      <VStack className={styles.loadingContainer}>
        <Spinner color="white" size="xl" />
      </VStack>
    );

  if (!fetchedUser) return <Error404 />;

  return (
    <VStack pt="8rem">
      {fetchedUser.twitter && fetchedUser.twitter.user_id ? (
        <VStack>
          <Text
            className={styles.sectionTitle}
          >{`Hi @${fetchedUser.twitter.username}, your twitter is already linked.`}</Text>
          <Button onClick={goToExplore}>Go to quests</Button>
        </VStack>
      ) : isVerified ? (
        <VStack>
          <Text
            className={styles.sectionTitle}
          >{`Hi @${username}, your verification is successful.`}</Text>
          <SuccessLottie />
          <Button onClick={goToExplore}>Go to quests</Button>
        </VStack>
      ) : (
        <VStack>
          <Text className={styles.sectionTitle}>Connect to Twitter</Text>
          <VStack>
            <HStack className={styles.questStep}>
              <Box minWidth="20px">
                <Text>1</Text>
              </Box>
              <VStack alignItems="flex-start" width="100%">
                <Text className={styles.questStepTitle}>
                  Tweet verification message
                </Text>
                <Text className={styles.questStepDesc}>
                  {`You can delete the tweet as soon as you're verified.`}
                </Text>
              </VStack>
              <HStack w="120px">
                <ChakraLink href={authLink} isExternal>
                  <Button className={styles.twitterButton}>{"Tweet"}</Button>
                </ChakraLink>
              </HStack>
            </HStack>
            <HStack className={styles.questStep}>
              <Box minWidth="20px">
                <Text>2</Text>
              </Box>
              <VStack alignItems="flex-start" width="100%">
                <Text className={styles.questStepTitle}>
                  Paste URL to tweet to verify
                </Text>
                <Input onChange={handleURLChange} width="90%" />{" "}
              </VStack>
              <HStack w="120px">
                <Button
                  onClick={verifyTwitter}
                  className={styles.secondaryButton}
                >
                  {isLoading ? <Spinner /> : "Verify"}
                </Button>
              </HStack>
            </HStack>
          </VStack>
        </VStack>
      )}
    </VStack>
  );
}

export default withTransition(Twitter);
