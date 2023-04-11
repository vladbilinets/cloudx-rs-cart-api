import { Injectable } from '@nestjs/common';

import { Order } from '../../database/entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
      @InjectRepository(Order)
      private readonly repository: Repository<Order>
  ) {}

  async findById(orderId: string): Promise<Order> {
    return this.repository.findOne({ id: orderId });
  }

  async create(data: Partial<Order>): Promise<Order> {
    const result = await this.repository.insert(data);
    return this.repository.findOne({ id: result.identifiers[0].id });
  }

  async update(orderId: string, data: Partial<Order>): Promise<void> {
    await this.repository.update({ id: orderId }, data);
  }
}
