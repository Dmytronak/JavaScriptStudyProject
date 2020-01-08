import { Controller,Get, UseGuards } from '@nestjs/common';
import { HomeService } from 'src/shared/services/home.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller()
export class HomeController {
    constructor(private readonly homeService: HomeService) {}
    @Get()
    getHello(): string {
      return this.homeService.getHello();
    }
}
