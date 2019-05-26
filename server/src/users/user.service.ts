import { Injectable, HttpException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, FindManyOptions } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  async findAll(where: FindManyOptions<User>) {
    return this.userRepository.find(where);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const where: FindManyOptions<User> = {
      where: {
        publicAddress: createUserDto.publicAddress,
      },
    };
    const user = await this.userRepository.findOne(where);
    if (user) {
      throw new HttpException('User exists.', 409);
    }

    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  async findOne(where: FindManyOptions<User> | string): Promise<User> {
    return await this.userRepository.findOne(where);
  }

  async patch(
    id: string,
    updateUserDto: UpdateUserDto,
    authUser: User,
  ): Promise<User> {
    // Only allow to fetch current user
    if (id.toString() !== authUser.id.toString()) {
      throw new HttpException('You can can only access yourself', 401);
    }

    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new HttpException(
        `User with publicAddress ${id} is not found in database`,
        401,
      );
    }
    const newUserData = { ...user, ...updateUserDto };
    await this.userRepository.update(user, updateUserDto);
    return newUserData;
  }
}
