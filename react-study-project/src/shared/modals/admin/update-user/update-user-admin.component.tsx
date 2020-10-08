import React, { useEffect } from 'react';
import { SharedConstants } from '../../../constants/shared.constant';
import { AdminService } from '../../../services/admin/admin.service';
import { ToastMessagesSerivce } from '../../../services/toast-messages.service';
import { AdminConstants } from '../../../constants/admin.constant';
import { IUpdateUserAdminView } from '../../../interfaces/admin/user/update-user.admin.view';
import { GetImageUrlHelper } from '../../../helpers/get-image-url.helper';
import { ImageUploadService } from '../../../services/image-upload.service';
import { IResponseUploadedPhoto } from '../../../interfaces/responses/image-upload/response-uploaded-photo';

const adminService = new AdminService();
const toastMessagesSerivce = new ToastMessagesSerivce();
const imageUploadService = new ImageUploadService();

const UpdateUserAdminComponent: React.FC<any> = ({ inputUpdatedUser, inputUserPageState, outputUserPageState, outputUpdatedUser }) => {
  const [modalProfileImageShwowState, setModalProfileImageShwowState] = React.useState<boolean>(false);
  const [updatingUser, setUpdatingUser] = React.useState<IUpdateUserAdminView>({
    id: SharedConstants.EMPTY_VALUE,
    email: SharedConstants.EMPTY_VALUE,
    firstName: SharedConstants.EMPTY_VALUE,
    lastName: SharedConstants.EMPTY_VALUE,
    fullName: SharedConstants.EMPTY_VALUE,
    age: SharedConstants.ZERO_VALUE,
    profileImage: SharedConstants.EMPTY_VALUE
  });

  useEffect(() => {
    setUpdatingUser(inputUpdatedUser);
    const isProfileImage:boolean = inputUpdatedUser.profileImage ? true : false; 
    setModalProfileImageShwowState(isProfileImage);
  }, [inputUpdatedUser]);

  const hideModal = (): void => {
    outputUserPageState(false)
  }
  const handleSubmitForm = (event: React.SyntheticEvent<HTMLFormElement>): void => {
    event.preventDefault();

    updatingUser.fullName = `${updatingUser.firstName} ${updatingUser.lastName}`;
    adminService.updateUser(updatingUser)
      .then((response) => {
        debugger
        outputUpdatedUser(updatingUser);
        outputUserPageState(false);
        toastMessagesSerivce.success(AdminConstants.UPDATE_USER_SUCCESSFULLY);
      });
  };

  const handleChangesInput = (event: React.SyntheticEvent<any>): void => {
    const fieldName = event.currentTarget.name;
    const fieldValue = event.currentTarget.value;

    setUpdatingUser({
      ...updatingUser,
      [fieldName]: fieldValue
    });
  };

  const removeProfileImage = ():void =>{
    setUpdatingUser({
      ...updatingUser,
      profileImage:SharedConstants.EMPTY_VALUE
    });
    setModalProfileImageShwowState(false);
  }
  const onImageUpload = () => (event: React.SyntheticEvent<HTMLInputElement>): void => {
    const image:File = event.currentTarget.files?.item(0)|| new File([SharedConstants.EMPTY_VALUE],SharedConstants.EMPTY_VALUE);
   imageUploadService.uploadImage(image)
    .then((response:IResponseUploadedPhoto)=>{
      setUpdatingUser({
           ...updatingUser,
           profileImage: response.imageName
       });
    });
    setModalProfileImageShwowState(true);
}
  return (
    <div className="modal fade show" data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="staticBackdropLabel" style={{ display: inputUserPageState.openEditModal ? 'inline' : 'none', paddingRight: '0px' }} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update user #{inputUpdatedUser.id}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={hideModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmitForm}>
              <div className="form-group">
                <label>Email</label>
                <input type="text" className="form-control" defaultValue={updatingUser.email} name="email" onChange={handleChangesInput}></input>
              </div>
              <div className="form-group">
                <label>First name</label>
                <input type="text" className="form-control" value={updatingUser.firstName} name="firstName" onChange={handleChangesInput}></input>
                <div className="form-group">
                  <label>Last name</label>
                  <input type="text" className="form-control" value={updatingUser.lastName} name="lastName" onChange={handleChangesInput}></input>
                </div>
                <div className="form-group">
                  <label>Age</label>
                  <input type="text" className="form-control" value={updatingUser.age} name="age" onChange={handleChangesInput}></input>
                </div>
                <div className="form-group">
                  <label>Profile image</label>
                  {
                    modalProfileImageShwowState ?
                      <div className="profile-image-group">
                        <img className="profile-image" src={GetImageUrlHelper(updatingUser.profileImage)} />
                        <div className="btn-close" onClick={removeProfileImage}/>
                      </div> :
                      <input type="file" className="form-control" onChange={onImageUpload()}></input>
                  }
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={hideModal}>Close</button>
                  <button type="submit" className="btn btn-primary">Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UpdateUserAdminComponent;