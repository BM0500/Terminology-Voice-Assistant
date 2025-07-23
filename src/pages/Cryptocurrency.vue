<template>
  <div class="min-h-screen flex flex-col bg-neutral-light font-inter">
    <!-- 导航栏 -->
    <nav class="bg-white shadow-md sticky top-0 z-50">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-graduation-cap text-primary text-2xl"></i>
          <h1 class="text-xl font-bold text-neutral">英语术语学习系统</h1>
        </div>
        <div class="flex items-center gap-3">
          <router-link to="/" class="btn-outline">
            <i class="fa-solid fa-home"></i>
            <span class="hidden md:inline">首页</span>
          </router-link>
          <router-link to="/help" class="btn-outline">
            <i class="fa-solid fa-question-circle"></i>
            <span class="hidden md:inline">帮助</span>
          </router-link>
        </div>
      </div>
    </nav>

    <!-- 主内容区 -->
    <main class="flex-grow">
      <div class="container mx-auto px-4 py-8">
        <!-- 页面标题 -->
        <section class="mb-10 text-center">
          <h2 class="text-[clamp(1.8rem,5vw,3rem)] font-bold text-neutral mb-4">
            <i class="fa-brands fa-bitcoin text-yellow-500 mr-4"></i>
            加密货币术语
          </h2>
          <p class="text-neutral-dark max-w-2xl mx-auto text-lg">
            掌握区块链、Web3、DeFi等加密货币领域的专业术语
          </p>
        </section>

        <!-- 搜索和筛选 -->
        <section class="mb-8">
          <div class="max-w-2xl mx-auto">
            <div class="relative mb-6">
              <input
                v-model="searchTerm"
                type="text"
                placeholder="搜索加密货币术语..."
                class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
              <i class="fa-solid fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
            
            <!-- 难度筛选 -->
            <div class="flex flex-wrap gap-2 justify-center">
              <button
                v-for="level in difficultyLevels"
                :key="level"
                @click="selectedDifficulty = selectedDifficulty === level ? '' : level"
                :class="[
                  'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200',
                  selectedDifficulty === level
                    ? 'bg-primary text-white'
                    : 'bg-white text-neutral border border-gray-300 hover:bg-gray-50'
                ]"
              >
                {{ level }}
              </button>
            </div>
          </div>
        </section>

        <!-- 术语列表 -->
        <section>
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="term in filteredTerms"
              :key="term.id"
              class="bg-white rounded-xl shadow-md p-6 card-hover"
            >
              <div class="flex justify-between items-start mb-4">
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-neutral mb-2">{{ term.term }}</h3>
                  <p class="text-sm text-gray-500 mb-2">{{ term.category }}</p>
                  <div class="flex items-center gap-2 mb-3">
                    <span 
                      :class="[
                        'px-2 py-1 rounded-full text-xs font-medium',
                        getDifficultyColor(term.difficulty)
                      ]"
                    >
                      {{ term.difficulty }}
                    </span>
                    <button
                      @click="speakTerm(term.term, term.pronunciation)"
                      class="text-primary hover:text-primary/80 transition-colors duration-200"
                      :title="`朗读: ${term.term}`"
                    >
                      <i class="fa-solid fa-volume-high"></i>
                    </button>
                  </div>
                </div>
                <button
                  @click="toggleFavorite(term.id)"
                  :class="[
                    'text-xl transition-colors duration-200',
                    favorites.includes(term.id) ? 'text-red-500' : 'text-gray-300 hover:text-red-500'
                  ]"
                >
                  <i class="fa-solid fa-heart"></i>
                </button>
              </div>
              
              <div class="space-y-3">
                <div>
                  <h4 class="font-semibold text-neutral mb-1">定义</h4>
                  <p class="text-neutral-dark text-sm leading-relaxed">{{ term.definition }}</p>
                </div>
                
                <div v-if="term.example">
                  <h4 class="font-semibold text-neutral mb-1">例句</h4>
                  <p class="text-neutral-dark text-sm italic">{{ term.example }}</p>
                </div>
                
                <div v-if="term.tags && term.tags.length > 0">
                  <div class="flex flex-wrap gap-1">
                    <span
                      v-for="tag in term.tags"
                      :key="tag"
                      class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="mt-4 pt-4 border-t border-gray-100">
                <button
                  @click="markAsLearned(term.id)"
                  :class="[
                    'w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200',
                    learnedTerms.includes(term.id)
                      ? 'bg-green-100 text-green-700 border border-green-300'
                      : 'bg-primary text-white hover:bg-primary/90'
                  ]"
                >
                  <i :class="learnedTerms.includes(term.id) ? 'fa-solid fa-check' : 'fa-solid fa-plus'" class="mr-2"></i>
                  {{ learnedTerms.includes(term.id) ? '已学习' : '标记为已学习' }}
                </button>
              </div>
            </div>
          </div>
          
          <!-- 无结果提示 -->
          <div v-if="filteredTerms.length === 0" class="text-center py-12">
            <i class="fa-solid fa-search text-gray-300 text-4xl mb-4"></i>
            <p class="text-gray-500 text-lg">没有找到匹配的术语</p>
            <p class="text-gray-400 text-sm mt-2">尝试调整搜索条件或筛选选项</p>
          </div>
        </section>
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="bg-neutral text-white py-6">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-4 md:mb-0">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-graduation-cap text-white text-xl"></i>
              <span class="text-lg font-bold">英语术语学习系统</span>
            </div>
            <p class="text-gray-400 text-sm mt-1">专业的英语术语学习工具</p>
          </div>
          <div class="flex gap-6">
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">
              <i class="fa-brands fa-weibo"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">
              <i class="fa-brands fa-wechat"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">
              <i class="fa-brands fa-github"></i>
            </a>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400 text-sm">
          © 2025 英语术语学习系统 - 版权所有
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useSpeechStore } from '../stores/speech'
import cryptocurrencyData from '../data/cryptocurrency.json'

const speechStore = useSpeechStore()

// 响应式数据
const searchTerm = ref('')
const selectedDifficulty = ref('')
const favorites = ref<number[]>([])
const learnedTerms = ref<number[]>([])

// 难度级别
const difficultyLevels = ['初级', '中级', '高级']

// 从本地存储加载数据
onMounted(() => {
  const savedFavorites = localStorage.getItem('cryptocurrency-favorites')
  const savedLearned = localStorage.getItem('cryptocurrency-learned')
  
  if (savedFavorites) {
    favorites.value = JSON.parse(savedFavorites)
  }
  
  if (savedLearned) {
    learnedTerms.value = JSON.parse(savedLearned)
  }
})

// 筛选后的术语
const filteredTerms = computed(() => {
  let filtered = cryptocurrencyData
  
  // 搜索筛选
  if (searchTerm.value) {
    const search = searchTerm.value.toLowerCase()
    filtered = filtered.filter(term => 
      term.term.toLowerCase().includes(search) ||
      term.definition.toLowerCase().includes(search) ||
      term.category.toLowerCase().includes(search)
    )
  }
  
  // 难度筛选
  if (selectedDifficulty.value) {
    filtered = filtered.filter(term => term.difficulty === selectedDifficulty.value)
  }
  
  return filtered
})

// 获取难度颜色
const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case '初级':
      return 'bg-green-100 text-green-700'
    case '中级':
      return 'bg-yellow-100 text-yellow-700'
    case '高级':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

// 朗读术语
const speakTerm = (term: string, pronunciation?: string) => {
  const textToSpeak = pronunciation || term
  speechStore.speak(textToSpeak)
}

// 切换收藏状态
const toggleFavorite = (termId: number) => {
  const index = favorites.value.indexOf(termId)
  if (index > -1) {
    favorites.value.splice(index, 1)
  } else {
    favorites.value.push(termId)
  }
  localStorage.setItem('cryptocurrency-favorites', JSON.stringify(favorites.value))
}

// 标记为已学习
const markAsLearned = (termId: number) => {
  if (!learnedTerms.value.includes(termId)) {
    learnedTerms.value.push(termId)
    localStorage.setItem('cryptocurrency-learned', JSON.stringify(learnedTerms.value))
  }
}
</script>

<style scoped>
.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.card-hover {
  transition: all 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.btn-outline {
  @apply border-2 border-primary text-primary px-4 py-2 rounded-lg font-medium hover:bg-primary hover:text-white transition-colors duration-300 inline-flex items-center gap-2;
}
</style>