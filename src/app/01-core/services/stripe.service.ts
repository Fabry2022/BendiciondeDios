import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { stripeConfig } from '../config/stripe.config';
import { from, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StripeService {
    private stripePromise = loadStripe(stripeConfig.publishableKey);

    getStripe(): Observable<Stripe | null> {
        return from(this.stripePromise);
    }

    async redirectToCheckout(sessionId: string) {
        const stripe = (await this.stripePromise) as any;
        if (stripe) {
            const { error } = await stripe.redirectToCheckout({
                sessionId: sessionId
            });
            if (error) {
                console.error('Stripe Checkout Error:', error);
            }
        }
    }

    // Simulación para propósitos de demostración sin backend real de Stripe
    async simulatePayment(amount: number): Promise<boolean> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const success = Math.random() > 0.1; // 90% éxito
                resolve(success);
            }, 2000);
        });
    }
}
