<script setup>
import { storeToRefs } from 'pinia'

import { useListStore } from '../list/list'
import { useFormStore } from './form'

const form = useFormStore()
const { text } = storeToRefs(form)
const { empty } = form

const { add } = useListStore()

function handleSubmit() {
  add(text.value)
  empty()
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="What next?" autofocus v-model="text" />
    <button :disabled="!text">Add</button>
  </form>
</template>
