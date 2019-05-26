import { Controller, Body, HttpException, Post } from '@nestjs/common';
import { bufferToHex } from 'ethereumjs-util';
import { recoverPersonalSignature } from 'eth-sig-util';

import { UsersService } from '../users/user.service';
import { User } from '../users/user.entity';
import { FindManyOptions } from 'typeorm';
import { AuthService } from './auth.service';
import { ApiUseTags } from '@nestjs/swagger';
import { AuthBody } from './dtos/auth-body.dto';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async auth(@Body() authBody: AuthBody) {
    const { signature, publicAddress } = authBody;
    if (!signature || !publicAddress) {
      throw new HttpException(
        {
          error: 'Request should have signature and publicAddress',
        },
        400,
      );
    }
    const where: FindManyOptions<User> = {
      where: {
        publicAddress,
      },
    };
    const user = await this.usersService.findOne(where);
    if (!user) {
      throw new HttpException(
        {
          error: `User with publicAddress ${publicAddress} is not found in database`,
        },
        401,
      );
    }
    if (!(user instanceof User)) {
      // Should not happen, we should have already sent the response
      throw new HttpException(
        {
          error: `User is not defined in "Verify digital signature`,
        },
        401,
      );
    }
    const msg = `I am signing my one-time nonce: ${user.nonce}`;

    // We now are in possession of msg, publicAddress and signature. We
    // will use a helper from eth-sig-util to extract the address from the signature
    const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf8'));
    const address = recoverPersonalSignature({
      data: msgBufferHex,
      sig: signature,
    });
    if (address.toLowerCase() !== publicAddress.toLowerCase()) {
      throw new HttpException(
        {
          error: 'Signature verification failed',
        },
        401,
      );
    }
    user.nonce = Math.floor(Math.random() * 10000);
    await this.usersService.patch(user.id, user, user);

    const accessToken = await this.authService.signIn(user);
    return { accessToken };
  }
}
