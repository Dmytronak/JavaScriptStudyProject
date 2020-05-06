import { Injectable, Inject } from '@nestjs/common';
import { Book } from 'src/shared/entities/book.entity';
import { Repository } from 'typeorm';
import { PaginationModel } from 'src/shared/models/pagination.model';
import { ResponseFilterBookView, BookResponseFilterBookViewItem, AuthorBookResponseFilterBookViewItem } from 'src/shared/view-models/book/filters/response-filter-book.view';
import { RequestFilterBookView } from 'src/shared/view-models/book/filters/request-filter.book.view';
import { BookGetFilteredBookViewItem, AuthorBookGetFilteredBookViewItem, GetFilteredBookView } from 'src/shared/view-models/book/get-filtered-book.view';
import { FilteredBooksRequestView } from 'src/shared/view-models/book/filters/request-get-filtered-books.view';
import { GetAllBookView, BookGetAllBookViewItem, AuthorBookGetAllBookViewItem } from 'src/shared/view-models/book/get-all-book.view';
import { SharedConstants } from '../constants/shared.constants';
import { response } from 'express';
import { GetPriceRangeBookView } from '../view-models/book/get-price-range-book.view';

@Injectable()
export class BookService {
    constructor
        (
            @Inject('BOOK_REPOSITORY') private readonly bookRepository: Repository<Book>,
            private paginationModel: PaginationModel
        ) { }

    public async getAllBooksCount(): Promise<number> {
        return await this.bookRepository.count();
    }
    public async getAllBooks(): Promise<GetAllBookView> {
        const response: GetAllBookView = new GetAllBookView();
        await this.bookRepository.find()
            .then(result => {
                result.map(x => {
                    response.collectionSize = result.length;
                    response.books = result
                        .map(x => {
                            const item: BookGetAllBookViewItem = {
                                id: x._id.toString(),
                                title: x.title,
                                type: x.type,
                                price: x.price,
                                authors: x.authors
                                    .map(resultAuthors => {
                                        const item: AuthorBookGetAllBookViewItem = {
                                            id: resultAuthors._id.toString(),
                                            fullName: resultAuthors.fullName
                                        };
                                        return item;
                                    })
                            }
                            return item;
                        })
                })
            });
        return response;

    }
    public async filterAutoComplete(requestFilterBookView: RequestFilterBookView): Promise<ResponseFilterBookView> {
        const response: ResponseFilterBookView = new ResponseFilterBookView();
        await this.bookRepository
            .find({
                where: {
                    $or: [{
                        title: {
                            $regex: `.*${requestFilterBookView.searchString}.*`, $options: 'i'
                        }
                    }, {
                        authors: {
                            $elemMatch: {
                                fullName: {
                                    $regex: `.*${requestFilterBookView.searchString}.*`, $options: 'i'
                                }
                            }
                        }
                    }]
                }
            })
            .then(result => {
                response.quantity = result.length;
                response.books = result
                    .map(x => {
                        const item: BookResponseFilterBookViewItem = {
                            id: x._id.toString(),
                            title: x.title,
                            type: x.type,
                            price: x.price,
                            authors: x.authors
                                .map(resultAuthors => {
                                    const item: AuthorBookResponseFilterBookViewItem = {
                                        id: resultAuthors._id.toString(),
                                        fullName: resultAuthors.fullName
                                    };
                                    return item;
                                })
                        };
                        return item;
                    });
            });
        return response;
    }
    public async filteredBooks(requestFilterBookView: RequestFilterBookView): Promise<GetFilteredBookView> {
        const response: GetFilteredBookView = new GetFilteredBookView();
        requestFilterBookView.searchString = requestFilterBookView.searchString !== SharedConstants.EMPTY_VALUE ? requestFilterBookView.searchString : null;
        const offset = (requestFilterBookView.page - SharedConstants.ONE_VALUE) * this.paginationModel.maxSize;
        await this.bookRepository
            .find({
                where: {
                    $or: [
                        {
                            title: {
                                $regex: `.*${requestFilterBookView.searchString}.*`, $options: 'i'
                            }
                        }, {
                            authors: {
                                $elemMatch: {
                                    fullName: {
                                        $regex: `.*${requestFilterBookView.searchString}.*`, $options: 'i'
                                    }
                                }
                            }
                        },
                        {
                            type: requestFilterBookView.type
                        },
                        {
                            price: {
                                $gte: requestFilterBookView.priceMin, $lte: requestFilterBookView.priceMax
                            }
                        }
                    ],

                },
                skip: offset,
                take: this.paginationModel.maxSize
            })
            .then(result => {
                response.collectionSize = result.length;
                response.books = result.map(x => {
                    const item: BookGetFilteredBookViewItem = {
                        id: x._id.toString(),
                        title: x.title,
                        type: x.type,
                        price: x.price,
                        authors: x.authors
                            .map(resultAuthors => {
                                const item: AuthorBookGetFilteredBookViewItem = {
                                    id: resultAuthors._id.toString(),
                                    fullName: resultAuthors.fullName
                                };
                                return item;
                            })
                    };
                    return item;
                })
            });
        response.collectionSize = (await this.getFilteredBookCount(requestFilterBookView))
        if (response.collectionSize === SharedConstants.ZERO_VALUE) {
            await this.bookRepository
                .find({
                    skip: offset,
                    take: this.paginationModel.maxSize
                })
                .then(result => {
                    response.books = result.map(x => {
                        const item: BookGetFilteredBookViewItem = {
                            id: x._id.toString(),
                            title: x.title,
                            type: x.type,
                            price: x.price,
                            authors: x.authors
                                .map(resultAuthors => {
                                    const item: AuthorBookGetFilteredBookViewItem = {
                                        id: resultAuthors._id.toString(),
                                        fullName: resultAuthors.fullName
                                    };
                                    return item;
                                })
                        };
                        return item;
                    })
                });
            response.collectionSize = (await this.getAllBooksCount())
        }
        const range:GetPriceRangeBookView = (await this.getPriceRange());
        response.minPrice = range.minPrice
        response.maxPrice = range.maxPrice;
        return response;

    }
    public async filteredBooksByIds(filteredBooksRequestView: FilteredBooksRequestView): Promise<GetFilteredBookView> {
        const ObjectID = require('mongodb').ObjectID
        const response: GetFilteredBookView = new GetFilteredBookView();
        const offset = (filteredBooksRequestView.page - SharedConstants.ONE_VALUE) * this.paginationModel.maxSize;
        await this.bookRepository
            .find({
                where: {
                    $or: [
                        {
                            _id: {
                                $in: filteredBooksRequestView.bookIds
                                    .map(x => new ObjectID(x.id))
                            }
                        },
                        {
                            _id: {
                                $exists: true
                            }
                        }
                    ]

                },
                skip: offset,
                take: this.paginationModel.maxSize
            })
            .then(result => {
                response.collectionSize = result.length;
                response.books = result.map(x => {
                    const item: BookGetFilteredBookViewItem = {
                        id: x._id.toString(),
                        title: x.title,
                        type: x.type,
                        price: x.price,
                        authors: x.authors
                            .map(resultAuthors => {
                                const item: AuthorBookGetFilteredBookViewItem = {
                                    id: resultAuthors._id.toString(),
                                    fullName: resultAuthors.fullName
                                };
                                return item;
                            })
                    };
                    return item;
                })
            });
        return response;

    }

    private async getFilteredBookCount(requestFilterBookView: RequestFilterBookView) {
        let response = SharedConstants.ZERO_VALUE;
        requestFilterBookView.searchString = requestFilterBookView.searchString !== SharedConstants.EMPTY_VALUE ? requestFilterBookView.searchString : null;
        await this.bookRepository.find({
            where: {
                $or: [
                    {
                        title: {
                            $regex: `.*${requestFilterBookView.searchString}.*`, $options: 'i'
                        }
                    }, {
                        authors: {
                            $elemMatch: {
                                fullName: {
                                    $regex: `.*${requestFilterBookView.searchString}.*`, $options: 'i'
                                }
                            }
                        }
                    },
                    {
                        type: requestFilterBookView.type
                    },
                    {
                        price: {
                            $gte: requestFilterBookView.priceMin, $lte: requestFilterBookView.priceMax
                        }
                    }
                ],

            }
        })
            .then(x => {
                response = x.length;
            })
        return response;
    }
    private async getPriceRange(): Promise<GetPriceRangeBookView> {
        const response = new GetPriceRangeBookView();
        const prices = await this.bookRepository.find()
            .then((response: Book[]) => {
                var number = response.map(x => x.price);
                return number;
            });
        response.minPrice = Math.min(...prices);
        response.maxPrice = Math.max(...prices);
        return response;
    }
}
