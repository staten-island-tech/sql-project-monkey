import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', () => {
  const order = ref([])
  const removeOrder = (orderId) => {
    const index = order.value.findIndex((order) => order.order_id === orderId);
    if (index !== -1) {
      order.value.splice(index, 1);
    }
  };

  return { order, removeOrder };
})
