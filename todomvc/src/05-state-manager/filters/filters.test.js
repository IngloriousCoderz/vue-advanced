import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { useFiltersStore } from './filters'

describe('Filters store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('computes tasksLeft correctly', () => {
    const filters = useFiltersStore()
    expect(filters.tasksLeft).toBe(2)
  })

  it('filters active tasks', () => {
    const filters = useFiltersStore()
    filters.setFilter('Active')

    expect(filters.filteredTasks.every((t) => !t.completed)).toBe(true)
  })

  it('filters completed tasks', () => {
    const filters = useFiltersStore()
    filters.setFilter('Completed')

    expect(filters.filteredTasks.every((t) => t.completed)).toBe(true)
  })

  it('clears completed tasks', () => {
    const filters = useFiltersStore()
    filters.setFilter('Completed')

    filters.clearCompleted()

    expect(filters.selectedFilter).toBe('All')
    expect(filters.filteredTasks.every((t) => !t.completed)).toBe(true)
  })
})
