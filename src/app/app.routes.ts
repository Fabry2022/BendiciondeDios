import { Routes } from '@angular/router';
import { MainLayoutComponent, AdminLayoutComponent } from './03-shared/layouts';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./04-pages/home/home.component').then(m => m.HomeComponent)
            },
            {
                path: 'menu',
                loadComponent: () => import('./04-pages/menu/menu.component').then(m => m.MenuComponent)
            },
            {
                path: 'cart',
                loadComponent: () => import('./04-pages/cart/cart.component').then(m => m.CartComponent)
            }
        ]
    },
    {
        path: 'admin',
        component: AdminLayoutComponent,
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./04-pages/admin/dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
                path: 'products',
                loadComponent: () => import('./04-pages/admin/products/product-list.component').then(m => m.ProductListComponent)
            },
            {
                path: 'products/new',
                loadComponent: () => import('./04-pages/admin/products/product-form.component').then(m => m.ProductFormComponent)
            },
            {
                path: 'products/edit/:id',
                loadComponent: () => import('./04-pages/admin/products/product-form.component').then(m => m.ProductFormComponent)
            },
            {
                path: 'orders',
                loadComponent: () => import('./04-pages/admin/orders/order-list.component').then(m => m.OrderListComponent)
            },
            {
                path: 'categories',
                loadComponent: () => import('./04-pages/admin/categories/category-list.component').then(m => m.CategoryListComponent)
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
