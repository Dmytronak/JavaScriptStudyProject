import { BaseEntity } from "src/shared/entities/base-entity.entity";
import { Entity, Column } from "typeorm";

@Entity()
export class Role extends BaseEntity {

    @Column()
    name:string;

}