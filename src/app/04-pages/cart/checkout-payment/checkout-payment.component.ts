import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripeService } from '../../../01-core/services/stripe.service';
import { CartStore } from '../../../01-core/store';
import { Router } from '@angular/router';
import { StripeElements, StripeCardElement } from '@stripe/stripe-js';

@Component({
    selector: 'app-checkout-payment',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './checkout-payment.component.html',
    styleUrl: './checkout-payment.component.scss'
})
export class CheckoutPaymentComponent implements OnInit, OnDestroy {
    private stripeService = inject(StripeService);
    cartStore = inject(CartStore);
    private router = inject(Router);

    private elements: StripeElements | null = null;
    private card: StripeCardElement | null = null;

    isProcessing = false;
    cardErrorMessage = '';

    // Visual Card Simulation Properties
    isCardFlipped = false;
    isSimulating = false;
    simulatedNumber = '';
    simulatedName = '';
    simulatedExpiry = '';

    private readonly TEST_CARD = '4242 4242 4242 4242';
    private readonly TEST_NAME = 'FERNANDO ALONSO';
    private readonly TEST_EXPIRY = '12/28';

    async ngOnInit() {
        const stripe = await (inject(StripeService).getStripe().toPromise());
        const elementStyles = {
            style: {
                base: {
                    fontSize: '16px',
                    color: '#32325d',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    '::placeholder': {
                        color: '#aab7c4'
                    }
                },
                invalid: {
                    color: '#fa755a',
                    iconColor: '#fa755a'
                }
            }
        };

        if (stripe) {
            this.elements = stripe.elements();
            this.card = this.elements.create('card', elementStyles);
            this.card.mount('#card-element');

            this.card.on('change', (event) => {
                if (event.error) {
                    this.cardErrorMessage = event.error.message;
                } else {
                    this.cardErrorMessage = '';
                }
            });
        }
    }

    ngOnDestroy() {
        if (this.card) {
            this.card.destroy();
        }
    }

    async startSimulation() {
        if (this.isSimulating) return;
        this.resetSimulation();
        this.isSimulating = true;

        // Simulate typing card number
        for (let i = 0; i <= this.TEST_CARD.length; i++) {
            this.simulatedNumber = this.TEST_CARD.substring(0, i);
            await new Promise(r => setTimeout(r, 50));
        }

        // Simulate typing name
        for (let i = 0; i <= this.TEST_NAME.length; i++) {
            this.simulatedName = this.TEST_NAME.substring(0, i);
            await new Promise(r => setTimeout(r, 50));
        }

        // Simulate typing expiry
        for (let i = 0; i <= this.TEST_EXPIRY.length; i++) {
            this.simulatedExpiry = this.TEST_EXPIRY.substring(0, i);
            await new Promise(r => setTimeout(r, 50));
        }

        this.isSimulating = false;
        alert('Simulación completada. Ahora puedes presionar "Pagar Ahora".');
    }

    resetSimulation() {
        this.simulatedNumber = '';
        this.simulatedName = '';
        this.simulatedExpiry = '';
        this.isCardFlipped = false;
    }

    async handleSubmit(event: Event) {
        event.preventDefault();

        if (this.isProcessing) return;
        this.isProcessing = true;

        // Simulación de interacción con Stripe
        // En un entorno real llamaríamos a stripe.confirmCardPayment()
        try {
            const success = await this.stripeService.simulatePayment(this.cartStore.totalCost());

            if (success) {
                this.cartStore.checkout('Cliente Stripe').subscribe({
                    next: () => {
                        alert('¡Pago exitoso y orden creada!');
                        this.router.navigate(['/']);
                    },
                    error: (err) => {
                        this.cardErrorMessage = 'Error al registrar la orden.';
                        this.isProcessing = false;
                    }
                });
            } else {
                this.cardErrorMessage = 'El pago fue declinado. Intente con otra tarjeta.';
                this.isProcessing = false;
            }
        } catch (error) {
            this.cardErrorMessage = 'Ocurrió un error inesperado.';
            this.isProcessing = false;
        }
    }
}
