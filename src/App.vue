<script setup lang="ts">
import Hero from './components/hero.vue';
import Products from './components/Products.vue'
import { db } from './data/productsData';
import type { ProductsElement } from './data/products.interfaces'
import { onMounted, ref } from 'vue';

const products = ref<ProductsElement[]>([])
const bag = ref<ProductsElement[]>([])

onMounted(() => {
    products.value = db
});
const addToBag = (product:ProductsElement) => {
  bag.value.push(product)
  console.log('bag', bag.value)
}

</script>

<template>
 <Hero :bag="bag"/>
 <div class="bg-white">
      <div class="mx-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 class="text-xl font-bold text-gray-900">Customers also bought</h2>
        <div class="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          <Products 
            v-for="product in products" :key="product.id"
            :product="product"
            @add-to-bag="addToBag"
          />
        </div>
      </div>
    </div>
</template>

<style scoped>
</style>