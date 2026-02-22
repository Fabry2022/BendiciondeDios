import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common'; // Import CurrencyPipe
import { ProductService } from '../../01-core/services';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private productService = inject(ProductService);
  products = toSignal(this.productService.getProducts(), { initialValue: [] });

  // Computed signal for better performance
  popularProducts = computed(() =>
    this.products().filter(p => p.isPopular)
  );
}
