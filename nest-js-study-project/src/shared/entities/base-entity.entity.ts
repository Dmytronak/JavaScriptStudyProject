import { Entity, Column, ObjectIdColumn, ObjectID, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BaseEntity {
    
    @PrimaryGeneratedColumn()
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    craationAt: Date;

    constructor() {
        const ObjectID = require('mongodb').ObjectID
        this._id = new ObjectID();
        this.craationAt = new Date();    
    }
}
