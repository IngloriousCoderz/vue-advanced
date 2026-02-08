import axios from 'axios'

import { auth } from './interceptors/auth'
import { errors } from './interceptors/errors'

const http = axios.create({ baseURL: import.meta.env.VITE_BASE_URL })

auth(http)
errors(http)

export async function fetchTasks() {
  const { data } = await http.get('')
  return data
}

export async function addTask(text) {
  const { data } = await http.post('', { text })
  return data
}

export async function replaceTask(id, body) {
  const { data } = await http.put(`/${id}`, body)
  return data
}

export async function updateTask(id, body) {
  const { data } = await http.patch(`/${id}`, body)
  return data
}

export async function removeTask(id) {
  const { data } = await http.delete(`/${id}`)
  return data
}
