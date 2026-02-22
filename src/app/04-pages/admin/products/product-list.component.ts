import { Component, inject } from '@angular/core';
import { ProductService } from '../../../01-core/services';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  private productService = inject(ProductService);
  products = toSignal(this.productService.getProducts(), { initialValue: [] });

  deleteProduct(id: string) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        // Refresh items or navigate
        window.location.reload(); // Simple refresh for now
      });
    }
  }
}
