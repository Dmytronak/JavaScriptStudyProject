import { ApiProperty } from '@nestjs/swagger';

export class RegisterAuthView {
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