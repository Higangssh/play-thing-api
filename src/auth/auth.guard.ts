import {
  ExecutionContext,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class CustomJwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }
  handleRequest(err, user, info, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['access-token']; // Access-Token 헤더에서 JWT 토큰 추출
    console.log('JWT Token:', token);
    // 토큰이 없으면 인증 실패 403 Forbidden
    if (!token) {
      throw new ForbiddenException('Access denied. No token provided.');
    }

    // 토큰을 디코딩 (검증 없이 디코딩)
    const decoded = this.jwtService.decode(token) as any;
    console.log('Decoded Token:', decoded);
    console.log('info:', info);
    // 1. 토큰이 만료되었을 때 401 응답
    if (info && info.name === 'TokenExpiredError') {
      throw new UnauthorizedException('Token has expired. Please login again.');
    }

    // 2. payload의 isEssential 값이 false일 때 304 Not Modified 응답 반환
    if (decoded && decoded.isEssential === false) {
      throw new HttpException('Not modified', HttpStatus.NOT_MODIFIED); // 304 응답
    }

    // 3. 그 외에는 인증 통과
    if (err || !user) {
      throw new ForbiddenException('Access denied. Invalid token.');
    }

    return user; // 정상적인 사용자 인증 통과
  }
}
