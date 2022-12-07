import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {

  constructor(@InjectRepository(Category) private catRepo: Repository<Category>){}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
        const category: Category = this.catRepo.create(createCategoryDto);
        return await this.catRepo.save(category);
    } catch (error) {
      
    }
  }

  findAll() {
    return `This action returns all category`;
  }

  async findOne(id: number) {
    try {
        const category: Category = await this.catRepo.findOneBy({id_category: id});
        if(category) return category
        else return null;
    } catch (error) {
      
    }
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
