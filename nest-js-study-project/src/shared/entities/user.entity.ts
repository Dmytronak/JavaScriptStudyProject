import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/shared/entities/base-entity.entity';
import { Role } from 'src/shared/entities/role.entity';

@Entity()
export class User extends BaseEntity {
    @Column({
        unique:true
    })
    email: string;

    @Column()
    salt: string;

    @Column()
    hash: string;

    @Column()
    oldHash: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    fullName: string;

    @Column()
    age: number;

    @Column(type => Role)
    roles:Role[]
}
