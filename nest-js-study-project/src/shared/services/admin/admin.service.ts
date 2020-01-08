import { Injectable, Inject, HttpException } from '@nestjs/common';
import { Repository, In, Like } from 'typeorm';
import { Role } from 'src/shared/entities/role.entity'
import { CreateRoleAdminView } from 'src/shared/view-models/admin/role/create-role.admin.view';
import { UpdateUserAdminView } from 'src/shared/view-models/admin/user/update-user.admin.view';
import { User } from 'src/shared/entities/user.entity';
import { CreateAuthorAdminView } from 'src/shared/view-models/admin/author/create-author.admin.view';
import { Author } from 'src/shared/entities/author.entity';
import { Book } from 'src/shared/entities/book.entity';
import { GetAllAuthorsAdminView, AuthorGetAllAuthorsAdminViewItem } from 'src/shared/view-models/admin/author/get-all-authors.admin.view';
import { GetAllRolesAdminView, RoleGetAllRolesAdminViewItem } from 'src/shared/view-models/admin/role/get-all-roles.admin.view';
import { UpdateAuthorAdminView } from 'src/shared/view-models/admin/author/update-author.admin.view';
import { CreateBookAdminView } from 'src/shared/view-models/admin/book/create-book.admin.view';
import { GetAllBooksAdminView, BookGetAllBooksAdminViewItem, AuthorBookGetAllBooksAdminViewItem } from 'src/shared/view-models/admin/book/get-all-books.admin.view';
import { UpdateBookAdminView } from 'src/shared/view-models/admin/book/update-book.admin.view';
import { UpdateRoleAdminView } from 'src/shared/view-models/admin/role/update-role.admin.view';
import { GetAllUsersAdminView, UserGetAllUsersAdminViewItem } from 'src/shared/view-models/admin/user/get-all-users.admin.view';
import { UpdatePasswordAdminView } from 'src/shared/view-models/admin/user/update-password-user.admin.view';
import { passwordHashHelper } from 'src/shared/helpers/password-hash.helper';
import { CreateUserAdminView } from 'src/shared/view-models/admin/user/create-user.admin.view';
import { sendEmailHelper } from 'src/shared/helpers/send-email.helper';
import { ResetPasswordAdminView } from 'src/shared/view-models/admin/user/reset-password-user.admin';
import { PayloadAuthView } from 'src/shared/view-models/auth/payload.auth.view';
import { ResponseLoginAuthView } from 'src/shared/view-models/auth/response-login-auth.view';
import { JwtService } from '@nestjs/jwt';
import { LoginAsUserAdminView } from 'src/shared/view-models/admin/user/login-as-user.admin';

@Injectable()
export class AdminService {
    constructor(
        @Inject('ROLES_REPOSITORY') private readonly rolesRepository: Repository<Role>,
        @Inject('USER_REPOSITORY') private readonly userRepository: Repository<User>,
        @Inject('AUTHOR_REPOSITORY') private readonly authorRepository: Repository<Author>,
        @Inject('BOOK_REPOSITORY') private readonly bookRepository: Repository<Book>,
        private readonly jwtService: JwtService) { }

    //#region Author

    public async createAuthor(createAuthorAdminView: CreateAuthorAdminView): Promise<void> {
        const isExistAuthor: Author = await this.authorRepository
            .findOne({
                firstName: createAuthorAdminView.firstName,
                lastName: createAuthorAdminView.lastName
            });

        if (isExistAuthor) {
            throw new HttpException({
                error: `Author ${createAuthorAdminView.firstName} ${createAuthorAdminView.lastName} is already in base`
            }, 403);
        }

        const author: Author = new Author();
        author.firstName = createAuthorAdminView.firstName;
        author.lastName = createAuthorAdminView.lastName;
        author.fullName = `${createAuthorAdminView.firstName} ${createAuthorAdminView.lastName}`
        await this.authorRepository.save(author);
    }

    public async getAllAuthors(): Promise<GetAllAuthorsAdminView> {
        const response: GetAllAuthorsAdminView = new GetAllAuthorsAdminView();
        await this.authorRepository
            .find()
            .then(result => {
                result.map(x => {
                    const author: AuthorGetAllAuthorsAdminViewItem = { 
                        id: x._id.toString(), 
                        firstName: x.firstName, 
                        lastName: x.lastName, 
                        fullName: x.fullName 
                    }
                    response.allAuthors.push(author);
                })
            });
        return response;
    }

    public async updateAuthor(updateAuthorAdminView: UpdateAuthorAdminView): Promise<void> {
        const author: Author = await this.authorRepository
            .findOne(updateAuthorAdminView.id);
        if (!author) {
            throw new HttpException({ error: `Author is not foudnd` }, 403);
        }
        author.firstName = updateAuthorAdminView.firstName;
        author.lastName = updateAuthorAdminView.lastName;
        author.fullName = `${updateAuthorAdminView.firstName} ${updateAuthorAdminView.lastName}`;
        await this.authorRepository.update(author._id.toHexString(), author)
    }

    public async deleteAuthor(id: string): Promise<void> {
        await this.authorRepository.delete(id);
    }


    //#endregion Author

    //#region Role

    public async getAllRoles(): Promise<GetAllRolesAdminView> {
        const response: GetAllRolesAdminView = new GetAllRolesAdminView();
        await this.rolesRepository
            .find()
            .then(result => {
                result.map(x => {
                    const role: RoleGetAllRolesAdminViewItem = { 
                        id: x._id.toString(), 
                        name: x.name 
                    };
                    response.allRoles.push(role);
                })
            });
        return response;
    }

    public async createRole(createRoleAdminView: CreateRoleAdminView): Promise<void> {
        const isExistRole: Role = await this.rolesRepository
            .findOne({ name: createRoleAdminView.name });

        if (isExistRole) {
            throw new HttpException({ error: `Role $${createRoleAdminView.name} is already in base` }, 403);
        }

        const role: Role = new Role();
        role.name = createRoleAdminView.name;
        await this.rolesRepository.save(role);
    }

    public async updateRole(updateRoleAdminView: UpdateRoleAdminView): Promise<void> {
        const role: Role = await this.rolesRepository
            .findOne(updateRoleAdminView.id);
        role.name = updateRoleAdminView.name;
        await this.rolesRepository.update({ _id: role._id }, role);
    }

    public async deleteRole(id: string): Promise<void> {
        await this.rolesRepository.delete(id);
    }
    
    //#endregion Role

    //#region Book

    public async createBook(createBookAdminView: CreateBookAdminView): Promise<void> {
        const ObjectID = require('mongodb').ObjectID
        const isExistBook: Book = await this.bookRepository
            .findOne({
                title: createBookAdminView.title
            });
        const authors: Author[] = await this.authorRepository
            .find({
                where: {
                    _id: {
                        $in: createBookAdminView.authors
                            .map(x => new ObjectID(x.authorId))
                    }
                }
            });

        if (isExistBook) {
            throw new HttpException({ error: `Book ${createBookAdminView.title} is already in base` }, 403);
        }

        const book: Book = new Book();
        book.title = createBookAdminView.title;
        book.type = createBookAdminView.type;
        book.price = createBookAdminView.price;
        book.authors = authors;
        await this.bookRepository.save(book);
    }

    public async getAllBooks(): Promise<GetAllBooksAdminView> {
        const response: GetAllBooksAdminView = new GetAllBooksAdminView();
        await this.bookRepository
            .find()
            .then(result => {
                result.map(x => {
                    const book: BookGetAllBooksAdminViewItem = { 
                        id: x._id.toString(), 
                        title: x.title,
                        type:x.type, 
                        price: x.price, 
                        authors: [] 
                    }
                    book.authors = x.authors.map(x => {
                        const authors: AuthorBookGetAllBooksAdminViewItem = { 
                            id: x._id.toString(), 
                            firstName: x.firstName, 
                            lastName: x.lastName, 
                            fullName: x.fullName 
                        }
                        return authors;
                    });

                    response.allBooks.push(book);
                })
            });
        return response;
    }

    public async updateBook(updateBookAdminView: UpdateBookAdminView): Promise<void> {
        const ObjectID = require('mongodb').ObjectID
        const book: Book = await this.bookRepository
            .findOne(updateBookAdminView.id);
        if (!book) {
            throw new HttpException({ error: `Book is not foudnd` }, 403);
        }
        const authors: Author[] = await this.authorRepository
            .find({
                where: {
                    _id: {
                        $in: updateBookAdminView.authors
                            .map(x => new ObjectID(x.authorId))
                    }
                }
            });

        book.title = updateBookAdminView.title;
        book.type = updateBookAdminView.type;
        book.price = updateBookAdminView.price;
        book.authors = authors;

        await this.bookRepository.update(book._id.toHexString(), book)
    }

    public async deleteBook(id: string): Promise<void> {
        await this.bookRepository.delete(id);
    }


    //#endregion Book

    //#region User

    public async createUser(createUserAdminView: CreateUserAdminView): Promise<void> {
        const isExistUser = await this.userRepository.findOne({ email: createUserAdminView.email });

        if (isExistUser) {
            throw new HttpException({ error: `User with ${createUserAdminView.email} is already exist` }, 403);
        }

        const user: User = new User();
        const credentials = passwordHashHelper(createUserAdminView.password, null);

        user.email = createUserAdminView.email;
        user.firstName = createUserAdminView.firstName;
        user.lastName = createUserAdminView.lastName;
        user.fullName = `${createUserAdminView.firstName} ${createUserAdminView.lastName}`;
        user.salt = credentials.salt;
        user.hash = credentials.hashPassword;
        user.age = createUserAdminView.age;

        await this.userRepository.save(user);

    }

    public async updateUser(updateUserAdminView: UpdateUserAdminView): Promise<void> {
        const user: User = await this.userRepository
            .findOne(updateUserAdminView.id);
        if (!user) {
            throw new HttpException({ error: `User ${updateUserAdminView.id} is not foudnd` }, 403);
        }
        
        user.email = updateUserAdminView.email;
        user.age = updateUserAdminView.age;
        user.firstName = updateUserAdminView.firstName;
        user.lastName = updateUserAdminView.lastName;
        user.fullName = updateUserAdminView.fullName;

        if (updateUserAdminView.roleId) {
            const role: Role = await this.rolesRepository
                .findOne(updateUserAdminView.roleId);
            user.roles = [role];
        }

        await this.userRepository.update(user._id.toHexString(), user)
    }

    public async getAllUsers(): Promise<GetAllUsersAdminView> {
        const response: GetAllUsersAdminView = new GetAllUsersAdminView();
        await this.userRepository
            .find()
            .then(result => {
                result.map(x => {
                    const user: UserGetAllUsersAdminViewItem = {
                        id: x._id.toString(),
                        email: x.email,
                        firstName: x.firstName,
                        lastName: x.lastName,
                        fullName: x.fullName,
                        age: x.age,
                    };
                    response.allUsers.push(user);
                })
            });
        return response;
    }

    public async deleteUser(id: string): Promise<void> {
        this.userRepository.delete(id);
    }

    public async updatePasswordUser(updatePasswordAdminView: UpdatePasswordAdminView): Promise<void> {
        const user: User = await this.userRepository
            .findOne(updatePasswordAdminView.id);
        if (!user) {
            throw new HttpException({ error: `User ${updatePasswordAdminView.id} is not foudnd` }, 403);
        }
        const credentials = passwordHashHelper(updatePasswordAdminView.password, user.salt);
        user.hash = credentials.hashPassword;
        await this.userRepository.update({ _id: user._id }, user);
    }

    public async resetPasswordUser(resetPasswordAdminView: ResetPasswordAdminView): Promise<void> {
        const user: User = await this.userRepository
            .findOne(resetPasswordAdminView.id);
        user.oldHash = user.hash;
        user.hash = process.env.ADMIN_PASSWORD;
        this.userRepository.update({ _id: user._id }, user);
        const link = `${process.env.USER_CHANGE_PASSWORD_PATH}${user._id}`;
        await sendEmailHelper(`${user.fullName}`, user.email, link)
            .catch(err => {
                throw new HttpException({
                    error: ` ${err}`
                }, 403);
            });
    }

    public async loginAsUser(loginAsUserAdminView: LoginAsUserAdminView): Promise<ResponseLoginAuthView> {
        const response: ResponseLoginAuthView = { access_token: '' };
        const user = await this.userRepository
            .findOne(loginAsUserAdminView.id);
            
        let payload: PayloadAuthView = { 
            sub: user._id, 
            email: user.email, 
            roles: Array<string>() };

        if (user.roles) {
            payload = {
                sub: user._id, email: user.email, roles: user.roles
                    .map(x => x.name)
            };
        }

        if (user) {
            await this.jwtService.signAsync(payload)
                .then(x => {
                    response.access_token = x
                });
        }

        return response;
    }

    //#endregion User
}