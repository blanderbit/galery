import { ArtworkGalleryContract, ArtworkGalleryInstance } from "app/contracts";

const ARK: ArtworkGalleryContract = artifacts.require("ArtworkGallery");

contract("ArtworkGallery", ([owner, ...account]) => {
    let instance: ArtworkGalleryInstance;

    describe('test Function sell ARK', () => {

        it("Should make first account an owner", async () => {
            instance = await ARK.new({ from: owner });
            let _owner = await instance.owner();
            assert.equal(_owner, owner);
        });

        it("Set price = 10", async () => {
            let price = 10;
            await instance.setContractPrice(price, { from: owner });
            let storedPrice = await instance.getContractPrice();
            assert.equal(storedPrice.toNumber(), price)
        })

        it("The first address is buying a contract", async () => {
            let price = 10;
            await instance.purchaseContract({ from: account[0], value: price });
            let _owner = await instance.owner();
            assert.equal(_owner, account[0])
        })

        it("Contract price = 0", async () => {
            let storedPrice = await instance.getContractPrice();
            assert.equal(storedPrice.toNumber(), 0)
        })

        it("The second address is buying a contract when price 0", async () => {
            let price = 10;
            let message = "";
            try {
                await instance.purchaseContract({ from: account[1], value: price });
            } catch (error) {
                message = error.message;
            }
            assert.include(message, 'ContractPrice not be 0')
            // assert.isNotOk(await instance.purchaseContract({ from: account[0], value: price }), "ContractPrice not be 0")
        })

        it("Account[0] is still owner", async () => {
            let _owner = await instance.owner();
            assert.equal(_owner, account[0]);
        })

        it("Account[0] set price = 5", async () => {
            let price = 10;
            await instance.setContractPrice(price, { from: account[0] });
            let storedPrice = await instance.getContractPrice();
            assert.equal(storedPrice.toNumber(), price)
        });

        it("Account[0] cancel sell", async () => {
            await instance.cancelContractSale({ from: account[0] });
            let storedPrice = await instance.getContractPrice();
            assert.equal(storedPrice.toNumber(), 0)
        })

    });

});
