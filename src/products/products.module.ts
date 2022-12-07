import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryModule } from 'src/category/category.module';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entities/category.entity';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, CategoryService],
  imports: [TypeOrmModule.forFeature([Product, Category]),
            AuthModule,
            CategoryModule
          ],
  exports: [ProductsService, TypeOrmModule]
})
export class ProductsModule {}
