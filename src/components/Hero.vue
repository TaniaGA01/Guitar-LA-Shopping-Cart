<script setup lang="ts">
import { ChevronRightIcon, ShoppingBagIcon, XMarkIcon, PlusIcon, MinusIcon } from "@heroicons/vue/20/solid";
import type { ProductsElement, ProductQuantity } from "../data/products.interfaces";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { computed, onMounted } from "vue";

onMounted(() => {
  const navbar = document.getElementById("header-top") as HTMLElement
  window.onscroll = () => {
    if (window.scrollY >= 250) {
      navbar.classList.add("sticky")
      navbar.classList.add("sticky-bg")
      navbar.classList.remove("py-6");
    } else {
      navbar.classList.remove("sticky");
      navbar.classList.remove("sticky-bg");
      navbar.classList.add("py-6");
    }
  };
})

const props = defineProps<{
  bag: ProductQuantity[]
  promoProduct: ProductsElement
}>();

defineEmits([
    'increase-product-quantity',
    'decrease-product-quantity', 
    'add-to-bag',
    'delete-Product',
    'empty-bag' 
])

let subTotal = computed(():number => {
  return props.bag.reduce((total, item) => total + (item.data.price * item.quantity), 0)// 0 is the bag's initial value, total is an array with the accumulated value
})

const taxe = computed(():number => {
  return ( subTotal.value * 20 ) / 100 
})

const total = computed(():number => {
  return ( subTotal.value + taxe.value ) 
})

const allBagProducts = computed(():number => {
  const productsInBag = props.bag.reduce((total, item) => total + item.quantity, 0)
  return productsInBag
})

</script>
<template>
  <div class="absolute mx-auto px-6 py-6 w-full flex place-content-between items-center top-0 z-10" id="header-top">
      <img class="h-16" src="imgs/logo.svg" alt="Guitar LA" />
      <Popover class="relative">
        <PopoverButton class="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
          <ShoppingBagIcon class="h-6 text-slate-50" />
          <p class="text-white">{{ allBagProducts }} produits</p>
        </PopoverButton>

        <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1"
          enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
          <PopoverPanel class="absolute -right-5 sm:right-0 z-10 mt-2 flex w-screen max-w-max">
            <div
              class="w-screen max-w-md flex-auto rounded-xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 max-h-[40rem] overflow-scroll">
              <div v-if="bag.length > 0" class="p-4">

                <table class="min-w-full">
                  <colgroup>
                    <col class="sm:w-1/6" />
                    <col class="w-full sm:w-1/2" />
                    <col class="sm:w-1/6" />
                    <col class="sm:w-1/6" />
                  </colgroup>
                  <thead class="border-b border-gray-300 text-gray-900">
                    <tr>
                      <th scope="col" class="p-2 text-left text-sm font-semibold text-gray-900">
                        Image
                      </th>
                      <th scope="col" class="p-2 text-left text-sm font-semibold text-gray-900">
                        Name
                      </th>
                      <th scope="col" class="p-2 text-center text-sm font-semibold text-gray-900">
                        Price
                      </th>
                      <th scope="col" class="p-2 text-center text-sm font-semibold text-gray-900">
                        Quantity
                      </th>
                      <th scope="col" class="p-2 text-left text-sm font-semibold text-gray-900">
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="product in bag" :key="product.data.id" class="border-b border-gray-200">
                      <td class="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                        <img class="w-6" :src="`productsImages/${product.data.image}.jpg`" />
                      </td>
                      <td class="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                        <div class="font-medium text-gray-900">
                          {{ product.data.name }}
                        </div>
                        <div class="mt-1 truncate text-gray-500">
                          {{ product.data.description }}
                        </div>
                      </td>
                      <td class="py-5 pl-3 pr-4 text-right text-sm text-gray-500">
                        {{ product.data.price }}€ 
                      </td>
                      <td class="py-5 pl-3 pr-4 text-right text-sm text-gray-500">
                        <div class="isolate inline-flex rounded-md shadow-sm text-xs">
                          <button type="button"
                              @click="$emit('decrease-product-quantity', product.data.id)"
                              class="relative inline-flex items-center rounded-l-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
                              <span class="sr-only">Add Product</span>
                              <MinusIcon class="h-3 w-3" aria-hidden="true" />
                          </button>
                          <input class="w-10 text-center border border-slate-200 text-slate-700" v-model="product.quantity" />
                          <button type="button"
                              @click="$emit('increase-product-quantity', product.data.id)"
                              class="relative -ml-px inline-flex items-center rounded-r-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
                              <span class="sr-only">Delete Product</span>
                              <PlusIcon class="h-3 w-3" aria-hidden="true" />
                          </button>
                      </div>
                      </td>
                      <td class="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">
                        <button type="button"
                          class="rounded-full bg-amber-600 p-1 text-white shadow-sm hover:bg-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                          @click="$emit('delete-Product', product.data.id)">
                          <XMarkIcon class="h-3 w-3" aria-hidden="true" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th scope="row" colspan="3"
                        class="hidden pl-4 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0">
                        Subtotal</th>
                      <th scope="row" class="pl-6 pr-3 pt-6 text-left text-sm font-normal text-gray-500 sm:hidden">
                        Subtotal</th>
                      <td class="pl-3 pr-6 pt-6 text-right text-sm text-gray-500 sm:pr-0">{{ subTotal }} €</td>
                    </tr>
                    <tr>
                      <th scope="row" colspan="3"
                        class="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0">
                        Tax 20%</th>
                      <th scope="row" class="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden">Tax 20%
                      </th>
                      <td class="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">{{ taxe }} €</td>
                    </tr>
                    <tr>
                      <th scope="row" colspan="3"
                        class="hidden pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0">
                        Total</th>
                      <th scope="row" class="pl-6 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden">
                        Total</th>
                      <td class="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">{{ total }} €</td>
                    </tr>
                  </tfoot>
                </table>
                <hr class="mt-4"/>
                <div class="text-center mt-3">
                  <button class=""
                    @click="$emit('empty-bag')">Empty bag</button>
                </div>
              </div>

              <div class="p-4 text-center text-slate-400" v-else>The bag is empty</div>
            </div>
          </PopoverPanel>
        </transition>
      </Popover>
  </div>
  <div class="relative isolate overflow-hidden bg-black xl:bg-white top-0">
    <div class="absolute -z-10 transform-gpu" aria-hidden="true">
      <img src="imgs/Guitar-LA-hero-background-2x.png" class="w-full" alt="" srcset="" />
    </div>
    <svg
      class="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      aria-hidden="true">
      <defs>
        <pattern id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc" width="200" height="200" x="50%" y="-1"
          patternUnits="userSpaceOnUse">
          <path d="M.5 200V.5H200" fill="none" />
        </pattern>
      </defs>
      <svg x="50%" y="-1" class="overflow-visible fill-gray-800/20">
        <path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
          stroke-width="0" />
      </svg>
      <rect width="100%" height="100%" stroke-width="0" fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" />
    </svg>
    <div
      class="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
      aria-hidden="true">
    </div>  
    
    <div class="mx-auto max-w-7xl px-6 pb-12 sm:pb-12 lg:flex lg:px-8 lg:pb-20 mt-40">
      <div class="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
        <div class="mt-24 sm:mt-32 lg:mt-16">
          <a href="#" class="inline-flex space-x-6">
            <span
              class="rounded-full bg-amber-500/10 px-3 py-1 text-sm font-semibold leading-6 text-amber-400 ring-1 ring-inset ring-amber-500/20">What's
              new</span>
            <span class="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-300">
              <span>Just shipped v1.0</span>
              <ChevronRightIcon class="h-5 w-5 text-gray-500" aria-hidden="true" />
            </span>
          </a>
        </div>
        <h1 class="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl uppercase">
          {{ promoProduct.name }}
        </h1>
        <p class="mt-6 text-2xl leading-8 text-gray-300">
          {{ promoProduct.description }}
        </p>
        <p class="mt-6 text-6xl leading-8 font-extrabold text-amber-600">
          {{ promoProduct.price }} €
        </p>
        <div class="mt-10 flex items-center gap-x-6">
          <a 
            href="#"
            @click.prevent="$emit('add-to-bag', promoProduct)"
            class="rounded-md bg-amber-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
            
            >Add
            to bag</a>
          <a href="#" class="text-sm font-semibold leading-6 text-white">Learn more <span aria-hidden="true">→</span></a>
        </div>
      </div>
      <div class="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
        <div class="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
          <img src="imgs/Guitar-banner-2x.png" alt="App screenshot" width="910" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.sticky-bg {
  transition: all 0.5s;
  background-color: rgba(1, 10, 19, 0.7);
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.sticky-bg .h-16{
  height: 3rem;
}

</style>
