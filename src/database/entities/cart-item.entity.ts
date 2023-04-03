import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from './cart.entity';

@Entity('cart_items')
export class CartItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Cart, (cart) => cart.items)
    cart: Cart

    @Column({ type: 'uuid', nullable: false })
    product_id: string;

    @Column({ type: 'int', nullable: false })
    count: number;
}
