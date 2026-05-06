<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTodosStore } from '@/stores/todos'
import TodoDetails from '@/features/tasks/TodoDetails.vue'

const route = useRoute()
const router = useRouter()
const todosStore = useTodosStore()

const id = route.params.id as string

onMounted(async () => {
  await todosStore.fetchTodo(id)
})
</script>

<template>
  <!-- Loading state -->
  <p v-if="todosStore.isLoading" class="text-center text-gray-500">
    Loading todo...
  </p>

  <!-- Error state -->
  <div v-else-if="todosStore.error || !todosStore.currentTodo" class="text-center text-red-600">
    Todo not found.
    <button
      class="ml-2 text-indigo-600"
      @click="router.back()"
    >
      Go back
    </button>
  </div>

  <section v-else class="max-w-xl mx-auto">
    <button
      class="mb-4 text-sm text-indigo-600"
      @click="router.back()"
    >
      ← Back
    </button>

    <TodoDetails :todo="todosStore.currentTodo" />
  </section>
</template>