import { Component, inject } from '@angular/core';
import { OrderService } from '../../../01-core/services';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent {
  private orderService = inject(OrderService);
  orders = toSignal(this.orderService.getOrders(), { initialValue: [] });

  updateStatus(id: string, status: 'completed' | 'cancelled') {
    this.orderService.updateOrderStatus(id, status).subscribe(() => {
      window.location.reload();
    });
  }
}
