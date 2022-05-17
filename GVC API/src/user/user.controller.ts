import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //@get
  //attendance
  //accounts

  @Get('/getAccount/:id')
  getAccount(@Param('id') id: string) {
    return this.userService.getAccount(id);
  }

  @Get('/getAllAccounts')
  getAllAccount() {
    return this.userService.getAllAccounts();
  }

  @Post('/addAccount')
  addAccount(@Body() body: any) {
    return this.userService.addAccount(body);
  }

  @Patch('/setOnLeave/:id')
  setOnLeave(@Param('id') id: string, @Body() status: any) {
    return this.userService.setOnLeave(id, status);
  }

  @Patch('/setResigned/:id')
  setResigned(@Param('id') id: string, @Body() status: any) {
    return this.userService.setResigned(id, status);
  }

  @Delete('/deleteAccount/:id')
  deleteAccount(@Param('id') id: string) {
    return this.userService.deleteAccount(id);
  }

  //@post attendance
  @Get('/getAttendance/:id')
  getAttendance(@Param('id') id: string) {
    return this.userService.getAttendance(id);
  }

  @Get('/getAllAttendance')
  getAllAttendance() {
    return this.userService.getAllAttendance();
  }

  @Post('/addAttendance')
  addAttendance(@Body() body: any) {
    return this.userService.addAttendance(body);
  }

  @Delete('/deleteAttendance/:id')
  deleteAttendance(@Param('id') id: string) {
    return this.userService.deleteAttendance(id);
  }
 
}
