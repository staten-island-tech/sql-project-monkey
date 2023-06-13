import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMonkeyStore = defineStore('order', () => {
  const monkey = ref([])

  return { monkey }
})
