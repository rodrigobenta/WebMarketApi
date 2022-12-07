import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "src/cart/entities/cart.entity";

@Entity()
export class Product {

    @PrimaryGeneratedColumn('identity')
    id_product: number;

    @Column('text',{
        nullable: false,
        unique: true
    })
    name: string;

    @Column('float',{
        nullable: false,
    })
    price: number;

    @Column('numeric',{
        nullable: true,
        default: 0
    })
    quantity: number;
    
    @Column('bool',{
        default: true
    })
    isActive: boolean;

    @OneToMany(() => Cart, cart => cart.item)
    cartProduct: Cart[];

}
