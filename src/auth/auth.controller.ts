import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth, GetUser } from './decorators/index';
import { CreateUserDTO, LoginUserDTO, UpdateUserDTO } from './dto';
import { ShowUserDTO } from './dto/show-user.dto';
import { User } from './entities/user.entity';
import { ValidRoles } from './interfaces/valid-roles';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDTO) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUser: LoginUserDTO){
    return this.authService.login(loginUser);
  }

  @Get()
  @Auth(ValidRoles.admin, ValidRoles.god)
  async findAll(@GetUser() user: User) {
    const users: ShowUserDTO[] = await this.authService.findAll();
    return {users: users,
    actualUser: user};
  }

  @Get(':id')
  @Auth(ValidRoles.admin, ValidRoles.god)
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin, ValidRoles.god)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDTO) {
    return this.authService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin, ValidRoles.god)
  async remove(@Param('id') id: string) {
    return await this.authService.remove(+id);
  }
}

