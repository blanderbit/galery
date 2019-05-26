import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { FindManyOptions, MongoRepository, ObjectLiteral } from 'typeorm';
import Web3 from 'web3';

import abi from './../../../truffle/build/contracts/ArtworkGallery.json';
import { ArtworkGalleryInstance } from '../../../truffle/app/contracts/index';
import { CreateGalleryDto } from './dtos/create-gallery.dto';
import { UpdateGalleryDto } from './dtos/update-gallery.dto';
import { Gallery } from './gallery.entity';
import { environment } from '../environment/environment';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private readonly mongoRepository: MongoRepository<Gallery>,
  ) { }

  async findAll(where?: FindManyOptions<Gallery>) {
    return this.mongoRepository.find(where);
  }

  findAllAggregate(where?: ObjectLiteral[]) {
    return this.mongoRepository.aggregateEntity(where).toArray();
  }

  async create(
    createItemDto: CreateGalleryDto,
    authUser: User,
  ): Promise<Gallery> {
    const where: FindManyOptions<Gallery> = {
      where: {
        address: createItemDto.address,
      },
    };
    const item = await this.mongoRepository.findOne(where);
    if (item) {
      throw new HttpException('Gallery exists.', 409);
    }

    const newItem = this.mongoRepository.create({
      ...createItemDto,
      ownerAddress: authUser.publicAddress,
    });
    return this.mongoRepository.save(newItem);
  }

  async findOne(where: FindManyOptions<Gallery> | string): Promise<Gallery> {
    return await this.mongoRepository.findOne(where);
  }

  async patch(
    address: string,
    updateItemDto: UpdateGalleryDto,
    authUser: User,
  ): Promise<Gallery> {
    const where: FindManyOptions<Gallery> = {
      where: {
        address,
      },
    };
    const item = await this.mongoRepository.findOne(where);
    if (!item) {
      throw new HttpException(
        `Gallery with address ${address} is not found in database`,
        401,
      );
    }
    if (item.ownerAddress !== authUser.publicAddress) {
      throw new HttpException(`You can edit only your gallery`, 401);
    }
    const newUserData = { ...item, ...updateItemDto };
    await this.mongoRepository.update(item, updateItemDto);
    return newUserData;
  }

  async checkOwner({
    galleryId,
    authUser,
  }: {
    galleryId: string;
    authUser: User;
  }): Promise<Gallery> {
    const gallery = await this.mongoRepository.findOne(galleryId);
    try {
      const web3 = new Web3(environment.localEthNetwork);
      const contract = new web3.eth.Contract(abi.abi as any, gallery.address);
      const ownerOf = await contract.methods.owner.call();
      const priceBN = await contract.methods.getContractPrice.call();
      const price = priceBN.toNumber();
      this.mongoRepository.update(gallery, {
        price,
        ownerAddress: ownerOf.toLowerCase(),
      });
      gallery.ownerAddress = ownerOf;
      gallery.price = price;
    } catch (error) {
      // console.log(error);
    }
    return gallery;
  }
}
