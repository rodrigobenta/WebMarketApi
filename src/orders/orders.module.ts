import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { User } from 'src/auth/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CartModule } from 'src/cart/cart.module';
import { ProductsModule } from 'src/products/products.module';
import { ProductsService } from 'src/products/products.service';
import { AuthService } from 'src/auth/auth.service';
import { CartService } from 'src/cart/cart.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, ProductsService, AuthService, CartService],
  imports: [TypeOrmModule.forFeature([Order, User, Product, Cart]),
  AuthModule,
  CartModule,
  ProductsModule
],
  exports: [OrdersService, TypeOrmModule]
})
export class OrdersModule {}
