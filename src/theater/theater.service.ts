import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { accessSync } from 'fs';
import { theaterDTO } from './dto/theater.dto';
import { cumrapDTO } from './dto/cumrap.dto';
import { gheDTO } from './dto/ghe.dto';
import { raphimDTO } from './dto/rapphim.dto';

@Injectable()
export class TheaterService {
  prisma = new PrismaClient();

  // 1.getTheaterSystemList: Lấy Danh Sách Hệ thống rạp
  async getTheaterSystemList(): Promise<any> {
    try {
      let data = await this.prisma.hethongrap.findMany();
      // res.send(data);
      return {
        status: 200,
        content: data,
      };
    } catch (error) {
      // res.send(`BE error: ${error}`)
      return {
        status: 500,
        content: `BE error: ${error}`,
      };
    }
  }

  async getTheaterSystemListPerPage(page: string, size: string): Promise<any> {
    let num_page = Number(page);
    let num_size = Number(size);
    let index = (num_page - 1) * num_size;
    try {
      let data = await this.prisma.hethongrap.findMany({
        skip: index,
        take: num_size,
      });
      // res.send(data);
      return {
        status: 200,
        content: data,
      };
    } catch (error) {
      // res.send(`BE error: ${error}`)
      return {
        status: 500,
        content: `BE error: ${error}`,
      };
    }
  }

  // 2.getClusterTheaterBySystem: Lấy thông tin cụm rạp theo hệ thống
  async getClusterTheaterBySystem(theater_id: string): Promise<any> {
    try {
      let data = await this.prisma.cumrap.findMany({
        where: {
          ma_he_thong_rap: Number(theater_id),
        },
      });
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

  async getClusterTheaterBySystemPerPage(
    theater_id: string,
    page: string,
    size: string,
  ): Promise<any> {
    let num_page = Number(page);
    let num_size = Number(size);
    let index = (num_page - 1) * num_size;
    // console.log('theater_id:',theater_id);
    try {
      let data = await this.prisma.cumrap.findMany({
        where: {
          ma_he_thong_rap: Number(theater_id),
        },
        skip: index,
        take: num_size,
      });
      // res.send(data);
      return {
        status: 200,
        content: data,
      };
    } catch (error) {
      // res.send(`BE error: ${error}`)
      return {
        status: 500,
        content: `BE error: ${error}`,
      };
    }
  }

  // 3.getShowtimesByTheaterSystem: Lấy thông tin lịch chiếu phim theo hệ thống rạp
  async getShowtimesByTheaterSystem(theater_id: string): Promise<any> {
    // let {theater_id} = req.params;
    try {
      let data = await this.prisma.hethongrap.findMany({
        select: {
          ten_he_thong_rap: true,
          logo: true,
          cumrap: {
            select: {
              ten_cum_rap: true,
              dia_chi: true,
              rapphim: {
                select: {
                  ten_rap: true,
                  lichchieu: {
                    select: {
                      ngay_gio_chieu: true,
                      gia_ve: true,
                      phim: {
                        select: {
                          ten_phim: true,
                          trailer: true,
                          mo_ta: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        where: {
          ma_he_thong_rap: Number(theater_id),
        },
      });

      //   res.send(data);
      return {
        status: 200,
        content: data,
      };
    } catch (error) {
      // res.send(`BE error: ${error}`)
      return {
        status: 500,
        message: `BE error: ${error}`,
      };
    }
  }

  // 4.getShowtimesByFilm: Lấy thông tin lịch chiếu phim
  async getShowtimesByFilm(film_id: string): Promise<any> {
    // let {film_id} = req.query;
    try {
      let data = await this.prisma.phim.findMany({
        select: {
          ten_phim: true,
          trailer: true,
          hinh_anh: true,
          mo_ta: true,
          lichchieu: {
            select: {
              ngay_gio_chieu: true,
              gia_ve: true,
              rapphim: {
                select: {
                  ten_rap: true,
                },
              },
            },
          },
        },
        where: {
          ma_phim: Number(film_id),
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

  // 5.createTheater: thêm hệ thống rạp
  async createTheater(body: theaterDTO): Promise<any> {
    try {
      let { theater_name, logo } = body;
      let data = await this.prisma.hethongrap.findFirst({
        where: {
          ten_he_thong_rap: theater_name,
        },
      });

      if (data) {
        // res.status(400).send("Theater is existed! Please input other theater.");
        return {
          status: 400,
          message: 'Theater is existed! Please input other theater.',
        };
      } else {
        let newData = {
          ten_he_thong_rap: theater_name,
          logo: logo, //?? UPLOAD FILE LÊN SERVER, RỒI ĐUA LINK PATH VÀO THÌ SAO
        };

        await this.prisma.hethongrap.create({
          data: newData,
        });
        // res.send("Create theater successfull");
        return {
          status: 200,
          message: 'Create theater successfull',
        };
      }
    } catch (error) {
      // res.send(`BE error: ${error}`)
      return {
        status: 500,
        message: `BE error: ${error}`,
      };
    }
  }

  // 6.updateTheater: Cập Nhật Thong Tin hệ thống rạp
  async updateTheater(theater_id: string, body: theaterDTO): Promise<any> {
    try {
      // let {theater_id} = req.params;
      let { theater_name, logo } = body;
      console.log('theater_id:', theater_id);

      await this.prisma.hethongrap.update({
        where: { ma_he_thong_rap: Number(theater_id) },
        data: {
          ten_he_thong_rap: theater_name,
          logo,
        },
      });
      // res.send("Update Theater successfull");
      return {
        status: 200,
        message: 'Update Theater successfull',
      };
    } catch (error) {
      // res.send(`BE error: ${error}`)
      return {
        status: 500,
        message: `BE error: ${error}`,
      };
    }
  }

  // 7.deleteTheater: Xóa hệ thống rap
  async deleteTheater(theater_id: string): Promise<any> {
    try {
      // let {theater_id} = req.params;
      await this.prisma.hethongrap.delete({
        where: {
          ma_he_thong_rap: Number(theater_id),
        },
      });
      // res.send("Delete theater successfull");
      return {
        status: 200,
        message: 'Delete theater successfull',
      };
    } catch (error) {
      // res.send(`BE error: ${error}`)
      return {
        status: 500,
        message: `BE error: ${error}`,
      };
    }
  }

  // 8.createCumRap: tạo cụm rạp theo hệ thống rạp
  async createCumRap(body: cumrapDTO): Promise<any> {
    try {
      let { cumrap_name, address, theater_id } = body;
      let data = await this.prisma.cumrap.findFirst({
        where: {
          ten_cum_rap: cumrap_name,
        },
      });

      if (data) {
        // res.status(400).send("Cum rap is existed! Please input other Cum rap.");
        return {
          status: 400,
          message: 'Cum rap is existed! Please input other Cum rap.',
        };
      } else {
        let newData = {
          ten_cum_rap: cumrap_name,
          dia_chi: address,
          ma_he_thong_rap: theater_id,
        };

        await this.prisma.cumrap.create({
          data: newData,
        });
        // res.send("Create Cum rap successfull");
        return {
          status: 200,
          message: 'Create Cum rap successfull',
        };
      }
    } catch (error) {
      // res.send(`BE error: ${error}`)
      return {
        status: 500,
        message: `BE error: ${error}`,
      };
    }
  }

  // 9.updateCumRap: Cập Nhật Thong Tin cụm rạp
  async updateCumRap(cumrap_id: string, body: cumrapDTO): Promise<any> {
    try {
      // let {cumrap_id} = req.params;
      let { cumrap_name, address, theater_id } = body;

      await this.prisma.cumrap.update({
        where: { ma_cum_rap: Number(cumrap_id) },
        data: {
          ten_cum_rap: cumrap_name,
          dia_chi: address,
          ma_he_thong_rap: theater_id,
        },
      });
      // res.send("Update Cụm rạp successfull");
      return {
        status: 200,
        message: 'Update Cụm rạp successfull',
      };
    } catch (error) {
      // res.send(`BE error: ${error}`)
      return {
        status: 500,
        message: `BE error: ${error}`,
      };
    }
  }

  // 10.deleteCumRap: Xóa cụm rap
  async deleteCumRap(cumrap_id: string): Promise<any> {
    try {
      // let {cumrap_id} = req.params;
      await this.prisma.cumrap.delete({
        where: {
          ma_cum_rap: Number(cumrap_id),
        },
      });
      // res.send("Delete cụm rạp successfull");
      return {
        status: 200,
        message: 'Delete cụm rạp successfull',
      };
    } catch (error) {
      // res.send(`BE error: ${error}`)
      return {
        status: 500,
        message: `BE error: ${error}`,
      };
    }
  }

  // 11.createRapPhim: tạo rạp phim
  async createRapPhim(body: raphimDTO): Promise<any> {
    try {
      let { rapphim_name, cumrap_id } = body;
      let data = await this.prisma.rapphim.findFirst({
        where: {
          ten_rap: rapphim_name,
        },
      });

      if (data) {
        // res.status(400).send("Rạp phim is existed! Please input other Rạp phim.");
        return {
          status: 400,
          message: 'Rạp phim is existed! Please input other Rạp phim.',
        };
      } else {
        let newData = {
          ten_rap: rapphim_name,
          ma_cum_rap: cumrap_id,
        };

        await this.prisma.rapphim.create({
          data: newData,
        });
        // res.send("Rạp phim successfull");
        return {
          status: 200,
          message: 'Rạp phim successfull',
        };
      }
    } catch (error) {
      // res.send(`BE error: ${error}`)
      return {
        status: 500,
        message: `BE error: ${error}`,
      };
    }
  }

  // 12.updateRapPhim: Cập Nhật Thong Tin  rạp phim
  async updateRapPhim(rapphim_id: string, body: raphimDTO): Promise<any> {
    try {
      // let {rapphim_id} = req.params;
      let { rapphim_name, cumrap_id } = body;
      // console.log('rapphim_id:',rapphim_id)

      await this.prisma.rapphim.update({
        where: { ma_rap: Number(rapphim_id) },
        data: {
          ten_rap: rapphim_name,
          ma_cum_rap: cumrap_id,
        },
      });
      // res.send("Update rạp phim successfull");
      return {
        status: 200,
        message: 'Update rạp phim successfull',
      };
    } catch (error) {
      // res.send(`BE error: ${error}`)
      return {
        status: 500,
        message: `BE error: ${error}`,
      };
    }
  }

  // 13.deleteRapPhim: Xóa rap phim
  async deleteRapPhim(rapphim_id: string): Promise<any> {
    try {
      // let {rapphim_id} = req.params;
      await this.prisma.rapphim.delete({
        where: {
          ma_rap: Number(rapphim_id),
        },
      });
      // res.send("Delete rạp phim successfull");
      return {
        status: 200,
        message: 'Delete rạp phim successfull',
      };
    } catch (error) {
      // res.send(`BE Delete rạp phim  error: ${error}`)
      return {
        status: 500,
        message: `BE error: ${error}`,
      };
    }
  }

  // 14.createChair: tạo ghe
  async createChair(body: gheDTO): Promise<any> {
    try {
      let { chair_name, chair_type, rapphim_id } = body;
      let data = await this.prisma.ghe.findFirst({
        where: {
          ten_ghe: chair_name,
          ma_rap: rapphim_id,
        },
      });

      if (data) {
        // res.status(400).send("This chair is existed! Please input other chair.");
        return {
          status: 400,
          message: 'This chair is existed! Please input other chair.',
        };
      } else {
        let newData = {
          ten_ghe: chair_name,
          loai_ghe: chair_type,
          ma_rap: rapphim_id,
        };

        await this.prisma.ghe.create({
          data: newData,
        });
        // res.send("Create chair successfull");
        return {
          status: 200,
          message: 'Create chair successfull',
        };
      }
    } catch (error) {
      // res.send(`BE Create chair error: ${error}`)
      return {
        status: 500,
        message: `BE error: ${error}`,
      };
    }
  }

  // 15.updateChair: Cập Nhật Thong Tin  ghe
  async updateChair(chair_id: string, body: gheDTO): Promise<any> {
    try {
      // let {chair_id} = req.params;
      let { chair_name, chair_type, rapphim_id } = body;

      await this.prisma.ghe.update({
        where: { ma_ghe: Number(chair_id) },
        data: {
          ten_ghe: chair_name,
          loai_ghe: chair_type,
          ma_rap: rapphim_id,
        },
      });
      // res.send("Update chair successfull");
      return {
        status: 200,
        message: 'Update chair successfull',
      };
    } catch (error) {
      // res.send(`BE Update chair error: ${error}`)
      return {
        status: 500,
        message: `BE error: ${error}`,
      };
    }
  }

  // 16.deleteChair: Xóa ghe
  async deleteChair(chair_id: string): Promise<any> {
    try {
      // let {chair_id} = req.params;
      await this.prisma.ghe.delete({
        where: {
          ma_ghe: Number(chair_id),
        },
      });
      // res.send("Delete chair successfull");
      return {
        status: 200,
        message: 'Delete chair successfull',
      };
    } catch (error) {
      // res.send(`BE Delete chair  error: ${error}`)
      return {
        status: 500,
        message: `BE error: ${error}`,
      };
    }
  }
}
