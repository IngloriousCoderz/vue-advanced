<script>
export default {
  props: ['text'],
}
</script>

<template>
  <!-- WARNING: calling the event 'change' will trigger a DOM change event! -->
  <form @submit.prevent="$emit('submit')">
    <input
      type="text"
      placeholder="What next?"
      autofocus
      :value="text"
      @input="$emit('inputChange', $event.target.value)"
    />
    <button :disabled="!text">Add</button>
  </form>
</template>
