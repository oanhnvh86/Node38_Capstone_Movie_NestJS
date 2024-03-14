import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { bookticketDTO } from './dto/bookticket.dto';
import { scheduleDTO } from './dto/schedule.dto';
@Injectable()
export class BookticketService {

    prisma = new PrismaClient();

    // 1.bookTicket: đặt vé
    async bookTicket(body:bookticketDTO): Promise<any>{
    try{
        let {user_id,shedule_id,chair_id} = body;
        let data = await this.prisma.datve.findFirst({
            where: {
                ma_lich_chieu: shedule_id,
                ma_ghe:chair_id
            }
        })
        if(data) {
            return {
                status: 400,
                message: 'booked. please choose another'
            }
        } 
        else {
            let newData = {
                tai_khoan: user_id, 
                ma_lich_chieu: shedule_id,
                ma_ghe: chair_id,
            }
            await this.prisma.datve.create(
                {data: newData});
            
            return {
                status: 200,
                message: 'Book Ticket successfull'
            }
        }
    }
    catch(error){
        return {
            status: 500,
            message: `BE error: ${error}`
        }
    }
}

//2. getFilmBySchedule: Láy danh sách phòng vé
async getFilmBySchedule(schedule_id: string): Promise<any>{
    // let {schedule_id} = req.query;
    try{
        let data = await this.prisma.lichchieu.findMany({
            select: {
                ngay_gio_chieu: true,
                gia_ve: true,
                rapphim: {
                    select: {
                    ten_rap : true,
                    },
                },
                phim:{
                    select: {
                        ten_phim : true,
                    }
                }
            },
            where: {
                ma_lich_chieu: Number(schedule_id)
            },
          })

          return {
            status: 200,
            content: data
        }
    }
    catch(error){
        return {
            status: 500,
            message: `BE error: ${error}`
        }
    }
}
// 3.createMovieShowtimes: tạo lịch chiếu phim
async createMovieShowtimes(body: scheduleDTO): Promise<any>{
    try{
        let {theater_id,movie_id,showtime_date, price} = body;
        
        let newData = {
            ma_rap: theater_id, 
            ma_phim: movie_id,
            ngay_gio_chieu: showtime_date,
            gia_ve: price
        }
        await this.prisma.lichchieu.create({
            data: newData
        });
        
        return {
            status: 200,
            message: 'createMovieShowtimes successfull'
        }
    }
    catch(error){
        return {
            status: 500,
            message: `BE error: ${error}`
        }
    }
}
}
