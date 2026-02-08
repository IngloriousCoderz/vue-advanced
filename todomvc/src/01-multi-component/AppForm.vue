<script>
export default {
  props: ['text'],
}
</script>

<template>
  <!-- WARNING: 'change' and 'submit' events will trigger real DOM events! -->
  <form @submit.prevent="$emit('formSubmit')">
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
