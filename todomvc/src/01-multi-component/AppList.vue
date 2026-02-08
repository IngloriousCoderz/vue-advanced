<script setup>
defineProps(['tasks'])
const emit = defineEmits(['spanClick', 'buttonClick'])
</script>

<template>
  <ul>
    <li v-for="(task, index) of tasks" :key="task.id">
      <span :class="{ completed: task.completed }" @click="emit('spanClick', index)">{{
        task.text
      }}</span>
      &nbsp;
      <button @click="emit('buttonClick', index)">x</button>
    </li>
  </ul>
</template>

<style scoped>
.completed {
  text-decoration: line-through;
  opacity: 0.5;
}
</style>
