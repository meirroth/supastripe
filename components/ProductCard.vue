<template>
  <div class="rounded-lg border border-gray-200 p-4 shadow-md">
    <h2 class="text-lg font-semibold">{{ product.name }}</h2>
    <p class="text-sm text-gray-500">{{ product.description }}</p>
    <p class="text-lg font-semibold">${{ product.price / 100 }}</p>
    <UButton :loading :label="loading ? '' : 'Buy now'" @click="checkout" />
  </div>
</template>

<script setup lang="ts">
import type Stripe from 'stripe'
import type { SessionPostBody } from '@/server/api/stripe/checkout-session/create.post'

const { product } = defineProps<{
  product: {
    id: string
    name: string
    description: string
    price: number
    stripeProductId: string
  }
}>()

const loading = ref(false)

async function checkout() {
  try {
    loading.value = true
    const res = await $fetch<Stripe.Checkout.Session>(
      '/api/stripe/checkout-session/create',
      {
        method: 'POST',
        body: {
          productId: product.stripeProductId,
        } satisfies SessionPostBody,
      },
    )

    console.log(res)

    await navigateTo(res.url, { external: true })
  } catch (error: any) {
    useToast().add({ color: 'red', title: error })
  } finally {
    loading.value = false
  }
}
</script>
