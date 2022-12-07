import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { CartService } from 'src/cart/cart.service';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {

  constructor(@InjectRepository(Order) private orderRepo: Repository<Order>,
              @InjectRepository(User) private userRepository: Repository<User>,
                                      private cartService: CartService) {}

  async create(user: User) {
    try {
        //ordenes pendientes?
        const usersOrder = await this.orderRepo.find({ relations: ['user'], where: {isPending: true}});
        //si no existe, hago una nueva orden, sumando los totales.
        if(usersOrder.length === 0 || usersOrder === null){
          //items del carro del usuario
          const cartItems = await this.cartService.findAllItemsInCar(user);
          if(cartItems){
              //recorre cada linea de la tabla carts, con el mismo id de usuario. en este caso el que 
              //traemos con el @GetUser, y lo suma automaticamente.
              const total: number = cartItems.map(item => item.subtotal).reduce((acc, next) => acc + next);
              //mapeo los items del cart, y los pongo en un array de Product[] para asignarlos debajo
              const products: Product[] = cartItems.map(item => item.item);
              //const newOrderDTO: CreateOrderDto = ({total: total, isPending: true, items: products, user: user});
              let newOrder = this.orderRepo.create({total: total});
              //newOrder.items = products; // <----- aqui
              newOrder.user = user;
              return this.orderRepo.save(newOrder);
          }
          else
            return new NotFoundException('The user has no products in cart');
        }
        else return new NotFoundException('The user has no products in cart'); 
    } catch (error) {
    }
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
