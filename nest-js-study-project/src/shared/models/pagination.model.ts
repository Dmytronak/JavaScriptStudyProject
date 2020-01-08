export class PaginationModel {
    pageNumber: number;
    maxSize: number;
    
    constructor() {
        this.pageNumber =  +process.env.PAGE_NUMBER_PAGINATION;
        this.maxSize = +process.env.PAGINATION_MAX_SIZE;
    }
}