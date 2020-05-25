import { IShoppingCartView } from "../book/shopping-cart.view";

export interface ShopingCartRootStateReducer {
    ShopingCartReducer: CartShopingCartReducer
  }
export interface CartShopingCartReducer{
    shopingCart:IShoppingCartView
}