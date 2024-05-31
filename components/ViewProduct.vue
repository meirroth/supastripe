<template>
  <div class="m-10 grid grid-flow-row grid-cols-4 gap-6">
    <ProductCard v-if="product" :product />
  </div>
</template>

<script setup lang="ts">
const { data: products } = await useFetch('/api/data/products')

const route = useRoute()

const product = products.value?.find(
  (product) => product.id === route.params.id,
)

if (!product) {
  await navigateTo('/')
}
</script>
