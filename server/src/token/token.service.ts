import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, MongoRepository, ObjectLiteral } from 'typeorm';
import Web3 from 'web3';

import { User } from '../users/user.entity';
import ArtworkGallery from './../../../truffle/build/contracts/ArtworkGallery.json';
import { CreateTokenDto } from './dtos/create-token.dtos';
import { UpdateTokenDto } from './dtos/update-token.dtos';
import { Token } from './token.entity';
import { environment } from '../environment/environment';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: MongoRepository<Token>,
  ) { }
  async findAll(where?: FindManyOptions<Token>): Promise<Token[]> {
    return await this.tokenRepository.find(where);
  }
  findAllAggregate(where?: ObjectLiteral[]) {
    return this.tokenRepository.aggregateEntity(where).toArray();
  }
  async create(createTokenDto: CreateTokenDto, authUser: User): Promise<Token> {
    const newToken = this.tokenRepository.create({
      ...createTokenDto,
      ownerAddress: authUser.publicAddress,
      authorAddress: authUser.publicAddress,
    });
    return await this.tokenRepository.save(newToken);
  }
  async findOne(where): Promise<Token> {
    return this.tokenRepository.findOne(where);
  }
  async patch(
    tokenId: string,
    updateTokenDto: UpdateTokenDto,
    authUser: User,
  ): Promise<Token> {
    const token = await this.tokenRepository.findOne(tokenId);
    if (!token) {
      throw new HttpException(
        `Token with id ${tokenId} is not found in database`,
        401,
      );
    }
    return await this.tokenRepository.save({
      ...token,
      ...updateTokenDto,
      ownerAddress: authUser.publicAddress,
    });
  }

  async checkOwner({
    tokenId,
    authUser,
  }: {
    tokenId;
    authUser: User;
  }): Promise<Token> {
    const token = await this.tokenRepository.findOne(tokenId);
    try {
      const web3 = new Web3(environment.localEthNetwork);
      const contract = new web3.eth.Contract(
        ArtworkGallery.abi as any,
        token.addressContract,
      );
      const ownerOf = await contract.methods.ownerOf(token.tokenId).call();
      if (ownerOf !== token.ownerAddress) {
        this.tokenRepository.update(token, {
          ownerAddress: ownerOf.toLowerCase(),
          price: 0,
          addressMarketContract: '',
        });
        token.ownerAddress = ownerOf;
        // TODO:: check price in contract
        token.price = 0;
      }
    } catch (error) {
      // console.log(error);
    }
    return token;
  }
}
