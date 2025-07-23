import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface User {
  id: string
  username: string
  email?: string
  avatar?: string
  createdAt: number
  lastLoginAt: number
}

export interface LoginCredentials {
  username: string
  password: string
  rememberMe?: boolean
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const isLoggedIn = ref(false)

  /**
   * 用户登录
   */
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    // 模拟登录验证（实际项目中应该调用API）
    if (credentials.username && credentials.username.length > 0) {
      user.value = {
        id: Date.now().toString(),
        username: credentials.username,
        email: `${credentials.username}@example.com`,
        createdAt: Date.now(),
        lastLoginAt: Date.now()
      }
      
      isLoggedIn.value = true
      // 保存到本地存储
      localStorage.setItem('user', JSON.stringify(user.value))
      
      return true
    }
    return false
  }

  const logout = () => {
    user.value = null
    isLoggedIn.value = false
    localStorage.removeItem('user')
  }

  const initUser = () => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        user.value = userData
        isLoggedIn.value = true
      } catch (error) {
        console.error('Failed to parse saved user data:', error)
        localStorage.removeItem('user')
      }
    }
  }

  return {
    user,
    isLoggedIn,
    login,
    logout,
    initUser
  }
})