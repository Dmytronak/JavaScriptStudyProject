import React, { useState, SyntheticEvent } from "react";
import { AdminService } from "../../../shared/services/admin/admin.service";
import { ToastMessagesSerivce } from "../../../shared/services/toast-messages.service";
import Pagination from "react-js-pagination";
import { SharedConstants } from "../../../shared/constants/shared.constant";
import { PaginationCongfig } from "../../../shared/configurations/pagination.config";
import { IGetFilteredAuthorsAdminView, IAuthorIGetFilteredAuthorsAdminViewItem } from "../../../shared/interfaces/admin/author/get-filtered-authors-admin.view";
import { FilterCriteriasAdminView } from "../../../shared/interfaces/admin/filter/filter-criterias-admin.view";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { AdminConstants } from "../../../shared/constants/admin.constant";
import '../author/author.component.scss';
import { ICreateAuthorAdminView } from "../../../shared/interfaces/admin/author/create-author.admin.view";
import { IUpdateAuthorAdminView } from "../../../shared/interfaces/admin/author/update-author.admin.view";
import UpdateAuthorAdminComponent from "../../../shared/modals/admin/update-author/update-author-admin.component";

const adminService = new AdminService();
const toastMessagesSerivce = new ToastMessagesSerivce();

const AdminAuthorComponent: React.FC = () => {
    const [criterias, setCriterias] = React.useState<FilterCriteriasAdminView>({
        page: PaginationCongfig.pageNumber,
        searchString: SharedConstants.EMPTY_VALUE,
    });
    const [filteredAuthors, setAuthors] = useState<IGetFilteredAuthorsAdminView>({
        authors: [],
        quantity: SharedConstants.ONE_VALUE
    });
    const [createAuthor, setCreateAuthor] = useState<ICreateAuthorAdminView>({
        firstName: AdminConstants.EMPTY_VALUE,
        lastName:  AdminConstants.EMPTY_VALUE
    });
    const [updatingAuthor, setUpdateAuthor] = useState<IUpdateAuthorAdminView>({
        id: AdminConstants.EMPTY_VALUE,
        fullName: AdminConstants.EMPTY_VALUE,
        firstName: AdminConstants.EMPTY_VALUE,
        lastName:  AdminConstants.EMPTY_VALUE
    });
    const [pageState, setPageState] = useState<any>({
        isAddUserShow: false,
        openEditModal: false
    });
    useState(() => {
        adminService.filteredAuthors(criterias)
            .then((response: IGetFilteredAuthorsAdminView) => {
                setAuthors(response);
            });
    });
    const handlePageChange = (page: number) => {
        setCriterias({
            ...criterias,
            page:page
        });
        criterias.page = page;
        adminService.filteredAuthors(criterias)
        .then((response: IGetFilteredAuthorsAdminView) => {
            setAuthors(response);
        });
    }
    const searchAuthorByFullName = (event: SyntheticEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        criterias.searchString = value;
        adminService.filteredAuthors(criterias)
            .then((response: IGetFilteredAuthorsAdminView) => {
                setAuthors(response);
            });
    };
    const showUpdateAuthor = (author: IAuthorIGetFilteredAuthorsAdminViewItem): void => {
        setUpdateAuthor(author);
        setPageState({
            ...pageState,
            openEditModal:true
        })
    };
    const closeUpdateAuthor = (state: boolean): void => {
        setPageState({
            ...pageState,
            openEditModal: state
        });
    };
    const removeAuthor = (authorId: string): void => {
        adminService.deleteAuthor(authorId)
        .then((response:void)=>{
            const removedAuhtorIndex = filteredAuthors.authors.findIndex(x=>x.id === authorId)
            filteredAuthors.authors.splice(removedAuhtorIndex,SharedConstants.ONE_VALUE)
            setAuthors({
                ...filteredAuthors,
                authors:filteredAuthors.authors,
                quantity:filteredAuthors.quantity -= SharedConstants.ONE_VALUE
            });
            toastMessagesSerivce.warning(AdminConstants.REMOVE_AUTHOR_SUCCESSFULLY);
        });
    };
    const handleSubmitChanges = (event: React.SyntheticEvent<HTMLFormElement>): void => {
        event.preventDefault();
        adminService.createAuthor(createAuthor)
        .then((response:string) => {
            if(response){
                toastMessagesSerivce.success(AdminConstants.ADD_AUTHOR_SUCCESSFULLY);
                const author:IAuthorIGetFilteredAuthorsAdminViewItem = {
                    id: response,
                    firstName: createAuthor.firstName,
                    lastName: createAuthor.lastName,
                    fullName: `${createAuthor.firstName} ${createAuthor.lastName}`
                };
                filteredAuthors.authors.push(author);
                setAuthors({
                    ...filteredAuthors,
                    quantity: filteredAuthors.quantity += AdminConstants.ONE_VALUE,
                    authors:filteredAuthors.authors
                });
            }
        });
    };
    const handleChangesInput = (event: React.SyntheticEvent<any>): void => {
        const fieldName = event.currentTarget.name;
        const fieldValue = event.currentTarget.value;

        setCreateAuthor({
            ...createAuthor,
            [fieldName]: fieldValue
        });
    };
    const showAddBook = () => {
        setPageState({
            ...pageState,
            isAddUserShow: true
        });
    };
    const closeAddBook = () => {
        setPageState({
            ...pageState,
            isAddUserShow: false
        });
    };
    const handleUpdatedAuthor = (author: IUpdateAuthorAdminView) => {
        debugger
        const updatedAuthorIndex: number = filteredAuthors.authors.findIndex(x => x.id === author.id);
        filteredAuthors.authors[updatedAuthorIndex].firstName = author.firstName;
        filteredAuthors.authors[updatedAuthorIndex].lastName = author.lastName;
        filteredAuthors.authors[updatedAuthorIndex].fullName = `${author.firstName} ${author.lastName}`;
    };
    const itemsPerPage: number = PaginationCongfig.maxSize;
    return (
        <div className="admin-author-group">
            <div className="admin-author-header">
                <span className="admin-author-header-search">Authors</span>
                <input type="text" className="admin-author-header-search-input" placeholder="Search by full name" onChange={searchAuthorByFullName}></input>
            </div>
            {
                filteredAuthors.quantity > SharedConstants.ZERO_VALUE ?
                    <div className="admin-author-group">
                        <div className="admin-author-table">
                            <table className="table table-striped">
                                <thead className="thead-dark">
                                    <tr className="header">
                                        <th>Code</th>
                                        <th>Full Name</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filteredAuthors.authors.map((author: IAuthorIGetFilteredAuthorsAdminViewItem) => {
                                            return <tr key={author.id}>
                                                <td>{author.id}</td>
                                                <td>{author.fullName}</td>
                                                <td><button className="btn btn-outline-info" onClick={() => showUpdateAuthor(author)}><FontAwesomeIcon icon={faPencilAlt} /></button></td>
                                                <td><button className="btn btn-outline-danger" onClick={() => removeAuthor(author.id)}><FontAwesomeIcon icon={faTrash} /></button></td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="admin-author-table-pagination">
                            <Pagination
                                activePage={criterias.page}
                                itemsCountPerPage={itemsPerPage}
                                totalItemsCount={filteredAuthors.quantity}
                                onChange={(page) => handlePageChange(page)}
                                itemClass="page-item"
                                linkClass="page-link" />
                        </div>
                    </div> :
                    <div className="admin-author-group">
                        <span>{AdminConstants.EMPTY_ADMIN_AUTHOR_EMPTY}</span>
                    </div>
            }
               <UpdateAuthorAdminComponent inputUpdatedAuthor={updatingAuthor} inputAuthorPageState={pageState} outputAuthorPageState={closeUpdateAuthor} outputUpdatedAuthor={handleUpdatedAuthor} />
            <div>
                Add new author <button className="btn btn-outline-success" onClick={showAddBook}><FontAwesomeIcon icon={faPlus} /></button>
            </div>
            {
                pageState.isAddUserShow ?
                    <form onSubmit={handleSubmitChanges}>
                        <div className="form-group">
                            <label>First name</label>
                            <input type="text" className="form-control" name="firstName"  onChange={handleChangesInput}></input>
                        </div>
                        <div className="form-group">
                            <label>Last name</label>
                            <input type="text" className="form-control" name="lastName" onChange={handleChangesInput}></input>
                        </div>
                        <div className="admin-author-add-footer">
                            <button type="submit" className="btn btn-outline-secondary" onClick={closeAddBook}>Close</button>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </form>
                    : SharedConstants.EMPTY_VALUE
            }
        </div>
    );

}
export default AdminAuthorComponent;