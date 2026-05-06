<script setup lang="ts">
import type { Todo } from '@/types'

const props = defineProps<{
  todo: Todo
}>()
</script>

<template>
  <div class="space-y-4">
    <h2 class="text-2xl font-semibold">{{ props.todo.name }}</h2>

    <p v-if="props.todo.description" class="text-gray-700">
      {{ props.todo.description }}
    </p>

    <span
      v-if="props.todo.status"
      :class="[
        'inline-block px-2 py-1 text-xs rounded',
        props.todo.completed
          ? 'bg-green-100 text-green-700'
          : 'bg-yellow-100 text-yellow-700'
      ]"
    >
      {{ props.todo.status }}
    </span>

    <p class="text-gray-500 text-sm">
      Created at: {{ new Date(props.todo.createdAt).toLocaleString() }}
    </p>

    <p v-if="props.todo.updatedAt" class="text-gray-500 text-sm">
      Last updated: {{ new Date(props.todo.updatedAt).toLocaleString() }}
    </p>
  </div>
</template>