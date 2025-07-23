export interface Term {
  id: string
  word?: string
  term?: string
  definition: string
  category: string
  pronunciation?: string
  example?: string
  difficulty?: 'beginner' | 'intermediate' | 'advanced' | '初级' | '中级' | '高级'
  tags?: string[]
}

export interface TermCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
  subcategories?: Record<string, string>
}

export interface QuizQuestion {
  id: string
  termId: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

export interface QuizResult {
  id: string
  category: CategoryType
  score: number
  correctAnswers: number
  totalQuestions: number
  duration: number
  completedAt: number
}

export type CategoryType = 'snooker' | 'medical' | 'it' | 'cryptocurrency' | 'academic'