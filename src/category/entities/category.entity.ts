import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Category {

    @PrimaryGeneratedColumn('identity')
    id_category: number;

    @Column('text',{
        nullable: true
    })
    name: string;

}
