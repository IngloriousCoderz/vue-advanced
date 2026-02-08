export class TodoPage {
  constructor(page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/')
  }

  // ---- form ----

  get input() {
    return this.page.getByPlaceholder('What next?')
  }

  get addButton() {
    return this.page.getByRole('button', { name: 'Add' })
  }

  async addTodo(text) {
    await this.input.fill(text)
    await this.addButton.click()
  }

  // ---- list ----

  get todos() {
    return this.page.getByRole('listitem')
  }

  todoText(index) {
    return this.todos.nth(index).locator('span')
  }

  removeButton(index) {
    return this.todos.nth(index).getByRole('button', { name: 'x' })
  }

  // ---- filters ----

  filter(name) {
    return this.page.getByText(name, { exact: true })
  }

  get clearCompleted() {
    return this.page.getByText('Clear completed', { exact: true })
  }

  // ---- footer ----

  get itemsLeft() {
    return this.page.getByText(/items left$/, { exact: false })
  }
}
