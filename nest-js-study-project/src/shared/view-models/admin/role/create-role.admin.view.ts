import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleAdminView {
    @ApiProperty()
    name: string;
}