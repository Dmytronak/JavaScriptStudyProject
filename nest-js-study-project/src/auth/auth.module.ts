import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { AuthController } from 'src/auth/auth.controller';

@Module({  
  imports:[SharedModule],
  controllers: [AuthController],
})
export class AuthModule {}
