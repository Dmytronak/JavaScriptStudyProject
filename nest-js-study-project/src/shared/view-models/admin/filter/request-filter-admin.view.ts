import { ApiProperty } from "@nestjs/swagger";

export class RequestFilterAdminView {
    @ApiProperty()
    searchString: string;

    @ApiProperty()
    page:number;
}