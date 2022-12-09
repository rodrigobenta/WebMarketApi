import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from './entities/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/products/entities/product.entity';
import { User } from '../auth/entities/user.entity';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [CartController],
  providers: [CartService, ProductsService],
  imports: [TypeOrmModule.forFeature([Cart, Product, User]),
  AuthModule,
  ProductsModule
],
exports: [CartService,TypeOrmModule]
})
export class CartModule {}
