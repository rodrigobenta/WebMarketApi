import { BeforeInsert, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "src/cart/entities/cart.entity";
import { Order } from "src/orders/entities/order.entity";


@Entity('users')
export class User {

    @PrimaryGeneratedColumn('identity')
    id_user: number

    @Column('text',{
        nullable: false
    })
    fullName: string;

    @Column('text',{
        unique: true,
        nullable: false
    })
    email: string;

    @Column('text',{
        nullable: false
    })
    password: string;

    @Column('bool',{
        default: true
    })
    isActive: boolean;

    @Column('text',{
        array: true,
        default: ['user']
    })
    roles: string[];

    @OneToMany(() => Cart, cart => cart.user)
    cartUser: Cart[];

    @OneToOne(() => Order, order => order.id_order)
    order : Order;

    @BeforeInsert()
    checkFieldsBeforeInsert(){
        this.email = this.email.toLocaleLowerCase().trim();
    }
}
