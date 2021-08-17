import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/dto/get-user.decorators';
import { User } from 'src/auth/repositories/user.entity';
import { CheckAssesibleProductsGuard } from 'src/guards/check-accessible-products.guard';
import { CheckUserRoleGuard } from 'src/guards/check-user-role.guard';
import { ProductDto } from '../dto/product.dto';
import { Product } from '../entity/product.entity';
import { ProductsService } from '../service/products.service';

@Controller('products')
export class ProductsController {

    constructor(private productsService:ProductsService ){}
    
    @Post()
    addProducts(@Body() product: ProductDto):Promise<Product>{
        return this.productsService.addProduct(product);
    }

    @UseGuards(AuthGuard())
    @Get()
    getProduct():Promise<Product[]>{
        return this.productsService.getProducts();
    }

    @UseGuards(AuthGuard(), CheckAssesibleProductsGuard)
    @Post('/buy')
    buyProducts(@GetUser() user:User, @Body() products: Product[]): Promise<User>{
        return this.productsService.buyProducts(products, user);
    }

    @UseGuards(AuthGuard(), CheckUserRoleGuard)
    @Post('/change')
    changeProducts(@Body() products: Product[]):Promise<Product[]>{
        return this.productsService.changeProducts(products);
    }
}
