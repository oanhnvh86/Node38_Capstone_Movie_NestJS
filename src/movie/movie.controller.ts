import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { movieDTO } from './dto/movie.dto';
import { bannerDTO } from './dto/banner.dto';

@ApiTags('Movie Mng') //Setup cac API thành 1 cụm
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

   // 1.getBannerList: Lấy Danh Sách Banner
   @Get('/get-BannerList')
   async getBannerList(): Promise<any> {
     return this.movieService.getBannerList();
   }

   @ApiParam({name: 'size', required: true})
   @ApiParam({name: 'page', required: true})
   @Get('/get-BannerListPerPage/:page/:size')
   async getBannerListPerPage(@Param('page') page, @Param('size') size): Promise<any> {
     return this.movieService.getBannerListPerPage(page,size);
   }

   // 2.getMovieList: Lấy Danh Sách Phim
   @Get('/get-MovieList')
   async getMovieList(): Promise<any> {
     return this.movieService.getMovieList();
   }

   // 3.getMovieListPerPage: Lấy Danh Sách Phim Phân Trang
   @ApiParam({name: 'size', required: true})
   @ApiParam({name: 'page', required: true})
   @Get('/get-MovieListPerPage/:page/:size')
   async getMovieListPerPage(@Param('page') page, @Param('size') size): Promise<any> {
     return this.movieService.getMovieListPerPage(page,size);
   }

   // 4.getMovieListPerDay: Lấy danh sách phim theo ngày
   @ApiQuery({name:'toDate', required:true})
   @ApiQuery({name:'fromDate', required:true})
   @Get('/get-MovieListPerDay')
   async getMovieListPerDay(@Query('fromDate') fromDate, @Query('toDate') toDate): Promise<any> {
     return this.movieService.getMovieListPerDay(fromDate,toDate);
   }

   @ApiParam({name: 'size', required: true})
   @ApiParam({name: 'page', required: true})
   @ApiQuery({name:'toDate', required:true})
   @ApiQuery({name:'fromDate', required:true})
   @Get('/get-MovieListPerDayPerPage/:page/:size')
   async getMovieListPerDayPerPage(@Param('page') page, @Param('size') size, @Query('fromDate') fromDate, @Query('toDate') toDate): Promise<any> {
     return this.movieService.getMovieListPerDayPerPage(fromDate,toDate,page,size);
   }

   // 5.createMovie: thêm phim
  @ApiBody({type: movieDTO})
  @Post('/create-Movie')
  async createMovie(@Body() body): Promise<any>{
    return await this.movieService.createMovie(body);
  }

  // 6.updateMovie: Cập Nhật Thong Tin Người Dùng
    @ApiBody({type: movieDTO})
    @ApiParam({name:'movie_id', required:true})
    @Put('/update-Movie/:movie_id')
    async updateMovie(@Body() body, @Param('movie_id') movie_id): Promise<any>{
      return await this.movieService.updateMovie(movie_id,body);
    }

  // 7.deleteMovie: Xóa Phim
  @ApiParam({name:'movie_id', required:true})
  @Delete('/delete-Movie/:movie_id')
  async deleteMovie( @Param('movie_id') movie_id): Promise<any>{
    return await this.movieService.deleteMovie(movie_id);
  }

  // 8.getMovieInfo: lấy thông tin phim
  @ApiQuery({name:'movie_id', required:true})
  @Get('/get-MovieInfo')
  async getMovieInfo(@Query('movie_id') movie_id): Promise<any> {
    return this.movieService.getMovieInfo(movie_id);
  }

  // 9.createBanner: thêm banner
  @ApiBody({type: bannerDTO})
  @Post('/create-Banner')
  async createBanner(@Body() body): Promise<any>{
    return await this.movieService.createBanner(body);
  }

  // 10.updateBanner: Cập Nhật banner
  @ApiBody({type: bannerDTO})
  @ApiParam({name:'banner_id', required:true})
  @Put('/update-Banner/:banner_id')
  async updateBanner(@Body() body, @Param('banner_id') banner_id): Promise<any>{
    return await this.movieService.updateBanner(banner_id,body);
  }
  // 11.deleteBanner: Xóa Banner
  @ApiParam({name:'banner_id', required:true})
  @Delete('/delete-Banner/:banner_id')
  async deleteBanner( @Param('banner_id') banner_id): Promise<any>{
    return await this.movieService.deleteBanner(banner_id);
  }
}
