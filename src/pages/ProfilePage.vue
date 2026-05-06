<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

function handleLogout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 sm:p-8">

      <!-- Avatar -->
      <div class="flex flex-col items-center">
        <div
          class="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-semibold text-indigo-600">
          {{ auth.user?.name?.charAt(0).toUpperCase() ?? 'U' }}
        </div>

        <h2 class="mt-4 text-xl font-semibold text-gray-800">
          {{ auth.user?.name ?? 'User Name' }}
        </h2>

        <p class="text-sm text-gray-500">
          {{ auth.user?.email ?? 'user@email.com' }}
        </p>
      </div>

      <!-- Divider -->
      <div class="my-6 border-t" />

      <!-- Info section -->
      <div class="space-y-4 text-sm text-gray-700">
        <div class="flex justify-between">
          <span class="font-medium">Member Since</span>
          <span>Jan 2026</span>
        </div>

        <div class="flex justify-between">
          <span class="font-medium">Todos Created</span>
          <span>12</span>
        </div>
      </div>

      <!-- Buttons -->
      <div class="mt-6 flex flex-col gap-3">
        <button class="w-full h-9 bg-primary text-primary-foreground rounded-md text-sm">
          Edit Profile
        </button>

        <button class="w-full h-9 bg-destructive text-white rounded-md text-sm" @click="handleLogout">
          Logout
        </button>
      </div>
    </div>
  </div>
</template>