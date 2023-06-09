<template>
    <div>
      <div class="card">
        <h2 class="card-name">{{ monkey.name }}</h2>
        <h3 class="card-type">{{ monkey.type }}</h3>
        <h3 class="card-shipping">Shipping: {{ getShippingTime(monkey.id) }}</h3>
      </div>
    </div>
  </template>

  <script>

  
  export default {
    name: 'Card',
    props: {
      monkey: Object
    },

methods: {
  getShippingTime(monkeyId) {
    const shippingRecord = this.shippingTimes.find(
      (shipping) => shipping.monkey_id === monkeyId
    );

    return shippingRecord ? shippingRecord.shipping_days : 'N/A';
  }}}
  </script>