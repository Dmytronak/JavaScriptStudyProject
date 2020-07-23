import { ObjectID } from "typeorm";

export class PayloadAuthView {
    sub: ObjectID;
    email: string;
    profileImage: string;
    roles: string[];
}

