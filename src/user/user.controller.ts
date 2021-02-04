import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignupUserDTO } from './dto/signup-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  create(@Body() signupUserDto: SignupUserDTO) {
    return this.userService.signUp(signupUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Request() req) {
    return this.userService.signIn(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Request() req) {
    return req.user;
  }
}
