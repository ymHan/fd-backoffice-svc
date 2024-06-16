import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AUTH_SERVICE_NAME, SignInRequest, SignInResponse } from '@proto/backoffice.pb';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  @Inject(AuthService)
  private readonly authService: AuthService;

  @GrpcMethod(AUTH_SERVICE_NAME, 'signIn')
  private signIn(payload: SignInRequest): Promise<SignInResponse> {
    return this.authService.SignIn(payload);
  }
}
