<template>
  <div>
    <h1>My Orders</h1>
    <order-card v-for="order in orders" :order="order" :key="order.order_id" />
  </div>
</template>

<script setup>
import OrderCard from '../components/Order.vue';
import { ref, onMounted } from 'vue';
import { supabase } from '../supabase';

const orders = ref([]);

const fetchOrders = async () => {
  try {
    const { data } = await supabase.from('Orders').select('*');



    orders.value = data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchOrders();
});
</script>
