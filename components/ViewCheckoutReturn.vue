<template>
  <UContainer>
    <div v-if="status === 'pending'">
      <p>Loading...</p>
    </div>

    <div v-else-if="status === 'error' || !session">
      <h1>Checkout expired or invalid</h1>
      <p>
        Your checkout session has expired or is invalid. Please click the link
        below to return to the home page.
      </p>
      <UButton to="/" label="Return home" />
    </div>

    <div v-else-if="session.status === 'complete'">
      <h1>Success!</h1>
      <p>
        We appreciate your business! A confirmation email will be sent to
        {{ session.customer_details?.email }}.
      </p>
      <p>Payment ID: {{ session.payment_intent }}</p>
      <p>Amount: {{ (session.amount_total as number) / 100 }}</p>
    </div>

    <div v-else-if="session.status === 'open'">
      <h1>Almost there!</h1>
      <p>
        Your purchase is almost complete! Please click the link below to finish
        your purchase.
      </p>
      <UButton :to="session.url" label="Complete purchase" />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import type Stripe from 'stripe'
import type { SessionGetBody } from '@/server/api/stripe/checkout-session/confirm.post'

const route = useRoute()

if (typeof route.query.session_id !== 'string') {
  throw navigateTo('/')
}

const {
  data: session,
  status,
  error,
} = useFetch<Stripe.Checkout.Session>('/api/stripe/checkout-session/confirm', {
  method: 'POST',
  body: {
    sessionId: route.query.session_id,
  } satisfies SessionGetBody,
})

if (error.value) {
  useToast().add({ color: 'red', title: error.value.message })
}

useSeoMeta({
  title: 'Success',
})
</script>
