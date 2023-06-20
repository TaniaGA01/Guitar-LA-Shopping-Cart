<script setup lang="ts">
import Hero from './components/Hero.vue';
import Products from './components/Products.vue'
import Footer from './components/Footer.vue';
import { db } from './data/productsData';
import type { ProductsElement, ProductQuantity } from './data/products.interfaces'
import { onMounted, ref } from 'vue';

const products = ref<ProductsElement[]>([])
const bag = ref<ProductQuantity[]>([])

onMounted(() => {
    products.value = db
});

const addToBag = (product:ProductsElement) => {
  const itemExist = bag.value.findIndex(item => item.data.id === product.id)

  if(itemExist >= 0){
    return bag.value[itemExist].quantity++
    
  }else{
    const guitar = {
      data:product,
      quantity:1
    }
    return bag.value.push(guitar)
  }
  
}

const increaseProductQuantity = (id:number) => {
  const index = bag.value.findIndex(item => item.data.id === id)
  if(bag.value[index].quantity < 5){
    return bag.value[index].quantity++
  }
}

const decreaseProductQuantity = (id:number) => {
  const index = bag.value.findIndex(item => item.data.id === id)
  if(bag.value[index].quantity > 1){
    return bag.value[index].quantity--
  }
  
}

</script>

<template>
 <Hero 
 :bag="bag"
 @increase-product-quantity="increaseProductQuantity"
 @decrease-product-quantity="decreaseProductQuantity"
  />
 <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 class="text-2xl font-bold text-slate-700 uppercase">Customers also bought</h2>
      <div class="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        <Products 
          v-for="product in products" :key="product.id"
          :product="product"
          @add-to-bag="addToBag"
        />
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
</style>
