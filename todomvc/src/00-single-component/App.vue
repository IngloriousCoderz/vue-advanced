<script>
export default {
  data() {
    return {
      // form data
      text: '',
      // list data
      tasks: [
        { id: 1, text: 'Learn Vue', completed: true },
        { id: 2, text: 'Look for a job', completed: false },
        { id: 3, text: 'Forget everything' },
      ],
      // filter data
      selectedFilter: 'All',
    }
  },

  computed: {
    // filter computed data
    activeTasks() {
      return this.tasks.filter((task) => !task.completed)
    },
    completedTasks() {
      return this.tasks.filter((task) => task.completed)
    },
    tasksLeft() {
      return this.activeTasks.length
    },
    isClearCompletedShown() {
      return this.completedTasks.length
    },
    // list computed data
    filteredTasks() {
      if (this.selectedFilter === 'Active') return this.activeTasks
      if (this.selectedFilter === 'Completed') return this.completedTasks
      return this.tasks
    },
  },

  methods: {
    // form methods
    handleChange(newText) {
      this.text = newText
    },

    handleSubmit() {
      this.add(this.text)
      this.text = ''
    },

    // list methods
    add(text) {
      const maxId = this.tasks.length ? this.tasks[this.tasks.length - 1].id : 0
      this.tasks.push({ id: maxId + 1, text })
    },

    toggle(index) {
      this.tasks[index].completed = !this.tasks[index].completed
    },

    remove(index) {
      this.tasks.splice(index, 1)
    },

    // filter methods
    setFilter(value) {
      this.selectedFilter = value
    },

    clearCompleted() {
      for (const task of this.completedTasks) {
        this.remove(this.tasks.indexOf(task))
      }
      this.selectedFilter = 'All'
    },
  },

  mounted() {
    console.log('App mounted!')
  },

  updated() {
    console.log('App updated!')
  },
}
</script>

<template>
  <h1>Matteo Antony's Todo List</h1>

  <form @submit.prevent="handleSubmit">
    <input
      type="text"
      placeholder="What next?"
      autofocus
      :value="text"
      @input="handleChange($event.target.value)"
    />
    <button :disabled="!text">Add</button>
  </form>

  <ul>
    <li v-for="(task, index) of filteredTasks" :key="task.id">
      <span :class="{ completed: task.completed }" @click="toggle(index)">{{ task.text }}</span>
      &nbsp;
      <button @click="remove(index)">x</button>
    </li>
  </ul>

  <footer>
    <span>{{ tasksLeft }} items left</span>
    <span class="filters">
      <a :class="{ selected: selectedFilter === 'All' }" @click="setFilter('All')">All</a>
      <a :class="{ selected: selectedFilter === 'Active' }" @click="setFilter('Active')">Active</a>
      <a :class="{ selected: selectedFilter === 'Completed' }" @click="setFilter('Completed')"
        >Completed</a
      >
    </span>
    <a :class="{ hidden: !isClearCompletedShown }" @click="clearCompleted">Clear completed</a>
  </footer>
</template>

<style scoped>
.completed {
  text-decoration: line-through;
  opacity: 0.5;
}

footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

a {
  padding: 0.25rem 0.5rem;
}

.filters {
  display: flex;
  gap: 1rem;
}

.selected {
  border: 1px solid red;
}

.hidden {
  visibility: hidden;
}
</style>
