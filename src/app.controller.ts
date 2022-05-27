import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  create() {
    return 'this is good';
  }
}
