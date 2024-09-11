import Stripe from 'stripe';

class StripeController {
    async createPayment(req, res, next) {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        stripe.charges.create(
            {
                source: req.body.tokenId,
                amount: req.body.amount,
                currency: "usd",
            },
            (stripeErr, stripeRes) => {
                if (stripeErr) {
                res.status(500).json(stripeErr);
                } else {
                res.status(200).json(stripeRes);
                }
            }
            );
    }
};

export default new StripeController();