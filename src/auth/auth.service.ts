import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDTO, LoginUserDTO, UpdateUserDTO } from './dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ShowUserDTO } from './dto/show-user.dto';

@Injectable()
export class AuthService {

  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>,
                                      private readonly jwtService: JwtService){
  }

  private getJwtToken(payload: JwtPayload){
    //firmamos el token
    const token = this.jwtService.sign(payload);
    return token;
  }

  async login(loginUser: LoginUserDTO){
    try {
      const user = await this.userRepo.findOne(
        {where: {email: loginUser.email},
        select: {email: true, password: true, roles: true, id_user: true}});
      if(!user) return new UnauthorizedException('Credentials are not valid(e)');
      if(!bcrypt.compareSync(loginUser.password, user.password)) return new UnauthorizedException('Credentials not valid(p)')
      delete user.password;
      return {user, 
        token: this.getJwtToken({email: user.email, roles: user.roles, id_user: user.id_user})};
    } catch (error) {
      
    }
  }

  async create(createUserDto: CreateUserDTO) {
    try {
      const { password, ...userData} = createUserDto;
      const user = this.userRepo.create({ ...userData, 
        password: bcrypt.hashSync(password, 10)});
      await this.userRepo.save(user);
      delete user.password;
      return user;
    } catch (error) {
      
    }
  }

  async findAll(){
    try {
      const findUsers: User[] = await this.userRepo.find();
      const allUsers: ShowUserDTO[] = findUsers.map(({ password, ...user})=> {
        return user;
      })
      return allUsers;
    } catch (error) {
      
    }
  }

  async findOne(id: number){
    try {
      const findUser: ShowUserDTO = await this.userRepo.findOne({where: {id_user: id},
        select: {email: true, password: false, roles: true, id_user: true, fullName: true}});
      if(!findUser) return new NotFoundException('User not found');
      return findUser;
    } catch (error) {
      
    }
  }

  async update(id: number, updateUserDto: UpdateUserDTO) {
    try {
      const userDB: User = await this.userRepo.findOneBy({id_user: id});
      if(!userDB) return new NotFoundException('User not found');
      //this.userRepo.update(id, updateUserDto);
      return this.userRepo.save({ ...userDB, ...updateUserDto});
    } catch (error) {
      
    }
  }

  async remove(id: number) : Promise<UpdateResult|Error>{
    try {
      const userDB: User = await this.userRepo.findOneBy({id_user: id});
      if(!userDB) return new NotFoundException('User not found');
      if(userDB.isActive == false) return new BadRequestException('Existing user, but inactive')
      userDB.isActive = false;
      
      return await this.userRepo.update(id, userDB);
    } catch (error) {
      
    }
  }
}
