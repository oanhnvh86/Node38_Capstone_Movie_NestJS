import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { loginDTO } from './dto/login.dto';
import { registerDTO } from './dto/register.dto';

@ApiTags('Auth Mng') //Setup cac API thành 1 cụm
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //1.signUp: trang đăng ký
  @ApiBody({ type: registerDTO })
  @Post('/signup')
  async signUp(@Body() body, @Res() res): Promise<any> {
    // return this.authService.login(body); //C1
    let data = await this.authService.signUp(body);
    res.status(data.status).json(data);
  }

  //2. login: trang đăng nhập
  @ApiBody({ type: loginDTO })
  @Post('/login')
  async login(@Body() body, @Res() res): Promise<any> {
    // return this.authService.login(body); //C1
    let data = await this.authService.login(body);
    res.status(data.status).json(data);
  }
}
