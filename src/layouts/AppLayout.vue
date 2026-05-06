<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'

const router = useRouter()
const auth = useAuthStore()

onMounted(async () => {
await auth.fetchMe()
})

function handleLogout() {
auth.logout()
router.push('/login')
}
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <header class="border-b bg-white">
            <div class="container mx-auto px-4 py-3 flex items-center justify-between">
                <h1 class="text-lg font-semibold">Todo App</h1>

                <nav class="flex items-center gap-6 text-sm">
                <template v-if="auth.isAuthenticated">
                    <RouterLink to="/app" class="text-gray-600 hover:text-gray-900">
                    Todos
                    </RouterLink>

                    <RouterLink to="/profile" class="max-w-[160px] truncate hover:text-gray-900">
                    {{ auth.isLoading ? 'Loading...' : auth.user?.email ?? 'Profile' }}
                    </RouterLink>

                    <button
                      @click="handleLogout"
                      class="text-red-500 hover:text-red-600"
                    >
                      Logout
                    </button>
                </template>

                <template v-else>
                    <RouterLink to="/login" class="text-gray-600 hover:text-gray-900">
                    Login
                    </RouterLink>

                    <RouterLink to="/signup" class="px-4 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                    Sign Up
                    </RouterLink>
                    </template>
                </nav>
            </div>
        </header>

        <main class="flex-1 container mx-auto p-4">
            <RouterView />
        </main>
    </div>
</template>