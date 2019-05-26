import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/user.service';
import { User } from '../users/user.entity';
import { JwtPayloadModel } from '../models/jwt-payload.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(user: User): Promise<string> {
    const tokenPayload: JwtPayloadModel = {
      payload: {
        id: user.id,
        publicAddress: user.publicAddress,
      },
    };

    return await this.jwtService.sign(tokenPayload);
  }

  async validateUser({ payload }: JwtPayloadModel) {
    return await this.usersService.findOne(payload.id);
  }
}
