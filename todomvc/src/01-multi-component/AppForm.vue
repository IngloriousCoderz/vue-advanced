<script setup>
defineProps(['text'])
const emit = defineEmits(['change', 'submit'])
</script>

<template>
  <form @submit.prevent="emit('submit')">
    <input
      type="text"
      placeholder="What next?"
      autofocus
      :value="text"
      @input="emit('change', $event.target.value)"
    />
    <button :disabled="!text">Add</button>
  </form>
</template>
