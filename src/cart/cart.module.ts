import { Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../database/entities/cart.entity';
import { UsersModule } from '../users/users.module';


@Module({
  imports: [ OrderModule, UsersModule, DatabaseModule, TypeOrmModule.forFeature([Cart])],
  providers: [ CartService ],
  controllers: [ CartController ]
})
export class CartModule {}
