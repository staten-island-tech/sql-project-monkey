<template>
   <Cart v-for="(monkey, index) in cartStore.cart"
   :monkey="monkey" :key="monkey.id" :index="index" :shipping="shippingTime(monkey.id)"
   />

</template>

<script setup>
import { onMounted } from 'vue'
import Cart from '../components/Cart.Vue';
import { useCartStore } from '../stores/cart.js'
const cartStore = useCartStore()

async function shippingTimes() {
  const { data } = await supabase
    .from('Shipping')
    .select('id, "Shipping Days"');

  console.log(data);
  return data;
}

async function getCartData() {
  const data = await shippingTimes();

  cartStore.cart.forEach(async (monkey) => {
    const shippingData = data.find((data) => data.id === monkey.id);
    if (shippingData) {
      const shippingTime = shippingData['Shipping Days'];
      monkey.shippingTime = shippingTime;
    }
  });
}

onMounted(() => {
  //upon the page loading, take all the products and display them
  getCartData()
})

</script>

<style lang="scss" scoped>

</style>

