pragma solidity ^0.5.8;

import "./ZombieFactory.sol";

// Feed upon crypto-kitties
contract KittyInterface {
    function getKitty(uint256 _id) external view returns (
        bool isGestating,
        bool isReady,
        uint256 cooldownIndex,
        uint256 nextActionAt,
        uint256 siringWithId,
        uint256 birthTime,
        uint256 matronId,
        uint256 sireId,
        uint256 generation,
        uint256 genes
    );
}

contract ZombieFeeding is ZombieFactory {
    // address ckAddress = 0x06012c8cf97BEaD5deAe237070F9587f8E7A266d;
    KittyInterface kittyContract; // = KittyInterface(ckAddress);
    // do nothing
    function feedAndMultiply(uint _zombieId, uint _targetDna,
            string memory _species) internal {
        require(msg.sender == zombieToOwner[_zombieId], "You can only feed your own zombies!");
        Zombie storage myZombie = zombies[_zombieId];
        require(_isReady(myZombie), "The zombie is not ready!");
        uint safeDna = _targetDna % dnaModulus;
        uint newDna = (myZombie.dna + safeDna) / 2;

        if (keccak256(abi.encodePacked(_species)) == keccak256(abi.encodePacked("kitty"))) {
            newDna = newDna - newDna % 100 + 99;
        }
        _createZombie("NoName", newDna);
        _triggerCooldown(myZombie);
    }

    function setKittyContractAddress(address _address) external onlyOwner {
        kittyContract = KittyInterface(_address);
    }

    function _triggerCooldown(Zombie storage _zombie) internal {
        _zombie.readyTime = uint32(now + cooldownTime);
    }

    function _isReady(Zombie storage _zombie) internal view returns (bool) {
        return (_zombie.readyTime <= now);
    }

    function feedOnKitty(uint _zombieId, uint _kittyId) public {
        uint256 genes;

        (,,,,,,,,,
        genes) = kittyContract.getKitty(_kittyId);
        feedAndMultiply(_zombieId, genes, "kitty");
    }
}
