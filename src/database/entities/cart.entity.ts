import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { CartItem } from './cart-item.entity';

export enum CartStatusEnum {
    open = 'OPEN',
    ordered = 'ORDERED'
}

@Entity('carts')
export class Cart {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User)
    @Column({ type: 'uuid', nullable: false })
    user_id: string;

    @Column({ type: 'date', nullable: false })
    created_at: Date;

    @Column({ type: 'date', nullable: false })
    updated_at: Date;

    @Column({ type: 'enum', nullable: false, enum: CartStatusEnum })
    status: CartStatusEnum;

    @OneToOne(User.name, 'cart', { eager: true })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { eager: true })
    items: CartItem[];
}
