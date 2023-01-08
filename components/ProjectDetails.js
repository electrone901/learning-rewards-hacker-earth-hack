import React from 'react'
import { SimpleGrid, Box, Button } from '@chakra-ui/react'
import styles from '../styles/Home.module.css'

function ProjectDetails(props) {
  return (
    <div>
      <h1>Project Name and Details</h1>

      <SimpleGrid columns={2} spacing={10}>
        <Box bg="transparent">
          <SimpleGrid columns={2} spacing={10}>
            <Box bg="transparent">
              <h1>Author info</h1>
              <img
                src="https://images.unsplash.com/photo-1534705867302-2a41394d2a3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                alt="user"
              />
            </Box>
            <Box bg="transparent">
              <Box bg="transparent">
                <h1>Presentation and Video</h1>
              </Box>
            </Box>
          </SimpleGrid>

          <div>Project details and description</div>
        </Box>

        {/* chat */}
        <Box bg="transparent">
          <Button
            className={styles.savePost}
            variant="outline"
            // onClick={() => setShowFirstPart()}
          >
            Subscribe
          </Button>
        </Box>
      </SimpleGrid>
    </div>
  )
}

export default ProjectDetails
