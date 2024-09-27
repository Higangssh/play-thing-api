import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.stratrgy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    // 기본 JWT 전략 설정
    PassportModule.register({ defaultStrategy: 'jwt' }),

    // JwtModule 설정에서 ConfigService 사용
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // .env 파일에서 비밀 키 가져오기
        signOptions: {
          expiresIn: `${configService.get<string>('JWT_EXPIRATION')}s`,
        }, // 만료 시간 설정
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
