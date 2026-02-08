<script setup>
import { defineAsyncComponent } from 'vue'

// Carica il componente TodoMVC dal remote
const TodoApp = defineAsyncComponent(() => import('todomvc/todo-app'))
</script>

<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1>My Dashboard</h1>
      <nav>
        <a href="#home">Home</a>
        <a href="#todos">Todos</a>
        <a href="#analytics">Analytics</a>
      </nav>
    </header>

    <main class="dashboard-content">
      <div class="widget-grid">
        <!-- Widget 1: TodoMVC caricato dinamicamente -->
        <div class="widget">
          <h2>My Tasks</h2>
          <Suspense>
            <template #default>
              <TodoApp />
            </template>
            <template #fallback>
              <div class="loading">Loading todos...</div>
            </template>
          </Suspense>
        </div>

        <!-- Widget 2: Componente locale -->
        <div class="widget">
          <h2>Quick Stats</h2>
          <p>Placeholder per analytics</p>
        </div>

        <!-- Widget 3: Altro componente locale -->
        <div class="widget">
          <h2>Recent Activity</h2>
          <p>Placeholder per attività recenti</p>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.dashboard {
  min-height: 100vh;
  background: #f5f5f5;
}

.dashboard-header {
  background: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard-header nav a {
  margin-left: 1rem;
  text-decoration: none;
  color: #333;
}

.dashboard-content {
  padding: 2rem;
}

.widget-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.widget {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.loading {
  padding: 2rem;
  text-align: center;
  color: #666;
}
</style>
