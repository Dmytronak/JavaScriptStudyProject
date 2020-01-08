import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { HomeService } from 'src/shared/services/home.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({  
  imports:[SharedModule],
  controllers: [HomeController],
  providers: [HomeService]
})
export class HomeModule {}
