<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useDebounce } from '@vueuse/core'
import { useTodosStore } from '@/stores/todos'
import TodoList from '@/features/tasks/TodoList.vue'
import TodoForm from '@/features/tasks/TodoForm.vue'
import TodoFilters from '@/features/tasks/TodoFilters.vue'
import Pagination from '@/components/Pagination.vue'
import type { Todo } from '@/types'

const todosStore = useTodosStore()

const open = ref(false)
const editingTodo = ref<Todo | null>(null)
const page = ref(1)
const search = ref('')
const status = ref<FilterStatus>('all')

const debouncedSearch = useDebounce(search, 400)

onMounted(async () => {
  await todosStore.fetchTodos()
})

const filteredTodos = computed(() => {
  return todosStore.todos.filter((todo: Todo) => {
    const matchesSearch = todo.name.toLowerCase().includes(debouncedSearch.value.toLowerCase())
    const matchesStatus =
      status.value === 'all'
        ? true
        : status.value === 'completed'
          ? todo.completed
          : !todo.completed
    return matchesSearch && matchesStatus
  })
})

const hasNextPage = computed(() => todosStore.todos.length === 10)

const paginatedTodos = computed(() => {
  const start = (page.value - 1) * 10
  return filteredTodos.value.slice(start, start + 10)
})

function openCreateModal() {
  editingTodo.value = null
  open.value = true
}

function handleEdit(todo: Todo) {
  editingTodo.value = todo
  open.value = true
}

async function handleDelete(id: string) {
  await todosStore.removeTodo(id)
}

async function handleToggle(todo: Todo) {
  await todosStore.toggleTodo(todo)({
    id: todo.id,
    payload: {
      ...todo,
      completed: !todo.completed,
    },
  })
}

async function handleSubmit(values: { name: string; description?: string }) {
  const payload = {
    name: values.name,
    description: values.description,
    status: 'TODO' as const,
  }

  if (editingTodo.value) {
    await todosStore.editTodo({ id: editingTodo.value.id, payload })
  } else {
    await todosStore.addTodo(payload)
  }

  open.value = false
}

watch([debouncedSearch, status], () => {
  page.value = 1
})
</script>

<template>
  <section class="p-4">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
      <h2 class="text-2xl font-semibold">Todos</h2>
      <button
        class="h-9 px-4 bg-indigo-600 text-white rounded-md text-sm cursor-pointer"
        @click="openCreateModal"
      >
        Add Todo
      </button>
    </div>

    <!-- Filters -->
    <TodoFilters v-model:search="search" v-model:status="status" />

    <!-- Loading state -->
    <p v-if="todosStore.isLoading" class="text-center text-gray-500 mt-4">Loading todos...</p>

    <!-- Error state -->
    <p v-else-if="todosStore.error" class="text-center text-red-600 mt-4">
      {{ todosStore.error }}
    </p>

    <!-- Empty state -->
    <p v-else-if="paginatedTodos.length === 0" class="text-gray-500 mt-4">
      No todos match your filters.
    </p>

    <!-- Todo list -->
    <template v-else>
      <TodoList
        :todos="paginatedTodos"
        :delete-loading="todosStore.isLoading"
        @edit="handleEdit"
        @delete="handleDelete"
        @toggle="handleToggle"
      />
      <Pagination :page="page" :has-next-page="hasNextPage" @update:page="page = $event" />
    </template>

    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
        <h2 class="text-lg font-semibold mb-4">
          {{ editingTodo ? 'Edit Todo' : 'Create Todo' }}
        </h2>

        <TodoForm
          :default-values="{
            name: editingTodo?.name ?? '',
            description: editingTodo?.description ?? '',
          }"
          :is-loading="todosStore.isLoading"
          @submit="handleSubmit"
        />

        <button class="mt-3 text-sm text-gray-500 hover:underline" @click="open = false">
          Cancel
        </button>
      </div>
    </div>
  </section>
</template>
