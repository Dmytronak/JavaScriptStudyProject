import { ToastMessagesSerivce } from "../../../services/toast-messages.service";
import { AdminService } from "../../../services/admin/admin.service";
import React, { useEffect } from 'react';
import { IUpdateUserAdminView } from "../../../interfaces/admin/user/update-user.admin.view";
import { SharedConstants } from "../../../constants/shared.constant";
import { IUpdatePasswordAdminView } from "../../../interfaces/admin/user/update-password-user.admin.view";

const adminService = new AdminService();
const toastMessagesSerivce = new ToastMessagesSerivce();

const UpdatePasswordAdminComponent: React.FC<any> = ({ inputUpdatedUser, inputPasswordModalState, outputPasswordModalState }) => {
    const [updatingPassword, setUpdatingPassword] = React.useState<IUpdatePasswordAdminView>({
        id: SharedConstants.EMPTY_VALUE,
        password: SharedConstants.EMPTY_VALUE
    });
    const [updatingUser, setUpdatingUser] = React.useState<IUpdateUserAdminView>({
        id: SharedConstants.EMPTY_VALUE,
        email: SharedConstants.EMPTY_VALUE,
        firstName: SharedConstants.EMPTY_VALUE,
        lastName: SharedConstants.EMPTY_VALUE,
        fullName: SharedConstants.EMPTY_VALUE,
        age: SharedConstants.ZERO_VALUE
    });
    useEffect(() => {
        setUpdatingUser(inputUpdatedUser);
        setUpdatingPassword({
            ...updatingPassword,
            id: inputUpdatedUser.id
        });
    }, [inputUpdatedUser]);
    const hideModal = (): void => {
        outputPasswordModalState(false);
        setUpdatingPassword({
            ...updatingPassword,
            password: SharedConstants.EMPTY_VALUE
        });
    };
    const handleSubmitForm = (event: React.SyntheticEvent<HTMLFormElement>): void => {
        event.preventDefault();

        adminService.updatePasswordUser(updatingPassword)
            .then((response) => {
                outputPasswordModalState(false)
                toastMessagesSerivce.success(`User #${updatingUser.id}  password successfully updated`);
            });
    };
    const handleChangesInput = (event: React.SyntheticEvent<any>): void => {
        const fieldName = event.currentTarget.name;
        const fieldValue = event.currentTarget.value;

        setUpdatingPassword({
            ...updatingPassword,
            [fieldName]: fieldValue
        });
    };
    return (
        <div className="modal fade show" data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="staticBackdropLabel" style={{ display: inputPasswordModalState.openPasswordEditModal ? 'inline' : 'none', paddingRight: '0px' }} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Updated password user #{updatingUser.id}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={hideModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmitForm}>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" name="password" value={updatingPassword.password} onChange={handleChangesInput}></input>
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
export default UpdatePasswordAdminComponent;