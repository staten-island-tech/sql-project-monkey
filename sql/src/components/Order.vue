<template>
  <div class="card">
    <h2>Order ID: {{ order.order_id }}</h2>
    <p>Total Price: ${{ order.total_price }}</p>
    <p>Total Shipping: {{ order.total_shipping }} days</p>
    <div class="order-items">
      <h3>Order Items</h3>
      <ul>
        <li v-for="item in getOrderItems(order.order_id)" :key="item.order_item_id">
          {{ item.monkey_name }} - Quantity: {{ item.quantity }}
        </li>
      </ul>
    </div>
    <p v-if="orderCancelled">Order Cancelled</p>
    <button class="cancel-button" @click="cancelOrder(order.order_id)">Cancel Order</button>
  </div>
</template>

<script>
import { useOrderItemStore } from '../stores/orderItems'
import { supabase } from '../supabase';
import { useOrderStore } from '../stores/order';
const orderStore = useOrderStore()
const orderItemStore = useOrderItemStore()

export default {
  props: {
    order: Object // Specify the type of the 'order' prop as an Object
  },
  computed: {
    orderCancelled() {
      return orderItemStore.orderCancelled;
    }
  },
  methods: {
    async cancelOrder(orderId) {
      try {
        await supabase
          .from('OrderItems')
          .delete()
          .eq('order_id', orderId);

        await supabase
          .from('Orders')
          .delete()
          .eq('order_id', orderId);

        // Remove the order from the orderStore
        orderStore.removeOrder(orderId);

        // Remove the order items from the orderItemStore
        orderItemStore.removeOrderItems(orderId);
      } catch (error) {
        console.error(error);
      }
    },
    getOrderItems(orderId) {
      return orderItemStore.orderItems.filter(item => item.order_id === orderId);
    }
  }
}
</script>
