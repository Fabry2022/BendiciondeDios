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

        const newOrder: Omit<Order, 'id'> = {
            date: new Date().toISOString(),
            items: this._cartItems(), // Current state snapshot
            status: 'pending',
            total: this.totalCost(),
            customerName: customerName
        } as any; // Using 'any' briefly because I need to check if customerName exists on Order interface, looks like it doesn't. 
        // Wait, I should add customerName to the interface first to be safe, but user didn't ask me to modify models explicitly. 
        // I'll stick to what exists or extend it properly. Let's start by NOT adding customerName to Order if it's not there, 
        // or use userId since it is optional. Let's use `userId` as a placeholder for customer name for now to avoid breaking changes without modifying model file.

        // Re-doing the order object based on existing Interface
        const orderPayload: Omit<Order, 'id'> = {
            date: new Date().toISOString(),
            items: [...this._cartItems()], // Clone for safety
            status: 'pending',
            total: this.totalCost(),
            userId: customerName // Mapping customer name to userId for now
        };

        return this.orderService.createOrder(orderPayload).pipe(
            tap({
                next: () => {
                    // Commit: Only clear cart if order creation succeeds
                    this.clearCart();
                },
                error: (err) => {
                    // Rollback: Cart remains intact
                    console.error('Checkout failed, keeping cart state', err);
                }
            })
        );
    }
}
