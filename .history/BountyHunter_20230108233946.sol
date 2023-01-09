// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract BountyHunter {
    struct Task {
        uint8 id;
        string IPFSCid;
        uint256 reward;
        bool completed;
        address owner;
        uint256 price;
        bool isProject;
    }

    uint8 id = 0;

    mapping(uint256 => address) ownerById;
    mapping(uint256 => address) public winner;
    mapping(address => uint256[]) tasksByWinner;
    mapping(address => uint256[]) tasksByOwner;
    mapping(address => uint256[]) subscriptions;
    mapping(uint256 => uint256[]) internal answers;
    mapping(address => uint256[]) isBlackListed;

    modifier isSubscribed(address _user, uint256 _taskId) {
        if (subscriptions[_user].length == 0) subscriptions[_user][0] = 999999999;
        for (uint8 i = 0; i < subscriptions[_user].length; i++) {
            require(subscriptions[_user][i] == _taskId, "You are not subscribed to this task");
        }
        _;
    }

    Task[] public tasks;

    event taskAdded(address indexed _from, uint8 indexed _id, uint256 _value);
    event subscribed(address indexed _from, uint256 _value);
    event taskCompleted(address indexed _to, uint256 indexed _taskId);
    event projectRewarded(address indexed _to, uint256 indexed _taskId);
    event wrongAnswer(address indexed _from, uint256 indexed _taskId);
    event rewardCollected(
        address indexed _to,
        uint8 indexed _taskId,
        uint256 _value
    );

    function addTask(
        string memory _IPFSCid,
        uint256 _reward,
        uint256 _price,
        bool _isProject,
        uint256[] memory _answers
    ) public payable {
        require(msg.value >= _reward, "You forgot to transfer the reward");
        tasks.push(
            Task({
                id: id,
                IPFSCid: _IPFSCid,
                reward: msg.value,
                completed: false,
                owner: msg.sender,
                price: _price,
                isProject: _isProject
            })
        );
        tasksByOwner[msg.sender].push(id);
        ownerById[id] = msg.sender;
        answers[id] = _answers;
        emit taskAdded(msg.sender, id, msg.value);
        id++;
    }

    function getAnswers(uint256 _taskId)
        public
        view
        returns (uint256[] memory)
    {
        return answers[_taskId];
    }

    function getOwnerById(uint256 _id) public view returns (address) {
        return tasks[_id].owner;
    }

    function getAllTasks() public view returns (Task[] memory) {
        return tasks;
    }

    function getAllTasksByOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        return tasksByOwner[_owner];
    }

    function getAllTasksByWinner(address _winner)
        public
        view
        returns (uint256[] memory)
    {
        return tasksByWinner[_winner];
    }

    function subscribe(uint256 _taskId) public payable {
        require(
            msg.value >= tasks[_taskId].price,
            "You did not send enough money"
        );
        require(id != _taskId);
        subscriptions[msg.sender].push(_taskId);
        tasks[_taskId].reward += msg.value;
        emit subscribed(msg.sender, msg.value);
    }

    function getSubscriptions(address _subscriber)
        public
        view
        returns (uint256[] memory)
    {
        return subscriptions[_subscriber];
    }

    function transferReward(uint8 _taskId, uint256 _value)
        public
        payable
        returns (bool, bytes memory)
    {
        require(tasks[_taskId].isProject);
        require(
            winner[_taskId] == msg.sender,
            "You must be the winner to collect the reward"
        );
        (bool sent, bytes memory data) = msg.sender.call{value: _value}("");
        emit rewardCollected(msg.sender, _taskId, msg.value);
        return (sent, data);
    }

    function completeProject(address _to, uint8 _taskId) public isSubscribed(_to, _taskId) {
        require(tasks[_taskId].isProject);
        require(
            tasks[_taskId].owner == msg.sender,
            "You're not the owner of this task"
        );
        winner[_taskId] = _to;
        tasksByWinner[_to].push(_taskId);
        emit projectRewarded(_to, _taskId);
    }

    function completeQuiz(uint8 _taskId, uint256[] memory _answers)
        public
        payable
        isSubscribed(msg.sender, _taskId)
        returns (bool _sent, bytes memory _data)
    {
        for (uint8 i = 0; i < isBlackListed[msg.sender].length; i++) {
            require(
                isBlackListed[msg.sender][i] != _taskId,
                "You may not try again"
            );
        }
        isBlackListed[msg.sender].push(_taskId);
        if (
            keccak256(abi.encodePacked(answers[_taskId])) ==
            keccak256(abi.encodePacked(_answers))
        ) {
            winner[_taskId] = msg.sender;
            tasksByWinner[msg.sender].push(_taskId);
            tasks[_taskId].completed = true;
            emit taskCompleted(msg.sender, _taskId);
            (bool sent, bytes memory data) = msg.sender.call{
                value: tasks[_taskId].reward
            }("");
            emit rewardCollected(msg.sender, _taskId, msg.value);
            return (sent, data);
        } else {
            emit wrongAnswer(msg.sender, _taskId);
        }
    }

    function contractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
