import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('access-token'), // Authorization 헤더에서 토큰 추출
      ignoreExpiration: false, // 토큰이 만료되었는지 확인
      secretOrKey: configService.get<string>('JWT_SECRET'), // 환경변수에서 시크릿 키 가져오기
    });
  }

  async validate(payload: any) {
    // JWT의 페이로드에서 유저 정보를 반환
    return {
      userId: payload.sub,
      username: payload.username,
      isEssential: payload.isEssential,
    };
  }
}
