import { Controller, Get, Post, Body, UseGuards, SetMetadata, Param } from '@nestjs/common';
import { AuthService } from 'src/shared/services/auth.service';
import { RegisterAuthView } from 'src/shared/view-models/auth/register-auth.view';
import { LoginAuthView } from 'src/shared/view-models/auth/login-auth.view';
import { ResponseLoginAuthView } from 'src/shared/view-models/auth/response-login-auth.view';
import { GetAllUsersAuthView } from 'src/shared/view-models/auth/get-all-user-auth.view';
import { RestorePasswordAuthView } from 'src/shared/view-models/auth/reset-password-auth';
import { GetRestorePasswordAuthView } from 'src/shared/view-models/auth/get-reset-password-auth';
import { ApiParam } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Get()
    getAuth(): string {
        return this.authService.getLogin();
    }

    @Get('/login')
    getLogin(): string {
        return this.authService.getLogin();
    }

    @Get('/register')
    getRegister(): string {
        return this.authService.getRegister();
    }

    @Get('/allUsers')
    async getAllUsers(): Promise<GetAllUsersAuthView> {
        const response = await this.authService.getAllUsers();
        return response;
    }

    @Post('/register')
    async register(@Body() registerViewModel: RegisterAuthView): Promise<void> {
        await this.authService.register(registerViewModel);
    }

    @Post('/login')
    async login(@Body() loginAuthView: LoginAuthView): Promise<ResponseLoginAuthView> {
        return await this.authService.login(loginAuthView);
    }
    
    @ApiParam({
        name:'id',
        type:'string'
    })
    @Get('/restorePassword/:id')
    async getRestorePassword(@Param() params): Promise<GetRestorePasswordAuthView> {
        return await this.authService.getRestorePasssword(params.id);
    }

    @Post('/restorePassword')
    async restorePassword(@Body() restorePasswordAuthView: RestorePasswordAuthView): Promise<void> {
        await this.authService.restorePassword(restorePasswordAuthView);
    }

}