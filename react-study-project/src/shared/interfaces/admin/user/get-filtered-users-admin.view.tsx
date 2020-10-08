export interface IGetFilteredUsersAdminView {
    users: IUserIGetFilteredUsersAdminViewItem[];
    quantity:number;
}
export interface IUserIGetFilteredUsersAdminViewItem {
    id: string;
    email: string;
    profileImage:string;
    firstName: string;
    lastName: string;
    fullName: string;
    age: number;
}