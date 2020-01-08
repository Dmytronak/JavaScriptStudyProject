import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserAdminView {
    @ApiProperty()
    id: string;
    
    @ApiProperty()
    email: string;
    
    @ApiProperty()
    firstName: string;
    
    @ApiProperty()
    lastName: string;
    
    @ApiProperty()
    fullName: string;
    
    @ApiProperty()
    age: number;
    
    @ApiProperty()
    roleId: string;
}