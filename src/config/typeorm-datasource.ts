import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123',
  database: 'cats_db',
  entities: ['../**/*.entity.{ts, js}'],
  migrationsTableName: '__migrations',
  migrations: ['../**/migrations/*.{ts, js}'],
});
