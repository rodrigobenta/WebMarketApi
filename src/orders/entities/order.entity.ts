import { User } from "src/auth/entities/user.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Order {

    @PrimaryGeneratedColumn('identity')
    id_order: number;

    @OneToMany(() => Product, item => item.id_product)
    items: Product[];

    @OneToOne(() => User, user => user.id_user,{
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        cascade: true,
    })
    @JoinColumn({name: 'id_user'})
    user: User;

    @Column('float',{
        nullable: false
    })
    total: number;

    @Column('bool',{
        default: true,
        nullable: true
    })
    isPending: boolean;

}
