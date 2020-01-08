import { BookType } from "src/shared/enums/book-type.enum";
import { ApiProperty } from "@nestjs/swagger";

export class AuthorCreateBookAdminViewItem { 
    @ApiProperty()
    authorId: string;
}

export class CreateBookAdminView {
    @ApiProperty()
    title: string;

    @ApiProperty()
    price: number;
    
    @ApiProperty()
    type: BookType;
    
    @ApiProperty({
        type:[AuthorCreateBookAdminViewItem]
    })
    authors: AuthorCreateBookAdminViewItem[] = []
}