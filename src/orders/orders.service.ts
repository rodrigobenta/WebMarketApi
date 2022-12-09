import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
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
        const usersOrder: Order[] = await this.orderRepo.find({ relations: ['user'], where: {user: {id_user: user.id_user}},
        select: {id_order: true, total: true, isPending: true, user: {id_user: true, fullName: true, email: true}}});
        const pendingOrders: Order[] = usersOrder.filter(order => order.user.id_user === user.id_user && order.isPending === true);
        const notPendingOrders: Order[] = usersOrder.filter(order => order.user.id_user === user.id_user && order.isPending === false); 
        //si no existe, hago una nueva orden, sumando los totales.
        if(usersOrder.length === 0){
            //items del carro del usuario
            const cartItems = await this.cartService.findAllItemsInCar(user);
            if(cartItems){
                //recorre cada linea de la tabla carts, con el mismo id de usuario. en este caso el que 
                //traemos con el @GetUser, y lo suma automaticamente.
                const total: number = cartItems.map(item => item.subtotal).reduce((acc, next) => acc + next);
                //mapeo los items del cart, y los pongo en un array de Product[] para asignarlos debajo
                //const products: Product[] = cartItems.map(item => item.item);
                let newOrder = this.orderRepo.create({total: total});
                //newOrder.items = products; // <----- aqui
                newOrder.user = user;
                return this.orderRepo.save(newOrder);
            }
            else return new NotFoundException('The user has no products in cart');
        }
        else if(pendingOrders.length !== 0){
          return {
            msg: 'The user has pending orders',
            obj: usersOrder
          }
        }
        else{
          if(notPendingOrders.length !== 0){
            return {msg: 'Order History',
            orders: notPendingOrders};
          }
        }
    } catch (error) {
    }
  }

  async confirmOrder(id: number, user: User) {
    try {
          //ordenes pendientes?
          const usersOrder: Order[] = await this.orderRepo.find({ relations: ['user'], where: {isPending: true} && {id_order: id},
          select: {id_order: true, total: true, isPending: true}});
          if(usersOrder.length === 0) return { msg: 'Order does not exists'}
          const orderFilterByUser: Order[] = usersOrder.filter(order => order.user.id_user === user.id_user && order.isPending === true);
          //si existe, confirmo la compra.
          if(orderFilterByUser.length !== 0){
            orderFilterByUser[0].isPending = false;
            return this.orderRepo.update({id_order: id}, orderFilterByUser[0]);
          }
          else{
            return {
              msg: 'User has no pending orders'
            }
          }
    } catch (error) {
      
    }
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
