import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@src/entity';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { UpdateUserDto } from '@user/dto/update-user.dto';

// 外部に依存性させる
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepostiory: Repository<User>,
  ) {}

  // get all user
  async getAllUser(): Promise<User[]> {
    return await this.userRepostiory.find();
  }

  // get user
  async getOneUser(id: string): Promise<User> {
    return await this.userRepostiory.findOne(id);
  }

  // create user
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepostiory.create(createUserDto);
    await this.userRepostiory.save(user);
    return user;
  }

  // update user
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getOneUser(id);
    user.userName = updateUserDto.userName;
    user.profileBody = updateUserDto.profileBody;
    user.iconId = updateUserDto.iconId;
    await this.userRepostiory.save(user);
    return user;
  }

  // delete user
  async deleteUser(id: string): Promise<boolean> {
    const result = await this.userRepostiory.delete(id);
    return result.affected > 0;
  }
}

// Service(Provoder)は具体的なビジネスロジックを記述
// Controller or Resolver から、複雑なタスクを依頼される
// Service(Provoder)を使用するためには、Moduleへ登録しないといけない