import { describe, it, expect, beforeEach, vi } from 'vitest'

describe('useFilters', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('computes tasksLeft correctly', async () => {
    const { useFilters } = await import('./filters')

    const { tasksLeft } = useFilters()
    expect(tasksLeft.value).toBe(2)
  })

  it('filters active tasks', async () => {
    const { useFilters } = await import('./filters')

    const { filteredTasks, setFilter } = useFilters()
    setFilter('Active')

    expect(filteredTasks.value.every((t) => !t.completed)).toBe(true)
  })

  it('filters completed tasks', async () => {
    const { useFilters } = await import('./filters')

    const { filteredTasks, setFilter } = useFilters()
    setFilter('Completed')

    expect(filteredTasks.value.every((t) => t.completed)).toBe(true)
  })

  it('shows clear completed only when needed', async () => {
    const { useFilters } = await import('./filters')

    const { isClearCompletedShown } = useFilters()
    expect(isClearCompletedShown.value).toBe(1)
  })

  it('clears completed tasks and resets filter', async () => {
    const { useFilters } = await import('./filters')

    const { filteredTasks, clearCompleted, selectedFilter, setFilter } = useFilters()

    setFilter('Completed')
    await clearCompleted()

    expect(selectedFilter.value).toBe('All')
    expect(filteredTasks.value.every((t) => !t.completed)).toBe(true)
  })
})
