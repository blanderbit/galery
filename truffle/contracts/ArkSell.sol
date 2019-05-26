pragma solidity ^0.5.0;

import "./artwork-factory.sol";

contract ArkSell {
    ArtworkGallery public nonFungibleContract;

    struct TokenPrice {
        address payable seller;
        uint128 price;
    }

    mapping (uint256 => TokenPrice) public tokenIdToPrice;

    constructor(address _nftAddress) public {
        require(_nftAddress != address(0) && _nftAddress != address(this), "Address not 0");
        nonFungibleContract = ArtworkGallery(_nftAddress);
    }

    function setPrice( uint256 _tokenId, uint128 _price ) public {
        nonFungibleContract.getApproved(_tokenId);
        TokenPrice memory _tokenPrice = TokenPrice({
            seller: msg.sender,
            price: uint128(_price)
        });
        tokenIdToPrice[_tokenId] = _tokenPrice;
    }

    function purchaseToken( uint256 _tokenId ) public payable {
        TokenPrice memory _tokenPrice = tokenIdToPrice[_tokenId];
        require(_tokenPrice.seller != address(0), "Seller not be 0");
        require(msg.value >= _tokenPrice.price, "Price must not smaller then set owner");

        address payable seller = _tokenPrice.seller;

        delete tokenIdToPrice[_tokenId];

        seller.transfer(msg.value);
        nonFungibleContract.transferFrom(_tokenPrice.seller, msg.sender, _tokenId);
    }

    function cancel( uint256 _tokenId ) public {
        TokenPrice memory _tokenPrice = tokenIdToPrice[_tokenId];
        require(_tokenPrice.seller == msg.sender, "Only owner");

        delete tokenIdToPrice[_tokenId];

        nonFungibleContract.transferFrom(_tokenPrice.seller, msg.sender, _tokenId);
    }
}