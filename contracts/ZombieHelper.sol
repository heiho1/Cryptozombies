pragma solidity ^0.5.8;

import "./ZombieFeeding.sol";

contract ZombieHelper is ZombieFeeding {

  modifier aboveLevel(uint _level, uint _zombieId) {
      require(zombies[_zombieId].level >= _level,
        "Zombies cannot eat zombies above their level");
      _;
  }

  function changeName(uint _zombieId, string calldata _newName) external aboveLevel(2, _zombieId) {
    require(msg.sender == zombieToOwner[_zombieId], "Only zombie owner can change the zombie.");
    zombies[_zombieId].name = _newName;
  }

  function changeDna(uint _zombieId, uint _newDna) external aboveLevel(20, _zombieId) {
    require(msg.sender == zombieToOwner[_zombieId], "Only zombie owner can change the zombie.");
    zombies[_zombieId].dna = _newDna;
  }

  function getZombiesByOwner(address _owner) external view returns (uint[] memory) {
      uint[] memory result = new uint[](ownerZombieCount[_owner]);
      uint counter = 0;
      for (uint i = 0; i < zombies.length; i++) {
          if (zombieToOwner[i] == _owner) {
              result[counter] = i;
              counter++;
          }
      }
      return result;
  }
}