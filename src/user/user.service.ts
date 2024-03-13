import { Injectable } from '@nestjs/common';
//PRISMA
import { PrismaClient } from '@prisma/client';
import { registerDTO } from 'src/auth/dto/register.dto';
import * as bcrypt from 'bcrypt'; //thư viện mã hóa pass


@Injectable()
export class UserService {
    prisma = new PrismaClient()  

    // 1.getUserList: Lấy Danh Sách Người Dùng
    async getUserList(): Promise<any>{
        try{
            let data = await this.prisma.nguoidung.findMany();
            return data;
        }
        catch(error){
            return `BE error: ${error}`
        }
    }

    // 2.getUserListPerPage: Lấy Danh Sách Người Dùng Phân Trang
    async getUserListPerPage(page:string, size:string): Promise<any>{
        // let {page, size} = req.params;
        // let page = req.params.page ?? 1
        // let size = req.params.size ?? 5
        let num_page = Number(page);
        let num_size = Number(size);
        let index = (num_page-1) * num_size;
        try{
            let data = await this.prisma.nguoidung.findMany({
                skip: index,
                take: num_size,
            });
            // return data;
            return {
                status: 200,
                message: data
            }
        }
        catch(error){
            // return `BE error: ${error}`
            return {
                status: 501,
                message: `BE error: ${error}`
            }
        }
    }

    // 3.searchUser: Tìm kiếm người dùng
    async searchUser (text: string) : Promise<any> {
        if(!text)
            text = "";
        try{
            let data = await this.prisma.nguoidung.findMany({
                where: {
                    OR: [
                        {ho_ten: { contains: text,}},
                        {email: { contains: text,}},
                    ]
                },
            })
            return data;
        }
        catch(error){
            return `BE error: ${error}`
        }
    }

    // 4.searchUser: Tìm kiếm người dùng phân trang
    async searchUserPerPage (page:string, size:string,text: string) : Promise<any>  {
        let num_page = Number(page);
        let num_size = Number(size);
        let index = (num_page-1) * num_size;
        if(!text)
            text = "";
        try{
            let data = await this.prisma.nguoidung.findMany({
                where: {
                    OR: [
                        {ho_ten: { contains: text,}},
                        {email: { contains: text,}},
                    ]
                },
                skip: index,
                take: num_size,
            })
            return data;
        }
        catch(error){
            return `BE error: ${error}`
        }
    }
    
    // 5.getUserInfo: lấy thông tin người dùng
    async getUserInfo(user_id: string) : Promise<any> {
        // console.log('user_id: ',user_id)
        if(!user_id)
            user_id = "";
        try{
            let data = await this.prisma.nguoidung.findUnique({
                where: {
                    tai_khoan: Number(user_id),
                    }
            })
            // console.log(data)
            return {
                status: 200,
                content: data
            }
        }
        catch(error){
            // res.send(`BE error: ${error}`)
            return {
                status: 500,
                message: `BE error: ${error}`
            }
        }
    }

    // 6.createUser: thêm người dùng
    async createUser(body: registerDTO): Promise<any> {
    try{
        let {full_name,email,phone, password,type} = body;
        let data = await this.prisma.nguoidung.findFirst({
            where: {
                email
            }
        })

        if(data) {
            // res.status(400).send("User is existed! Please input other user.");
            return {
                status: 400,
                message: 'User is existed! Please input other user.'
            }
        } 
        else {
            let encodePassword = bcrypt.hashSync(password,10); //mã hóa 1 chiều, ko có giải mã được
            let newData = {
                ho_ten: full_name, 
                email,
                so_dt: phone,
                mat_khau: encodePassword, 
                loai_nguoi_dung: type
                
            }
        
            await this.prisma.nguoidung.create({
                data: newData
            });
            // res.send("Create User successfull");
            return {
                status: 200,
                message: 'Create User successfull'
            }
        }
    }
    catch(error){
        // res.send(`BE error: ${error}`)
        return {
            status: 500,
            message: `BE error: ${error}`
        }
    }
    }

    // 7.updateUser: Cập Nhật Thong Tin Người Dùng
    async updateUser(user_id: string, body: registerDTO): Promise<any> {
    try{
        // let {user_id} = req.params;
        let {full_name,email,phone, password,type} = body;
        let encodePassword = bcrypt.hashSync(password,10); 
        
        await this.prisma.nguoidung.update({
            where: { tai_khoan: Number(user_id)},
            data: {
                ho_ten: full_name, 
                email,
                so_dt: phone,
                mat_khau: encodePassword, 
                loai_nguoi_dung: type
            }
        });
        // res.send("Update User successfull");
        return {
            status: 200,
            message: 'Update User successfull'
        }
    }
    catch(error){
        // res.send(`BE error: ${error}`)
        return {
            status: 500,
            message: `BE error: ${error}`
        }
    }
}

// 8.deleteUser: Xóa Người Dùng
async deleteUser(user_id: string): Promise<any> {
    try{
        // let {user_id} = req.params;
        // console.log('user_id:',user_id)
        await this.prisma.nguoidung.delete({
            where: {
                tai_khoan: Number(user_id),
            }
        });
        // res.send("Delete user successfull");
        return {
            status: 200,
            message: 'Delete user successfull'
        }
    }
    catch(error){
        // res.send(`BE error: ${error}`)
        return {
            status: 500,
            message: `BE error: ${error}`
        }
    }
}

//9. Lay Danh Sach Loai Nguoi Dung
async getUserTypeList(): Promise<any> {
    try{
        let data = await this.prisma.nguoidung.findMany({
            select: {
                loai_nguoi_dung: true
            },
            distinct:['loai_nguoi_dung']
            
        });
        // res.send(data);
        return {
            status: 200,
            content: data
        }
    }
    catch(error){
        // res.send(`BE error: ${error}`)
        return {
            status: 500,
            message: `BE error: ${error}`
        }
    }
}

}
