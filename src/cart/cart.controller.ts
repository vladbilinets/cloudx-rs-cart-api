import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Req,
  UnauthorizedException
} from '@nestjs/common';

// import { BasicAuthGuard, JwtAuthGuard } from '../auth';
import { OrderService } from '../order';
import { AppRequest, getUserIdFromRequest } from '../shared';

import { CartService } from './services';
import { UsersService } from '../users';
import { OrderStatusEnum } from '../database/entities/order.entity';

@Controller('api/profile/cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private userService: UsersService,
    private orderService: OrderService
  ) { }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Get()
  async findUserCart(@Req() req: AppRequest) {
    try {
      const userId = await this.getUserIdFromRequest(req);
      const cart = await this.cartService.findOrCreateByUserId(userId);

      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: { cart }
      }
    } catch (err) {
      throw new BadRequestException(`Unable to find user cart (${err.message})`)
    }
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Put()
  async updateUserCart(@Req() req: AppRequest, @Body() body) { // TODO: validate body payload...
    try {
      const userId = await this.getUserIdFromRequest(req);
      const cart = await this.cartService.updateByUserId(userId, body)

      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: { cart }
      }
    } catch(err) {
      throw new BadRequestException(`Unable to update user cart (${err.message})`)
    }
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Delete()
  async clearUserCart(@Req() req: AppRequest) {
    try {
      const userId = await this.getUserIdFromRequest(req);
      await this.cartService.removeByUserId(userId);

      return {
        statusCode: HttpStatus.OK,
        message: 'OK'
      }
    } catch (err) {
      throw new BadRequestException(`Unable to clear user cart (${err.message})`)
    }
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Post('checkout')
  async checkout(@Req() req: AppRequest, @Body() body) {
    try {
      const userId = await this.getUserIdFromRequest(req);
      const cart = await this.cartService.findByUserId(userId);

      if (!cart) {
        throw new BadRequestException('Cart is not found');
      }

      const order = await this.orderService.create({
        ...body,
        user_id: userId,
        cart_id: cart.id,
        status: OrderStatusEnum.ordered
      });
      await this.cartService.removeByUserId(userId);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'CREATED',
        data: { order }
      }
    } catch (err) {
      throw new BadRequestException(`Unable to create checkout (${err.message})`)
    }
  }

  private async getUserIdFromRequest(req: AppRequest): Promise<string> {
    const userId = getUserIdFromRequest(req);

    if (!userId) throw new BadRequestException('"userId" is missing in request');
    if (!await this.userService.findOne(userId)) throw new UnauthorizedException();

    return userId;
  }
}
