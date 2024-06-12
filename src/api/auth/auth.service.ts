import { Injectable, HttpStatus } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { SignInRequest, SignInResponse } from '@/proto/backoffice.pb';
import { JwtService } from '@/common/service';
import { UserAccountEntity } from '@/model/entities';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  async SignIn(payload: SignInRequest): Promise<SignInResponse> {
    const user: UserAccountEntity = await this.accountService.findOne(payload);

    const isPasswordValid: boolean = this.jwtService.isPasswordValid(payload.password, user.password);
    if (!isPasswordValid) {
      return {
        result: 'fail',
        status: HttpStatus.UNAUTHORIZED,
        message: 'Password does not match',
        data: [{ error: HttpStatus.UNAUTHORIZED.toString() }],
      };
    }

    const token: string = this.jwtService.generateToken(user);
    return {
      result: 'string',
      status: 200,
      message: 'string',
      data: [
        {
          id: user.id,
          email: user.email,
          name: user.name,
          nickname: user.nickname,
          token,
        },
      ],
    };
  }
}
