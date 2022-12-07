import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "src/cart/entities/cart.entity";
import { Category } from "src/category/entities/category.entity";

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

    @OneToOne(() => Category, category => category.id_category,{
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        cascade: true,
    })
    @JoinColumn()
    category: Category

    @OneToMany(() => Cart, cart => cart.item)
    cartProduct: Cart[];

}
