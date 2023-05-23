<template>
    <div>

    </div>
</template>

<script>
import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://ctlzmvtybiilsnqpktpq.supabase.co/', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0bHptdnR5YmlpbHNucXBrdHBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM2ODg4OTIsImV4cCI6MTk5OTI2NDg5Mn0.Vrluan5meDqRU07ZzsOYd_Hwe54PR6FwlvUNYJhUtTM')
const { data, error } = await supabase
  .from('Details')
  .select('*')

  console.log(data)
</script>

<style lang="scss" scoped>

</style>