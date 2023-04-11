import { Module } from '@nestjs/common';
import { OrderService } from './services';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../database/entities/order.entity';

@Module({
  imports: [ DatabaseModule, TypeOrmModule.forFeature([Order]) ],
  providers: [ OrderService ],
  exports: [ OrderService ]
})
export class OrderModule {}
