import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_ROOT_HOST'),
        port: configService.get('MYSQL_PORT'),
        username: configService.get('MYSQL_USER'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DATABASE'),
        entities: [
          __dirname + '/../**/*.entity.js',
        ],
        synchronize: true,
        // entities: ["dist/api/**/*.entity.js"],
        // migrations: ["dist/api/migrations/*.js"],
        // synchronize: false,
        // cli: {
        //   "migrationsDir": "apps/api/migrations"
        // }
      })
    }),
  ],
})
export class DatabaseModule {
}
