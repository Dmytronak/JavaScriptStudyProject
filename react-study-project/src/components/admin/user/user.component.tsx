import React, { useState, useEffect, SyntheticEvent } from "react";
import { SharedConstants } from "../../../shared/constants/shared.constant";
import Pagination from "react-js-pagination";
import { IGetFilteredUsersAdminView, IUserIGetFilteredUsersAdminViewItem } from "../../../shared/interfaces/admin/user/get-filtered-users-admin.view";
import { FilterCriteriasAdminView } from "../../../shared/interfaces/admin/filter/filter-criterias-admin.view";
import { PaginationCongfig } from "../../../shared/configurations/pagination.config";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AdminService } from "../../../shared/services/admin/admin.service";
import { ToastMessagesSerivce } from "../../../shared/services/toast-messages.service";
import { AdminConstants } from "../../../shared/constants/admin.constant";

const adminService = new AdminService();
const toastMessagesSerivce = new ToastMessagesSerivce();

const AdminUserComponent: React.FC = () => {
    const [criterias, setCriterias] = React.useState<FilterCriteriasAdminView>({
        page: PaginationCongfig.pageNumber,
        searchString: SharedConstants.EMPTY_VALUE,
    });
    const [filteredUsers, setUsers] = useState<IGetFilteredUsersAdminView>({
        users: [],
        quantity: SharedConstants.ONE_VALUE
    });
    useEffect(() => {
        adminService.filteredUsers(criterias)
            .then((resposne: IGetFilteredUsersAdminView) => {
                setUsers(resposne);
            });
    }, []);

    const showUpdateUser = (user:IUserIGetFilteredUsersAdminViewItem):void =>{

    };
    const removeUser = (userId:string):void =>{
        adminService.deleteUser(userId)
        .then((resposne) => {
            toastMessagesSerivce.warning(AdminConstants.REMOVE_USER_SUCCESSFULLY)
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

    const itemsPerPage: number = PaginationCongfig.maxSize;
    return (
        filteredUsers.users.length > SharedConstants.ZERO_VALUE ?
            <div className="admin-book-gropup">
                <div className="admin-book-header">
                    <span className="admin-book-header-search">Users</span>
                    <input type="text" className="admin-book-header-search-input" placeholder="Search by email" onChange={searchUserByEmail}></input>
                </div>
                <div className="admin-book-table">
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr className="header">
                                <th>Code</th>
                                <th>Email</th>
                                <th>Full Name</th>
                                <th>age</th>
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
                                        <td><button className="btn btn-outline-danger" onClick={() => removeUser(user.id)}><FontAwesomeIcon icon={faTrash} /></button></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="admin-book-table-pagination">
                    <Pagination
                        activePage={criterias.page}
                        itemsCountPerPage={itemsPerPage}
                        totalItemsCount={filteredUsers.quantity}
                        onChange={(page) => handlePageChange(page)}
                        itemClass="page-item"
                        linkClass="page-link" />
                </div>
                {/* <UpdateBookAdminComponent inputUpdatedBook={updatingBook} inputBookPageState={pageState} outputBookPageState={closeUpdateBook} outputUpdatedBook={handleUpdatedBook} /> */}
            </div>
            :
            <div className="admin-book-gropup">
                {/* <span>{BookConstants.EMPTY_ADMIN_BOOK_EMPTY}</span> */}
            </div>
    );
}

export default AdminUserComponent;