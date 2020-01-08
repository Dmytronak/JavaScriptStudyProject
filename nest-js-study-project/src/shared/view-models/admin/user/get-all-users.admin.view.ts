export class GetAllUsersAdminView {
    allUsers: UserGetAllUsersAdminViewItem[] = [];
}
export class UserGetAllUsersAdminViewItem {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    age: number;
}