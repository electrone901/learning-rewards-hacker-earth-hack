// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";

contract BountyHunter {
    struct Task {
        uint8 id;
        string IPFSCid;
        uint256 reward;
        bool completed;
        address owner;
        uint256 price;
    }

    struct TaskId {
        uint id;
    }

    uint8 id = 0;

    mapping(uint256 => address) public ownerById;
    mapping(uint256 => address) public winner;
    mapping(address => uint[]) tasksByWinner;
    mapping(address => uint[]) tasksByOwner;
    mapping(address => TaskId[]) subscriptions;

    Task[] public tasks;

    event taskAdded(address indexed _from, uint8 indexed _id, uint _value);
    event subscribed(address indexed _from, uint _value);
    event taskCompleted(address indexed _to, uint indexed _taskId);
    event rewardCollected(address indexed _to, uint8 indexed _taskId, uint _value);

    function addTask(
        string memory _IPFSCid,
        uint256 _reward,
        uint256 _price
    ) public payable {
        require(msg.value >= _reward, "You forgot to transfer the reward");
        tasks.push(
            Task({
                id: id,
                IPFSCid: _IPFSCid,
                reward: msg.value,
                completed: false,
                owner: msg.sender,
                price: _price
            })
        );
        tasksByOwner[msg.sender].push(id);
        ownerById[id] = msg.sender;
        emit taskAdded(msg.sender, id, msg.value);
        id++;

    }

    function getOwnerById(uint256 _id) public view returns (address) {
        return tasks[_id].owner;
    }

    function getAllTasks() public view returns (Task[] memory) {
        return tasks;
    }

    function getAllTasksByOwner(address _owner)
        public view
        returns (uint[] memory)
    {
        return tasksByOwner[_owner];
        
    }

    // function getAllTasksByOwner() public view returns (Task[] memory) {
    //     return tasksByOwner;
    // }

    function getAllTasksByWinner(address _winner)
        public view
        returns (uint[] memory)
    {
        return tasksByWinner[_winner];
    }

    function subscribe(uint256 _taskId) public payable {
        require(msg.value >= tasks[_taskId].price, "You did not send enough money");
        subscriptions[msg.sender].push(TaskId(_taskId));
        tasks[_taskId].reward += msg.value;
        emit subscribed(msg.sender, msg.value);
    }

    function getSubscriptions(address _subscriber)
        public
        view
        returns (TaskId[] memory)
    {
        return subscriptions[_subscriber];
    }

    function transferReward(uint8 _taskId)
        public
        payable
        returns (bool, bytes memory)
    {
        require(winner[_taskId] == msg.sender, "You must be the winner to collect the reward");
        (bool sent, bytes memory data) = msg.sender.call{
            value: tasks[_taskId].reward
        }("");
        emit rewardCollected(msg.sender, _taskId, msg.value);
        return (sent, data);
    }

    function completeTask(address _to, uint8 _taskId) public {
        require(tasks[_taskId].owner == msg.sender, "You're not the owner of this task");
        winner[_taskId] = _to;
        tasksByWinner[_to].push(_taskId);
        tasks[_taskId].completed = true;
        emit taskCompleted(_to, _taskId);
    }

    function contractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
