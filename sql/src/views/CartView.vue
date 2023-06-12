<template>
   <Cart v-for="monkey in cartStore.cart"
   :monkey="monkey" :key="monkey.id" />

   <div class="cart-info">
      Total price: ${{ calculateTotal() }}
        <p v-show="cartStore.cart.length === 0">Your cart is empty.</p>
      Shipping Time: {{ getShippingTime() }} days
      <button v-show="cartStore.cart.length > 0" @click="reset"> Clear Cart</button>
<button></button>
      </div>

</template>

<script setup>
import { onMounted } from 'vue'
import Cart from '../components/Cart.vue';
import { useCartStore } from '../stores/cart.js'
import { supabase } from '../supabase';
const cartStore = useCartStore()

function calculateTotal() {
        let total = 0;
      for (let i = 0; i < cartStore.cart.length; i++) {
        total += cartStore.cart[i].price * cartStore.cart[i].count;
      }
      return total;
    };
  
function getShippingTime() {
  let shippingTime = 0;

  cartStore.cart.forEach((monkey) => {
    if (monkey.shipping > shippingTime) {
      shippingTime = monkey.shipping;
    }
  });

  return shippingTime;
}

function reset() {
  cartStore.cart.splice(0);
    }

onMounted(() => {
  //upon the page loading, take all the products and display them

})

</script>

<style lang="scss" scoped>

</style>

