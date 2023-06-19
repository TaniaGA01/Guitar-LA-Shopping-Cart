<script setup lang="ts">
import {
  PlusIcon,
  MinusIcon
} from "@heroicons/vue/20/solid";
</script>
<template>
    <div class="isolate inline-flex rounded-md shadow-sm text-xs">
        <button type="button"
            class="relative inline-flex items-center rounded-l-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
            <span class="sr-only">Add Product</span>
            <MinusIcon class="h-3 w-3" aria-hidden="true" />
        </button>
        <input class="w-10 text-center border border-slate-200" value="0" />
        <button type="button"
            class="relative -ml-px inline-flex items-center rounded-r-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
            <span class="sr-only">Delete Product</span>
            <PlusIcon class="h-3 w-3" aria-hidden="true" />
        </button>
    </div>
</template>



<style lang="scss" scoped>

</style>