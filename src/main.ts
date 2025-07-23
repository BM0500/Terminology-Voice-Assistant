import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { pinia } from './stores'
import { useUserStore } from './stores/user'
import { useLearningStore } from './stores/learning'
import { useSpeechStore } from './stores/speech'

const app = createApp(App)

app.use(pinia)
app.use(router)

// 初始化stores
const userStore = useUserStore()
const learningStore = useLearningStore()
const speechStore = useSpeechStore()

// 加载本地数据
userStore.initUser()
learningStore.loadFromLocalStorage()
speechStore.init()

app.mount('#app')
