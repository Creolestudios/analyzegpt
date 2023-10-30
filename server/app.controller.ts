import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  Sse,
} from '@nestjs/common';
import { AppService, langData } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
