import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Order } from '../../02-models';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/orders';

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.apiUrl);
    }

    getOrderById(id: string): Observable<Order> {
        return this.http.get<Order>(`${this.apiUrl}/${id}`);
    }

    createOrder(order: Omit<Order, 'id'>): Observable<Order> {
        return this.http.post<Order>(this.apiUrl, order);
    }

    updateOrderStatus(id: string, status: Order['status']): Observable<Order> {
        return this.http.patch<Order>(`${this.apiUrl}/${id}`, { status });
    }

    deleteOrder(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
