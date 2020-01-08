import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { HomeModule } from 'src/home/home.module';
import { AdminModule } from './admin/admin.module';
import { BookModule } from './book/book.module';

const allModules = [AuthModule, HomeModule, AdminModule, BookModule];
@Module({
  imports: [...allModules]
})
export class AppModule {}
