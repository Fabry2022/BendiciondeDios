import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-checkout-cancel',
    standalone: true,
    imports: [RouterLink],
    template: `
    <div class="status-container">
        <div class="icon cancel">✕</div>
        <h1>Pago Cancelado</h1>
        <p>El proceso de pago ha sido cancelado. Tu carrito sigue intacto.</p>
        <a routerLink="/cart" class="cta-button">Volver al Carrito</a>
    </div>
  `,
    styles: [`
    .status-container {
        max-width: 500px;
        margin: 100px auto;
        padding: 40px;
        text-align: center;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.08);

        .icon {
            font-size: 4rem;
            margin-bottom: 20px;
            &.cancel { color: #dc3545; }
        }

        h1 { margin-bottom: 15px; color: #333; }
        p { margin-bottom: 30px; color: #666; }

        .cta-button {
            display: inline-block;
            padding: 12px 24px;
            background: #635bff;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
        }
    }
  `]
})
export class CheckoutCancelComponent { }
