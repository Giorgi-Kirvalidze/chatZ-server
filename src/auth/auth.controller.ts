import {Controller, Request, Post, UseGuards, Get, Res} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "./local-auth.guard";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {Public} from "../metadata";
import {Request as RequestType} from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const secretData = await this.authService.login(req.user);
    req.res.cookie('auth-cookie', secretData, {httpOnly: true});
    return {'jwt': secretData}
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log('profile')
    return req.user;
  }

  @Public()
  @Get()
  findAll() {
    console.log('i am dead')
    return [];
  }
}
