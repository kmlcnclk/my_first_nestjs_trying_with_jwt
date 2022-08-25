import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';

@Controller('user')
export class UserController {
  constructor(@Inject('USER_SERVICE') private userService: UserService) {}

  @Post('create')
  createUser(@Body() body: any) {
    return this.userService.create(body);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  // @UseGuards(AuthenticatedGuard)
  profile(@Req() req: Request) {
    console.log('asd');

    return req.user;
  }
}
