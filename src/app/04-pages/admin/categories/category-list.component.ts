import { Component, inject } from '@angular/core';
import { ProductService } from '../../../01-core/services';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-category-list',
  standalone: true,
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  private productService = inject(ProductService);
  categories = toSignal(this.productService.getCategories(), { initialValue: [] });
}
