import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '@/features/tasks/api'
import type { User, LoginPayload, SignupPayload } from '@/types'

export const useAuthStore = defineStore('auth', () => {

  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  async function login(payload: LoginPayload) {
    isLoading.value = true
    error.value = null
    try {
      const response = await api.post('/auth/login', payload)
      token.value = response.data.accessToken
      localStorage.setItem('token', response.data.accessToken)
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Login failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function signup(payload: SignupPayload) {
    isLoading.value = true
    error.value = null
    try {
      const response = await api.post('/auth/register', payload)
      token.value = response.data.accessToken
      localStorage.setItem('token', response.data.accessToken)
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Signup failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function fetchMe() {
    if (!token.value) return
    isLoading.value = true
    try {
      const response = await api.get('/auth/me')
      user.value = response.data
    } catch {
      logout()
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
  }

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    login,
    signup,
    fetchMe,
    logout
  }
})