<template>
  <div class="min-h-screen flex flex-col bg-neutral-light font-inter">
    <!-- 导航栏 -->
    <nav class="bg-white shadow-md sticky top-0 z-50">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-graduation-cap text-primary text-2xl"></i>
          <h1 class="text-xl font-bold text-neutral">英语术语学习系统</h1>
        </div>
        <!-- 导航菜单 -->
        <div class="hidden md:flex items-center gap-6">
          <router-link to="/" class="text-neutral-dark hover:text-primary transition-colors duration-300 text-primary font-medium">
            首页
          </router-link>
          <router-link to="/learning-center" class="text-neutral-dark hover:text-primary transition-colors duration-300">
            学习中心
          </router-link>
          <router-link to="/test" class="text-neutral-dark hover:text-primary transition-colors duration-300">
            测试
          </router-link>
        </div>
        <div class="flex items-center gap-3">
          <router-link to="/help" class="btn-outline">
            <i class="fa-solid fa-question-circle"></i>
            <span class="hidden md:inline">帮助</span>
          </router-link>
          <router-link to="/login" class="btn-primary">
            <i class="fa-solid fa-user"></i>
            <span class="hidden md:inline">登录</span>
          </router-link>
        </div>
      </div>
      <!-- 移动端菜单 -->
      <div class="md:hidden border-t border-gray-200">
        <div class="container mx-auto px-4 py-2 flex justify-around">
          <router-link to="/" class="flex flex-col items-center py-2 text-xs text-neutral-dark hover:text-primary text-primary">
            <i class="fa-solid fa-home text-lg mb-1"></i>
            首页
          </router-link>
          <router-link to="/snooker" class="flex flex-col items-center py-2 text-xs text-neutral-dark hover:text-primary">
            <i class="fa-solid fa-8ball text-lg mb-1"></i>
            斯诺克
          </router-link>
          <router-link to="/medical" class="flex flex-col items-center py-2 text-xs text-neutral-dark hover:text-primary">
            <i class="fa-solid fa-stethoscope text-lg mb-1"></i>
            医疗
          </router-link>
          <router-link to="/it" class="flex flex-col items-center py-2 text-xs text-neutral-dark hover:text-primary">
            <i class="fa-solid fa-laptop-code text-lg mb-1"></i>
            IT
          </router-link>
        </div>
      </div>
    </nav>

    <!-- 主内容区 -->
    <main class="flex-grow">
      <div class="container mx-auto px-4 py-8">
        <!-- 欢迎区 -->
        <section class="mb-10 text-center">
          <h2 class="text-[clamp(1.8rem,5vw,3rem)] font-bold text-neutral mb-4 text-shadow">
            英语术语学习系统
          </h2>
          <p class="text-neutral-dark max-w-2xl mx-auto text-lg">
            通过专业语音朗读，轻松掌握各领域英语术语的正确发音，提升你的专业英语水平和交流能力。
          </p>
        </section>

        <!-- 功能特色 -->
        <section class="mb-12">
          <h3 class="text-2xl font-bold text-neutral text-center mb-8">系统特色</h3>
          <div class="space-y-6">
            <!-- 智能语音朗读 -->
            <div class="bg-white rounded-xl shadow-md p-8 card-hover">
              <div class="flex items-center gap-6">
                <div class="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full flex-shrink-0">
                  <i class="fa-solid fa-volume-high text-primary text-3xl"></i>
                </div>
                <div class="flex-1">
                  <h4 class="text-2xl font-bold text-neutral mb-3">智能语音朗读</h4>
                  <p class="text-neutral-dark text-lg">基于Web Speech API，支持多种发音人选择，语速、音调可调节</p>
                </div>
              </div>
            </div>
            
            <!-- 分类学习 -->
            <div class="bg-white rounded-xl shadow-md p-8 card-hover">
              <div class="flex items-center gap-6">
                <div class="inline-flex items-center justify-center w-20 h-20 bg-secondary/10 rounded-full flex-shrink-0">
                  <i class="fa-solid fa-layer-group text-secondary text-3xl"></i>
                </div>
                <div class="flex-1">
                  <h4 class="text-2xl font-bold text-neutral mb-3">分类学习</h4>
                  <p class="text-neutral-dark text-lg">涵盖斯诺克、医疗、IT等多个专业领域，术语分类清晰</p>
                </div>
              </div>
            </div>
            
            <!-- 学习进度 -->
            <div class="bg-white rounded-xl shadow-md p-8 card-hover">
              <div class="flex items-center gap-6">
                <div class="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full flex-shrink-0">
                  <i class="fa-solid fa-chart-line text-primary text-3xl"></i>
                </div>
                <div class="flex-1">
                  <h4 class="text-2xl font-bold text-neutral mb-3">学习进度</h4>
                  <p class="text-neutral-dark text-lg">实时跟踪学习进度，收藏重点术语，个性化学习体验</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 术语分类导航 -->
        <section class="mb-12">
          <h3 class="text-2xl font-bold text-neutral text-center mb-8">选择学习领域</h3>
          
          <!-- 主要领域 -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <router-link to="/snooker" class="bg-white rounded-xl shadow-md p-8 text-center card-hover group">
              <div class="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 group-hover:bg-green-200 transition-colors">
                <i class="fa-solid fa-8ball text-green-600 text-3xl"></i>
              </div>
              <h4 class="text-2xl font-bold text-neutral mb-4">斯诺克术语</h4>
              <p class="text-neutral-dark mb-4">学习斯诺克比赛、设备、技术等专业术语</p>
              <div class="flex items-center justify-center gap-2 text-primary font-medium">
                <span>开始学习</span>
                <i class="fa-solid fa-arrow-right"></i>
              </div>
            </router-link>
            <router-link to="/medical" class="bg-white rounded-xl shadow-md p-8 text-center card-hover group">
              <div class="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6 group-hover:bg-red-200 transition-colors">
                <i class="fa-solid fa-stethoscope text-red-600 text-3xl"></i>
              </div>
              <h4 class="text-2xl font-bold text-neutral mb-4">医疗术语</h4>
              <p class="text-neutral-dark mb-4">掌握医学、解剖学、疾病等医疗专业术语</p>
              <div class="flex items-center justify-center gap-2 text-primary font-medium">
                <span>开始学习</span>
                <i class="fa-solid fa-arrow-right"></i>
              </div>
            </router-link>
            <router-link to="/it" class="bg-white rounded-xl shadow-md p-8 text-center card-hover group">
              <div class="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6 group-hover:bg-blue-200 transition-colors">
                <i class="fa-solid fa-laptop-code text-blue-600 text-3xl"></i>
              </div>
              <h4 class="text-2xl font-bold text-neutral mb-4">IT术语</h4>
              <p class="text-neutral-dark mb-4">学习编程、网络、数据库等IT技术术语</p>
              <div class="flex items-center justify-center gap-2 text-primary font-medium">
                <span>开始学习</span>
                <i class="fa-solid fa-arrow-right"></i>
              </div>
            </router-link>
          </div>
          
          <!-- 更多领域 -->
          <div class="bg-white rounded-xl shadow-md p-6">
            <div class="text-center mb-6">
              <h4 class="text-xl font-bold text-neutral mb-2">更多领域</h4>
              <p class="text-neutral-dark">探索更多专业术语领域</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <router-link to="/cryptocurrency" class="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 card-hover group border border-yellow-200">
                <div class="flex items-center gap-4">
                  <div class="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full group-hover:bg-yellow-200 transition-colors">
                    <i class="fa-brands fa-bitcoin text-yellow-600 text-2xl"></i>
                  </div>
                  <div class="flex-1">
                    <h5 class="text-lg font-bold text-neutral mb-2">加密货币术语</h5>
                    <p class="text-neutral-dark text-sm">区块链、Web3、DeFi等新兴技术术语</p>
                  </div>
                  <i class="fa-solid fa-arrow-right text-primary group-hover:translate-x-1 transition-transform"></i>
                </div>
              </router-link>
              <router-link to="/academic" class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 card-hover group border border-blue-200">
                <div class="flex items-center gap-4">
                  <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                    <i class="fa-solid fa-file-text text-blue-600 text-2xl"></i>
                  </div>
                  <div class="flex-1">
                    <h5 class="text-lg font-bold text-neutral mb-2">学术论文术语</h5>
                    <p class="text-neutral-dark text-sm">研究方法、统计学、学术写作等术语</p>
                  </div>
                  <i class="fa-solid fa-arrow-right text-primary group-hover:translate-x-1 transition-transform"></i>
                </div>
              </router-link>
            </div>
            <div class="text-center mt-6">
              <router-link to="/learning-center" class="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium">
                <span>查看学习中心</span>
                <i class="fa-solid fa-external-link-alt"></i>
              </router-link>
            </div>
          </div>
        </section>

        <!-- 学习统计 -->
        <section class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-xl font-bold text-neutral mb-6 flex items-center gap-2">
            <i class="fa-solid fa-chart-pie text-primary"></i>
            学习统计
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="bg-neutral-light rounded-lg p-5 text-center">
              <div class="text-3xl font-bold text-primary mb-2">{{ stats.totalTerms }}</div>
              <div class="text-neutral-dark">总术语数</div>
            </div>
            <div class="bg-neutral-light rounded-lg p-5 text-center">
              <div class="text-3xl font-bold text-secondary mb-2">{{ stats.learnedTerms }}</div>
              <div class="text-neutral-dark">已学习</div>
            </div>
            <div class="bg-neutral-light rounded-lg p-5 text-center">
              <div class="text-3xl font-bold text-green-600 mb-2">{{ stats.favoriteTerms }}</div>
              <div class="text-neutral-dark">已收藏</div>
            </div>
            <div class="bg-neutral-light rounded-lg p-5 text-center">
              <div class="text-3xl font-bold text-primary mb-2">{{ Math.round(stats.progress) }}%</div>
              <div class="text-neutral-dark">学习进度</div>
            </div>
          </div>
          <div class="mt-6">
            <div class="flex justify-between mb-2">
              <span class="text-neutral-dark">掌握程度</span>
              <span class="text-primary font-medium">初级</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3">
              <div class="bg-primary h-3 rounded-full transition-all duration-500" :style="{ width: stats.progress + '%' }"></div>
            </div>
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
import { computed, onMounted } from 'vue'
import { useLearningStore } from '../stores/learning'

// 导入术语数据
import snookerData from '../data/snooker.json'
import medicalData from '../data/medical.json'
import itData from '../data/it.json'
import cryptocurrencyData from '../data/cryptocurrency.json'
import academicData from '../data/academic.json'

const learningStore = useLearningStore()

// 加载本地存储数据
onMounted(() => {
  learningStore.loadFromLocalStorage()
})

// 学习统计
const stats = computed(() => {
  const allStats = learningStore.getLearningStats()
  
  // 计算所有术语的实际总数
  const totalTermsCount = snookerData.length + medicalData.length + itData.length + cryptocurrencyData.length + academicData.length
  
  return {
    totalTerms: totalTermsCount,
    learnedTerms: allStats.learnedTerms,
    favoriteTerms: allStats.favoriteTerms,
    progress: totalTermsCount > 0 ? Math.round((allStats.learnedTerms / totalTermsCount) * 100) : 0
  }
})
</script>