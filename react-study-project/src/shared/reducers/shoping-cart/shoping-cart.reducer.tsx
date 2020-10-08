import { ShoppingActionConstant } from "../../actions/constants/shopping-action.constant";

export const ShopingCartReducer = (state = {}, action: any) => {
    switch (action.type) {
        case ShoppingActionConstant.SHOPPING_ACTION_CART_SET:
            return {
                ...state,
                shopingCart: action.payload
            }
        case ShoppingActionConstant.SHOPPING_ACTION_CART_CLEAR:
            return {
                ...state,
                shopingCart: {}
            }
        default:
            return state;
    }
}