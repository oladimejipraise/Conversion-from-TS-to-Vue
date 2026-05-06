<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { useAuthStore } from '@/stores/auth';

const router = useRouter()
const auth = useAuthStore()

const schema = toTypedSchema(
  z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  })
)

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: schema
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  try {
    await auth.login(values)
    router.push('/app')
  } catch {
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
  <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">

  <!-- Header -->
  <div class="text-center space-y-2">
  <h1 class="text-2xl font-bold">Welcome Back</h1>
  <p class="text-sm text-gray-500">Sign in to manage your tasks</p>
    </div>

    <!-- Form -->
    <form @submit.prevent="onSubmit" class="space-y-4">
    <div class="space-y-2">
    <label class="text-sm font-medium text-gray-700">Email</label>
    <input
      v-model="email"
      v-bind="emailAttrs"
      type="email"
      placeholder="your@example.com"
      class="h-9 w-full rounded-md border px-3 py-1 text-sm"
    />
    <p v-if="errors.email" class="text-sm text-red-600">
    {{ errors.email }}
    </p>
    </div>

    <div class="space-y-2">
    <label class="text-sm font-medium text-gray-700">Password</label>
    <input
      v-model="password"
      v-bind="passwordAttrs"
      type="password"
      placeholder="••••••••"
      class="h-9 w-full rounded-md border px-3 py-1 text-sm"
    />
    <p v-if="errors.password" class="text-sm text-red-600">
    {{ errors.password }}
    </p>
    </div>

    <button
      type="submit"
      class="w-full h-9 bg-black text-white rounded-md text-sm disabled:opacity-50"
    >
     {{ auth.isLoading ? 'Logging In...' : 'Log In' }}
    </button>

    <p v-if="auth.error" class="text-sm text-red-600 text-center">
    {{ auth.error }}
    </p>
  </form>

  <!-- Footer -->
  <div class="text-sm text-center text-gray-600">
    Don't have an account?
    <RouterLink to="/signup" class="font-medium text-black-600 hover:underline">
      Sign up
    </RouterLink>
  </div>
</div>
</div>
</template>