 
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { async } from 'rxjs';
import { configValidationSchema } from './config.schema';
import { UserInfoModule } from './user-info/user-info.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:[`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema
    }),
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
    UserInfoModule
  ],
})
export class AppModule {}