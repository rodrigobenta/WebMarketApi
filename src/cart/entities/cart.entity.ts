
import { User } from "src/auth/entities/user.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity('cart')
export class Cart {

    @PrimaryGeneratedColumn('identity')
    id_cart: number;

    @Column('numeric',{
        nullable: true
    })
    quantity: number;

    @Column('float',{
        nullable: true
    })
    subtotal: number;

    @ManyToOne(() => User, user => user.cartUser)
    user!: User;

    @ManyToOne(() => Product, product => product.cartProduct)
    item!: Product;
    // @ManyToOne(
    // () => Cart,
    // user => user.products, {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
    // @JoinColumn([{ name: 'id_user', referencedColumnName: 'id_user' }])
    // 

    // @ManyToOne(
    // () => Product,
    // product => product.users,
    // {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
    // )
    // @JoinColumn([{ name: 'id_product', referencedColumnName: 'id_product' }])
    // 
}