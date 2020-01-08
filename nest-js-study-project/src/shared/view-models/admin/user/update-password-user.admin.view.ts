import { ApiProperty } from "@nestjs/swagger";

export class UpdatePasswordAdminView {
    @ApiProperty()
    id: string;
    
    @ApiProperty()
    password: string;
}