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
    // In a real app, this would be a form.
    // For this architectural demo, we simulate a guest checkout.
    const customerName = 'Cliente Invitado';

    this.cartStore.checkout(customerName).subscribe({
      next: () => {
        alert('¡Orden creada con éxito! El carrito se ha limpiado.');
        this.router.navigate(['/']);
      },
      error: (err) => {
        alert('Error al crear la orden. Por favor intente de nuevo.');
        console.error(err);
      }
    });
  }
}
