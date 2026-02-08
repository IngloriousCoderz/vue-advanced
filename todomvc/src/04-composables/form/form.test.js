import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('useForm', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('starts with empty text', async () => {
    const { useForm } = await import('./form')

    const { text } = useForm()
    expect(text.value).toBe('')
  })

  it('empties the text', async () => {
    const { useForm } = await import('./form')

    const { text, empty } = useForm()
    text.value = 'Hello'

    empty()

    expect(text.value).toBe('')
  })
})
