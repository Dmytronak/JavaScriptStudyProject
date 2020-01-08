import { BookType } from "src/shared/enums/book-type.enum";
import { ApiProperty } from "@nestjs/swagger";

export class AuthorUpdateBookAdminViewItem {
    @ApiProperty()
    authorId: string;
}
export class UpdateBookAdminView {
    @ApiProperty()
    id: string;
    
    @ApiProperty()
    title: string;
    
    @ApiProperty()
    type: BookType;
    
    @ApiProperty()
    price: number;
    
    @ApiProperty({
      type: [AuthorUpdateBookAdminViewItem]
    })
    authors: AuthorUpdateBookAdminViewItem[] = []
}

