import { Controller, Get, Query, BadRequestException, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { PostDto } from './movies.dto';
@Controller("movies")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  async getMovies(@Body() PostObject:PostDto): Promise<any> {
    return await this.appService.getMovies(PostObject.cipherQuery)
  }
}
