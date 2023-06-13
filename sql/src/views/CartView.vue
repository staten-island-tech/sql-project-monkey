<template>
  <Cart v-for="monkey in cartStore.cart" :monkey="monkey" :key="monkey.id" />

  <div class="cart-info">
    <p>Total price: ${{ calculateTotal() }}</p>
    <p v-show="cartStore.cart.length === 0">Your cart is empty.</p>
    <p>Shipping Time: {{ getShippingTime() }} days</p>
    <button v-show="cartStore.cart.length > 0" @click="reset">Clear Cart</button>
    <button v-show="cartStore.cart.length > 0" @click="completeOrder">Complete Purchase</button>
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
    
    const userID = await getUserId()


    const orderID = Math.random()


    const order = {
      order_id: orderID,
      user_id: userID,
      total_price: calculateTotal(),
      total_shipping: getShippingTime()
    }

    const { data} = await supabase.from('Orders').insert([order])

    for (const monkey of cartStore.cart) {

      const orderItem = {
        order_item_id: Math.random(),
        order_id: orderID,
        monkey_name: monkey.name,
        quantity: monkey.count
      }

      await supabase.from('OrderItems').insert([orderItem])
    }

    reset()
  } catch (error) {}
}

async function getUserId() {
  const user = authStore().currentUser
  return user
}



onMounted(() => {
  // upon the page loading, take all the products and display them
})

</script>

<style></style>
