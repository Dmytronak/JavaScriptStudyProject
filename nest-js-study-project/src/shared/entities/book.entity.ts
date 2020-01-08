import { BaseEntity } from "src/shared/entities/base-entity.entity";
import { Column, Entity } from "typeorm";
import { Author } from "src/shared/entities/author.entity";
import { BookType } from "../enums/book-type.enum";

@Entity()
export class Book extends BaseEntity{
    @Column()
    title:string;

    @Column()
    price: number;

    @Column({
        type:'enum',
        enum:BookType,
        default:BookType.None
    })
    type: BookType;

    @Column(type=>Author)
    authors:Author[]
    
}