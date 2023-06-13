<template>
 <div class="card-container"> <MonkeyCard v-for="monkey in monkeyStore.monkey" :monkey="monkey" :key="monkey.id" />
 </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { supabase } from '../supabase'

import { useMonkeyStore } from '../stores/monkey.js'
import MonkeyCard from '../components/MonkeyCard.vue'
const monkeyStore = useMonkeyStore()

async function getMonkeys() {
  try {
    const { data } = await supabase.from('Monkeys').select('*')

    monkeyStore.monkey = data
  } catch (error) {}
}

onMounted(() => {
  getMonkeys()
})
</script>

<style>

.card-container {

display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: space-around;
width: 90vw;
margin: 2rem auto;}


</style>
