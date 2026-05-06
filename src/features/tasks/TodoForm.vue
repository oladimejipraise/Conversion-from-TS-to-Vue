<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const props = defineProps<{
  defaultValues?: { name?: string; description?: string }
  isLoading: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', values: { name: string; description?: string }): void
}>()

const schema = toTypedSchema(
  z.object({
    name: z.string().min(1, 'Title is required'),
    description: z.string().optional()
  })
)

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: schema,
  initialValues: {
    name: props.defaultValues?.name ?? '',
    description: props.defaultValues?.description ?? ''
  }
})

const [name, nameAttrs] = defineField('name')
const [description, descAttrs] = defineField('description')

const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <div>
      <input
        v-model="name"
        v-bind="nameAttrs"
        placeholder="Enter todo title"
        class="h-9 w-full rounded-md border px-3 py-1 text-sm"
      />
      <p v-if="errors.name" class="text-sm text-red-600 mt-1">
        {{ errors.name }}
      </p>
    </div>

    <div>
      <input
        v-model="description"
        v-bind="descAttrs"
        placeholder="Description"
        class="h-9 w-full rounded-md border px-3 py-1 text-sm"
      />
    </div>

    <button
      type="submit"
      :disabled="isLoading"
      class="h-9 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm disabled:opacity-50"
    >
      {{ isLoading ? 'Saving...' : 'Save' }}
    </button>
  </form>
</template>