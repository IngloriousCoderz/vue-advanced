import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import * as api from '../../services/api'
import { useListStore } from './list'

vi.mock('../../services/api', () => ({
  fetchTasks: vi.fn(),
  addTask: vi.fn(),
  replaceTask: vi.fn(),
  updateTask: vi.fn(),
  removeTask: vi.fn(),
}))

describe('List store', () => {
  const mockTasks = [
    { id: 1, text: 'Learn Vue', completed: true },
    { id: 2, text: 'Look for a job', completed: false },
    { id: 3, text: 'Forget everything' },
  ]
  let store = null

  beforeEach(async () => {
    setActivePinia(createPinia())
    vi.clearAllMocks()

    api.fetchTasks.mockResolvedValue(JSON.parse(JSON.stringify(mockTasks)))
    store = useListStore()
    await store.fetch()
  })

  it('fetches tasks on initialization', async () => {
    expect(store.tasks).toHaveLength(3)
    expect(api.fetchTasks).toHaveBeenCalledTimes(1)
  })

  it('adds a task', async () => {
    const newTask = { id: 4, text: 'New Task', completed: false }
    api.addTask.mockResolvedValue(newTask)

    await store.add('New Task')

    expect(store.tasks.at(-1)).toEqual(newTask)
    expect(api.addTask).toHaveBeenCalledWith('New Task')
  })

  it('toggles task completion', async () => {
    const updatedTask = { ...mockTasks[1], completed: true }
    api.updateTask.mockResolvedValue(updatedTask)

    await store.toggle(1)

    expect(store.tasks[1].completed).toBe(true)
    expect(api.updateTask).toHaveBeenCalledWith(2, { completed: true })
  })

  it('removes a task', async () => {
    api.removeTask.mockResolvedValue({})

    await store.remove(0)

    expect(store.tasks).toHaveLength(2)
    expect(api.removeTask).toHaveBeenCalledWith(1)
  })
})
