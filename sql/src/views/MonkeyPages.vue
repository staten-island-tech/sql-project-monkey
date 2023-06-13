<template>
  <MonkeyCard v-for="monkey in monkeyStore.monkey" :monkey="monkey" :key="monkey.id" />
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

<style></style>
