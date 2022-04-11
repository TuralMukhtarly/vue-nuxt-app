export const state = () => ({
  tasks:
    JSON.parse(localStorage.getItem('todos')) !== null
      ? JSON.parse(localStorage.getItem('todos'))
      : [],
  content: '',
})

export const mutations = {
  ADD_TASK(state, task) {
    state.tasks = [
      { content: task, completed: false, editing: false },
      ...state.tasks,
    ]
    localStorage.setItem('todos', JSON.stringify(state.tasks))
  },
  REMOVE_TASK(state, task) {
    state.tasks.splice(state.tasks.indexOf(task), 1)
    localStorage.setItem('todos', JSON.stringify(state.tasks))
  },
  CLEAR_COMPLITED(state) {
    state.tasks.forEach((t) => {
      t.completed = false
    })
    localStorage.setItem('todos', JSON.stringify(state.tasks))
  },
  GET_ALL(state) {
    state.tasks = JSON.parse(localStorage.getItem('todos'))
  },
  CHECK_ALL(state) {
    state.tasks.forEach((t) => {
      t.completed = true
    })
    localStorage.setItem('todos', JSON.stringify(state.tasks))
  },
  ACTIVE(state) {
    state.tasks = JSON.parse(localStorage.getItem('todos')).filter(
      (t) => !t.completed
    )
  },
  COMPLITED(state) {
    state.tasks = JSON.parse(localStorage.getItem('todos')).filter(
      (t) => t.completed
    )
  },
  DO_CHECK(state, index) {
    state.tasks.forEach((t, i) => {
      if (index === i) t.completed = !t.completed
    })
    localStorage.setItem('todos', JSON.stringify(state.tasks))
  },
  EDIT_TASK(state, task) {
    state.tasks.forEach((t) => {
      if (t === task) {
        t.editing = !t.editing
        t.content = this.content
      }
    })
  },
  EDIT_CONTENT(state, content) {
    this.content = content
  },
}

export const getters = {
  allTasks(state) {
    return state.tasks
  },
  completedTasks(state) {
    return state.tasks.filter((t) => !t.completed)
  },
  finishedTasks(state) {
    return state.tasks.filter((t) => t.completed)
  },
}
