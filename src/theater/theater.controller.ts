import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TheaterService } from './theater.service';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { query } from 'express';
import { theaterDTO } from './dto/theater.dto';
import { cumrapDTO } from './dto/cumrap.dto';
import { raphimDTO } from './dto/rapphim.dto';
import { gheDTO } from './dto/ghe.dto';

@ApiTags('Theater Mng') //Setup cac API thành 1 cụm
@Controller('theater')
export class TheaterController {
  constructor(private readonly theaterService: TheaterService) {}

  // 1.getTheaterSystemList: Lấy Danh Sách Hệ thống rạp
  @Get('/get-TheaterSystemList')
  async getTheaterSystemList(): Promise<any> {
    return this.theaterService.getTheaterSystemList();
  }

  @ApiParam({name: 'size', required: true})
  @ApiParam({name: 'page', required: true})
  @Get('/get-TheaterSystemList/:page/:size')
  async getTheaterSystemListPerPage(@Param('page') page, @Param('size') size): Promise<any> {
    return this.theaterService.getTheaterSystemListPerPage(page,size);
  }

  // 2.getClusterTheaterBySystem: Lấy thông tin cụm rạp theo hệ thống
  @ApiQuery({name:'theater_id', required:true})
  @Get('/get-ClusterTheaterBySystem')
  async getClusterTheaterBySystem(@Query('theater_id') theater_id,): Promise<any> {
    return this.theaterService.getClusterTheaterBySystem(theater_id);
  }

  @ApiParam({name: 'size', required: true})
  @ApiParam({name: 'page', required: true})
  @ApiQuery({name:'theater_id', required:true})
  @Get('/get-ClusterTheaterBySystemPerPage/:page/:size')
  async getClusterTheaterBySystemPerPage(@Query('theater_id') theater_id, @Param('page') page, @Param('size') size): Promise<any> {
    return this.theaterService.getClusterTheaterBySystemPerPage(theater_id,page,size);
  }

  // 3.getShowtimesByTheaterSystem: Lấy thông tin lịch chiếu phim theo hệ thống rạp
  @ApiParam({name:'theater_id', required:true})
  @Get('/get-ShowtimesByTheaterSystem/:theater_id')
  async getShowtimesByTheaterSystem(@Param('theater_id') theater_id): Promise<any> {
    return this.theaterService.getShowtimesByTheaterSystem(theater_id);
  }

  // 4.getShowtimesByFilm: Lấy thông tin lịch chiếu phim 
  @ApiQuery({name:'film_id', required:true})
  @Get('/get-ShowtimesByFilm')
  async getShowtimesByFilm(@Query('film_id') film_id): Promise<any> {
    return this.theaterService.getShowtimesByFilm(film_id);
  }

  // 5.createTheater: thêm hệ thống rạp
  @ApiBody({type: theaterDTO})
  @Post('/create-Theater')
  async createTheater(@Body() body): Promise<any>{
    return await this.theaterService.createTheater(body);
  }

  // 6.updateTheater: Cập Nhật Thong Tin hệ thống rạp
  @ApiBody({type: theaterDTO})
  @ApiParam({name:'theater_id', required:true})
  @Put('/update-Theater/:theater_id')
  async updateTheater(@Body() body, @Param('theater_id') theater_id): Promise<any>{
    return await this.theaterService.updateTheater(theater_id,body);
  }

  // 7.deleteTheater: Xóa hệ thống rap
  @ApiParam({name:'theater_id', required:true})
  @Delete('/delete-Theater/:theater_id')
  async deleteTheater( @Param('theater_id') theater_id): Promise<any>{
    return await this.theaterService.deleteTheater(theater_id);
  }

  // 8.createCumRap: tạo cụm rạp theo hệ thống rạp
  @ApiBody({type: cumrapDTO})
  @Post('/create-CumRap')
  async createCumRap(@Body() body): Promise<any>{
    return await this.theaterService.createCumRap(body);
  }

  // 9.updateCumRap: Cập Nhật Thong Tin cụm rạp
  @ApiBody({type: cumrapDTO})
  @ApiParam({name:'cumrap_id', required:true})
  @Put('/update-CumRap/:cumrap_id')
  async updateCumRap(@Body() body, @Param('cumrap_id') cumrap_id): Promise<any>{
    return await this.theaterService.updateCumRap(cumrap_id,body);
  }

  // 10.deleteCumRap: Xóa cụm rap
  @ApiParam({name:'cumrap_id', required:true})
  @Post('/delete-CumRap/:cumrap_id')
  async deleteCumRap( @Param('cumrap_id') cumrap_id): Promise<any>{
    return await this.theaterService.deleteCumRap(cumrap_id);
  }

  // 11.createRapPhim: tạo rạp phim
  @ApiBody({type: raphimDTO})
  @Post('/create-RapPhim')
  async createRapPhim(@Body() body): Promise<any>{
    return await this.theaterService.createRapPhim(body);
  }

  // 12.updateRapPhim: Cập Nhật Thong Tin  rạp phim
  @ApiBody({type: raphimDTO})
  @ApiParam({name:'rapphim_id', required:true})
  @Put('/update-RapPhim/:rapphim_id')
  async updateRapPhim(@Body() body, @Param('rapphim_id') rapphim_id): Promise<any>{
    return await this.theaterService.updateRapPhim(rapphim_id,body);
  }

  // 13.deleteRapPhim: Xóa rap phim
  @ApiParam({name:'rapphim_id', required:true})
  @Post('/delete-RapPhim/:rapphim_id')
  async deleteRapPhim( @Param('rapphim_id') rapphim_id): Promise<any>{
    return await this.theaterService.deleteRapPhim(rapphim_id);
  }

  // 14.createChair: tạo ghe
  @ApiBody({type: gheDTO})
  @Post('/create-Chair')
  async createChair(@Body() body): Promise<any>{
    return await this.theaterService.createChair(body);
  }

  // 15.updateChair: Cập Nhật Thong Tin  ghe
  @ApiBody({type: gheDTO})
  @ApiParam({name:'chair_id', required:true})
  @Put('/update-Chair/:chair_id')
  async updateChair(@Body() body, @Param('chair_id') chair_id): Promise<any>{
    return await this.theaterService.updateChair(chair_id,body);
  }

  // 16.deleteChair: Xóa ghe
  @ApiParam({name:'chair_id', required:true})
  @Delete('/delete-Chair/:chair_id')
  async deleteChair( @Param('chair_id') chair_id): Promise<any>{
    return await this.theaterService.deleteChair(chair_id);
  }
}
