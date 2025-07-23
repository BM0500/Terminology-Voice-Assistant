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
            <span class="hidden md:inline">返回首页</span>
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
            <i class="fa-solid fa-question-circle text-primary mr-4"></i>
            帮助中心
          </h2>
          <p class="text-neutral-dark max-w-2xl mx-auto text-lg">
            欢迎使用英语术语学习系统！这里为您提供常见问题解答和使用指南。
          </p>
        </section>

        <!-- FAQ 部分 -->
        <section class="max-w-4xl mx-auto">
          <div class="space-y-6">
            <div 
              v-for="(faq, index) in faqs" 
              :key="index" 
              class="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button 
                @click="toggleFaq(index)"
                class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 class="text-lg font-semibold text-neutral">{{ faq.question }}</h3>
                <i 
                  :class="[
                    'fa-solid transition-transform duration-200',
                    openFaqs.includes(index) ? 'fa-chevron-up' : 'fa-chevron-down'
                  ]"
                  class="text-primary"
                ></i>
              </button>
              <div 
                v-show="openFaqs.includes(index)"
                class="px-6 pb-4 border-t border-gray-100"
              >
                <div class="pt-4 text-neutral-dark leading-relaxed" v-html="faq.answer"></div>
              </div>
            </div>
          </div>
        </section>

        <!-- 联系支持 -->
        <section class="mt-12 bg-white rounded-xl shadow-md p-8 text-center">
          <h3 class="text-2xl font-bold text-neutral mb-4">
            <i class="fa-solid fa-headset text-primary mr-2"></i>
            需要更多帮助？
          </h3>
          <p class="text-neutral-dark mb-6">
            如果您的问题没有在上面找到答案，请通过以下方式联系我们：
          </p>
          <div class="flex flex-col md:flex-row justify-center gap-4">
            <a href="mailto:support@terminology-learning.com" class="btn-primary">
              <i class="fa-solid fa-envelope mr-2"></i>
              发送邮件
            </a>
            <a href="#" class="btn-outline">
              <i class="fa-brands fa-github mr-2"></i>
              GitHub Issues
            </a>
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
import { ref } from 'vue'

// FAQ 数据
const faqs = ref([
  {
    question: "什么是英语术语学习系统？",
    answer: "英语术语学习系统是一个专业的在线学习平台，专注于帮助用户掌握各个领域的英语专业术语。系统提供智能语音朗读、分类学习、进度跟踪等功能，涵盖斯诺克、医疗、IT、加密货币、学术论文等多个专业领域。"
  },
  {
    question: "如何使用语音朗读功能？",
    answer: "在任何术语页面，您可以点击术语旁边的<i class='fa-solid fa-volume-high text-primary'></i>图标来听取标准发音。系统基于Web Speech API技术，支持多种发音人选择，您还可以调节语速和音调以适应个人学习需求。"
  },
  {
    question: "系统包含哪些学习领域？",
    answer: "目前系统包含以下专业领域：<br/>• <strong>斯诺克术语</strong>：比赛规则、设备、技术等专业术语<br/>• <strong>医疗术语</strong>：医学、解剖学、疾病诊断等术语<br/>• <strong>IT术语</strong>：编程、网络、数据库等技术术语<br/>• <strong>加密货币</strong>：区块链、Web3、DeFi等新兴技术术语<br/>• <strong>学术论文</strong>：研究方法、统计学、学术写作等术语"
  },
  {
    question: "如何跟踪我的学习进度？",
    answer: "系统会自动记录您的学习进度，包括：<br/>• 已学习的术语数量<br/>• 收藏的重点术语<br/>• 整体学习进度百分比<br/>• 各领域的掌握程度<br/><br/>所有数据都保存在本地浏览器中，确保您的学习记录不会丢失。"
  },
  {
    question: "可以离线使用吗？",
    answer: "系统的核心功能可以离线使用，包括浏览术语、查看定义等。但语音朗读功能需要网络连接才能正常工作，因为它依赖于浏览器的Web Speech API。"
  },
  {
    question: "如何收藏重要术语？",
    answer: "在术语详情页面，点击<i class='fa-solid fa-heart text-red-500'></i>图标即可收藏该术语。收藏的术语会在学习中心的收藏列表中显示，方便您随时复习重点内容。"
  },
  {
    question: "系统支持哪些浏览器？",
    answer: "系统支持所有现代浏览器，包括：<br/>• Chrome 60+<br/>• Firefox 55+<br/>• Safari 11+<br/>• Edge 79+<br/><br/>为了获得最佳体验，建议使用最新版本的Chrome或Firefox浏览器。"
  },
  {
    question: "数据安全和隐私保护",
    answer: "我们非常重视您的隐私和数据安全：<br/>• 所有学习数据都存储在您的本地浏览器中<br/>• 我们不会收集或存储您的个人学习信息<br/>• 系统不需要注册账号即可使用<br/>• 您可以随时清除本地数据"
  },
  {
    question: "如何反馈问题或建议？",
    answer: "我们欢迎您的反馈和建议：<br/>• 发送邮件至：support@terminology-learning.com<br/>• 在GitHub上提交Issue<br/>• 通过社交媒体联系我们<br/><br/>您的反馈将帮助我们不断改进系统功能和用户体验。"
  }
])

// 控制FAQ展开状态
const openFaqs = ref<number[]>([0]) // 默认展开第一个

const toggleFaq = (index: number) => {
  const currentIndex = openFaqs.value.indexOf(index)
  if (currentIndex > -1) {
    openFaqs.value.splice(currentIndex, 1)
  } else {
    openFaqs.value.push(index)
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

.btn-primary {
  @apply bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-300 inline-flex items-center gap-2;
}

.btn-outline {
  @apply border-2 border-primary text-primary px-6 py-2 rounded-lg font-medium hover:bg-primary hover:text-white transition-colors duration-300 inline-flex items-center gap-2;
}
</style>