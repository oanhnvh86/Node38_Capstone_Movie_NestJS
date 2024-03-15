import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { movieDTO } from './dto/movie.dto';
import { bannerDTO } from './dto/banner.dto';

@Injectable()
export class MovieService {
  prisma = new PrismaClient();

  // 1.getBannerList: Lấy Danh Sách Banner
  async getBannerList(): Promise<any> {
    try {
      let data = await this.prisma.banner.findMany();
      // res.send(data);
      return {
        status: 200,
        content: data,
      };
    } catch (error) {
      return {
        status: 500,
        content: `BE error: ${error}`,
      };
    }
  }
  async getBannerListPerPage(page: string, size: string): Promise<any> {
    // let {page, size} = req.params;
    let num_page = Number(page);
    let num_size = Number(size);
    let index = (num_page - 1) * num_size;
    try {
      let data = await this.prisma.banner.findMany({
        skip: index,
        take: num_size,
      });
      return {
        status: 200,
        content: data,
      };
    } catch (error) {
      return {
        status: 500,
        content: `BE error: ${error}`,
      };
    }
  }

  // 2.getMovieList: Lấy Danh Sách Phim
  async getMovieList(): Promise<any> {
    try {
      let data = await this.prisma.phim.findMany();
      return {
        status: 200,
        content: data,
      };
    } catch (error) {
      return {
        status: 500,
        content: `BE error: ${error}`,
      };
    }
  }

  // 3.getMovieListPerPage: Lấy Danh Sách Phim Phân Trang
  async getMovieListPerPage(page: string, size: string): Promise<any> {
    // let {page, size} = req.params;
    let num_page = Number(page);
    let num_size = Number(size);
    let index = (num_page - 1) * num_size;
    try {
      let data = await this.prisma.phim.findMany({
        skip: index,
        take: num_size,
      });
      return {
        status: 200,
        content: data,
      };
    } catch (error) {
      return {
        status: 500,
        content: `BE error: ${error}`,
      };
    }
  }

  // 4.getMovieListPerDay: Lấy danh sách phim theo ngày
  async getMovieListPerDay(fromDate: string, toDate: string): Promise<any> {
    // let {fromDate, toDate} = req.query;
    let fromDateDTS = new Date(fromDate);
    let toDateDTS = new Date(toDate);
    if (fromDateDTS > toDateDTS) {
      return {
        status: 400,
        message: 'Please input fromDate <= toDate',
      };
    } else {
      try {
        let data = await this.prisma.phim.findMany({
          where: {
            ngay_khoi_chieu: {
              gte: fromDateDTS,
              lte: toDateDTS,
            },
          },
        });
        return {
          status: 200,
          content: data,
        };
      } catch (error) {
        return {
          status: 500,
          content: `BE error: ${error}`,
        };
      }
    }
  }

  async getMovieListPerDayPerPage(
    fromDate: string,
    toDate: string,
    page: string,
    size: string,
  ): Promise<any> {
    // let {fromDate, toDate} = req.query;
    // let {page, size} = req.params;
    let num_page = Number(page);
    let num_size = Number(size);
    let index = (num_page - 1) * num_size;
    let fromDateDTS = new Date(fromDate);
    let toDateDTS = new Date(toDate);
    if (fromDateDTS > toDateDTS) {
      return {
        status: 400,
        message: 'Please input fromDate <= toDate',
      };
    } else {
      try {
        let data = await this.prisma.phim.findMany({
          where: {
            ngay_khoi_chieu: {
              gte: fromDateDTS,
              lte: toDateDTS,
            },
          },
          skip: index,
          take: num_size,
        });
        return {
          status: 200,
          content: data,
        };
      } catch (error) {
        return {
          status: 500,
          content: `BE error: ${error}`,
        };
      }
    }
  }

  // 5.createMovie: thêm phim
  async createMovie(body: movieDTO): Promise<any> {
    try {
      let {
        movie_name,
        trailer,
        image,
        description,
        premiere_date,
        rate,
        is_hot,
        is_showing_date,
        is_upcoming_date,
      } = body;
      //image: update hinh anh ?? comming later
      console.log('body:', body);
      let data = await this.prisma.phim.findFirst({
        where: {
          ten_phim: movie_name,
        },
      });
      if (data) {
        return {
          status: 400,
          message: 'Movie is existed! Please input other Movie.',
        };
      } else {
        let newData = {
          ten_phim: movie_name,
          trailer,
          hinh_anh: image,
          mo_ta: description,
          ngay_khoi_chieu: premiere_date,
          danh_gia: rate,
          hot: is_hot,
          dang_chieu: is_showing_date,
          sap_chieu: is_upcoming_date,
        };
        console.log('newData:', newData);
        await this.prisma.phim.create({
          data: newData,
        });
        return {
          status: 200,
          message: 'Create Movie successfull',
        };
      }
    } catch (error) {
      return {
        status: 500,
        message: `BE error: ${error}`,
      };
    }
  }

  // 6.updateMovie: Cập Nhật Thong Tin Người Dùng
  async updateMovie(movie_id: string, body: movieDTO): Promise<any> {
    try {
      // let {movie_id} = req.params;
      let {
        movie_name,
        trailer,
        image,
        description,
        premiere_date,
        rate,
        is_hot,
        is_showing_date,
        is_upcoming_date,
      } = body;

      await this.prisma.phim.update({
        where: { ma_phim: Number(movie_id) },
        data: {
          ten_phim: movie_name,
          trailer,
          hinh_anh: image,
          mo_ta: description,
          ngay_khoi_chieu: premiere_date,
          danh_gia: rate,
          hot: is_hot,
          dang_chieu: is_showing_date,
          sap_chieu: is_upcoming_date,
        },
      });
      return {
        status: 200,
        message: 'Update Movie successfull',
      };
    } catch (error) {
      return {
        status: 500,
        message: `BE error: ${error}`,
      };
    }
  }

  // 7.deleteMovie: Xóa Phim
  async deleteMovie(movie_id: string): Promise<any> {
    try {
      await this.prisma.phim.delete({
        where: {
          ma_phim: Number(movie_id),
        },
      });
      return {
        status: 200,
        message: 'Delete Movie successfull',
      };
    } catch (error) {
      return {
        status: 500,
        message: `BE error: ${error}`,
      };
    }
  }

  // 8.getMovieInfo: lấy thông tin phim
  async getMovieInfo(movie_id: string): Promise<any> {
    // let {movie_id} = req.query;
    if (!movie_id) movie_id = '';
    try {
      let data = await this.prisma.phim.findFirst({
        where: {
          ma_phim: Number(movie_id),
        },
      });
      return {
        status: 200,
        content: data,
      };
    } catch (error) {
      return {
        status: 500,
        message: `BE error: ${error}`,
      };
    }
  }

  // 9.createBanner: thêm banner
  async createBanner(body: bannerDTO): Promise<any> {
    try {
      let { movie_id, image } = body;
      //image: update hinh anh ?? comming later

      let newData = {
        ma_phim: movie_id,
        hinh_anh: image,
      };
      await this.prisma.banner.create({
        data: newData,
      });
      return {
        status: 200,
        message: 'Create Banner successfull',
      };
    } catch (error) {
      return {
        status: 500,
        message: `BE error: ${error}`,
      };
    }
  }

  // 10.updateBanner: Cập Nhật banner
  async updateBanner(banner_id: string, body: bannerDTO): Promise<any> {
    try {
      // let {banner_id} = req.params;
      let { movie_id, image } = body;
      await this.prisma.banner.update({
        where: { ma_banner: Number(banner_id) },
        data: {
          ma_phim: movie_id,
          hinh_anh: image,
        },
      });
      return {
        status: 200,
        message: 'Update Banner successfull',
      };
    } catch (error) {
      return {
        status: 500,
        message: `BE error: ${error}`,
      };
    }
  }

  // 11.deleteBanner: Xóa Banner
  async deleteBanner(banner_id: string): Promise<any> {
    try {
      // let {banner_id} = req.params;
      console.log('banner_id:', banner_id);
      await this.prisma.banner.delete({
        where: {
          ma_banner: Number(banner_id),
        },
      });

      return {
        status: 200,
        message: 'Delete Banner successfull',
      };
    } catch (error) {
      return {
        status: 500,
        message: `BE Delete Banner error: ${error}`,
      };
    }
  }
}
