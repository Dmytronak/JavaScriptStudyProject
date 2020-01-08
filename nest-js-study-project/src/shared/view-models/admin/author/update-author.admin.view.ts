import { ApiProperty } from "@nestjs/swagger";

export class UpdateAuthorAdminView { 
    @ApiProperty()
    id: string;
    
    @ApiProperty()
    firstName: string;
    
    @ApiProperty()
    lastName: string;
    
    @ApiProperty()
    fullName: string;
}