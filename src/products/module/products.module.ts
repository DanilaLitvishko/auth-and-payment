import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/modules/auth.module';
import { UsersRepository } from 'src/auth/repositories/users.repository';
import { ProductsController } from '../controller/products.controller';
import { ProductRepository } from '../entity/product.repository';
import { ProductsService } from '../service/products.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([ProductRepository, UsersRepository]),
    AuthModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
