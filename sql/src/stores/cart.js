import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore(
  'cart',
  () => {
    const cart = ref([])

    return { cart }
  },
  { persist: true }
)
