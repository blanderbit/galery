import { ArtworkGalleryContract, ArtworkGalleryInstance, ArkSellContract, ArkSellInstance } from "../app/contracts";

const ARK: ArtworkGalleryContract = artifacts.require("ArtworkGallery");
const ArkSell: ArkSellContract = artifacts.require("ArkSell");

contract("Sell", ([owner, ...account]) => {
    let nft: ArtworkGalleryInstance,
        dealer: ArkSellInstance;

    before(async () => {
        // nft = await ARK.at("0x427626d5D5268c5368A5931D44EB9A2aaA0375a2");
        nft = await ARK.new({ from: owner });
        dealer = await ArkSell.new(nft.address, { from: owner });
        // dealer = await ArkSell.deployed();
    });

    it("Should accept nft on creation", async () => {
        // await dealer.TokenSell(nft.address);
        const nftAddr = await dealer.nonFungibleContract();
        assert.equal(nftAddr, nft.address);
    });

    it("Should take ownership of a token", async () => {
        let totalSupply = (await nft.totalSupply()).toNumber();
        const tokenId = totalSupply + 1;
        const mint1 = await nft.mint(owner, tokenId, { from: owner });
        const tokenOwner = (await nft.balanceOf(owner)).toNumber();
        const approve = await nft.approve(dealer.address, tokenId, { from: owner });
        const ownerOf = await nft.ownerOf(tokenId);
        const getApproved = await nft.getApproved(tokenId);
        const setPrice = await dealer.setPrice(tokenId, 10);
        totalSupply = (await nft.totalSupply()).toNumber();
        // console.log({ owner, tokenId, tokenOwner, totalSupply, ownerOf, dealerAddress: dealer.address });
        assert.equal(getApproved, dealer.address);
    });
});
