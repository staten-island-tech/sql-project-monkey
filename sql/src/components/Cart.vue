<template>
  <div>
    <div class="cart">
      <h2 class="cart-name">{{ monkey.name }}</h2>
      <img class="cart-img" :src="monkey.image" :alt="monkey.name" />
      <h3 class="cart-type">{{ monkey.type }}</h3>
      <h3 class="cart-shipping">Shipping: {{ monkey.shipping }} days</h3>
      <h3 class="card-count">Count: {{ monkey.count }}</h3>
      <h3 class="card-price">Price: ${{ monkey.price }}</h3>
      <div class="input">
        <button class="btn-plus" @click="addToCart(monkey)">+</button>
        <button class="btn-minus" @click="removeFromCart(monkey)">-</button>
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
    monkey: Object
  },

  methods: {
    removeFromCart(monkey) {
      if (monkey.count === 1) {
        cartStore.cart.splice(this.index, 1)
      } else {
        monkey.count--
      }
    },
    addToCart(monkey) {
      monkey.count++
    }
  }
}
</script>


<style>

.cart {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 20vh;
  width: 100%;
  margin: 1rem auto;
  align-items: center;
  background-color: var(--secondary);
  border: solid;
  border-radius: 1rem;
  border: 1px solid;
  color: var(--inv);
  box-shadow: var(--shadow) 0px 3px 8px;
}

.cart > img {
  width: 5%;
  height: 50%;
  border-radius: 1rem;
};

button{
  text-align: center;
  margin: 1rem auto;
  font-size: 2rem;
  background-color: var(--yellow);
  transition: border-color 0.25s;
  border-radius: 8px;
  border: solid;
  padding: 0.6em 1.2em;
  font-size: 2em;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  color: var(--lightbrown);
  border-color: var(--inv);
}

button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;}






</style>