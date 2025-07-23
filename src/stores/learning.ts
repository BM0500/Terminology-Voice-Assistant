import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CategoryType } from '../types'

export interface TermProgress {
  termId: string
  category: string
  learned: boolean
  favorited: boolean
  playCount: number
  lastStudied: Date
}

export interface TestResult {
  id: string
  category: CategoryType
  score: number
  totalQuestions: number
  correctAnswers: number
  duration: number
  completedAt: number
}

export const useLearningStore = defineStore('learning', () => {
  const termProgress = ref<Record<string, TermProgress>>({})
  const testResults = ref<TestResult[]>([])
  const favorites = ref<string[]>([])

  // 计算总体学习统计
  const totalTerms = computed(() => {
    return Object.keys(termProgress.value).length
  })

  const learnedTerms = computed(() => {
    return Object.values(termProgress.value).filter(p => p.learned).length
  })

  const progressPercentage = computed(() => {
    if (totalTerms.value === 0) return 0
    return Math.round((learnedTerms.value / totalTerms.value) * 100)
  })

  const masteryLevel = computed(() => {
    const percentage = progressPercentage.value
    if (percentage >= 90) return '专家'
    if (percentage >= 75) return '优秀'
    if (percentage >= 50) return '良好'
    if (percentage >= 25) return '中级'
    return '初级'
  })

  // 按分类统计
  const getProgressByCategory = (category: string) => {
    const categoryTerms = Object.values(termProgress.value).filter(p => p.category === category)
    const learnedCount = categoryTerms.filter(p => p.learned).length
    return {
      total: categoryTerms.length,
      learned: learnedCount,
      percentage: categoryTerms.length > 0 ? Math.round((learnedCount / categoryTerms.length) * 100) : 0
    }
  }

  // 术语操作
  const markTermAsLearned = (termId: string, category: string) => {
    if (!termProgress.value[termId]) {
      termProgress.value[termId] = {
        termId,
        category,
        learned: false,
        favorited: false,
        playCount: 0,
        lastStudied: new Date()
      }
    }
    termProgress.value[termId].learned = !termProgress.value[termId].learned
    termProgress.value[termId].lastStudied = new Date()
    saveToLocalStorage()
  }

  /**
   * 切换收藏状态
   */
  const toggleFavorite = (termId: string) => {
    if (favorites.value.includes(termId)) {
      favorites.value = favorites.value.filter(id => id !== termId)
    } else {
      favorites.value.push(termId)
    }
    saveToLocalStorage()
  }

  /**
   * 检查是否收藏
   */
  const isFavorite = (termId: string) => {
    return favorites.value.includes(termId)
  }

  /**
   * 检查是否已学习
   */
  const isLearned = (termId: string) => {
    return termProgress.value[termId]?.learned || false
  }

  /**
   * 获取学习统计
   */
  const getLearningStats = () => {
    const totalTerms = Object.keys(termProgress.value).length
    const learnedTerms = Object.values(termProgress.value).filter(p => p.learned).length
    const favoriteTerms = favorites.value.length
    const totalTests = testResults.value.length
    
    return {
      totalTerms,
      learnedTerms,
      favoriteTerms,
      totalTests,
      learningRate: totalTerms > 0 ? Math.round((learnedTerms / totalTerms) * 100) : 0
    }
  }

  /**
   * 获取分类学习进度
   */
  const getCategoryProgress = (categoryId: CategoryType) => {
    const categoryTerms = Object.values(termProgress.value).filter(p => p.category === categoryId)
    const learnedTerms = categoryTerms.filter(p => p.learned)
    
    return {
      total: categoryTerms.length,
      learned: learnedTerms.length,
      progress: categoryTerms.length > 0 ? Math.round((learnedTerms.length / categoryTerms.length) * 100) : 0
    }
  }

  const incrementPlayCount = (termId: string, category: string) => {
    if (!termProgress.value[termId]) {
      termProgress.value[termId] = {
        termId,
        category,
        learned: false,
        favorited: false,
        playCount: 0,
        lastStudied: new Date()
      }
    }
    termProgress.value[termId].playCount++
    termProgress.value[termId].lastStudied = new Date()
    saveToLocalStorage()
  }

  // 测试结果
  const addTestResult = (result: TestResult) => {
    testResults.value.unshift(result)
    saveToLocalStorage()
  }

  const getTestResultsByCategory = (category: string) => {
    return testResults.value.filter(r => r.category === category)
  }

  // 本地存储
  const saveToLocalStorage = () => {
    localStorage.setItem('termProgress', JSON.stringify(termProgress.value))
    localStorage.setItem('testResults', JSON.stringify(testResults.value))
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }

  const loadFromLocalStorage = () => {
    try {
      const savedProgress = localStorage.getItem('termProgress')
      if (savedProgress) {
        termProgress.value = JSON.parse(savedProgress)
      }

      const savedResults = localStorage.getItem('testResults')
      if (savedResults) {
        testResults.value = JSON.parse(savedResults)
      }

      const savedFavorites = localStorage.getItem('favorites')
      if (savedFavorites) {
        favorites.value = JSON.parse(savedFavorites)
      }
    } catch (error) {
      console.error('Failed to load learning data from localStorage:', error)
    }
  }

  return {
    termProgress,
    testResults,
    favorites,
    totalTerms,
    learnedTerms,
    progressPercentage,
    masteryLevel,
    getProgressByCategory,
    markTermAsLearned,
    toggleFavorite,
    isFavorite,
    isLearned,
    getLearningStats,
    getCategoryProgress,
    incrementPlayCount,
    addTestResult,
    getTestResultsByCategory,
    loadFromLocalStorage
  }
})