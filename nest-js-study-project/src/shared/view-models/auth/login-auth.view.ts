import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthView {
    @ApiProperty()
    email: string;
    
    @ApiProperty()
    password: string;
}