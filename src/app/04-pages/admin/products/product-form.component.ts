import { Component, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../01-core/services';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);

  id = input<string>();

  categories = toSignal(this.productService.getCategories(), { initialValue: [] });

  form = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    categoryId: ['', Validators.required],
    image: ['https://placehold.co/400x300', Validators.required],
    isPopular: [false]
  });

  ngOnInit() {
    if (this.id()) {
      this.productService.getProductById(this.id()!).subscribe(product => {
        this.form.patchValue(product);
      });
    }
  }

  save() {
    if (this.form.invalid) return;

    const product = this.form.value as any;

    if (this.id()) {
      this.productService.updateProduct(this.id()!, product).subscribe(() => {
        this.router.navigate(['/admin/products']);
      });
    } else {
      this.productService.createProduct(product).subscribe(() => {
        this.router.navigate(['/admin/products']);
      });
    }
  }
}
