<script setup lang="ts">
import Hero from './components/Hero.vue';
import Products from './components/Products.vue'
import Footer from './components/Footer.vue';
import { db } from './data/productsData';
import type { ProductsElement, ProductQuantity } from './data/products.interfaces'
import { onMounted, ref,reactive, watch } from 'vue';

const products = ref<ProductsElement[]>([])
let promoProduct = reactive({}) as ProductsElement
const bag = ref<ProductQuantity[]>([])

watch( bag, () => { // watch detect state changes
  saveLocalStorage()
}, {
  deep:true // check all bag attributs changes
})

onMounted(() => {
    products.value = db
    promoProduct = reactive(db[7])

    //persistence product if there is a product in bag
    const bagStorage = localStorage.getItem('bag')
    if(bagStorage){
      bag.value = JSON.parse(bagStorage)
    }
});

const saveLocalStorage = () => { // product persistance
  localStorage.setItem('bag', JSON.stringify(bag.value))
}

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

const increaseProductQuantity = (id:number):number | undefined => {
  const index = bag.value.findIndex(item => item.data.id === id)
  if(bag.value[index].quantity < 5){
    return bag.value[index].quantity++
  }
}

const decreaseProductQuantity = (id:number):number | undefined => {
  const index = bag.value.findIndex(item => item.data.id === id)
  if(bag.value[index].quantity > 1){
    return bag.value[index].quantity--
  }
  
}

const deleteProduct = (id:number):ProductQuantity[] => {
  return bag.value = bag.value.filter(product => product.data.id !== id)
}

const emptyBag = ():ProductQuantity[] => {
  return bag.value = []
}

</script>

<template>
 <Hero 
 :promoProduct="promoProduct"
 :bag="bag"
 @increase-product-quantity="increaseProductQuantity"
 @decrease-product-quantity="decreaseProductQuantity"
 @add-to-bag="addToBag"
 @delete-Product="deleteProduct"
 @empty-bag="emptyBag"
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
