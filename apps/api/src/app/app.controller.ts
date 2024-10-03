import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('status')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Summary Status',
  })
  @ApiResponse({
    status: 500,
    description: 'Not available',
  })
  @ApiOperation({ summary: 'check status of api' })
  getStatus() {
    return this.appService.getStatus();
  }
}
