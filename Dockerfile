# Node.js 20 버전을 사용한 Dockerfile
FROM node:20.17.0

# 애플리케이션을 담을 디렉터리 설정
WORKDIR /usr/src/app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 파일 복사
COPY . .

# 빌드 명령 (NestJS 프로젝트라면)
RUN npm run build

# 애플리케이션 실행 포트
EXPOSE 3000

# 애플리케이션 시작 명령어
CMD ["npm", "run", "start"]
