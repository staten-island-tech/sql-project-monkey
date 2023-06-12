import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore(
  'cart',
  () => {
    // reactive array for cart
    const cart = ref([])

    // reset function


    return { cart }
  },
  { persist: true }
)
