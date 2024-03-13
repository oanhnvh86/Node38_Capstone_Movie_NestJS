import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { registerDTO } from 'src/auth/dto/register.dto';

@ApiTags('User Mng') //Setup cac API thành 1 cụm
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 1.getUserList: Lấy Danh Sách Người Dùng
  @Get('/get-UserList')
  getUserList(): Promise<any> {
    return this.userService.getUserList();
  }

  // 2.getUserListPerPage: Lấy Danh Sách Người Dùng Phân Trang
  @ApiParam({name: 'size', required:true})
  @ApiParam({name: 'page', required:true})
  @Get('/get-UserListPerPage/:page/:size')
  getUserListPerPage(@Param('page') page, @Param('size') size): Promise<any> {
    return this.userService.getUserListPerPage(page, size);
  }

  // 3.searchUser: Tìm kiếm người dùng
  @ApiQuery({name:'text', required:false})
  @Get('/search-User')
  async searchUser(@Query('text') text): Promise<any> {
     return await this.userService.searchUser(text);
   }

  // 4.searchUserPerPage: Tìm kiếm người dùng phân trang
  @ApiQuery({name:'text', required:false})
  @ApiParam({name: 'size', required:true})
  @ApiParam({name: 'page', required:true})
  @Get('/search-UserPerPage/:page/:size')
  async searchUserPerPage(@Param('page') page, @Param('size') size, @Query('text') text): Promise<any> {
     return await this.userService.searchUserPerPage(page,size,text);
   }

   // 5.getUserInfo: lấy thông tin người dùng
   @ApiQuery({name:'user_id', required:false})
   @Get('/get-UserInfo')
   async getUserInfo(@Query('user_id') user_id): Promise<any> {
    return await this.userService.getUserInfo(user_id);
  }

  // 6.createUser: thêm người dùng
  @ApiBody({type: registerDTO})
  @Post('/create-User')
  async createUser(@Body() body): Promise<any>{
    return await this.userService.createUser(body);
  }

  // 7.updateUser: Cập Nhật Thong Tin Người Dùng
  @ApiParam({name: 'user_id', required:true})
  @ApiBody({type: registerDTO})
  @Put('/update-User/:user_id')
  async updateUser (@Param('user_id') user_id, @Body() body): Promise<any> {
    return await this.userService.updateUser(user_id,body);
  }

  // 8.deleteUser: Xóa Người Dùng
  @ApiParam({name: 'user_id', required:true})
  @Delete('/delete-User/:user_id')
  async deleteUser (@Param('user_id') user_id): Promise<any> {
    return await this.userService.deleteUser(user_id);
  }

  //9. Lay Danh Sach Loai Nguoi Dung
  @Get('/get-UserTypeList')
  getUserTypeList(): Promise<any> {
    return this.userService.getUserTypeList();
  }
}
