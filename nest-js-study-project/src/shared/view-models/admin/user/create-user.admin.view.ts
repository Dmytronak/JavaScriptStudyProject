import { ApiProperty } from '@nestjs/swagger';

export class CreateUserAdminView {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    fullName: string;

    @ApiProperty()
    age: number;
}