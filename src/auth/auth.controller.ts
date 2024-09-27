import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CustomJwtAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(
    @Body() body: { userId: number; username: string; isEssential: boolean },
  ) {
    // AuthService를 사용하여 JWT 토큰 생성
    const token = this.authService.generateToken(body);
    return { accessToken: token }; // 클라이언트에게 JWT 토큰 반환
  }

  @UseGuards(CustomJwtAuthGuard)
  @Get()
  getProfile(@Request() req) {
    // 인증된 사용자 정보 반환
    return req.user;
  }
}
