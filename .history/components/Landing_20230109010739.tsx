import {
  Button,
  VStack,
  Image,
  Box,
  Text,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { handleConnect } from "@utils/web3";
import { useState, useContext, useEffect } from "react";
import styles from "../styles/Home.module.css";
import withTransition from "./withTransition";
import ConnectWallet from "./web3/ConnectWallet";
import { MyAppContext } from "../pages/_app";
import { ethers } from "ethers";
import { ABI } from "../abis/ABI";
import { disconnect } from "process";

const getEthereumObject = () => window.ethereum;

export function Landing() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const {
    account,
    setAccount,
    contract,
    setContract,
    provider,
    setProvider,
    signer,
    setSigner,
  } = useContext(MyAppContext);
  console.log("____contract", contract);

  const findAccount = async () => {
    setAccount(account);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fetchedAddress = window.localStorage.getItem("ACCOUNT");
      if (!account && fetchedAddress) setAccount(fetchedAddress);
      if (account && account !== fetchedAddress)
        window.localStorage.setItem("ACCOUNT", account);
    }

    findAccount().then(async (account) => {
      if (account !== null) {
        const { chainId } = await provider.getNetwork();
        console.log(
          "🚀 ~ file: Landing.tsx:68 ~ findAccount ~ chainId",
          chainId
        );
        const signer = provider.getSigner();
        setSigner(signer);

        if (chainId == 1001) {
          const deployedContract = "0x70bE996181753b9A767753C4d91030573c638295";
          let contract = new ethers.Contract(deployedContract, ABI, signer);
          setContract(contract);
        } else if (chainId == 80001) {
          const deployedContract = "0x1b91ec002a6db58adD892d264Bd0b7FBc377C13d";
          let contract = new ethers.Contract(deployedContract, ABI, signer);
          setContract(contract);
        }
      }
    });
  }, []);

  const connectWallet = async () => {
    try {
      const ethereum = getEthereumObject();
      if (!ethereum) {
        alert("Please get a Wallet!");
        return;
      }
      setProvider(new ethers.providers.Web3Provider(window.ethereum));
      await window.ethereum
        .request({
          method: "wallet_requestPermissions",
          params: [
            {
              eth_accounts: {},
            },
          ],
        })
        .then(() =>
          ethereum.request({
            method: "eth_requestAccounts",
          })
        )
        .then((account: string) => {
          if (account.length > 0) {
            setAccount(account[0]);
            window.localStorage.setItem("isWalletConnected", true);
            const fetchedAddress = window.localStorage.getItem("ACCOUNT");
            if (!account && fetchedAddress) setAccount(fetchedAddress);
            if (account && account !== fetchedAddress)
              window.localStorage.setItem("ACCOUNT", account);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.landing}>
        <VStack gap={3} zIndex={1}>
          <VStack>
            <Box w={400}>
              <Image src="/logo2.png" alt="Learning rewards" />
            </Box>
            <Text className={styles.title}>
              Please connect your wallet to continue.
            </Text>
          </VStack>
          {/* <Button onClick={connectWallet} className={styles.connectButton}>
            Connect with Metamask
          </Button> */}
          <ConnectWallet />
        </VStack>
        <Box className={styles.ellipseOne}></Box>
      </main>
    </div>
  );
}

export default withTransition(Landing);

// working from here
// import { Button, VStack, Image, Box, Text, Spinner } from '@chakra-ui/react'
// import { handleConnect } from '@utils/web3'
// import { useState, useContext, useEffect } from 'react'
// import styles from '../styles/Home.module.css'
// import withTransition from './withTransition'
// import { MyAppContext } from '../pages/_app'
// import { ethers } from 'ethers'
// import { ABI } from '../abis/ABI'
// import { disconnect } from 'process'
// const getEthereumObject = () => window.ethereum

// /*
//  * This function returns the first linked account found.
//  * If there is no account linked, it will return null.
//  */
// const findAccount = async () => {
//   try {
//     const ethereum = getEthereumObject()
//     /*
//      * First make sure we have access to the Ethereum object.
//      */
//     if (!ethereum) {
//       console.error('Make sure you have Metamask!')
//       return null
//     }
//     const accounts = await ethereum.request({ method: 'eth_accounts' })
//     if (accounts.length !== 0) {
//       const account = accounts[0]
//       window.localStorage.setItem('ACCOUNT', account)
//       return account
//     } else {
//       console.error('No authorized account found')
//       return null
//     }
//   } catch (error) {
//     console.error(error)
//     return null
//   }
// }

// export function Landing() {
//   const [isLoading, setLoading] = useState<boolean>(false)
//   const {
//     account,
//     setAccount,
//     contract,
//     setContract,
//     provider,
//     setProvider,
//     signer,
//     setSigner,
//     allTasks,
//     setAllTasks,
//   } = useContext(MyAppContext)
//   // console.log('__allTasks LANDING', allTasks)

//   const getAllTasks = async (contract) => {
//     const data = []

//     const allTasks = await contract.getAllTasks()
//     setAllTasks(allTasks)

//     for (let i = 0; i < allTasks.length; i++) {
//       const obj = {}
//       const IPFSCid = allTasks[i].IPFSCid
//       const completed = allTasks[i].completed
//       const id = allTasks[i].id
//       const owner = allTasks[i].owner
//       const price = allTasks[i].price.toString()
//       const reward = allTasks[i].reward.toString()

//       console.log(
//         'IPFSCid, completed',
//         IPFSCid,
//         completed,
//         id,
//         owner,
//         price,
//         reward,
//       )

//       let getNFTStorageData = await fetch(IPFSCid)
//       let temp = await getNFTStorageData.json()
//       const task = JSON.parse(temp.description)
//       console.log('task', task)
//       obj.completed = completed
//       obj.id = id
//       obj.owner = owner
//       obj.price = price
//       obj.reward = reward
//       obj.description = task.description
//       obj.experiencePoint = task.experiencePoint
//       obj.image = task.image
//       obj.level = task.level
//       obj.questionsArray = task.questionsArray
//       obj.rewardAmount = task.rewardAmount
//       obj.subscriptionFee = task.subscriptionFee
//       obj.title = task.title
//       data.push(obj)
//     }

//     console.log('ARRAY data', data)
//     setAllTasks(data)
//   }

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const fetchedAddress = window.localStorage.getItem('ACCOUNT')
//       if (!account && fetchedAddress) setAccount(fetchedAddress)
//       if (account && account !== fetchedAddress)
//         window.localStorage.setItem('ACCOUNT', account)
//     }

//     findAccount().then(async (account) => {
//       if (account !== null) {
//         // setAccount(account)
//         const providerTemp = new ethers.providers.Web3Provider(window.ethereum)
//         setProvider(providerTemp)
//         const { chainId } = await providerTemp.getNetwork()
//         const deployedContract = '0x6239B8e5dFE71564f580FDA36609A6D96229B3B7'
//         const signer = providerTemp.getSigner()
//         setSigner(signer)

//         if (chainId == 1001) {
//           const deployedContract = '0x6239B8e5dFE71564f580FDA36609A6D96229B3B7'
//           let contract = new ethers.Contract(deployedContract, ABI, signer)
//           setContract(contract)
//         } else if (chainId == 80001) {
//           const deployedContract = '0x84260728E9A7fEA9Ab39f8Ca583Ed0afa2557bC0'
//           let contract = new ethers.Contract(deployedContract, ABI, signer)
//           setContract(contract)
//         } else {
//           alert('Please connect to Klaynt Test Network!')
//         }
//       }
//     })
//   }, [account])

//   const connectWallet = async () => {
//     try {
//       const ethereum = getEthereumObject()
//       if (!ethereum) {
//         alert('Please get a Wallet!')
//         return
//       }
//       const providerTemp = new ethers.providers.Web3Provider(window.ethereum)
//       providerTemp.send('eth_requestAccounts', []).then((accounts) => {
//         if (accounts.length > 0) {
//           setAccount(accounts[0])
//           const fetchedAddress = window.localStorage.getItem('ACCOUNT')
//           if (!account && fetchedAddress) setAccount(fetchedAddress)
//           if (account && account !== fetchedAddress)
//             window.localStorage.setItem('ACCOUNT', account)
//         }
//       })
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   return (
//     <div className={styles.container}>
//       <main className={styles.landing}>
//         <VStack gap={3} zIndex={1}>
//           <VStack>
//             <Box w={400}>
//               <Image src="/logo2.png" alt="Learning rewards" />
//             </Box>
//             <Text className={styles.title}>
//               Please connect your wallet to continue.
//             </Text>
//           </VStack>
//           <Button
//             onClick={() => connectWallet()}
//             className={styles.connectButton}
//           >
//             Connect Wallet
//           </Button>
//         </VStack>
//         <Box className={styles.ellipseOne}></Box>
//       </main>
//     </div>
//   )
// }

// export default withTransition(Landing)
