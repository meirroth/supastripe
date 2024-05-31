<template>
  <div class="m-10 grid grid-flow-row grid-cols-4 gap-6">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<script setup lang="ts">
const { data: products } = await useFetch('/api/data/products')
</script>
