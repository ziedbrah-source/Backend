import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { Repository } from 'typeorm';
import { User, UserRoleEnum } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  // private readonly users = [
  //   {
  //     userId: 1,
  //     username: 'john',
  //     password: 'changeme',
  //   },
  //   {
  //     userId: 2,
  //     username: 'maria',
  //     password: 'guess',
  //   },
  // ];

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
  async getUserByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: [{ email }],
    });
  }
  async create(registerDto: RegisterDto): Promise<User> {
    const user = this.usersRepository.create(registerDto);
    const saltOrRounds = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, saltOrRounds);
    user.role = UserRoleEnum.NormalUser;
    user.isActive = false;
    return this.usersRepository.save(user);
  }
}
