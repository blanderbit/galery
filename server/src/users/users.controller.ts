import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Patch,
  Query,
  UseGuards,
  Req,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dtos/create-user.dto';
import { FindManyOptions } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import {
  ApiImplicitQuery,
  ApiBearerAuth,
  ApiUseTags,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { AuthUser } from '../common/decorators/auth-user.decorator';

@ApiUseTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiImplicitQuery({
    name: 'publicAddress',
    required: false,
  })
  async findAll(@Query('publicAddress') publicAddress?: string) {
    // If a query string ?publicAddress=... is given, then filter results
    const whereClause: FindManyOptions<User> = publicAddress && {
      where: { publicAddress },
    };
    return await this.usersService.findAll(whereClause);
  }

  @Get('/me')
  @ApiOkResponse({ description: 'Successfully retrieved user' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Unexpected server error' })
  @UseGuards(AuthGuard('jwt'))
  async me(@AuthUser() authUser: User): Promise<User> {
    const where: FindManyOptions<User> = {
      where: {
        id: authUser.id,
        publicAddress: authUser.publicAddress,
      },
    };
    const user: User = await this.usersService.findOne(where);
    if (!user) {
      throw new HttpException(`User is not found in database`, 401);
    }
    return user;
  }

  /** GET /api/users/:userId */
  /** Authenticated route */
  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string, @AuthUser() authUser: User) {
    if (id.toString() !== authUser.id.toString()) {
      throw new HttpException('You can can only access yourself', 401);
    }
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /** PATCH /api/users/:userId */
  /** Authenticated route */
  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  patch(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @AuthUser() authUser: User,
  ) {
    return this.usersService.patch(id, updateUserDto, authUser);
  }
}
