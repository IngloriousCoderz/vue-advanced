export async function mockTasksApi(page, initialTasks = []) {
  // In-memory "database"
  let tasks = JSON.parse(JSON.stringify(initialTasks))
  let maxId = tasks.length ? tasks[tasks.length - 1].id : 0

  await page.route('**/tasks**', async (route) => {
    const request = route.request()
    const method = request.method()

    // ---- GET /tasks ----
    if (method === 'GET') {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(tasks),
      })
    }

    // ---- POST /tasks ----
    if (method === 'POST') {
      const body = JSON.parse(request.postData() || '{}')

      const newTask = { id: ++maxId, ...body }
      tasks.push(newTask)

      return route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify(newTask),
      })
    }

    // ---- PUT /tasks/:id ----
    if (method === 'PUT') {
      debugger
      const id = request.url().split('/').pop()
      const body = JSON.parse(request.postData() || '{}')

      const index = tasks.findIndex((task) => task.id == id)
      const replacedTask = { ...body }
      tasks[index] = replacedTask

      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(replacedTask),
      })
    }

    // ---- PATCH /tasks/:id ----
    if (method === 'PATCH') {
      debugger
      const id = request.url().split('/').pop()
      const body = JSON.parse(request.postData() || '{}')

      const index = tasks.findIndex((task) => task.id == id)
      const updatedTask = { ...tasks[index], ...body }
      tasks[index] = updatedTask

      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(updatedTask),
      })
    }

    // ---- DELETE /tasks/:id ----
    if (method === 'DELETE') {
      const id = request.url().split('/').pop()

      const index = tasks.findIndex((task) => task.id == id)
      const removedTask = tasks[index]
      tasks.splice(index, 1)

      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(removedTask),
      })
    }

    // Fallback (should not happen)
    return route.fulfill({ status: 405 })
  })
}
