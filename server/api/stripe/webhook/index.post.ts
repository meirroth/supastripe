import Stripe from 'stripe'

const { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } = useRuntimeConfig().private
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
})

export default defineEventHandler(async (event) => {
  const payload = await readRawBody(event)
  const signature = getRequestHeader(event, 'Stripe-Signature')

  const stripeEvent = stripe.webhooks.constructEvent(
    payload!,
    signature!,
    STRIPE_WEBHOOK_SECRET,
  )

  console.log('Received event:', stripeEvent)
})
