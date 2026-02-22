import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe, NgClass } from '@angular/common';
import { inject } from '@angular/core';
import { CartStore } from '../../01-core/store';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AsyncPipe, NgClass],
  animations: [
    trigger('fadeAnimation', [
      transition('* => *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ])
    ])
  ],
  template: `
    <div class="main-layout">
      <!-- Navbar -->
      <header class="navbar">
        <div class="logo">
          <a routerLink="/">Bendición de Dios</a>
        </div>
        <nav class="nav-links">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Inicio</a>
          <a routerLink="/menu" routerLinkActive="active">Menú</a>
          <a routerLink="/admin/dashboard" routerLinkActive="active">Admin</a>
        </nav>
        <div class="cart-icon">
          <a routerLink="/cart">
            🛒 <span class="badge">{{ cartStore.itemsCount() }}</span>
          </a>
        </div>
      </header>

      <!-- Content -->
      <main class="content" [@fadeAnimation]="o.isActivated ? o.activatedRoute : ''">
        <router-outlet #o="outlet"></router-outlet>
      </main>

      <!-- Footer -->
      <footer class="footer">
        <p>&copy; 2026 Bendición de Dios. Sabor Salvadoreño.</p>
      </footer>
    </div>
  `,
  styles: [`
    .main-layout {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background-color: #fff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 1000;

      .logo a {
        font-size: 1.5rem;
        font-weight: bold;
        text-decoration: none;
        color: #333;
      }

      .nav-links {
        display: flex;
        gap: 2rem;

        a {
          text-decoration: none;
          color: #666;
          font-weight: 500;
          transition: color 0.3s;

          &:hover, &.active {
            color: #ff6b6b;
          }
        }
      }

      .cart-icon {
        a {
          text-decoration: none;
          color: #333;
          position: relative;
          font-size: 1.2rem;

          .badge {
            position: absolute;
            top: -8px;
            right: -8px;
            background-color: #ff6b6b;
            color: white;
            font-size: 0.75rem;
            padding: 2px 6px;
            border-radius: 50%;
          }
        }
      }
    }

    .content {
      flex: 1;
      padding: 2rem;
      background-color: #f8f9fa;
    }

    .footer {
      text-align: center;
      padding: 1rem;
      background-color: #333;
      color: #fff;
    }
  `]
})
export class MainLayoutComponent {
  cartStore = inject(CartStore);
}
