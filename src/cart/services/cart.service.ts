import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Cart, CartStatusEnum } from '../../database/entities/cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
      @InjectRepository(Cart)
      private readonly repository: Repository<Cart>
  ) {}

  async findByUserId(userId: string): Promise<Cart | null> {
    return this.repository.findOne({ user: { id: userId } });
  }

  async createByUserId(userId: string): Promise<Cart> {
    await this.repository.insert({
        user: { id: userId },
        created_at: new Date(),
        updated_at: new Date(),
        status: CartStatusEnum.open
    });
    return this.findByUserId(userId);
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    return await this.findByUserId(userId) || await this.createByUserId(userId);
  }

  async updateByUserId(userId: string, updateUser: Partial<Cart>): Promise<Cart> {
    await this.repository.update({ user: { id: userId } }, updateUser);
    return this.repository.findOne({ user: { id: userId } });
  }

  async removeByUserId(userId): Promise<void> {
    await this.repository.delete({ user: { id: userId } });
  }

}
