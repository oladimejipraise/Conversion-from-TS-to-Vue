<script setup lang="ts">
const props = defineProps<{
  page: number
  hasNextPage: boolean
}>()

const emit = defineEmits<{
  (e: 'update:page', value: number): void
}>()
</script>

<template>
  <div class="flex justify-center gap-2 mt-4">
    <button
      class="h-8 rounded-md px-3 border bg-white text-sm disabled:opacity-50"
      :disabled="props.page === 1"
      @click="emit('update:page', props.page - 1)"
    >
      Previous
    </button>

    <span class="px-3 py-1 font-medium">{{ props.page }}</span>

    <button
      class="h-8 rounded-md px-3 border bg-white text-sm disabled:opacity-50"
      :disabled="!props.hasNextPage"
      @click="emit('update:page', props.page + 1)"
    >
      Next
    </button>
  </div>
</template>