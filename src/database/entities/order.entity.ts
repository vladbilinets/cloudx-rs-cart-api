import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from './cart.entity';
import { User } from './user.entity';

export enum OrderStatusEnum {
    open = 'OPEN',
    ordered = 'ORDERED'
}

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    @Column({ type: 'uuid' })
    user_id: string;

    @ManyToOne(() => Cart)
    @Column({ type: 'uuid' })
    cart_id: string;

    @Column({ type: 'json' })
    payment: string;

    @Column({ type: 'json' })
    delivery: string;

    @Column({ type: 'text' })
    comments: string;

    @Column({ type: 'enum', enum: OrderStatusEnum })
    status: OrderStatusEnum;

    @Column({ type: 'int' })
    total: number;
}
