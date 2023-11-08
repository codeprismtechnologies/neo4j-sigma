import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { AppService } from './app.service';
@Controller("movies")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getMovies(@Query('cipher') cipherQuery:any): Promise<any> {
    return await this.appService.getMovies(cipherQuery)
  }
}
