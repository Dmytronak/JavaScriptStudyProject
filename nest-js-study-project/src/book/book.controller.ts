import { Controller, Get, Body, Post, Param } from '@nestjs/common';
import { BookService } from 'src/shared/services/book.service';
import { GetFilteredBookView } from 'src/shared/view-models/book/get-filtered-book.view';
import { ResponseFilterBookView } from 'src/shared/view-models/book/filters/response-filter-book.view';
import { RequestFilterBookView } from 'src/shared/view-models/book/filters/request-filter.book.view';
import { FilteredBooksRequestView } from 'src/shared/view-models/book/filters/request-get-filtered-books.view';
import { GetAllBookView } from 'src/shared/view-models/book/get-all-book.view';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) { }

    @Get('/getAllBooksCount')
    async getAllBooksCount(): Promise<number> {
        const response = await this.bookService.getAllBooksCount();
        return response;
    }

    @Get('/getAllBooks')
    async getAllBooks(): Promise<GetAllBookView> {
        const response = await this.bookService.getAllBooks();
        return response;
    }

    @Post('/filterAutoComplete')
    async filterAutoComplete(@Body()requestFilterBookView:RequestFilterBookView): Promise<ResponseFilterBookView> {
        const response = await this.bookService.filterAutoComplete(requestFilterBookView);
        return response;
    }

    @Post('/filteredBooks')
    async filteredBooks(@Body()requestFilterBookView:RequestFilterBookView): Promise<GetFilteredBookView> {
        return await this.bookService.filteredBooks(requestFilterBookView);
    }
    @Post('/filteredBooksByIds')
    async filteredBooksByIds(@Body()filteredBooksRequestView:FilteredBooksRequestView): Promise<GetFilteredBookView> {
        return await this.bookService.filteredBooksByIds(filteredBooksRequestView);
    }
}
