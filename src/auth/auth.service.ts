import { Injectable } from '@nestjs/common';
import { JwtService as Jwt, JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: Jwt,
    private readonly jwtService: JwtService,
  ) {}

  generateToken(user: {
    userId: number;
    username: string;
    isEssential: boolean;
  }): string {
    const payload = {
      sub: user.userId, // 사용자 ID를 subject로 저장
      username: user.username,
      isEssential: user.isEssential, // boolean 값 포함
    };

    // JWT 토큰 생성 (토큰 만료 시간을 1시간으로 설정)
    return this.jwtService.sign(payload, {
      expiresIn: '1h',
    });
  }
}
