import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { BookticketService } from './bookticket.service';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { bookticketDTO } from './dto/bookticket.dto';
import { scheduleDTO } from './dto/schedule.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('BookTicket Mng') //Setup cac API thành 1 cụm
@Controller('bookticket')
export class BookticketController {
  constructor(private readonly bookticketService: BookticketService) {}

  // 1.bookTicket: đặt vé
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt')) //middleware authen
  @ApiBody({ type: bookticketDTO })
  @Post('/bookTicket')
  async bookTicket(@Body() body): Promise<any> {
    return await this.bookticketService.bookTicket(body);
  }
  //2. getFilmBySchedule: Láy danh sách phòng vé
  @ApiQuery({ name: 'schedule_id', required: true })
  @Get('/get-FilmBySchedule')
  async getFilmBySchedule(@Query('schedule_id') schedule_id): Promise<any> {
    return this.bookticketService.getFilmBySchedule(schedule_id);
  }

  // 3.createMovieShowtimes: tạo lịch chiếu phim
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt')) //middleware authen
  @ApiBody({ type: scheduleDTO })
  @Post('/create-MovieShowtimes')
  async createMovieShowtimes(@Body() body): Promise<any> {
    return await this.bookticketService.createMovieShowtimes(body);
  }
}
