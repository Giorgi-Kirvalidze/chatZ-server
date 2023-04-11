import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {DatabaseModule} from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    // ConfigModule.forRoot({
    //   validationSchema: Joi.object({
    //     MYSQL_HOST: Joi.string().required(),
    //     MYSQL_PORT: Joi.number().required(),
    //     MYSQL_USER: Joi.string().required(),
    //     MYSQL_PASSWORD: Joi.string().required(),
    //     MYSQL_DB: Joi.string().required(),
    //   }),
    // }),
    DatabaseModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
