import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(User)
      private readonly repository: Repository<User>
  ) {}

  async findOne(userId: string): Promise<User> {
    return this.repository.findOne({ id: userId });
  }

  async createOne(user: User): Promise<User> {
    const result = await this.repository.insert(user)
    return this.repository.findOne({ id: result.identifiers[0].id });
  }
}
