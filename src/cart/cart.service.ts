import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {

  constructor(@InjectRepository(Cart) private cartRepo: Repository<Cart>,
              @InjectRepository(User) private userRepo: Repository<User>,
              private productsService: ProductsService){}


    async addToCart(createCarDto: CreateCartDto, user: User) {
    try {
      const cartItems: Cart[] = await this.cartRepo.find({relations: ['item', 'user'],
                                                where: {user: { id_user: user.id_user}}});

      let product: Product = await this.productsService.findProduct(createCarDto.id_product);
      if(product){
        for (let j = 0; j < cartItems.length; j++) {
          if(cartItems[j].item.id_product === product.id_product){
            let newQuantity = Number(cartItems[j].quantity) + createCarDto.quantity;
            let newSubtotal = cartItems[j].subtotal + (newQuantity * product.price);

            await this.cartRepo.update(cartItems[j].id_cart, {quantity: newQuantity, subtotal: newSubtotal });
            return await this.cartRepo.find({relations: ['item'],
                                                where: {user: { id_user: user.id_user}}});
          }
          else{
            let newItem = this.cartRepo.create({subtotal: product.price * createCarDto.quantity, quantity: createCarDto.quantity});
            newItem.user = user;
            newItem.item = product;

            await this.cartRepo.save(newItem);
            return await this.cartRepo.find({relations: ['item'],
                                                where: {user: { id_user: user.id_user}}});
          }
        }
      }
      return null;                            
    } catch (error) {
      
    }
  }

  async findAllItemsInCar(user: User) {
    try {
      const cartItems: Cart[] = await this.cartRepo.find({relations: ['item'],
                                                where: {user: { id_user: user.id_user}}});
      if(cartItems) return cartItems;
      else return null;
    } catch (error) {
      
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
