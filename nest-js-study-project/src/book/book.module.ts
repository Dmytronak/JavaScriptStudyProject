import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { SharedModule } from 'src/shared/shared.module';
import { BookService } from 'src/shared/services/book.service';

@Module({
  imports:[SharedModule],
  controllers: [BookController],
  providers :[BookService]
})
export class BookModule {}
