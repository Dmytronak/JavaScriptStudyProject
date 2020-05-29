import React, { useEffect, SyntheticEvent } from 'react';
import { IBookIGetAllBooksAdminViewItem, IAuthorBookIGetAllBooksAdminViewItem } from '../../../interfaces/admin/book/get-all-books.admin.view';
import { SharedConstants } from '../../../constants/shared.constant';
import { BookType } from '../../../enums/book-type.enum';
import { EnumToArrayHelper } from '../../../helpers/enum-to-array.helper';
import { BookConstants } from '../../../constants/book.constants';
import { AdminService } from '../../../services/admin/admin.service';
import { IGetAllAuthorsAdminView, IAuthorIGetAllAuthorsAdminViewItem } from '../../../interfaces/admin/author/get-all-authors.admin.view';
import { IUpdateBookAdminView, IAuthorIUpdateBookAdminViewItem } from '../../../interfaces/admin/book/update-book.admin.view';
import { ToastMessagesSerivce } from '../../../services/toast-messages.service';

const adminService = new AdminService();
const toastMessagesSerivce = new ToastMessagesSerivce();

const UpdateBookAdminComponent: React.FC<any> = ({ inputUpdatedBook }) => {
  const [showModalState, setShowModalState] = React.useState<boolean>(false);
  const [updatingBook, setUpdatingBook] = React.useState<IBookIGetAllBooksAdminViewItem>({
    id: SharedConstants.EMPTY_VALUE,
    title: SharedConstants.EMPTY_VALUE,
    type: BookType.None,
    price: SharedConstants.ZERO_VALUE,
    authors: []
  });
  const [authors, setAuthors] = React.useState<IGetAllAuthorsAdminView>({
    allAuthors: []
  });
  const bookTypes = EnumToArrayHelper(BookType);
  useEffect(() => {
    showModal();
    setUpdatingBook(inputUpdatedBook);
  }, [inputUpdatedBook]);

  const showModal = (): void => {
    if (inputUpdatedBook.id) {
      setShowModalState(true);
    }
    adminService.getAllAuthors()
    .then((response: IGetAllAuthorsAdminView) => {
      setAuthors(response);
    })
  };
  const hideModal = (): void => {
    setShowModalState(false);
  }
  const handleSubmitForm = (event: React.SyntheticEvent<HTMLFormElement>): void => {
    const updateBook: IUpdateBookAdminView = {
      id: updatingBook.id,
      title: updatingBook.title,
      type: updatingBook.type,
      price: updatingBook.price,
      authors: updatingBook.authors.map((x: IAuthorBookIGetAllBooksAdminViewItem) => {
        const author: IAuthorIUpdateBookAdminViewItem = {
          authorId: x.id
        };
        return author;
      })
    }
    adminService.updateBook(updateBook)
    .then((response)=>{
      toastMessagesSerivce.success('Success')
    }) 
  };
  const handleChangesInput = (event: React.SyntheticEvent<any>): void => {
    const fieldName = event.currentTarget.name;
    const fieldValue = event.currentTarget.value;
    const type = event.currentTarget.type;


    if (type === BookConstants.BOOK_SELECT_ONE_TYPE) {
      setUpdatingBook({
        ...updatingBook,
        ['type']: fieldValue
      });
      return;
    }
    if (type === BookConstants.BOOK_SELECT_MULTIPLE_TYPE) {
      const selectedOptions = event.currentTarget.selectedOptions;
      const authorsOfBook: IAuthorBookIGetAllBooksAdminViewItem[] = [];
      for (let index = 0; index < selectedOptions.length; index++) {
        const authorId = selectedOptions[index].value;
        const author: IAuthorIGetAllAuthorsAdminViewItem = authors.allAuthors.find(x => x.id === authorId)!;
        authorsOfBook.push(author);
      }
      setUpdatingBook({
        ...updatingBook,
        ['authors']: authorsOfBook
      });
      return;
    }

    setUpdatingBook({
      ...updatingBook,
      [fieldName]: fieldValue
    });
  }


  return (
    <div className="modal fade show" data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="staticBackdropLabel" style={{ display: showModalState ? 'inline' : 'none', paddingRight: '0px' }} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update book #{inputUpdatedBook.id}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={hideModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmitForm}>
              <div className="form-group">
                <label>Title</label>
                <input type="text" className="form-control" defaultValue={updatingBook.title} name="title" onChange={handleChangesInput}></input>
              </div>
              <div className="form-group">
                <label>Type</label>
                <select className="form-control" value={updatingBook.type} onChange={handleChangesInput}>
                  {
                    bookTypes.map((type: number) => {
                      return <option value={type} key={type}>{BookType[type]}</option>
                    })

                  }
                </select>
              </div>
              <div className="form-group">
                <label>Price</label>

                <input type="text" className="form-control" value={updatingBook.price} name="price" onChange={handleChangesInput}></input>
              </div>
              <div className="form-group">
                <label>Authors</label>
                <select className="form-control" value={updatingBook.authors.map(x => x.id)} onChange={handleChangesInput} multiple size={3}>
                  {
                    authors.allAuthors.map((author: IAuthorIGetAllAuthorsAdminViewItem) => {
                      return <option value={author.id} key={author.id}>{author.fullName}</option>
                    })
                  }
                </select>
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
}
export default UpdateBookAdminComponent;