import type { Term, TermCategory, CategoryType } from '../types'
import snookerData from '../data/snooker.json'
import medicalData from '../data/medical.json'
import itData from '../data/it.json'
import cryptocurrencyData from '../data/cryptocurrency.json'
import academicData from '../data/academic.json'
import categoriesData from '../data/categories.json'

// 术语数据映射
const termDataMap: Record<string, any[]> = {
  snooker: snookerData as Term[],
  medical: medicalData as Term[],
  it: itData as Term[],
  cryptocurrency: cryptocurrencyData as any[],
  academic: academicData as any[]
}

// 分类数据
const categories = categoriesData as Record<string, TermCategory>

/**
 * 获取指定分类的术语数据
 */
export const getTermsByCategory = (category: CategoryType | string): Term[] => {
  return termDataMap[category as CategoryType] || []
}

/**
 * 获取所有术语数据
 */
export const getAllTerms = (): Term[] => {
  return Object.values(termDataMap).flat()
}

/**
 * 根据ID获取术语
 */
export const getTermById = (id: string): Term | undefined => {
  return getAllTerms().find(term => term.id === id)
}

/**
 * 获取分类信息
 */
export const getCategory = (categoryId: string): TermCategory | undefined => {
  return categories[categoryId]
}

/**
 * 获取所有分类
 */
export const getAllCategories = (): TermCategory[] => {
  return Object.values(categories)
}

/**
 * 搜索术语
 */
export const searchTerms = (query: string, category?: CategoryType | string): Term[] => {
  const terms = category ? getTermsByCategory(category) : getAllTerms()
  const lowerQuery = query.toLowerCase().trim()
  
  if (!lowerQuery) return terms
  
  return terms.filter(term => 
    (term.word?.toLowerCase().includes(lowerQuery) || term.term?.toLowerCase().includes(lowerQuery)) ||
    term.definition.toLowerCase().includes(lowerQuery) ||
    term.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}

/**
 * 按难度筛选术语
 */
export const filterTermsByDifficulty = (terms: Term[], difficulty: string): Term[] => {
  if (difficulty === 'all') return terms
  return terms.filter(term => term.difficulty === difficulty)
}

/**
 * 按子分类筛选术语
 */
export const filterTermsBySubcategory = (terms: Term[], subcategory: string): Term[] => {
  if (subcategory === 'all') return terms
  return terms.filter(term => term.category === subcategory)
}

/**
 * 获取随机术语（用于测试）
 */
export const getRandomTerms = (count: number, category?: CategoryType | string): Term[] => {
  const terms = category ? getTermsByCategory(category) : getAllTerms()
  const shuffled = [...terms].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

/**
 * 生成测试题目
 */
export const generateQuizQuestions = (terms: Term[], count: number = 10) => {
  const selectedTerms = getRandomTerms(count, undefined)
  
  return selectedTerms.map((term, index) => {
    // 获取其他术语作为错误选项
    const otherTerms = terms.filter(t => t.id !== term.id)
    const wrongOptions = getRandomTerms(3, undefined)
      .filter(t => t.id !== term.id)
      .map(t => t.definition)
    
    // 确保有足够的选项
    while (wrongOptions.length < 3) {
      const randomTerm = otherTerms[Math.floor(Math.random() * otherTerms.length)]
      if (!wrongOptions.includes(randomTerm.definition)) {
        wrongOptions.push(randomTerm.definition)
      }
    }
    
    const options = [term.definition, ...wrongOptions.slice(0, 3)]
    const shuffledOptions = options.sort(() => Math.random() - 0.5)
    const correctAnswer = shuffledOptions.indexOf(term.definition)
    const termText = term.word || term.term || ''
    
    return {
      id: `quiz-${index + 1}`,
      termId: term.id,
      question: `"${termText}" 的中文含义是？`,
      options: shuffledOptions,
      correctAnswer,
      explanation: term.example || `${termText} 的含义是 ${term.definition}`
    }
  })
}