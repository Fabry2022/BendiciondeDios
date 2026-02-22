import { Component, inject, signal, computed } from '@angular/core';
import { ProductService } from '../../01-core/services';
import { CartStore } from '../../01-core/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product, Category } from '../../02-models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  private productService = inject(ProductService);
  private cartStore = inject(CartStore);

  products = toSignal(this.productService.getProducts(), { initialValue: [] });
  categories = toSignal(this.productService.getCategories(), { initialValue: [] });

  selectedCategory = signal<string>('all');

  filteredProducts = computed(() => {
    const category = this.selectedCategory();
    const allProducts = this.products();
    if (category === 'all') {
      return allProducts;
    }
    return allProducts.filter(p => p.categoryId === category);
  });

  addToCart(product: Product) {
    this.cartStore.addToCart(product);
  }
}
