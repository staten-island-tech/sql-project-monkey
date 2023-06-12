<template>
  <div class="card">
    <h2>Order ID: {{ order.order_id }}</h2>
    <p>User ID: {{ order.user_id }}</p>
    <p>Total Price: ${{ order.total_price }}</p>
    <p>Total Shipping: {{ order.total_shipping }} days</p>
    <div class="order-items">
      <h3>Order Items</h3>
      <ul>
        <li v-for="item in orderItems" :key="item.order_item_id">
          {{ item.monkey_name }} - Quantity: {{ item.quantity }}
        </li>
      </ul>
    </div>
    <p v-if="orderCancelled">Order Cancelled</p>
    <button class="cancel-button" @click="cancelOrder" v-if="!orderCancelled">Cancel Order</button>
  </div>
</template>

<script>
import { supabase } from '../supabase';

export default {
  props: ['order'],
  data() {
    return {
      orderItems: [],
      orderCancelled: false
    };
  },
  methods: {
    async fetchOrderItems() {
      try {
        const { data } = await supabase
          .from('OrderItems')
          .select('*')
          .eq('order_id', this.order.order_id);

        this.orderItems = data;
      } catch (error) {
        console.error(error);
      }
    },
    async cancelOrder() {
      try {
        await supabase
          .from('OrderItems')
          .delete()
          .eq('order_id', this.order.order_id);

        await supabase
          .from('Orders')
          .delete()
          .eq('order_id', this.order.order_id);

      
        this.orderCancelled = true;
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    this.fetchOrderItems();
  }
};
</script>