pragma solidity ^0.5.0;

// import "./SafeMath.sol";
import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
// import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721Enumerable.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721Metadata.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721Mintable.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721MetadataMintable.sol";
// import "./erc721.sol";

contract ArtworkGallery is ERC721, ERC721Enumerable, ERC721Metadata, ERC721Mintable, ERC721MetadataMintable, Ownable {

    uint128 private _contractPrice;

    constructor () public ERC721Metadata("Ark Token", "ARK") {
        // solhint-disable-previous-line no-empty-blocks
    }

    function setContractPrice(uint128 newContractPrice) external onlyOwner {
        require(newContractPrice > 0, "ContractPrice must be greater then 0");
        _contractPrice = newContractPrice;
    }

    function getContractPrice() public view returns (uint128) {
        return _contractPrice;
    }

    function cancelContractSale() external onlyOwner {
        _contractPrice = 0;
    }

    function purchaseContract() external payable {
        require(_contractPrice != 0, "ContractPrice not be 0");
        require(msg.value >= _contractPrice, "Price must not smaller then set owner");

        address payable oldOwner = address(uint160(owner()));

        oldOwner.transfer(msg.value);

        _addMinter(msg.sender);
        _removeMinter(oldOwner);
        _transferOwnership(msg.sender);

        _contractPrice = 0;
    }

}