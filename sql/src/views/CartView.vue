<template>
  <Cart v-for="monkey in cartStore.cart" :monkey="monkey" :key="monkey.id" />

  <div class="cart-info">
    <p >Total price: ${{ calculateTotal() }}</p>
    <p v-show="cartStore.cart.length === 0">Your cart is empty.</p>
    <p> Shipping Time: {{ getShippingTime() }} days </p>
    <button v-show="cartStore.cart.length > 0" @click="reset">Clear Cart</button>
    <button v-show="cartStore.cart.length > 0" @click="completeOrder"> Complete Purchase </button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Cart from '../components/Cart.vue'
import { useCartStore } from '../stores/cart.js'
import { supabase } from '../supabase'
import { authStore } from '../stores/counter.js'
const cartStore = useCartStore()


function calculateTotal() {
  let total = 0
  for (let i = 0; i < cartStore.cart.length; i++) {
    total += cartStore.cart[i].price * cartStore.cart[i].count
  }
  return total
}

function getShippingTime() {
  let shippingTime = 0

  cartStore.cart.forEach((monkey) => {
    if (monkey.shipping > shippingTime) {
      shippingTime = monkey.shipping
    }
  })

  return shippingTime
}

function reset() {
  cartStore.cart.splice(0)
}


async function completeOrder() {
  try {
    // Get the user ID from the auth store
    const userID = await getUserId();

    // Generate a single order ID for the entire order
    const orderID = Math.random();

    // Create an object representing the order
    const order = {
      order_id: orderID,
      user_id: userID,
      total_price: calculateTotal(),
      total_shipping: getShippingTime()
    };

    // Insert the order into the Orders table
    const { insertedOrderData } = await supabase.from('Orders').insert([order]);

    // Iterate over each item in the cart
    for (const monkey of cartStore.cart) {
      // Create an object representing the order item
      const orderItem = {
        order_item_id: Math.random(),
        order_id: orderID,
        monkey_name: monkey.name,
        quantity: monkey.count
      };

      // Insert the order item into the OrderItems table
      await supabase.from('OrderItems').insert([orderItem]);
    }

    // Clear the cart after completing the order
    reset();
  } catch (error) {
    console.error(error);
  }
}


async function getUserId() {
  const user = authStore().currentUser;
  return user;
}

async function x() {
  const userId = await getUserId();
console.log(userId) 
return userId}



onMounted(() => {
  // upon the page loading, take all the products and display them
  console.log(x())
})
</script>

<style></style>