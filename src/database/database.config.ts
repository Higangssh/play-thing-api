import { registerAs } from '@nestjs/config';

export const DatabaseConfig = registerAs('database', () => ({
  type: 'postgres' as const,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'elsa',
  logging: process.env.DB_LOGGING === 'true',
  entities: [process.env.DB_ENTITIES || 'dist/**/*.entity.js'],
  migrations: [process.env.DB_MIGRATIONS || 'dist/migration/*.js'],
  migrationsTableName: 'migration',
  migrationsRun: false,
  synchronize: false,
}));
