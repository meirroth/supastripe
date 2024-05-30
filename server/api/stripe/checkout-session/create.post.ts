import Stripe from 'stripe'

export type SessionPostBody = {
  productId: string
}

const { STRIPE_SECRET_KEY } = useRuntimeConfig().private
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
})

export default defineEventHandler<{ body: SessionPostBody }>(async (event) => {
  const { productId } = await readBody(event)

  const product = await stripe.products.retrieve(productId)

  if (typeof product.default_price !== 'string') {
    return createError('Product price not found')
  }

  const params: Stripe.Checkout.SessionCreateParams = {
    line_items: [
      {
        price: product.default_price,
        quantity: 1,
      },
    ],
    mode: 'payment',
    payment_method_types: ['card'],
    success_url: `http://localhost:3000/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:3000/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
  }

  return stripe.checkout.sessions.create(params)
})
