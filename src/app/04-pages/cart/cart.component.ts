import { Component, inject } from '@angular/core';
import { CartStore } from '../../01-core/store';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartStore = inject(CartStore);
  private router = inject(Router);

  updateQuantity(productId: string, quantity: number) {
    this.cartStore.updateQuantity(productId, quantity);
  }

  removeItem(productId: string) {
    this.cartStore.removeFromCart(productId);
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }
}
