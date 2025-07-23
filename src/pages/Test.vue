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
            <span class="text-lg font-medium text-purple-600">术语测试</span>
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

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 测试配置 -->
      <div v-if="!isTestStarted && !showResults" class="bg-white rounded-xl p-8 shadow-sm border">
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain class="h-8 w-8 text-purple-600" />
          </div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">术语测试</h1>
          <p class="text-gray-600">测试您的术语掌握程度，获得个性化学习建议</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">选择测试分类</label>
            <div class="space-y-2">
              <label class="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  v-model="testConfig.category"
                  type="radio"
                  value=""
                  class="text-purple-600 focus:ring-purple-500"
                />
                <span class="ml-3 text-gray-900">综合测试（所有分类）</span>
              </label>
              <label
                v-for="category in categories"
                :key="category.id"
                class="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  v-model="testConfig.category"
                  type="radio"
                  :value="category.id"
                  class="text-purple-600 focus:ring-purple-500"
                />
                <div class="ml-3 flex items-center space-x-3">
                  <div 
                    class="w-6 h-6 rounded flex items-center justify-center"
                    :style="{ backgroundColor: category.color + '20' }"
                  >
                    <component 
                      :is="getIcon(category.icon)"
                      class="h-4 w-4"
                      :style="{ color: category.color }"
                    />
                  </div>
                  <span class="text-gray-900">{{ category.name }}</span>
                </div>
              </label>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">测试设置</label>
            <div class="space-y-4">
              <div>
                <label class="block text-sm text-gray-600 mb-2">题目数量</label>
                <select
                  v-model="testConfig.questionCount"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option :value="5">5 题（快速测试）</option>
                  <option :value="10">10 题（标准测试）</option>
                  <option :value="20">20 题（深度测试）</option>
                </select>
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-2">难度等级</label>
                <select
                  v-model="testConfig.difficulty"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">所有难度</option>
                  <option value="beginner">初级</option>
                  <option value="intermediate">中级</option>
                  <option value="advanced">高级</option>
                </select>
              </div>
              <div>
                <label class="flex items-center space-x-2">
                  <input
                    v-model="testConfig.randomOrder"
                    type="checkbox"
                    class="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span class="text-sm text-gray-700">随机题目顺序</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center">
          <button
            @click="startTest"
            :disabled="!canStartTest"
            class="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            开始测试
          </button>
        </div>
      </div>

      <!-- 测试进行中 -->
      <div v-if="isTestStarted && !showResults" class="bg-white rounded-xl p-8 shadow-sm border">
        <!-- 进度条 -->
        <div class="mb-8">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-medium text-gray-700">
              题目 {{ currentQuestionIndex + 1 }} / {{ questions.length }}
            </span>
            <span class="text-sm text-gray-500">
              {{ formatTime(elapsedTime) }}
            </span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div 
              class="bg-purple-600 h-2 rounded-full transition-all duration-300"
              :style="{ width: ((currentQuestionIndex + 1) / questions.length * 100) + '%' }"
            ></div>
          </div>
        </div>

        <!-- 当前题目 -->
        <div v-if="currentQuestion" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
            {{ currentQuestion.question }}
          </h2>
          
          <div class="grid gap-3">
            <button
              v-for="(option, index) in currentQuestion.options"
              :key="index"
              @click="selectAnswer(index)"
              :disabled="selectedAnswer !== null"
              class="p-4 text-left border-2 rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
              :class="getOptionClass(index)"
            >
              <span class="font-medium">{{ String.fromCharCode(65 + index) }}.</span>
              {{ option }}
            </button>
          </div>

          <!-- 答案解释 -->
          <div v-if="selectedAnswer !== null" class="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 class="font-medium text-blue-900 mb-2">解释</h3>
            <p class="text-blue-800">{{ currentQuestion.explanation }}</p>
          </div>
        </div>

        <!-- 下一题按钮 -->
        <div v-if="selectedAnswer !== null" class="text-center">
          <button
            @click="nextQuestion"
            class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            {{ currentQuestionIndex < questions.length - 1 ? '下一题' : '完成测试' }}
          </button>
        </div>
      </div>

      <!-- 测试结果 -->
      <div v-if="showResults" class="bg-white rounded-xl p-8 shadow-sm border">
        <div class="text-center mb-8">
          <div 
            class="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
            :class="getResultIconClass()"
          >
            <component :is="getResultIcon()" class="h-10 w-10" />
          </div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">测试完成！</h1>
          <p class="text-gray-600">{{ getResultMessage() }}</p>
        </div>

        <!-- 成绩统计 -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="text-center p-4 bg-gray-50 rounded-lg">
            <div class="text-2xl font-bold text-purple-600 mb-1">{{ testResult.score }}%</div>
            <div class="text-sm text-gray-600">总分</div>
          </div>
          <div class="text-center p-4 bg-gray-50 rounded-lg">
            <div class="text-2xl font-bold text-green-600 mb-1">{{ testResult.correctAnswers }}</div>
            <div class="text-sm text-gray-600">正确题数</div>
          </div>
          <div class="text-center p-4 bg-gray-50 rounded-lg">
            <div class="text-2xl font-bold text-red-600 mb-1">{{ testResult.totalQuestions - testResult.correctAnswers }}</div>
            <div class="text-sm text-gray-600">错误题数</div>
          </div>
          <div class="text-center p-4 bg-gray-50 rounded-lg">
            <div class="text-2xl font-bold text-blue-600 mb-1">{{ formatTime(testResult.duration) }}</div>
            <div class="text-sm text-gray-600">用时</div>
          </div>
        </div>

        <!-- 错题回顾 -->
        <div v-if="wrongAnswers.length > 0" class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">错题回顾</h2>
          <div class="space-y-4">
            <div
              v-for="(item, index) in wrongAnswers"
              :key="index"
              class="border rounded-lg p-4"
            >
              <h3 class="font-medium text-gray-900 mb-2">{{ item.question.question }}</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="text-red-600 font-medium">您的答案：</span>
                  {{ item.question.options[item.userAnswer] }}
                </div>
                <div>
                  <span class="text-green-600 font-medium">正确答案：</span>
                  {{ item.question.options[item.question.correctAnswer] }}
                </div>
              </div>
              <div class="mt-2 text-sm text-gray-600">
                <span class="font-medium">解释：</span>{{ item.question.explanation }}
              </div>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="flex justify-center space-x-4">
          <button
            @click="restartTest"
            class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            重新测试
          </button>
          <router-link
            to="/learning-center"
            class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            查看学习记录
          </router-link>
          <router-link
            :to="testConfig.category ? `/${testConfig.category}` : '/'"
            class="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            继续学习
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  BookOpen, ChevronRight, Brain, Target, HeartPulse, Code,
  Trophy, Award, ThumbsUp
} from 'lucide-vue-next'
import type { QuizQuestion, QuizResult, CategoryType } from '../types'
import { getAllCategories, getTermsByCategory, getAllTerms, generateQuizQuestions, filterTermsByDifficulty } from '../utils/dataLoader'
import { useLearningStore } from '../stores/learning'
import { toast } from 'vue-sonner'

const route = useRoute()
const learningStore = useLearningStore()

// 分类数据
const categories = getAllCategories()

// 测试配置
const testConfig = ref({
  category: route.query.category as string || '',
  questionCount: 10,
  difficulty: 'all',
  randomOrder: true
})

// 测试状态
const isTestStarted = ref(false)
const showResults = ref(false)
const questions = ref<QuizQuestion[]>([])
const currentQuestionIndex = ref(0)
const selectedAnswer = ref<number | null>(null)
const userAnswers = ref<number[]>([])
const startTime = ref(0)
const elapsedTime = ref(0)
const timer = ref<number | null>(null)

// 图标映射
const iconMap = {
  target: Target,
  'heart-pulse': HeartPulse,
  code: Code
}

const getIcon = (iconName?: string) => {
  return iconMap[iconName as keyof typeof iconMap] || Target
}

// 当前题目
const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])

// 是否可以开始测试
const canStartTest = computed(() => {
  const terms = testConfig.value.category 
    ? getTermsByCategory(testConfig.value.category)
    : getAllTerms()
  return terms.length >= testConfig.value.questionCount
})

// 测试结果
const testResult = computed((): QuizResult => {
  const correctAnswers = userAnswers.value.filter((answer, index) => 
    answer === questions.value[index]?.correctAnswer
  ).length
  
  return {
    id: `test-${Date.now()}`,
    category: testConfig.value.category as CategoryType,
    score: Math.round((correctAnswers / questions.value.length) * 100),
    correctAnswers,
    totalQuestions: questions.value.length,
    duration: elapsedTime.value,
    completedAt: Date.now()
  }
})

// 错题列表
const wrongAnswers = computed(() => {
  return userAnswers.value
    .map((answer, index) => ({
      question: questions.value[index],
      userAnswer: answer,
      correctAnswer: questions.value[index]?.correctAnswer
    }))
    .filter(item => item.userAnswer !== item.correctAnswer)
})

// 开始测试
const startTest = () => {
  // 获取术语数据
  let terms = testConfig.value.category 
    ? getTermsByCategory(testConfig.value.category)
    : getAllTerms()
  
  // 按难度筛选
  if (testConfig.value.difficulty !== 'all') {
    terms = filterTermsByDifficulty(terms, testConfig.value.difficulty)
  }
  
  if (terms.length < testConfig.value.questionCount) {
    toast.error('可用术语数量不足，请调整测试设置')
    return
  }
  
  // 生成题目
  questions.value = generateQuizQuestions(terms, testConfig.value.questionCount)
  
  // 随机排序
  if (testConfig.value.randomOrder) {
    questions.value = questions.value.sort(() => Math.random() - 0.5)
  }
  
  // 重置状态
  currentQuestionIndex.value = 0
  selectedAnswer.value = null
  userAnswers.value = []
  startTime.value = Date.now()
  elapsedTime.value = 0
  
  // 开始计时
  startTimer()
  
  isTestStarted.value = true
  toast.success('测试开始！')
}

// 选择答案
const selectAnswer = (answerIndex: number) => {
  if (selectedAnswer.value !== null) return
  
  selectedAnswer.value = answerIndex
  userAnswers.value[currentQuestionIndex.value] = answerIndex
}

// 下一题
const nextQuestion = () => {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++
    selectedAnswer.value = null
  } else {
    finishTest()
  }
}

// 完成测试
const finishTest = () => {
  stopTimer()
  
  // 保存测试结果
  learningStore.addTestResult(testResult.value)
  
  showResults.value = true
  isTestStarted.value = false
  
  toast.success('测试完成！')
}

// 重新测试
const restartTest = () => {
  isTestStarted.value = false
  showResults.value = false
  questions.value = []
  currentQuestionIndex.value = 0
  selectedAnswer.value = null
  userAnswers.value = []
  elapsedTime.value = 0
}

// 获取选项样式
const getOptionClass = (index: number) => {
  if (selectedAnswer.value === null) {
    return 'border-gray-300 hover:border-purple-300 hover:bg-purple-50'
  }
  
  if (index === currentQuestion.value?.correctAnswer) {
    return 'border-green-500 bg-green-50 text-green-700'
  }
  
  if (index === selectedAnswer.value && index !== currentQuestion.value?.correctAnswer) {
    return 'border-red-500 bg-red-50 text-red-700'
  }
  
  return 'border-gray-300 bg-gray-50 text-gray-500'
}

// 获取结果图标
const getResultIcon = () => {
  const score = testResult.value.score
  if (score >= 90) return Trophy
  if (score >= 70) return Award
  return ThumbsUp
}

// 获取结果图标样式
const getResultIconClass = () => {
  const score = testResult.value.score
  if (score >= 90) return 'bg-yellow-100 text-yellow-600'
  if (score >= 70) return 'bg-blue-100 text-blue-600'
  return 'bg-green-100 text-green-600'
}

// 获取结果消息
const getResultMessage = () => {
  const score = testResult.value.score
  if (score >= 90) return '优秀！您对这些术语掌握得非常好！'
  if (score >= 70) return '良好！继续努力，您会做得更好！'
  if (score >= 60) return '及格！建议多复习一下相关术语。'
  return '需要加强！建议重新学习相关术语。'
}

// 格式化时间
const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

// 开始计时
const startTimer = () => {
  timer.value = window.setInterval(() => {
    elapsedTime.value = Math.floor((Date.now() - startTime.value) / 1000)
  }, 1000)
}

// 停止计时
const stopTimer = () => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
}

// 组件卸载时清理计时器
onUnmounted(() => {
  stopTimer()
})
</script>