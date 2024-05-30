import Stripe from 'stripe'

export type SessionGetBody = {
  sessionId: string
}

const { STRIPE_SECRET_KEY } = useRuntimeConfig().private
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
})

export default defineEventHandler<{ body: SessionGetBody }>(async (event) => {
  const { sessionId } = await readBody(event)

  return stripe.checkout.sessions.retrieve(sessionId)
})
