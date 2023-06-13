import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useOrderItemStore = defineStore('orderItems', () => {
  const orderItems = ref([])
  const orderCancelled = ref(false)
  const removeOrderItems = (orderId) => {
    const filteredItems = orderItems.value.filter(
      (item) => item.order_id !== orderId
    );
    orderItems.value = filteredItems;
  };

  return { orderItems, orderCancelled, removeOrderItems }
})
