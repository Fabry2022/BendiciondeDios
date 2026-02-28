import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-checkout-success',
    standalone: true,
    imports: [RouterLink],
    template: `
    <div class="status-container">
        <div class="icon success">✓</div>
        <h1>¡Pago Completado!</h1>
        <p>Tu orden ha sido procesada con éxito. Pronto recibirás tus pupusas.</p>
        <a routerLink="/" class="cta-button">Volver al Inicio</a>
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
            &.success { color: #28a745; }
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
export class CheckoutSuccessComponent { }
