<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { PencilIcon, Trash2Icon } from 'lucide-vue-next'
import type { Todo } from '@/types'

const props = defineProps<{
  todos: Todo[]
  deleteLoading?: boolean
}>()

const emit = defineEmits<{
  (e: 'edit', todo: Todo): void
  (e: 'delete', id: string): void
  (e: 'toggle', todo: Todo): void
}>()

const router = useRouter()

const deleteTodoId = ref<string | null>(null)

function openDeleteModal(id: string) {
  deleteTodoId.value = id
}

function closeDeleteModal() {
  deleteTodoId.value = null
}

function confirmDelete(id: string) {
  emit('delete', id)
  closeDeleteModal()
}
</script>

<template>
  <ul class="space-y-4">
    <li
      v-for="todo in props.todos"
      :key="todo.id"
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-md shadow-sm bg-white"
    >

      <div class="flex flex-col sm:flex-rowitems-center gap-2">
        <input
          type="checkbox"
          :checked="todo.completed"
          class="w-4 h-4 cursor-pointer accent-indigo-600"
          @change="$emit('toggle', todo)"
        />  

        <p
          :class="[
            'font-medium text-gray-800',
            todo.completed ? 'line-through text-gray-400' : ''
          ]"
        >
          {{ todo.name }}
        </p>

        <p v-if="todo.description" class="text-gray-500 text-sm">
          {{ todo.description }}
        </p>
      </div>

      <div class="flex flex-col sm:flex-row sm:items-center gap-2">
        <p
          :class="[
            'font-medium text-gray-800',
            todo.completed ? 'line-through text-gray-400' : ''
          ]"
        >
          {{ todo.name }}
        </p>
        <p v-if="todo.description" class="text-gray-500 text-sm">
          {{ todo.description }}
        </p>
      </div>

      <!-- Action buttons -->
      <div class="flex gap-2 mt-2 sm:mt-0">
        <!-- View button -->
        <button
          class="h-8 px-3 rounded-md text-sm border"
          @click="router.push(`/app/todos/${todo.id}`)"
        >
          View
        </button>

        <!-- Edit button -->
        <button
          class="h-8 px-3 rounded-md text-sm border"
          :aria-label="`Edit ${todo.name}`"
          @click="emit('edit', todo)"
        >
          <PencilIcon class="w-4 h-4" />
        </button>

        <!-- Delete button -->
        <button
          class="h-8 px-3 rounded-md text-sm border"
          :aria-label="`Delete ${todo.name}`"
          @click="openDeleteModal(todo.id)"
   >
          <Trash2Icon :size="16" :stroke-width="2" color="red" />
        </button>
      </div>

      <!-- Delete confirmation modal -->
      <div
        v-if="deleteTodoId === todo.id"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      >
        <div class="bg-white rounded-lg p-6 shadow-lg w-full max-w-sm">
          <h2 class="text-lg font-semibold mb-4">Delete Todo</h2>
          <p class="mb-4">Are you sure you want to delete "{{ todo.name }}"?</p>

          <div class="flex justify-end gap-2">
            <button
              class="h-9 px-4 rounded-md border text-sm"
              @click="closeDeleteModal"
            >
              Cancel
            </button>
            <button
              class="h-9 px-4 rounded-md text-sm bg-destructive text-white disabled:opacity-50"
              :disabled="props.deleteLoading"
              @click="confirmDelete(todo.id)"
            >
              {{ props.deleteLoading ? 'Deleting...' : 'Delete' }}
            </button>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>