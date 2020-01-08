import { BookType } from "src/shared/enums/book-type.enum";
import { ApiProperty } from "@nestjs/swagger";

export class RequestFilterBookView {
    @ApiProperty()
    searchString: string;
    
    @ApiProperty()
    priceMin: number;
    
    @ApiProperty()
    priceMax: number;
    
    @ApiProperty()
    type: BookType;
}