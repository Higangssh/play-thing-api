import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './database.config';
import { DataSourceOptions } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(DatabaseConfig)],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // 환경 변수에서 'database' 설정 불러오기
        const config =
          configService.get<ConfigType<typeof DatabaseConfig>>('database');

        if (!config) {
          throw new Error('Failed to load database config');
        }

        // DataSourceOptions 형식에 맞게 반환
        const typeormConfig: DataSourceOptions = {
          type: config.type,
          host: config.host,
          port: config.port,
          username: config.username,
          password: config.password,
          database: config.database,
          entities: config.entities,
          migrations: config.migrations,
          migrationsRun: config.migrationsRun,
          synchronize: config.synchronize,
          logging: config.logging,
        };

        return typeormConfig;
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
