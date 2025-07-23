<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 导航栏 -->
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-3">
            <router-link to="/" class="flex items-center space-x-3">
              <BookOpen class="h-8 w-8 text-blue-600" />
              <span class="text-xl font-bold text-gray-900">英语术语学习系统</span>
            </router-link>
            <ChevronRight class="h-5 w-5 text-gray-400" />
            <span class="text-lg font-medium text-blue-600">学习中心</span>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-gray-600">欢迎，{{ userStore.user?.username || '用户' }}</span>
            <button
              @click="handleLogout"
              class="text-gray-600 hover:text-red-600 transition-colors"
            >
              退出登录
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 页面头部 -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">学习中心</h1>
        <p class="text-gray-600">跟踪您的学习进度，管理收藏和测试记录</p>
      </div>

      <!-- 学习统计概览 -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl p-6 shadow-sm border">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">总学习术语</p>
              <p class="text-2xl font-bold text-blue-600">{{ stats.learnedTerms }}</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen class="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-sm border">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">收藏术语</p>
              <p class="text-2xl font-bold text-red-600">{{ stats.favoriteTerms }}</p>
            </div>
            <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Heart class="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-sm border">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">测试次数</p>
              <p class="text-2xl font-bold text-green-600">{{ stats.totalTests }}</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Brain class="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-sm border">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">学习进度</p>
              <p class="text-2xl font-bold text-purple-600">{{ stats.learningRate }}%</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp class="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <!-- 分类学习进度 -->
      <div class="bg-white rounded-xl p-6 shadow-sm border mb-8">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">分类学习进度</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="category in categories"
            :key="category.id"
            class="border rounded-lg p-4"
          >
            <div class="flex items-center space-x-3 mb-4">
              <div 
                class="w-10 h-10 rounded-lg flex items-center justify-center"
                :style="{ backgroundColor: category.color + '20' }"
              >
                <component 
                  :is="getIcon(category.icon)"
                  class="h-5 w-5"
                  :style="{ color: category.color }"
                />
              </div>
              <div>
                <h3 class="font-medium text-gray-900">{{ category.name }}</h3>
                <p class="text-sm text-gray-500">
                  {{ getCategoryProgress(category.id).learned }} / {{ getCategoryProgress(category.id).total }}
                </p>
              </div>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                class="h-2 rounded-full transition-all duration-300"
                :style="{ 
                  width: getCategoryProgress(category.id).progress + '%',
                  backgroundColor: category.color 
                }"
              ></div>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">{{ getCategoryProgress(category.id).progress }}%</span>
              <router-link
                :to="`/${category.id}`"
                class="text-blue-600 hover:text-blue-700 font-medium"
              >
                继续学习
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- 标签页导航 -->
      <div class="bg-white rounded-xl shadow-sm border">
        <div class="border-b border-gray-200">
          <nav class="flex space-x-8 px-6">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              class="py-4 px-1 border-b-2 font-medium text-sm transition-colors"
              :class="activeTab === tab.id 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            >
              <component :is="tab.icon" class="h-4 w-4 inline mr-2" />
              {{ tab.name }}
            </button>
          </nav>
        </div>

        <div class="p-6">
          <!-- 收藏术语 -->
          <div v-if="activeTab === 'favorites'">
            <div v-if="favoriteTerms.length === 0" class="text-center py-12">
              <Heart class="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p class="text-gray-500">还没有收藏任何术语</p>
              <router-link
                to="/snooker"
                class="text-blue-600 hover:text-blue-700 font-medium"
              >
                去学习术语
              </router-link>
            </div>
            <div v-else class="grid gap-4">
              <div
                v-for="term in favoriteTerms"
                :key="term.id"
                class="border rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="flex items-center space-x-2 mb-2">
                      <h3 class="font-semibold text-gray-900">{{ term.word }}</h3>
                      <span class="text-sm text-gray-500">[{{ getCategoryName(term.id) }}]</span>
                    </div>
                    <p class="text-gray-700 mb-2">{{ term.definition }}</p>
                    <p v-if="term.example" class="text-sm text-gray-600 italic">
                      例句：{{ term.example }}
                    </p>
                  </div>
                  <div class="flex items-center space-x-2 ml-4">
                    <button
                      @click="toggleFavorite(term.id)"
                      class="p-2 rounded-lg hover:bg-gray-100 text-red-500"
                    >
                      <Heart class="h-4 w-4" fill="currentColor" />
                    </button>
                    <button
                      @click="speakTerm(term.word)"
                      class="p-2 rounded-lg hover:bg-gray-100 text-blue-600"
                    >
                      <Volume2 class="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 学习记录 -->
          <div v-if="activeTab === 'learned'">
            <div v-if="learnedTerms.length === 0" class="text-center py-12">
              <Check class="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p class="text-gray-500">还没有学习任何术语</p>
              <router-link
                to="/snooker"
                class="text-blue-600 hover:text-blue-700 font-medium"
              >
                开始学习
              </router-link>
            </div>
            <div v-else class="grid gap-4">
              <div
                v-for="term in learnedTerms"
                :key="term.id"
                class="border rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="flex items-center space-x-2 mb-2">
                      <h3 class="font-semibold text-gray-900">{{ term.word }}</h3>
                      <span class="text-sm text-gray-500">[{{ getCategoryName(term.id) }}]</span>
                      <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        已学习
                      </span>
                    </div>
                    <p class="text-gray-700 mb-2">{{ term.definition }}</p>
                    <div class="text-sm text-gray-500">
                      播放次数：{{ getTermProgress(term.id)?.playCount || 0 }}
                    </div>
                  </div>
                  <div class="flex items-center space-x-2 ml-4">
                    <button
                      @click="speakTerm(term.word)"
                      class="p-2 rounded-lg hover:bg-gray-100 text-blue-600"
                    >
                      <Volume2 class="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 测试记录 -->
          <div v-if="activeTab === 'tests'">
            <div v-if="testResults.length === 0" class="text-center py-12">
              <Brain class="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p class="text-gray-500">还没有测试记录</p>
              <router-link
                to="/test"
                class="text-blue-600 hover:text-blue-700 font-medium"
              >
                开始测试
              </router-link>
            </div>
            <div v-else class="space-y-4">
              <div
                v-for="result in testResults"
                :key="result.id"
                class="border rounded-lg p-4"
              >
                <div class="flex items-center justify-between mb-2">
                  <h3 class="font-semibold text-gray-900">
                    {{ result.category ? getCategoryLabel(result.category) : '综合' }}测试
                  </h3>
                  <span class="text-sm text-gray-500">
                    {{ formatDate(result.completedAt) }}
                  </span>
                </div>
                <div class="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span class="text-gray-600">得分：</span>
                    <span class="font-medium" :class="getScoreColor(result.score)">
                      {{ result.score }}%
                    </span>
                  </div>
                  <div>
                    <span class="text-gray-600">正确率：</span>
                    <span class="font-medium">
                      {{ result.correctAnswers }}/{{ result.totalQuestions }}
                    </span>
                  </div>
                  <div>
                    <span class="text-gray-600">用时：</span>
                    <span class="font-medium">{{ formatDuration(result.duration) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  BookOpen, ChevronRight, Heart, Brain, TrendingUp, Check,
  Volume2, Target, HeartPulse, Code
} from 'lucide-vue-next'
import { getAllCategories, getAllTerms, getTermById } from '../utils/dataLoader'
import { useUserStore } from '../stores/user'
import { useLearningStore } from '../stores/learning'
import { useSpeechStore } from '../stores/speech'
import { toast } from 'vue-sonner'

const router = useRouter()
const userStore = useUserStore()
const learningStore = useLearningStore()
const speechStore = useSpeechStore()

// 分类数据
const categories = getAllCategories()
const allTerms = getAllTerms()

// 当前活跃标签
const activeTab = ref('favorites')

// 标签页配置
const tabs = [
  { id: 'favorites', name: '收藏术语', icon: Heart },
  { id: 'learned', name: '学习记录', icon: Check },
  { id: 'tests', name: '测试记录', icon: Brain }
]

// 图标映射
const iconMap = {
  target: Target,
  'heart-pulse': HeartPulse,
  code: Code
}

const getIcon = (iconName?: string) => {
  return iconMap[iconName as keyof typeof iconMap] || Target
}

// 学习统计
const stats = computed(() => learningStore.getLearningStats())

// 获取分类进度
const getCategoryProgress = (categoryId: string) => {
  return learningStore.getCategoryProgress(categoryId as 'snooker' | 'medical' | 'it')
}

// 收藏术语
const favoriteTerms = computed(() => {
  return allTerms.filter(term => learningStore.isFavorite(term.id))
})

// 已学习术语
const learnedTerms = computed(() => {
  return allTerms.filter(term => learningStore.isLearned(term.id))
})

// 测试记录
const testResults = computed(() => {
  return learningStore.testResults.slice().reverse() // 最新的在前
})

// 获取术语进度
const getTermProgress = (termId: string) => {
  return learningStore.termProgress[termId]
}

// 获取分类名称
const getCategoryName = (termId: string) => {
  const term = getTermById(termId)
  if (!term) return '未知'
  
  // 根据术语数据判断分类
  for (const category of categories) {
    if (category.subcategories && term.category in category.subcategories) {
      return category.name
    }
  }
  return '未知'
}

// 获取分类标签
const getCategoryLabel = (categoryId: string) => {
  const category = categories.find(c => c.id === categoryId)
  return category?.name || categoryId
}

// 切换收藏状态
const toggleFavorite = (termId: string) => {
  learningStore.toggleFavorite(termId)
  toast.success('已取消收藏')
}

// 朗读术语
const speakTerm = (word: string) => {
  speechStore.speak(word)
}

// 格式化日期
const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleString('zh-CN')
}

// 格式化时长
const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}分${remainingSeconds}秒`
}

// 获取分数颜色
const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-green-600'
  if (score >= 70) return 'text-yellow-600'
  return 'text-red-600'
}

// 退出登录
const handleLogout = () => {
  userStore.logout()
  toast.success('已退出登录')
  router.push('/')
}
</script>