<template>
  <div>
    <h1>My Orders</h1>
    <Order v-for="order in orderStore.order" :order="order" :key="order.order_id" />
  </div>
</template>

<script setup>
import Order from '../components/Order.vue'
import { supabase } from '../supabase';
import { useOrderStore } from '../stores/order';
import { onMounted } from 'vue'
import { authStore } from '../stores/counter.js'
import { useOrderItemStore } from '../stores/orderItems'
const orderStore = useOrderStore()
const orderItemStore = useOrderItemStore()


async function getUserId() {
  const user = authStore().currentUser
  return user
}
 async function fetchOrderItem() {
  try {
    const userId = await getUserId(); 
    
    const { data: orders } = await supabase
      .from('Orders')
      .select('order_id, total_price, total_shipping')
      .eq('user_id', userId);

    const orderIds = orders.map((order) => order.order_id);

    const { data } = await supabase
      .from('OrderItems')
      .select('*')
      .in('order_id', orderIds);


      orderStore.order = orders;
      console.log(userId)
      console.log(orderStore.order)
    orderItemStore.orderItems = data;
    console.log(orderItemStore.orderItems)
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
fetchOrderItem()
})
</script>
