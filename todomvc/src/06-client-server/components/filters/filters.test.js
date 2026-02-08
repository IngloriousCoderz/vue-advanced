import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import * as api from '../../services/api'
import { useListStore } from '../list/list'
import { useFiltersStore } from './filters'

vi.mock('../../services/api', () => ({
  fetchTasks: vi.fn(),
  addTask: vi.fn(),
  replaceTask: vi.fn(),
  updateTask: vi.fn(),
  removeTask: vi.fn(),
}))

describe('Filters store', () => {
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
    const list = useListStore()
    await list.fetch()
    store = useFiltersStore()
  })

  it('computes tasksLeft correctly', () => {
    expect(store.tasksLeft).toBe(2)
  })

  it('filters active tasks', () => {
    store.setFilter('Active')

    expect(store.filteredTasks.every((t) => !t.completed)).toBe(true)
  })

  it('filters completed tasks', () => {
    store.setFilter('Completed')

    expect(store.filteredTasks.every((t) => t.completed)).toBe(true)
  })

  it('clears completed tasks', async () => {
    store.setFilter('Completed')

    await store.clearCompleted()

    expect(store.selectedFilter).toBe('All')
    expect(store.filteredTasks.every((t) => !t.completed)).toBe(true)
  })
})
