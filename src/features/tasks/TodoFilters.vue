<script setup lang="ts">
import type { FilterStatus } from '@/types'

const props = defineProps<{
  search: string
  status: FilterStatus
}>()

const emit = defineEmits<{
  (e: 'update:search', value: string): void
  (e: 'update:status', value: FilterStatus): void
}>()

const statuses: FilterStatus[] = ['all', 'completed', 'pending']
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-3 mb-5">
    <input
      type="text"
      :value="props.search"
      placeholder="Search todos..."
      class="w-full sm:w-1/2 border rounded-md px-3 py-2 text-sm"
      aria-label="Search todos"
      @input="emit('update:search', ($event.target as HTMLInputElement).value)"
    />

    <div class="flex gap-2">
      <button
        v-for="value in statuses"
        :key="value"
        :aria-pressed="props.status === value"
        :class="[
          'px-3 py-1 rounded-md text-sm border',
          props.status === value
            ? 'bg-indigo-600 text-white border-indigo-600'
            : 'bg-white'
        ]"
        @click="emit('update:status', value)"
      >
        {{ value.charAt(0).toUpperCase() + value.slice(1) }}
      </button>
    </div>
  </div>
</template>