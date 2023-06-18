<script setup lang="ts">
  import { ChevronRightIcon,ShoppingBagIcon, PlusIcon,MinusIcon,XMarkIcon } from '@heroicons/vue/20/solid'
  import type { ProductsElement } from '../data/products.interfaces'
  import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
  defineProps<{
    bag:ProductsElement[]
}>()
</script>
<template>
    <div class="relative isolate overflow-hidden bg-black xl:bg-white">
        <div class="absolute -z-10 transform-gpu" aria-hidden="true">
            <img src="imgs/Guitar-LA-hero-background@2x.png" class="w-full" alt="" srcset=""/>
        </div>
      <svg class="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" aria-hidden="true">
        <defs>
          <pattern id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y="-1" class="overflow-visible fill-gray-800/20">
          <path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z" stroke-width="0" />
        </svg>
        <rect width="100%" height="100%" stroke-width="0" fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" />
      </svg>
      <div class="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]" aria-hidden="true">
        <div class="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#e99401] to-[#ffffff] opacity-20" style="clip-path: polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)" />
      </div>
    <div class="mx-auto max-w-7xl px-6 pb-12 py-10">
        <div class="w-full flex place-content-between items-center">
            <img class="h-16" src="imgs/logo.svg" alt="Guitar LA" />
            <Popover class="relative">
                <PopoverButton class="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                    <ShoppingBagIcon class="h-6 text-slate-50"/>
                    <p class="text-white">{{ bag.length }}</p>
                </PopoverButton>

                <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
                    <PopoverPanel class="absolute -right-5 sm:right-0 z-10 mt-2 flex w-screen max-w-max">
                        <div class="w-screen max-w-md flex-auto overflow-hidden rounded-xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                            <div v-if="bag.length" class="p-4">
                                <table class="border-collapse table-auto w-full text-sm text-center">
                                    <thead class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 bg-slate-100">
                                        <tr>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="product in bag" :key="product.name" class="border-b border-slate-100">
                                            <td class="flex justify-center">
                                                <img class="w-6" :src="`productsImages/${ product.image }.jpg`"/>
                                            </td>
                                            <td>{{ product.name }}</td>
                                            <td>{{ product.price }} €</td>
                                            <td>
                                                <span class="isolate inline-flex rounded-md shadow-sm text-xs">
                                                    <button type="button" class="relative inline-flex items-center rounded-l-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
                                                    <span class="sr-only">Previous</span>
                                                    <MinusIcon class="h-3 w-3" aria-hidden="true" />
                                                    </button>
                                                    <input class=" w-10 text-center border border-slate-200" value="0" />
                                                    <button type="button" class="relative -ml-px inline-flex items-center rounded-r-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
                                                    <span class="sr-only">Next</span>
                                                    <PlusIcon class="h-3 w-3" aria-hidden="true" />
                                                    </button>
                                                </span>
                                            </td>
                                            <td>
                                                <button type="button" class="rounded-full bg-amber-600 p-1 text-white shadow-sm hover:bg-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600">
                                                    <XMarkIcon class="h-3 w-3" aria-hidden="true" />
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="p-4 text-center text-slate-400" v-else>
                                Empty
                            </div>
                        </div>
                    </PopoverPanel>
                </transition>
            </Popover>
        </div>
    </div>
      <div class="mx-auto max-w-7xl px-6 pb-12 sm:pb-12 lg:flex lg:px-8 lg:pb-20">
        <div class="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          <div class="mt-24 sm:mt-32 lg:mt-16">
            <a href="#" class="inline-flex space-x-6">
              <span class="rounded-full bg-amber-500/10 px-3 py-1 text-sm font-semibold leading-6 text-amber-400 ring-1 ring-inset ring-amber-500/20">What's new</span>
              <span class="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-300">
                <span>Just shipped v1.0</span>
                <ChevronRightIcon class="h-5 w-5 text-gray-500" aria-hidden="true" />
              </span>
            </a>
          </div>
          <h1 class="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">RANCHER JUMBO CUTAWAY ELECTRIC</h1>
          <p class="mt-6 text-lg leading-8 text-gray-300">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.</p>
          <p class="mt-6 text-6xl leading-8 font-extrabold text-amber-600">300€</p>
          <div class="mt-10 flex items-center gap-x-6">
            <a href="#" class="rounded-md bg-amber-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400">Add to bag</a>
            <a href="#" class="text-sm font-semibold leading-6 text-white">Learn more <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <div class="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div class="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <img src="imgs/Guitar-banner@2x.png" alt="App screenshot" width="910"  />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  