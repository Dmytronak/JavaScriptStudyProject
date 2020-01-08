import { ApiProperty } from '@nestjs/swagger';

export class RestorePasswordAuthView{
    @ApiProperty()
    id:string;

    @ApiProperty()
    password:string;
}