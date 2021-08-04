import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/repositories/user.entity';
import { UsersRepository } from 'src/auth/repositories/users.repository';
import { ProductDto } from '../dto/product.dto';
import { Product } from '../entity/product.entity';
import { ProductRepository } from '../entity/product.repository';

@Injectable()
export class ProductsService {
    
    constructor(@InjectRepository(ProductRepository) private productRepository:ProductRepository,
                @InjectRepository(UsersRepository) private usersRepository:UsersRepository){}

    async addProduct(productDto:ProductDto):Promise<Product>{
        const product = await this.productRepository.create({
            name: productDto.name,
            description: productDto.description,
            price: productDto.price,
            forSubscribers: productDto.forSubscribers == "true",
        });
        return this.productRepository.save(product);
    }

    getProducts():Promise<Product[]>{
        return this.productRepository.find();
    }

    async buyProducts(products: Product[], user:User):Promise<User>{
        products.map(product => user.products.push(product))
        return this.usersRepository.save(user)
    }

    async changeProducts(products: Product[]):Promise<Product[]>{
        const oldProducts = await this.productRepository.find();
        await this.productRepository.remove(oldProducts);
        return this.productRepository.save(products);
    }
}
