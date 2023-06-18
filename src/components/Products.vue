<script setup lang="ts">
import type { ProductsElement } from '../data/products.interfaces'

defineProps<{
    product:ProductsElement
}>()

defineEmits([
    'add-to-bag','productData'
])

</script>
<template>
    <div class="border-solid border border-slate-300 rounded-md p-2">
        <div class="relative">
            <div class="relative h-72 w-full overflow-hidden rounded-lg">
                <img :src="`productsImages/${ product.image }.jpg`" 
                :alt="product.name" class="w-36 object-cover object-top" />
            </div>
            <div class="relative mt-4">
                <h3 class="text-lg font-medium text-slate-700 uppercase">{{ product.name }}</h3>
            </div>
            <div class="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                <div aria-hidden="true" class="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-10" />
                <p class="relative text-3xl font-extrabold text-amber-600">{{ product.price }} €</p>
            </div>
        </div>
        <div class="mt-2">
            <button class="relative flex items-center justify-center rounded-md border border-transparent bg-amber-500 px-8 py-2 text-sm font-medium text-white hover:bg-gray-400 w-full"
            @click.prevent="$emit('add-to-bag', product)"
            >
                Add to bag<span class="sr-only">, {{ product.name }}</span>
            </button
            >
        </div>
    </div>
  </template>
  
