import React, { useState, useEffect, SyntheticEvent } from "react";
import { SharedConstants } from "../../../shared/constants/shared.constant";
import Pagination from "react-js-pagination";
import { IGetFilteredUsersAdminView, IUserIGetFilteredUsersAdminViewItem } from "../../../shared/interfaces/admin/user/get-filtered-users-admin.view";
import { FilterCriteriasAdminView } from "../../../shared/interfaces/admin/filter/filter-criterias-admin.view";
import { PaginationCongfig } from "../../../shared/configurations/pagination.config";
import { faPencilAlt, faTrash, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AdminService } from "../../../shared/services/admin/admin.service";
import { ToastMessagesSerivce } from "../../../shared/services/toast-messages.service";
import { AdminConstants } from "../../../shared/constants/admin.constant";
import { IUpdateUserAdminView } from "../../../shared/interfaces/admin/user/update-user.admin.view";
import UpdateUserAdminComponent from "../../../shared/modals/admin/update-user/update-user-admin.component";
import UpdatePasswordAdminComponent from "../../../shared/modals/admin/update-password/update-password-admin.component";
import { ILoginAsUserAdminView } from "../../../shared/interfaces/admin/user/login-as-user.admin.view";
import { IResponseLoginAuthView } from "../../../shared/interfaces/auth/response-login-auth.view";
import { AuthService } from "../../../shared/services/auth.service";
import '../user/user.component.scss';

const adminService = new AdminService();
const toastMessagesSerivce = new ToastMessagesSerivce();
const authService = new AuthService();

const AdminUserComponent: React.FC = () => {
    const [criterias, setCriterias] = React.useState<FilterCriteriasAdminView>({
        page: PaginationCongfig.pageNumber,
        searchString: SharedConstants.EMPTY_VALUE,
    });
    const [filteredUsers, setUsers] = useState<IGetFilteredUsersAdminView>({
        users: [],
        quantity: SharedConstants.ONE_VALUE
    });
    const [updatingUser, setUpdatingUser] = React.useState<IUpdateUserAdminView>({
        id: SharedConstants.EMPTY_VALUE,
        email: SharedConstants.EMPTY_VALUE,
        firstName: SharedConstants.EMPTY_VALUE,
        lastName: SharedConstants.EMPTY_VALUE,
        fullName: SharedConstants.EMPTY_VALUE,
        age: SharedConstants.ZERO_VALUE
      });
    const [pageState, setPageState] = useState<any>({
        openEditModal: false,
        openPasswordEditModal:false
    }); 
    useEffect(() => {
        adminService.filteredUsers(criterias)
            .then((resposne: IGetFilteredUsersAdminView) => {
                setUsers(resposne);
            });
    }, []);
    const closeUpdateUser = (state: boolean): void => {
        setPageState({
            ...pageState,
            openEditModal : state
        });
    };
    const closeUpdatePassword = (state: boolean): void => {
        setPageState({
            ...pageState,
            openPasswordEditModal: state
        });
    };
    const showUpdatePassword = (user:IUserIGetFilteredUsersAdminViewItem):void =>{
        setUpdatingUser(user);
        setPageState({
            ...pageState,
            openPasswordEditModal: true
        });
    };
    const showUpdateUser = (user:IUserIGetFilteredUsersAdminViewItem):void =>{
        setUpdatingUser(user);
        setPageState({
            ...pageState,
            openEditModal: true
        });
    };
    const removeUser = (userId:string):void =>{
        adminService.deleteUser(userId)
        .then((resposne) => {
            const removedUserIndex: number = filteredUsers.users.findIndex(x => x.id === userId);
            filteredUsers.users.splice(removedUserIndex, SharedConstants.ONE_VALUE);
            filteredUsers.quantity -= SharedConstants.ONE_VALUE;
            setUsers({
                ...filteredUsers.users,
                quantity: filteredUsers.quantity,
                users: filteredUsers.users
            });
            toastMessagesSerivce.warning(AdminConstants.REMOVE_USER_SUCCESSFULLY);
        });
    };
    
    const handlePageChange = (page: number): void => {
        criterias.page = page;
        adminService.filteredUsers(criterias)
            .then((resposne: IGetFilteredUsersAdminView) => {
                setUsers(resposne);
            });
    };
    const searchUserByEmail = (event: SyntheticEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        criterias.searchString = value;
        adminService.filteredUsers(criterias)
            .then((resposne: IGetFilteredUsersAdminView) => {
                setUsers(resposne);
            });
    };
    const handleUpdatedUser = (user: IUpdateUserAdminView):void => {
        const updatedUserIndex: number = filteredUsers.users.findIndex(x => x.id === user.id);
        filteredUsers.users[updatedUserIndex].email = user.email;
        filteredUsers.users[updatedUserIndex].firstName = user.firstName;
        filteredUsers.users[updatedUserIndex].lastName = user.lastName;
        filteredUsers.users[updatedUserIndex].fullName = user.fullName;
        filteredUsers.users[updatedUserIndex].age = user.age;
    };
    const loginAsChoosenUser = (userId:string):void=>{
        const login:ILoginAsUserAdminView ={
            id:userId
        };;
        adminService.loginAsUser(login)
        .then((response:IResponseLoginAuthView) =>{
            if(response.access_token){
                authService.loginAsUser(response.access_token);
            }
        });
    };
    const itemsPerPage: number = PaginationCongfig.maxSize;
    return (
        <div className="admin-user-group">
        <div className="admin-user-header">
            <span className="admin-user-header-search">Users</span>
            <input type="text" className="admin-user-header-search-input" placeholder="Search by email" onChange={searchUserByEmail}></input>
        </div>
        {
        filteredUsers.quantity > SharedConstants.ZERO_VALUE ?
            <div className="admin-user-group">
                <div className="admin-user-table">
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr className="header">
                                <th>Code</th>
                                <th>Email</th>
                                <th>Full Name</th>
                                <th>Age</th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredUsers.users.map((user: IUserIGetFilteredUsersAdminViewItem) => {
                                    return <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.email}</td>
                                        <td>{user.fullName}</td>
                                        <td>{user.age}</td>
                                        <td><button className="btn btn-outline-info" onClick={() => showUpdateUser(user)}><FontAwesomeIcon icon={faPencilAlt} /></button></td>
                                        <td><button className="btn btn-outline-primary" onClick={() => loginAsChoosenUser(user.id)}><FontAwesomeIcon icon={faUser} /></button></td>
                                        <td><button className="btn btn-outline-warning" onClick={() => showUpdatePassword(user)}><FontAwesomeIcon icon={faKey} /></button></td>
                                        <td><button className="btn btn-outline-danger" onClick={() => removeUser(user.id)}><FontAwesomeIcon icon={faTrash} /></button></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="admin-user-table-pagination">
                    <Pagination
                        activePage={criterias.page}
                        itemsCountPerPage={itemsPerPage}
                        totalItemsCount={filteredUsers.quantity}
                        onChange={(page) => handlePageChange(page)}
                        itemClass="page-item"
                        linkClass="page-link" />
                </div>
             <UpdateUserAdminComponent inputUpdatedUser={updatingUser} inputUserPageState={pageState} outputUserPageState={closeUpdateUser} outputUpdatedUser={handleUpdatedUser} />
             <UpdatePasswordAdminComponent inputUpdatedUser={updatingUser}  inputPasswordModalState={pageState} outputPasswordModalState={closeUpdatePassword}/>
            </div>
            :
            <div className="admin-user-group">
                <span>{AdminConstants.EMPTY_ADMIN_USER_EMPTY}</span>
            </div>
            }
        </div>
    );
}

export default AdminUserComponent;