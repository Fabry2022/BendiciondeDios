import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="admin-layout">
      <aside class="sidebar">
        <div class="logo">
          Admin Panel
        </div>
        <nav>
          <a routerLink="/admin/dashboard" routerLinkActive="active">Dashboard</a>
          <a routerLink="/admin/products" routerLinkActive="active">Productos</a>
          <a routerLink="/admin/orders" routerLinkActive="active">Órdenes</a>
          <a routerLink="/admin/categories" routerLinkActive="active">Categorías</a>
          <a routerLink="/" class="back-home">Volver a Tienda</a>
        </nav>
      </aside>
      <main class="main-content">
        <header class="topbar">
          <div class="user-info">Admin User</div>
        </header>
        <div class="content-wrapper">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .admin-layout {
      display: flex;
      min-height: 100vh;
    }

    .sidebar {
      width: 250px;
      background: #2d3436;
      color: white;
      display: flex;
      flex-direction: column;

      .logo {
        padding: 1.5rem;
        font-size: 1.25rem;
        font-weight: bold;
        border-bottom: 1px solid rgba(255,255,255,0.1);
      }

      nav {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        a {
          color: #b2bec3;
          text-decoration: none;
          padding: 0.75rem 1rem;
          border-radius: 6px;
          transition: all 0.2s;

          &:hover, &.active {
            background: rgba(255,255,255,0.1);
            color: white;
          }

          &.back-home {
            margin-top: 2rem;
            color: var(--secondary-color);
          }
        }
      }
    }

    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: #f8f9fa;
    }

    .topbar {
      background: white;
      padding: 1rem 2rem;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: flex-end;
    }

    .content-wrapper {
      padding: 2rem;
      overflow-y: auto;
      height: calc(100vh - 60px);
    }
  `]
})
export class AdminLayoutComponent { }
