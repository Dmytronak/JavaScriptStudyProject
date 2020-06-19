import React, { useEffect, useState, SyntheticEvent } from 'react';
import { AdminConstants } from '../../../constants/admin.constant';
import { IUpdateAuthorAdminView } from '../../../interfaces/admin/author/update-author.admin.view';
import { AdminService } from '../../../services/admin/admin.service';
import { ToastMessagesSerivce } from '../../../services/toast-messages.service';

const adminService = new AdminService();
const toastMessagesSerivce = new ToastMessagesSerivce();

const UpdateAuthorAdminComponent: React.FC<any> = ({ inputUpdatedAuthor, inputAuthorPageState, outputAuthorPageState, outputUpdatedAuthor }) => {
    const [updateAuthor, setUpdateAuthor] = useState<IUpdateAuthorAdminView>({
        id: AdminConstants.EMPTY_VALUE,
        fullName: AdminConstants.EMPTY_VALUE,
        firstName: AdminConstants.EMPTY_VALUE,
        lastName: AdminConstants.EMPTY_VALUE
    });
    useEffect(() => {
        setUpdateAuthor(inputUpdatedAuthor);
    }, [inputUpdatedAuthor]);
    const handleSubmitForm = (event: SyntheticEvent<HTMLFormElement>): void => {
        event.preventDefault();
        adminService.updateAuthor(updateAuthor)
        .then((response:void)=>{
            toastMessagesSerivce.success(AdminConstants.UPDATE_AUTHOR_SUCCESSFULLY);
            outputUpdatedAuthor(updateAuthor);
            outputAuthorPageState(false);
        });

    };
    const handleChangesInput = (event: SyntheticEvent<HTMLInputElement>): void => {
        const value = event.currentTarget.value;
        const feieldName = event.currentTarget.name;
        setUpdateAuthor({
            ...updateAuthor,
            [feieldName]:value
        });
    };
    const hideModal = (): void => {
        outputAuthorPageState(false);
    };

    return (
        <div className="modal fade show" data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="staticBackdropLabel" style={{ display: inputAuthorPageState.openEditModal ? 'inline' : 'none', paddingRight: '0px' }} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Update author #{inputUpdatedAuthor.id}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={hideModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmitForm}>
                            <div className="form-group">
                                <label>First name</label>
                                <input type="text" className="form-control" value={updateAuthor.firstName} name="firstName" onChange={handleChangesInput}></input>
                            </div>

                            <div className="form-group">
                                <label>Last name</label>

                                <input type="text" className="form-control" value={updateAuthor.lastName} name="lastName" onChange={handleChangesInput}></input>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={hideModal}>Close</button>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default UpdateAuthorAdminComponent;