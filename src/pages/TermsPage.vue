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
            <span class="text-lg font-medium" :style="{ color: category?.color }">
              {{ category?.name }}
            </span>
          </div>
          <div class="flex items-center space-x-4">
            <router-link
              to="/learning-center"
              class="text-gray-600 hover:text-blue-600 transition-colors"
            >
              学习中心
            </router-link>
            <router-link
              to="/login"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              登录
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 页面头部 -->
      <div class="bg-white rounded-xl p-6 shadow-sm border mb-8">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center space-x-4">
            <div 
              class="w-16 h-16 rounded-xl flex items-center justify-center"
              :style="{ backgroundColor: category?.color + '20' }"
            >
              <component 
                :is="getIcon(category?.icon)"
                class="h-8 w-8"
                :style="{ color: category?.color }"
              />
            </div>
            <div>
              <h1 class="text-3xl font-bold text-gray-900">{{ category?.name }}</h1>
              <p class="text-gray-600 mt-1">{{ category?.description }}</p>
            </div>
          </div>
          <div class="text-right">
            <div class="text-2xl font-bold text-gray-900">{{ filteredTerms.length }}</div>
            <div class="text-sm text-gray-500">个术语</div>
          </div>
        </div>

        <!-- 语音控制面板 -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">语速</label>
            <input
              v-model="speechStore.settings.rate"
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              class="w-full"
            />
            <div class="text-xs text-gray-500 text-center mt-1">
              {{ speechStore.settings.rate }}x
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">音调</label>
            <input
              v-model="speechStore.settings.pitch"
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              class="w-full"
            />
            <div class="text-xs text-gray-500 text-center mt-1">
              {{ speechStore.settings.pitch }}
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">音量</label>
            <input
              v-model="speechStore.settings.volume"
              type="range"
              min="0"
              max="1"
              step="0.1"
              class="w-full"
            />
            <div class="text-xs text-gray-500 text-center mt-1">
              {{ Math.round(speechStore.settings.volume * 100) }}%
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">发音人</label>
            <select
              v-model="speechStore.settings.voice"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">默认</option>
              <option
                v-for="voice in speechStore.availableVoices"
                :key="voice.name"
                :value="voice.name"
              >
                {{ voice.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- 搜索和筛选 -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="md:col-span-2">
            <div class="relative">
              <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索术语..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <select
              v-model="selectedSubcategory"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">所有分类</option>
              <option
                v-for="(label, key) in category?.subcategories"
                :key="key"
                :value="key"
              >
                {{ label }}
              </option>
            </select>
          </div>
          <div>
            <select
              v-model="selectedDifficulty"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">所有难度</option>
              <option value="beginner">初级</option>
              <option value="intermediate">中级</option>
              <option value="advanced">高级</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="flex justify-between items-center mb-6">
        <div class="flex space-x-3">
          <button
            @click="playAllTerms"
            :disabled="speechStore.isPlaying"
            class="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Play class="h-4 w-4" />
            <span>播放全部</span>
          </button>
          <button
            v-if="speechStore.isPlaying"
            @click="speechStore.pauseSpeaking()"
            class="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Pause class="h-4 w-4" />
            <span>暂停</span>
          </button>
          <button
            @click="speechStore.stopSpeaking()"
            :disabled="!speechStore.isPlaying"
            class="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Square class="h-4 w-4" />
            <span>停止</span>
          </button>
        </div>
        <div class="flex items-center space-x-4">
          <label class="flex items-center space-x-2">
            <input
              v-model="speechStore.settings.autoPlay"
              type="checkbox"
              class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span class="text-sm text-gray-700">自动播放</span>
          </label>
          <router-link
            :to="`/test?category=${categoryId}`"
            class="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Brain class="h-4 w-4" />
            <span>开始测试</span>
          </router-link>
        </div>
      </div>

      <!-- 术语列表 -->
      <div class="grid gap-4">
        <div
          v-for="term in paginatedTerms"
          :key="term.id"
          class="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-2">
                <h3 class="text-xl font-semibold text-gray-900">{{ term.word || term.term }}</h3>
                <span
                  v-if="term.pronunciation"
                  class="text-sm text-gray-500 font-mono"
                >
                  [{{ term.pronunciation }}]
                </span>
                <span
                  class="px-2 py-1 text-xs rounded-full"
                  :class="getDifficultyClass(term.difficulty)"
                >
                  {{ getDifficultyLabel(term.difficulty) }}
                </span>
                <span
                  class="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
                >
                  {{ getSubcategoryLabel(term.category) }}
                </span>
              </div>
              <p class="text-gray-700 mb-3">{{ term.definition }}</p>
              <p v-if="term.example" class="text-sm text-gray-600 italic mb-3">
                例句：{{ term.example }}
              </p>
              <div v-if="term.tags && term.tags.length" class="flex flex-wrap gap-2">
                <span
                  v-for="tag in term.tags"
                  :key="tag"
                  class="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            <div class="flex items-center space-x-2 ml-4">
              <button
                @click="toggleFavorite(term.id)"
                class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                :class="learningStore.isFavorite(term.id) ? 'text-red-500' : 'text-gray-400'"
              >
                <Heart class="h-5 w-5" :fill="learningStore.isFavorite(term.id) ? 'currentColor' : 'none'" />
              </button>
              <button
                @click="toggleLearned(term.id)"
                class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                :class="learningStore.isLearned(term.id) ? 'text-green-500' : 'text-gray-400'"
              >
                <Check class="h-5 w-5" />
              </button>
              <button
                @click="speakTerm(term)"
                :disabled="speechStore.isPlaying"
                class="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Volume2 class="h-5 w-5 text-blue-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 分页 -->
      <div v-if="totalPages > 1" class="flex justify-center mt-8">
        <div class="flex space-x-2">
          <button
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            上一页
          </button>
          <span class="px-4 py-2 text-gray-700">
            第 {{ currentPage }} 页，共 {{ totalPages }} 页
          </span>
          <button
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            下一页
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  BookOpen, ChevronRight, Search, Play, Pause, Square, Brain,
  Heart, Check, Volume2, Target, HeartPulse, Code
} from 'lucide-vue-next'
import type { Term } from '../types'
import { getTermsByCategory, getCategory, searchTerms, filterTermsByDifficulty, filterTermsBySubcategory } from '../utils/dataLoader'
import { useLearningStore } from '../stores/learning'
import { useSpeechStore } from '../stores/speech'

const route = useRoute()
const learningStore = useLearningStore()
const speechStore = useSpeechStore()

// 获取分类ID
const categoryId = computed(() => {
  const path = route.path
  if (path.includes('/snooker')) return 'snooker'
  if (path.includes('/medical')) return 'medical'
  if (path.includes('/it')) return 'it'
  return 'snooker' // 默认值
})

// 获取分类信息和术语数据
const category = computed(() => getCategory(categoryId.value))
const terms = computed(() => getTermsByCategory(categoryId.value as any))

// 搜索和筛选状态
const searchQuery = ref('')
const selectedSubcategory = ref('all')
const selectedDifficulty = ref('all')

// 分页状态
const currentPage = ref(1)
const itemsPerPage = 10

// 图标映射
const iconMap = {
  target: Target,
  'heart-pulse': HeartPulse,
  code: Code
}

const getIcon = (iconName?: string) => {
  return iconMap[iconName as keyof typeof iconMap] || Target
}

// 筛选后的术语
const filteredTerms = computed(() => {
  let result = terms.value
  
  // 搜索筛选
  if (searchQuery.value.trim()) {
    result = searchTerms(searchQuery.value, categoryId.value as 'snooker' | 'medical' | 'it')
  }
  
  // 子分类筛选
  result = filterTermsBySubcategory(result, selectedSubcategory.value)
  
  // 难度筛选
  result = filterTermsByDifficulty(result, selectedDifficulty.value)
  
  return result
})

// 分页计算
const totalPages = computed(() => Math.ceil(filteredTerms.value.length / itemsPerPage))
const paginatedTerms = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredTerms.value.slice(start, end)
})

// 重置分页当筛选条件改变时
watch([searchQuery, selectedSubcategory, selectedDifficulty], () => {
  currentPage.value = 1
})

// 获取难度标签
const getDifficultyLabel = (difficulty: string) => {
  const labels = {
    beginner: '初级',
    intermediate: '中级',
    advanced: '高级'
  }
  return labels[difficulty as keyof typeof labels] || difficulty
}

// 获取难度样式
const getDifficultyClass = (difficulty: string) => {
  const classes = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-yellow-100 text-yellow-700',
    advanced: 'bg-red-100 text-red-700'
  }
  return classes[difficulty as keyof typeof classes] || 'bg-gray-100 text-gray-700'
}

// 获取子分类标签
const getSubcategoryLabel = (subcategory: string) => {
  return category.value?.subcategories?.[subcategory] || subcategory
}

// 朗读单个术语
const speakTerm = (term: Term) => {
  const termText = term.word || term.term || ''
  speechStore.speak(termText)
  learningStore.incrementPlayCount(term.id, categoryId.value)
}

// 播放所有术语
const playAllTerms = () => {
  const words = filteredTerms.value.map(term => term.word || term.term || '')
  speechStore.speakSequence(words)
  
  // 增加播放次数
  filteredTerms.value.forEach(term => {
    learningStore.incrementPlayCount(term.id, categoryId.value)
  })
}

// 切换收藏状态
const toggleFavorite = (termId: string) => {
  learningStore.toggleFavorite(termId)
}

// 切换学习状态
const toggleLearned = (termId: string) => {
  learningStore.markTermAsLearned(termId, categoryId.value)
}

// 组件挂载时初始化语音
onMounted(() => {
  speechStore.init()
})
</script>