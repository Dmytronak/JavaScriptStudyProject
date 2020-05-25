import { LocalStorageService } from "./local-storage.service";
import { IShoppingCartView, IBookIShoppingCartViewItem } from "../interfaces/book/shopping-cart.view";
import { BookConstants } from "../constants/book.constants";
import { IBookGetAllBookResponseViewItem } from "../interfaces/responses/book/get-all-book-response.view";
import { SharedConstants } from "../constants/shared.constant";

const localStorageService = new LocalStorageService();

export class ShoppingCartService {
    constructor() {
     }
    public getFromCart(): IShoppingCartView {
        const shoppingCart = localStorageService.getItem(BookConstants.SHOP_CART_KEY);
        return shoppingCart;
    }

    public setToCart(book: IBookGetAllBookResponseViewItem): IShoppingCartView {
        const isNotEmptyCart = !!(localStorageService.getItem(BookConstants.SHOP_CART_KEY));
        let shoppingCart: IShoppingCartView = {
            quantity: SharedConstants.ZERO_VALUE,
            totalPrice: SharedConstants.ZERO_VALUE,
            books: []
        };
        if(isNotEmptyCart){
            shoppingCart = localStorageService.getItem(BookConstants.SHOP_CART_KEY);
        }
        shoppingCart.quantity += SharedConstants.ONE_VALUE;
        shoppingCart.totalPrice += book.price;
        const bookIndex = shoppingCart.books.findIndex(x => x.id === book.id);
        if (bookIndex === BookConstants.MINUS_ONE_VALUE) {
            const bookCartItem: IBookIShoppingCartViewItem = {
                id: book.id,
                quantity: SharedConstants.ONE_VALUE,
                price: book.price,
                title: book.title,
            };
            shoppingCart.books.push(bookCartItem);
        }
        if (bookIndex !== BookConstants.MINUS_ONE_VALUE) {
            shoppingCart.books[bookIndex].price += book.price
            shoppingCart.books[bookIndex].quantity += SharedConstants.ONE_VALUE;
        }
        localStorageService.setItem(BookConstants.SHOP_CART_KEY, shoppingCart);
        return shoppingCart;
    }

    public removeFromCart(book: IBookGetAllBookResponseViewItem):void {
        let shoppingCart:IShoppingCartView = localStorageService.getItem(BookConstants.SHOP_CART_KEY);
        shoppingCart.quantity -= SharedConstants.ONE_VALUE;
        shoppingCart.totalPrice -= book.price;
        const bookIndex = shoppingCart.books.findIndex(x => x.id === book.id);
        if (bookIndex !== BookConstants.MINUS_ONE_VALUE) {
            shoppingCart.books[bookIndex].price -= book.price
            shoppingCart.books[bookIndex].quantity -= SharedConstants.ONE_VALUE;
            localStorageService.setItem(BookConstants.SHOP_CART_KEY, shoppingCart);
        }
        if (shoppingCart.quantity === SharedConstants.ZERO_VALUE) {
            localStorageService.removeItem(BookConstants.SHOP_CART_KEY);
        }
    }

    public clearCart():void{
        localStorageService.removeItem(BookConstants.SHOP_CART_KEY);
    }
}