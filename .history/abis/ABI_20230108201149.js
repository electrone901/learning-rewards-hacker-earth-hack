export const ABI = [
  {
    inputs: [
      {
        internalType: 'string',
        name: '_IPFSCid',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_reward',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_price',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: '_isProject',
        type: 'bool',
      },
      {
        internalType: 'uint256[]',
        name: '_answers',
        type: 'uint256[]',
      },
    ],
    name: 'addTask',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint8',
        name: '_taskId',
        type: 'uint8',
      },
    ],
    name: 'completeProject',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: '_taskId',
        type: 'uint8',
      },
      {
        internalType: 'uint256[]',
        name: '_answers',
        type: 'uint256[]',
      },
    ],
    name: 'completeQuiz',
    outputs: [
      {
        internalType: 'bool',
        name: '_sent',
        type: 'bool',
      },
      {
        internalType: 'bytes',
        name: '_data',
        type: 'bytes',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: '_taskId',
        type: 'uint256',
      },
    ],
    name: 'projectRewarded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint8',
        name: '_taskId',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'rewardCollected',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_taskId',
        type: 'uint256',
      },
    ],
    name: 'subscribe',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_from',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'subscribed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint8',
        name: '_id',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'taskAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: '_taskId',
        type: 'uint256',
      },
    ],
    name: 'taskCompleted',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: '_taskId',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transferReward',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'contractBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAllTasks',
    outputs: [
      {
        components: [
          {
            internalType: 'uint8',
            name: 'id',
            type: 'uint8',
          },
          {
            internalType: 'string',
            name: 'IPFSCid',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'reward',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'completed',
            type: 'bool',
          },
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isProject',
            type: 'bool',
          },
        ],
        internalType: 'struct BountyHunter.Task[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'getAllTasksByOwner',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_winner',
        type: 'address',
      },
    ],
    name: 'getAllTasksByWinner',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_taskId',
        type: 'uint256',
      },
    ],
    name: 'getAnswers',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
    ],
    name: 'getOwnerById',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_subscriber',
        type: 'address',
      },
    ],
    name: 'getSubscriptions',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        internalType: 'struct BountyHunter.TaskId[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'isBlackListed',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'tasks',
    outputs: [
      {
        internalType: 'uint8',
        name: 'id',
        type: 'uint8',
      },
      {
        internalType: 'string',
        name: 'IPFSCid',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'reward',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'completed',
        type: 'bool',
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'isProject',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'winner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]
