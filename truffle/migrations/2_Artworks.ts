const ArtworkGallery = artifacts.require("ArtworkGallery");

module.exports = async function (deployer) {
    deployer.deploy(ArtworkGallery);
} as Truffle.Migration;

export { };