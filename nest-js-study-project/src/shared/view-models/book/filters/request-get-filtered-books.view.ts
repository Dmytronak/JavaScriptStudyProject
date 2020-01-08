import { ApiProperty } from "@nestjs/swagger";

export class BookFilteredBooksRequestView {
    @ApiProperty()
    id: string;
}

export class FilteredBooksRequestView {
    @ApiProperty()
    page: number;
    
    @ApiProperty({
        type: [BookFilteredBooksRequestView],
      })
    bookIds: BookFilteredBooksRequestView[] = []
}
