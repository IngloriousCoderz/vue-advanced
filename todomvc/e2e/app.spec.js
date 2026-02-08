import { expect,test } from '@playwright/test'

import { mockTasksApi } from './helpers/api'
import { TodoPage } from './helpers/todo'

test.describe('Todo App', () => {
  let todo = null

  test.beforeEach(async ({ page }) => {
    await mockTasksApi(page, [
      { id: '1', text: 'Learn Vue', completed: true },
      { id: '2', text: 'Look for a job', completed: false },
      { id: '3', text: 'Forget everything' },
    ])

    todo = new TodoPage(page)
    await todo.goto()
  })

  test('renders initial state', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText("Matteo Antony's Todo List")

    await expect(todo.todos).toHaveCount(3)
    await expect(todo.itemsLeft).toHaveText('2 items left')
  })

  test('add a new todo', async () => {
    await todo.addTodo('Write Playwright tests')

    await expect(todo.todos).toHaveCount(4)
    await expect(todo.todoText(3)).toHaveText('Write Playwright tests')
    await expect(todo.itemsLeft).toHaveText('3 items left')
  })

  test('add button is disabled when input is empty', async () => {
    await expect(todo.addButton).toBeDisabled()
    await todo.input.fill('Something')
    await expect(todo.addButton).toBeEnabled()
  })

  test('toggle todo completion', async () => {
    const firstTodo = todo.todoText(0)

    await expect(firstTodo).toHaveClass(/completed/)
    await firstTodo.click()

    await expect(firstTodo).not.toHaveClass(/completed/)
    await expect(todo.itemsLeft).toHaveText('3 items left')
  })

  test('remove a todo', async () => {
    await todo.removeButton(1).click()

    await expect(todo.todos).toHaveCount(2)
    await expect(todo.itemsLeft).toHaveText('1 items left')
  })

  test('filter active todos', async () => {
    await todo.filter('Active').click()

    await expect(todo.todos).toHaveCount(2)
    await expect(todo.todoText(0)).not.toHaveClass(/completed/)
  })

  test('filter completed todos', async () => {
    await todo.filter('Completed').click()

    await expect(todo.todos).toHaveCount(1)
    await expect(todo.todoText(0)).toHaveClass(/completed/)
  })

  test('clear completed todos', async () => {
    await expect(todo.clearCompleted).toBeVisible()
    await todo.clearCompleted.click()

    await expect(todo.todos).toHaveCount(2)
    await expect(todo.itemsLeft).toHaveText('2 items left')
  })

  test('clear completed resets filter to All', async () => {
    await todo.filter('Completed').click()
    await todo.clearCompleted.click()

    await expect(todo.todos).toHaveCount(2)
  })
})
