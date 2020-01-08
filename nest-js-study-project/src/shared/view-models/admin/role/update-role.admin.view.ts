import { ApiProperty } from "@nestjs/swagger";

export class UpdateRoleAdminView {
    @ApiProperty()
    id: string;
    
    @ApiProperty()
    name: string;
}