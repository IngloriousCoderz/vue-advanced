import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('useList', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('starts with default tasks', async () => {
    const { useList } = await import('./list')
    const { tasks } = useList()

    expect(tasks.value).toHaveLength(3)
  })

  it('adds a task', async () => {
    const { useList } = await import('./list')
    const { tasks, add } = useList()

    await add('New task')

    expect(tasks.value).toHaveLength(4)
    expect(tasks.value.at(-1).text).toBe('New task')
  })

  it('toggles completion', async () => {
    const { useList } = await import('./list')
    const { tasks, toggle } = useList()
    const initial = tasks.value[1].completed

    await toggle(1)

    expect(tasks.value[1].completed).toBe(!initial)
  })

  it('removes a task', async () => {
    const { useList } = await import('./list')
    const { tasks, remove } = useList()

    await remove(0)

    expect(tasks.value).toHaveLength(2)
  })
})
