import { Controller, Post, Body, SetMetadata, UseGuards, Get, Param } from '@nestjs/common';
import { CreateRoleAdminView } from 'src/shared/view-models/admin/role/create-role.admin.view';
import { AdminService } from 'src/shared/services/admin/admin.service';
import { UpdateUserAdminView } from 'src/shared/view-models/admin/user/update-user.admin.view';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/shared/guards/role-based.guard';
import { CreateAuthorAdminView } from 'src/shared/view-models/admin/author/create-author.admin.view';
import { GetAllAuthorsAdminView } from 'src/shared/view-models/admin/author/get-all-authors.admin.view';
import { GetAllRolesAdminView } from 'src/shared/view-models/admin/role/get-all-roles.admin.view';
import { UpdateAuthorAdminView } from 'src/shared/view-models/admin/author/update-author.admin.view';
import { CreateBookAdminView } from 'src/shared/view-models/admin/book/create-book.admin.view';
import { GetAllBooksAdminView } from 'src/shared/view-models/admin/book/get-all-books.admin.view';
import { UpdateBookAdminView } from 'src/shared/view-models/admin/book/update-book.admin.view';
import { UpdateRoleAdminView } from 'src/shared/view-models/admin/role/update-role.admin.view';
import { GetAllUsersAdminView } from 'src/shared/view-models/admin/user/get-all-users.admin.view';
import { UpdatePasswordAdminView } from 'src/shared/view-models/admin/user/update-password-user.admin.view';
import { CreateUserAdminView } from 'src/shared/view-models/admin/user/create-user.admin.view';
import { ResetPasswordAdminView } from 'src/shared/view-models/admin/user/reset-password-user.admin';
import { ResponseLoginAuthView } from 'src/shared/view-models/auth/response-login-auth.view';
import { LoginAsUserAdminView } from 'src/shared/view-models/admin/user/login-as-user.admin';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('admin')
@ApiBearerAuth()
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    //#region User

    @SetMetadata('roles', ['admin'])
    @Post('/createUser')
    async createUser(@Body() createUserAdminView: CreateUserAdminView): Promise<void> {
        await this.adminService.createUser(createUserAdminView);
    }

    @SetMetadata('roles', ['admin'])
    @Get('/allUsers')
    async getAllUsers(): Promise<GetAllUsersAdminView> {
        const response = await this.adminService.getAllUsers();
        return response;
    }

    @SetMetadata('roles', ['admin'])
    @Post('/updateUser')
    async updateUser(@Body() updateUserAdminView: UpdateUserAdminView): Promise<void> {
        await this.adminService.updateUser(updateUserAdminView);
    }

    @SetMetadata('roles', ['admin'])
    @Post('/updatePasswordUser')
    async updatePasswordUser(@Body() updatePasswordAdminView: UpdatePasswordAdminView): Promise<void> {
        await this.adminService.updatePasswordUser(updatePasswordAdminView);
    }

    @ApiParam({
        name:'id',
        type:'string'
    })
    @SetMetadata('roles', ['admin'])
    @Get('/deleteUser/:id')
    async deleteUser(@Param() params): Promise<void> {
        await this.adminService.deleteUser(params.id);
    }

    @SetMetadata('roles', ['admin'])
    @Post('/resetPasswordUser')
    async resetPasswordUser(@Body() resetPasswordAdminView: ResetPasswordAdminView): Promise<void> {
        await this.adminService.resetPasswordUser(resetPasswordAdminView);
    }
    //#endregion User

    //#region Book

    @SetMetadata('roles', ['admin'])
    @Post('/createBook')
    async createBook(@Body() createBookAdminView: CreateBookAdminView): Promise<void> {
        await this.adminService.createBook(createBookAdminView);
    }

    @SetMetadata('roles', ['admin'])
    @Get('/getAllBooks')
    async getAllBooks(): Promise<GetAllBooksAdminView> {
        return await this.adminService.getAllBooks();
    }

    @SetMetadata('roles', ['admin'])
    @Post('/updateBook')
    async updateBook(@Body() updateBookAdminView: UpdateBookAdminView): Promise<void> {
        await this.adminService.updateBook(updateBookAdminView);
    }

    @ApiParam({
        name:'id',
        type:'string'
    })
    @SetMetadata('roles', ['admin'])
    @Get('/deleteBook/:id')
    async deleteBook(@Param() params): Promise<void> {
        await this.adminService.deleteBook(params.id);
    }
    //#endregion Book

    //#region Author

    @SetMetadata('roles', ['admin'])
    @Post('/createAuthor')
    async createAuthor(@Body() createAuthorAdminView: CreateAuthorAdminView): Promise<void> {
        await this.adminService.createAuthor(createAuthorAdminView);
    }

    @SetMetadata('roles', ['admin'])
    @Get('/getAllAuthors')
    async getAllAuthors(): Promise<GetAllAuthorsAdminView> {
        return await this.adminService.getAllAuthors();
    }

    @SetMetadata('roles', ['admin'])
    @Post('/updateAuthor')
    async updateAuthor(@Body() updateAuthorAdminView: UpdateAuthorAdminView): Promise<void> {
        await this.adminService.updateAuthor(updateAuthorAdminView);
    }

    @ApiParam({
        name:'id',
        type:'string'
    })
    @SetMetadata('roles', ['admin'])
    @Get('/deleteAuthor/:id')
    async deleteAuthor(@Param() params): Promise<void> {
        await this.adminService.deleteAuthor(params.id);
    }

    //#endregion Author

    //#region Roles

    @SetMetadata('roles', ['admin'])
    @Get('/getAllRoles')
    async getAllRoles(): Promise<GetAllRolesAdminView> {
        return await this.adminService.getAllRoles();
    }

    @SetMetadata('roles', ['admin'])
    @Post('/createRole')
    async createRole(@Body() createRoleAdminView: CreateRoleAdminView): Promise<void> {
        await this.adminService.createRole(createRoleAdminView);
    }
    @SetMetadata('roles', ['admin'])
    @Post('/updateRole')
    async updateRole(@Body() updateRoleAdminView: UpdateRoleAdminView): Promise<void> {
        await this.adminService.updateRole(updateRoleAdminView);
    }

    @ApiParam({
        name:'id',
        type:'string'
    })
    @SetMetadata('roles', ['admin'])
    @Get('/deleteRole/:id')
    async deleteRole(@Param() params): Promise<void> {
        await this.adminService.deleteRole(params.id);
    }

    @SetMetadata('roles', ['admin'])
    @Post('/loginAsUser/')
    async loginAsUser(@Body() loginAsUserAdminView: LoginAsUserAdminView): Promise<ResponseLoginAuthView> {
        return await this.adminService.loginAsUser(loginAsUserAdminView);
    }
    //#endregion Roles
}
