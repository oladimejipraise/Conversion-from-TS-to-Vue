<script setup lang="ts"></script>

<template>
   <div class="min-h-[80vh] flex flex-col items-center justify-center text-center space-y-6">
     <h1 class="text-4xl font-bold">Welcome to the Todo App</h1>

      <p class="text-gray-600 max-w-md">
        Manage your tasks efficiently and stay organized. Create, edit, and track your todos with ease.
        </p>

        <div class="flex gap-4">
        <RouterLink
            to="/signup"
             class="px-6 py-2 bg-black text-white rounded hover:opacity-90"
        >
        Get Started
        </RouterLink>

        <RouterLink
            to="/login"
             class="px-6 py-2 border rounded hover:bg-gray-100"
        >
        Login
        </RouterLink>
        </div>
    </div>
</template>

