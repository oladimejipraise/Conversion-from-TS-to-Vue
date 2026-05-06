import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getTodos, getTodo, createTodo, updateTodo, deleteTodo } from '@/features/tasks/api'
import type { Todo, CreateTodoPayload, UpdateTodoPayload } from '@/types'

export const useTodosStore = defineStore('todos', () => {
  // STATE
  const todos = ref<Todo[]>([])
  const currentTodo = ref<Todo | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // ACTIONS

  async function fetchTodos() {
    isLoading.value = true
    error.value = null
    try {
      const data = await getTodos()
      todos.value = data.data ?? []
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to load todos'
    } finally {
      isLoading.value = false
    }
  }

  async function fetchTodo(id: string) {
    isLoading.value = true
    error.value = null
    try {
      currentTodo.value = await getTodo(id)
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to load todo'
    } finally {
      isLoading.value = false
    }
  }

  async function addTodo(payload: CreateTodoPayload) {
    isLoading.value = true
    error.value = null
    try {
      await createTodo(payload)
      await fetchTodos()
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to create todo'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function editTodo(payload: UpdateTodoPayload) {
    isLoading.value = true
    error.value = null
    try {
      await updateTodo(payload)
      await fetchTodos()
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to update todo'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function removeTodo(id: string) {
    isLoading.value = true
    error.value = null
    try {
      await deleteTodo(id)
      await fetchTodos()
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to delete todo'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function toggleTodo(todo: Todo) {
    isLoading.value = true
    error.value = null
    try {
      await updateTodo({
        id: todo.id,
        payload: { completed: !todo.completed },
      })
      await fetchTodos()
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to update todo'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    todos,
    currentTodo,
    isLoading,
    error,
    fetchTodos,
    fetchTodo,
    addTodo,
    editTodo,
    removeTodo,
    toggleTodo,
  }
})
