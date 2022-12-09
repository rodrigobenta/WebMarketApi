import { User } from "../../auth/entities/user.entity";
import { Product } from "../../products/entities/product.entity";
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
}