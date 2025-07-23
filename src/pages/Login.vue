<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
    <div class="max-w-md w-full mx-4">
      <!-- 登录卡片 -->
      <div class="bg-white rounded-xl shadow-lg p-8">
        <!-- 头部 -->
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <BookOpen class="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">欢迎回来</h2>
          <p class="text-gray-600">登录您的学习账户</p>
        </div>

        <!-- 登录表单 -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 mb-2">
              用户名
            </label>
            <div class="relative">
              <User class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="username"
                v-model="form.username"
                type="text"
                required
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="请输入用户名"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              密码
            </label>
            <div class="relative">
              <Lock class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="请输入密码"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Eye v-if="!showPassword" class="h-5 w-5" />
                <EyeOff v-else class="h-5 w-5" />
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input
                v-model="form.rememberMe"
                type="checkbox"
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span class="ml-2 text-sm text-gray-600">记住我</span>
            </label>
            <a href="#" class="text-sm text-blue-600 hover:text-blue-500">
              忘记密码？
            </a>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            <span v-if="!isLoading">登录</span>
            <span v-else class="flex items-center justify-center">
              <Loader2 class="animate-spin h-5 w-5 mr-2" />
              登录中...
            </span>
          </button>
        </form>

        <!-- 分隔线 -->
        <div class="mt-8 mb-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">或者</span>
            </div>
          </div>
        </div>

        <!-- 快速登录选项 -->
        <div class="space-y-3">
          <button
            @click="quickLogin('guest')"
            class="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <UserCheck class="h-5 w-5 text-gray-500 mr-2" />
            <span class="text-gray-700">游客登录</span>
          </button>
          <button
            @click="quickLogin('demo')"
            class="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Zap class="h-5 w-5 text-gray-500 mr-2" />
            <span class="text-gray-700">演示账户</span>
          </button>
        </div>

        <!-- 注册链接 -->
        <div class="mt-8 text-center">
          <p class="text-sm text-gray-600">
            还没有账户？
            <a href="#" class="text-blue-600 hover:text-blue-500 font-medium">
              立即注册
            </a>
          </p>
        </div>
      </div>

      <!-- 返回首页 -->
      <div class="text-center mt-6">
        <router-link
          to="/"
          class="text-blue-600 hover:text-blue-500 text-sm font-medium"
        >
          ← 返回首页
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  BookOpen, User, Lock, Eye, EyeOff, Loader2,
  UserCheck, Zap
} from 'lucide-vue-next'
import { useUserStore } from '../stores/user'
import { toast } from 'vue-sonner'

const router = useRouter()
const userStore = useUserStore()

// 表单数据
const form = ref({
  username: '',
  password: '',
  rememberMe: false
})

// 状态
const showPassword = ref(false)
const isLoading = ref(false)

// 处理登录
const handleLogin = async () => {
  if (!form.value.username.trim() || !form.value.password.trim()) {
    toast.error('请填写完整的登录信息')
    return
  }

  isLoading.value = true

  try {
    // 模拟登录延迟
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 模拟登录验证（实际项目中应该调用API）
    const success = await userStore.login({
      username: form.value.username,
      password: form.value.password,
      rememberMe: form.value.rememberMe
    })

    if (success) {
      toast.success('登录成功！')
      router.push('/learning-center')
    } else {
      toast.error('用户名或密码错误')
    }
  } catch (error) {
    toast.error('登录失败，请稍后重试')
  } finally {
    isLoading.value = false
  }
}

// 快速登录
const quickLogin = async (type: 'guest' | 'demo') => {
  isLoading.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 500))

    const credentials = {
      guest: { username: 'guest', password: 'guest123' },
      demo: { username: 'demo', password: 'demo123' }
    }

    const success = await userStore.login({
      ...credentials[type],
      rememberMe: false
    })

    if (success) {
      toast.success(`${type === 'guest' ? '游客' : '演示'}登录成功！`)
      router.push('/learning-center')
    }
  } catch (error) {
    toast.error('登录失败，请稍后重试')
  } finally {
    isLoading.value = false
  }
}
</script>