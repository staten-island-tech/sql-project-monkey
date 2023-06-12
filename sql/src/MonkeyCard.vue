<template>
  <div class="card">
    <h2 class="card-name">{{ monkey.name }}</h2>
    <img class="card-img" :src="monkey.image" :alt="monkey.name" />
    <h3 class="card-type">{{ monkey.Type }}</h3>
    <h3 class="card-gender">{{ monkey.Gender }}</h3>
    <h3 class="card-age">{{ monkey.age }}</h3>
    <h3 class="card-price">Price: ${{ monkey.Price }}</h3>
    <button class="card-add" @click="addToCart">Add to Cart</button>
  </div>
</template>

<script>
import { useCartStore } from '../stores/cart.js'
import { authStore } from '../stores/counter.js'
const cartStore = useCartStore()


export default {
  name: 'Card',
  props: {
    monkey: Object
  },
  methods: {
    addToCart() {
      if (authStore().currentUser === null) {
        router.push('login')
      } else {
        const { name, Type, ShippingTime, Price, image } = this.monkey
        let card = cartStore.cart.find((item) => item.name === name)

        if (card) {
          card.count++
          console.log(card.count)
        } else {
          cartStore.cart.push({
            name: name,
            type: Type,
            shipping: ShippingTime,
            price: Price,
            image: image,
            count: 1
          })
          console.log(cartStore.cart)
        }
      }
    }
  }
}
</script>
