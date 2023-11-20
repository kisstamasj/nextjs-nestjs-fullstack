import { IRequestUser, RequestUser, Tokens } from '@app/common';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';
import { AccessTokenGuard, RefreshTokenGuard } from './guards';

/**
 * Controller responsible for handling authentication-related requests.
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Signup a user.
   * @param createUserDto - The data for creating the user.
   * @returns A promise that resolves to the newly created user.
   */
  @Post('signup')
  @HttpCode(201)
  async createUser(@Body() createUserDto: CreateUserDto) {
    const { user, tokens } = await this.authService.signUp(createUserDto);
    return {
      user: { id: user.id, name: user.name, email: user.email },
      backendTokens: tokens,
    };
  }

  /**
   * Signin a user.
   * @param data - The authentication data.
   * @returns The authenticated user object.
   */
  @Post('signin')
  @HttpCode(200)
  async signin(@Body() data: AuthDto) {
    const { user, tokens } = await this.authService.signIn(data);
    return {
      user: { id: user.id, name: user.name, email: user.email },
      backendTokens: tokens,
    };
  }

  /**
   * Logout a user.
   * @param req - The request object.
   * @returns 'success' if successful.
   */
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  @HttpCode(200)
  async logout(@RequestUser() user: IRequestUser) {
    await this.authService.logout(user.sub);
    return 'success';
  }

  /**
   * Refresh tokens.
   * @param req - The request object.
   * @returns 'success' if successful.
   */
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async refreshTokens(@RequestUser() user: IRequestUser): Promise<Tokens> {
    const userId = user['sub'];
    const refreshToken = user['refreshToken'];
    return await this.authService.refreshTokens(userId, refreshToken);
  }
}
