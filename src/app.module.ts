 
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/modules/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { async } from 'rxjs';
import { configValidationSchema } from './config.schema';
import { UserInfoModule } from './user-info/modules/user-info.module';
import { Industries } from './user-info/repositories/industires/industries.entity';
import { Specialities } from './user-info/repositories/specialities/specialities.entity';
import { UserInfo } from './user-info/repositories/user-info/user-info.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:[`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema
    }),
    UserInfoModule,
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type:'postgres',
        autoLoadEntities: true,
        synchronize: true,
        port: configService.get('DB_PORT'),
        host: configService.get('DB_HOST'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
      })
    }),
    AuthModule,
  ],
})
export class AppModule {}