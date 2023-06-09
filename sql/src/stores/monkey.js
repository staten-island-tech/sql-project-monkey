import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMonkeyStore = defineStore('product', () => {
  // reactive array for product
  const monkey = ref([])

  return { monkey }
})
