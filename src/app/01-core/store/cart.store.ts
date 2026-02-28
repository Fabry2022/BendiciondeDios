import { computed, inject, Injectable, signal } from '@angular/core';
import { CartItem, Order, Product } from '../../02-models';
import { OrderService } from '../services/order.service';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartStore {
    private readonly _cartItems = signal<CartItem[]>([]);
    readonly cartItems = this._cartItems.asReadonly();

    private readonly _paymentStatus = signal<'idle' | 'processing' | 'success' | 'error'>('idle');
    readonly paymentStatus = this._paymentStatus.asReadonly();

    private orderService = inject(OrderService);

    readonly totalCost = computed(() =>
        this._cartItems().reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
    );

    readonly itemsCount = computed(() =>
        this._cartItems().reduce((acc, item) => acc + item.quantity, 0)
    );

    addToCart(product: Product) {
        this._cartItems.update(items => {
            const existingItem = items.find(item => item.product.id === product.id);
            if (existingItem) {
                return items.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...items, { product, quantity: 1 }];
        });
    }

    removeFromCart(productId: string) {
        this._cartItems.update(items => items.filter(item => item.product.id !== productId));
    }

    updateQuantity(productId: string, quantity: number) {
        if (quantity <= 0) {
            this.removeFromCart(productId);
            return;
        }
        this._cartItems.update(items =>
            items.map(item =>
                item.product.id === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    }

    clearCart() {
        this._cartItems.set([]);
    }

    // ACID Simulation: Transactional Integrity
    checkout(customerName: string): Observable<Order> {
        if (this._cartItems().length === 0) {
            throw new Error('Cart is empty');
        }

        this._paymentStatus.set('processing');

        const orderPayload: Omit<Order, 'id'> = {
            date: new Date().toISOString(),
            items: [...this._cartItems()],
            status: 'pending',
            total: this.totalCost(),
            userId: customerName
        };

        return this.orderService.createOrder(orderPayload).pipe(
            tap({
                next: () => {
                    this._paymentStatus.set('success');
                    this.clearCart();
                    setTimeout(() => this._paymentStatus.set('idle'), 3000);
                },
                error: (err) => {
                    this._paymentStatus.set('error');
                    console.error('Checkout failed, keeping cart state', err);
                    setTimeout(() => this._paymentStatus.set('idle'), 3000);
                }
            })
        );
    }
}
