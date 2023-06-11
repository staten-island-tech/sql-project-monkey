<template>
    <div>
      <div class="card">
        <h2 class="card-name">{{ monkey.name }}</h2>
        <img class="card-img" :src=" monkey.image" :alt="monkey.name" />
        <h3 class="card-type">{{ monkey.type }}</h3>
        <h3 class="card-shipping">Shipping: {{ monkey.shipping }}</h3>
        <h3 class="card-shipping">Count: {{ monkey.count }}</h3>
        <h3 class="card-shipping">Price: {{ monkey.price }}</h3>
        <div>
        <button class="btn-increment" @click="addToCart(monkey)">
          +
        </button>
        <button class="btn-decrement" @click="removeFromCart(monkey)">
          -
        </button>
      </div>
      </div>
    </div>
  </template>

  <script>
import { useCartStore } from '../stores/cart.js'
const cartStore = useCartStore()
  
  export default {
    name: 'Cart',
    props: {
      monkey: Object, 
    },

    methods: {
      removeFromCart(monkey) {
  if (monkey.count === 1) {
    cartStore.cart.splice(this.index, 1);
  } else {
    monkey.count--;
  }
},addToCart(monkey) {
  monkey.count++;
},
  },

  
  }

  </script>