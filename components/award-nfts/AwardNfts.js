import React, { useState } from 'react'
import {
  Button,
  VStack,
  Image,
  Select,
  HStack,
  Text,
  Input,
  Box,
  Link as ChakraLink,
  Heading,
} from '@chakra-ui/react'
import styles from '../../styles/Home.module.css'

function AwardNfts() {
  const apiKeyport = '5aca4bfa-4460-4000-ada2-dfe2b88831e8'
  const [image, setImage] = useState('')
  const [response, setResponse] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [codeHash, setCodeHash] = useState('')
  let [mintAddress, setMintAddress] = useState(
    '0x11760DB13aE3Aa5Bca17fC7D62172be2A2Ea9C11',
  )
  const file_url =
    'https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'

  const mintWithNFTPort = (event) => {
    event.preventDefault()
    setImage(event.target.files[0])
    if (mintAddress === '') {
      mintAddress = '0xf4eA652F5B7b55f1493631Ea4aFAA63Fe0acc27C'
    }
    const form = new FormData()
    form.append('file', event.target.files)

    const options = {
      method: 'POST',
      body: form,
      headers: {
        Authorization: apiKeyport,
      },
    }

    fetch(
      'https://api.nftport.xyz/v0/mints/easy/files?' +
        new URLSearchParams({
          chain: 'polygon',
          name: name,
          description: description,
          mint_to_address: mintAddress,
          msg: 'NFTs As Tips Powered By NFTPort for being a great user!',
        }),
      options,
    ).then(function (responseJson) {
      if (responseJson) {
        console.log('🚀 ~ file: AwardNfts.js:85 ~ responseJson', responseJson)
        setCodeHash(responseJson)
      } else {
        showError()
      }
      console.log(responseJson)
    })
  }

  const nftPortFunc = (e) => {
    e.preventDefault()
    setImage(e.target.files[0])

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: apiKeyport,
      },
      body: JSON.stringify({
        chain: 'polygon',
        name: name,
        description: description,
        file_url:
          'https://images.unsplash.com/photo-1604351888999-9ea0a2851e61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80',
        mint_to_address: mintAddress,
      }),
    }

    fetch('https://api.nftport.xyz/v0/mints/easy/urls', options)
      .then((response) => {
        console.log('response', response)
        setCodeHash(response)
        return response.json()
      })
      .then((data) => {
        console.log('🚀data', data)
        console.log('🚀data', data?.transaction_external_url)
        setResponse(data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <div style={{ width: '60%', paddingTop: '3rem' }}>
      <Box p={5} shadow="md" borderWidth="1px" style={{ padding: '3rem' }}>
        <Heading fontSize="xl">Send NFTs As Tips Powered By NFTPort</Heading>

        <div style={{ paddingTop: '.5rem' }}>
          <Text mb="8px">NFT name</Text>
          <Input
            // value={question}
            onChange={(e) => setName(e.target.value)}
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
            Reciever Address
          </Text>
          <Input
            // value={question}
            onChange={(e) => setMintAddress(e.target.value)}
            placeholder="MintAddress"
            size="md"
          />

          <div style={{ paddingTop: '2rem', paddingBottom: '1rem' }}>
            <label htmlFor="formFileImage5" className={styles.upload}>
              + Upload NFT
            </label>
            <input
              type="file"
              id="formFileImage5"
              onChange={nftPortFunc}
              defaultValue={image}
              style={{ display: 'none' }}
              required
            />
          </div>
        </div>

        {!response && image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="tip"
            className="img-preview"
          />
        ) : (
          ''
        )}

        {response ? (
          <Box p={5} shadow="md" borderWidth="1px" style={{ padding: '3rem' }}>
            <Heading fontSize="xl">
              Congratulations, Your NFT was minted succesfully 🎉
            </Heading>

            <h3>Confirmation Transaction:</h3>
            <p> {response.transaction_external_url}</p>
            <p>MintedAddress:</p>
            <p>MintedAddress:</p>
            <p>{codeHash.mint_to_address}</p>

            <HStack w="120px">
              <ChakraLink href={response.transaction_external_url} isExternal>
                <Button className={styles.twitterButton}>
                  See transaction details
                </Button>
              </ChakraLink>
            </HStack>
          </Box>
        ) : (
          ''
        )}
      </Box>
    </div>
  )
}

export default AwardNfts
