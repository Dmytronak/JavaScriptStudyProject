import { SharedConstants } from "../constants/shared.constant";

export const PaginationCongfig = {
    pageNumber: parseInt(process.env.PAGE_NUMBER_PAGINATION||SharedConstants.STRING_ONE_VALUE),
    maxSize: parseInt(process.env.PAGINATION_MAX_SIZE||SharedConstants.STRING_FOUR_VALUE)
}