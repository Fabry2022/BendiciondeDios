import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Category, Product } from '../../02-models';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000';

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.apiUrl}/products`);
    }

    getProductById(id: string): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
    }

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`${this.apiUrl}/categories`);
    }

    createProduct(product: Omit<Product, 'id'>): Observable<Product> {
        return this.http.post<Product>(`${this.apiUrl}/products`, product);
    }

    updateProduct(id: string, product: Partial<Product>): Observable<Product> {
        return this.http.patch<Product>(`${this.apiUrl}/products/${id}`, product);
    }

    deleteProduct(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/products/${id}`);
    }
}
