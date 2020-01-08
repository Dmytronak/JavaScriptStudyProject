import { Module } from '@nestjs/common';
import { databaseProvider } from 'src/shared/providers/database.provider';
import { JwtStrategy } from 'src/shared/configs/jwt-strategy.config';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from 'src/shared/services/auth.service';
import { jwtDynamicModule } from 'src/shared/modules/jwt-dynamic.module';
import { repositoryProvider } from 'src/shared/providers/repository.provider';
import { AdminService } from 'src/shared/services/admin/admin.service';
import { BookService } from 'src/shared/services/book.service';
import { PaginationModel } from './models/pagination.model';

const providers = [...databaseProvider, ...repositoryProvider];
const services = [AuthService, AdminService, BookService, PaginationModel];

@Module({
    imports:[
        ConfigModule.forRoot({ isGlobal: true}),
        PassportModule,
        jwtDynamicModule
    ],
    providers: [
        JwtStrategy,
        ...services,
        ...providers,
    ],
    exports: [...providers, ...services],
})

export class SharedModule {}