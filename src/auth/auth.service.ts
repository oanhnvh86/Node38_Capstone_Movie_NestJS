import { Injectable } from '@nestjs/common';
import { loginDTO } from './dto/login.dto';
import { PrismaClient } from '@prisma/client'; //PRISMA: thư viện connect với sql
import * as bcrypt from 'bcrypt'; //thư viện mã hóa pass
import { JwtModule, JwtService } from '@nestjs/jwt'; //thư viện tạo token
import { ConfigService } from '@nestjs/config'; //thư viện kết nối cái biến trong file config .env
import { registerDTO } from './dto/register.dto';

@Injectable()
export class AuthService {
  //Import thư viện Jwt
  constructor(
    private jwtService: JwtService, //import service của thư viện jwwt để tạo token
    private configService: ConfigService, //import service của thư viện config để lấy các vaalue trong file
  ){}
  prisma = new PrismaClient();

  //1.signUp: trang đăng ký
  async signUp(body: registerDTO): Promise<any>  {
  try {
      let { full_name, email, password, phone, type } = body;
      console.log("hello signUp");
      console.log("email:", email);
      //kiểm tra user đã tồn tại trong DB chưa
      let data = await this.prisma.nguoidung.findFirst({
          where: {
              email
          }
      })
      // console.log("data:",data)
      if(data) {
          // res.status(400).send("User is existed! Please input other user.");
          return {
            status: 400,
            message: 'User is existed! Please input other user.'
          }
      } 
      else {
          let encodePassword = bcrypt.hashSync(password,10); //mã hóa 1 chiều, ko có giải mã được
          let newUser = {
              ho_ten: full_name,
              email,
              so_dt: phone,
              mat_khau: encodePassword,
              loai_nguoi_dung: type
              
          }
          console.log("newUser:",newUser);
          await this.prisma.nguoidung.create({
              data: newUser
          })
              ;
          // res.status(201).send("Sign up successfull");
          return {
            status: 201,
            message: 'Sign up successfull'
          }
      }
  }catch(error){
      // res.status(500).send (`Signup Error: ${error}`);
      return {
        status: 500,
        message: `Signup Error: ${error}`
      }
  }
}

//2. login: trang đăng nhập
async login(body: loginDTO): Promise<any> {
  try {
        let {email, password} = body;
        //check email có tồn tại trong DB hay ko
        let data = await this.prisma.nguoidung.findFirst({
            where: {
                email
            }
        })
        
        if(data) {
            //check password
            // nếu pass đúng thì tạo token, ngược lại báo lỗi
            //compareSync có 2 params. param1: password nhận từ request, param2: pass đã mã hóa trong DB
            let checkPassword = bcrypt.compareSync(password,data.mat_khau);
            if(checkPassword)
            {
                let payload = {
                    user_id: data.tai_khoan,
                    // email: data.email,
                }
                let token =  this.jwtService.sign(payload,{
                  secret: this.configService.get('SECRET_KEY'),
                  expiresIn: this.configService.get('EXPIRE_IN'),
                });
                // res.status(200).send(token);
                return {
                  status: 200,
                  message: token
                }
            }
            else {
                 return {
                  status: 400,
                  message: 'Password Incorrect'
                 }
            }
        }
        else {
            // res.status(404).send("Login fail")
            return {
              status: 404,
              message: 'Login fail'
            }
        }
    }
    catch(error){
        // res.send (`Login Error: ${error}`);
        return {
          status: 500,
          message: `Login Error: ${error}`
        }
    }
  }

}
