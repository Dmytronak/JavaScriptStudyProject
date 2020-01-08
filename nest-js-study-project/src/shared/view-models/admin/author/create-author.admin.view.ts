import { ApiProperty } from "@nestjs/swagger";

export class CreateAuthorAdminView {  
    @ApiProperty()
    firstName: string;
    
    @ApiProperty()
    lastName: string;
}