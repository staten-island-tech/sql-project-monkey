<template>
  <MonkeyCard v-for="monkey in monkeyStore.filtered" :monkey="monkey" :key="monkey.id" />
</template>

<script setup>
import { onMounted } from 'vue'
import { supabase } from '../supabase'

//import stores
import { useMonkeyStore } from '../stores/monkey.js'
import MonkeyCard from '../components/MonkeyCard.Vue'
const monkeyStore = useMonkeyStore()

async function getMonkeys() {
  const { data } = await supabase.from('Monkeys').select('*')

  monkeyStore.monkey = data

  monkeyStore.filtered = monkeyStore.monkey //the filtered products are simply all the data/products, since no sorting or filtering is required upon loading
  console.log(data)
}

onMounted(() => {
  //upon the page loading, take all the products and display them
  getMonkeys()
})
</script>
