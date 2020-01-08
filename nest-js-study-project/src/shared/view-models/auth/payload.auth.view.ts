import { ObjectID } from "typeorm";

export class PayloadAuthView {
    sub: ObjectID;
    email: string;
    roles: string[];
}

