export class GetFilteredUsersAdminView {
    users: UserGetFilteredUsersAdminViewItem[] = [];
    quantity:number;
}
export class UserGetFilteredUsersAdminViewItem {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    age: number;
}