export interface IShoppingCartView {
    quantity:number;
    totalPrice:number;
    books:IBookIShoppingCartViewItem[];
}
export interface IBookIShoppingCartViewItem{
    id:string;
    quantity:number;
    title: string;
    price: number;
}