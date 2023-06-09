<template>
  <div class="card">
    <h2 class="card-name">{{ monkey.name }}</h2>
    <!-- <img class="card-img" :src=" monkey.img" :alt="monkey.name" /> -->
    <h3 class="card-type">{{ monkey.Type }}</h3>
    <h3 class="card-gender">{{ monkey.Gender }}</h3>
    <!-- <h3 class="card-age">{{ monkey.age }}</h3> -->
    <h3 class="card-price">Price: ${{ monkey.Price }}</h3>
    <button class="card-add" @click="addToCart">Add to Cart</button>
  </div>
</template>

<script>
import { useCartStore } from '../stores/cart.js'
const cartStore = useCartStore()

export default {
  
  name: 'Card',
  props: {
    monkey: Object
  },
  methods: {
    
    addToCart() {
      cartStore.cart.push({ monkey: this.monkey })
    }
  }
}
</script>
