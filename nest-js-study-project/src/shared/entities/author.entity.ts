import { BaseEntity } from "src/shared/entities/base-entity.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Author extends BaseEntity {

    @Column()
    firstName:string;

    @Column()
    lastName:string;

    @Column()
    fullName:string;

}