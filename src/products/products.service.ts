import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

  constructor(@InjectRepository(Product) private readonly prodRepo: Repository<Product>){}

  async create(createProductDto: CreateProductDto) {
    try {
      const lookForProduct: Product = await this.prodRepo.findOne({where: {name: createProductDto.name}})
      if(lookForProduct) return new BadRequestException('The product already exists');
      const newProduct: Product = this.prodRepo.create(createProductDto);
      return this.prodRepo.save(newProduct);
    } catch (error) {
      
    }
  }

  async findAll() {
    try {
      const findProducts: Product[] = await this.prodRepo.find();
      return findProducts;
    } catch (error) {
      
    }
  }

  async findOne(id: number) {
    try {
      const findProduct: Product = await this.prodRepo.findOneBy({id_product: id});
      if(!findProduct) return new NotFoundException('Product not found');
      return findProduct;
    } catch (error) {
      
    }
  }

  async findProduct(id: number){
    try {
      const findProduct: Product = await this.prodRepo.findOneBy({id_product: id});
      if(!findProduct) return null;
      else return findProduct;
    } catch (error) {
      
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const productDB: Product = await this.prodRepo.findOneBy({id_product: id});
      if(!productDB) return new NotFoundException('User not found');
      return this.prodRepo.save({...productDB, ...updateProductDto});
    } catch (error) {
      
    }
  }

  async remove(id: number) {
    try {
      const productDB: Product = await this.prodRepo.findOneBy({id_product: id});
      if(!productDB) return new NotFoundException('User not found');
      productDB.isActive = false;
      return this.prodRepo.update(id, productDB);
    } catch (error) {
      
    }
  }
}
