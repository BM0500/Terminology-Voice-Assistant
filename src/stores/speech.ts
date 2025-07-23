import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface SpeechSettings {
  rate: number
  pitch: number
  volume: number
  voice: string
  autoPlay: boolean
}

export const useSpeechStore = defineStore('speech', () => {
  const settings = ref<SpeechSettings>({
    rate: 1.0,
    pitch: 1.0,
    volume: 1.0,
    voice: '',
    autoPlay: false
  })

  const isPlaying = ref(false)
  const isPaused = ref(false)
  const currentTermIndex = ref(0)
  const availableVoices = ref<SpeechSynthesisVoice[]>([])

  // 语音合成实例
  const synth = window.speechSynthesis

  // 加载可用语音
  const loadVoices = () => {
    const voices = synth.getVoices()
    availableVoices.value = voices
    
    // 如果还没有选择语音，默认选择英文语音
    if (!settings.value.voice && voices.length > 0) {
      const englishVoice = voices.find(voice => voice.lang.includes('en'))
      if (englishVoice) {
        settings.value.voice = englishVoice.name
      } else {
        settings.value.voice = voices[0].name
      }
    }
  }

  // 语音合成
  const speak = (text: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (synth.speaking) {
        synth.cancel()
      }

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = settings.value.rate
      utterance.pitch = settings.value.pitch
      utterance.volume = settings.value.volume

      // 设置语音
      const selectedVoice = availableVoices.value.find(voice => voice.name === settings.value.voice)
      if (selectedVoice) {
        utterance.voice = selectedVoice
      }

      utterance.onstart = () => {
        isPlaying.value = true
        isPaused.value = false
      }

      utterance.onend = () => {
        isPlaying.value = false
        isPaused.value = false
        resolve()
      }

      utterance.onerror = (event) => {
        isPlaying.value = false
        isPaused.value = false
        console.error('Speech synthesis error:', event)
        reject(event)
      }

      synth.speak(utterance)
    })
  }

  // 暂停语音
  const pause = () => {
    if (synth.speaking && !synth.paused) {
      synth.pause()
      isPaused.value = true
    }
  }

  // 继续语音
  const resume = () => {
    if (synth.paused) {
      synth.resume()
      isPaused.value = false
    }
  }

  // 停止语音
  const stop = () => {
    if (synth.speaking) {
      synth.cancel()
      isPlaying.value = false
      isPaused.value = false
    }
  }

  // 暂停语音播放（别名）
  const pauseSpeaking = () => {
    pause()
  }

  // 停止语音播放（别名）
  const stopSpeaking = () => {
    stop()
  }

  // 连续播放多个术语
  const speakSequence = async (words: string[]) => {
    if (words.length === 0) return
    
    try {
      for (const word of words) {
        if (!isPlaying.value) break // 如果被停止，退出循环
        await speak(word)
        // 在每个词之间添加短暂停顿
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    } catch (error) {
      console.error('Error in speak sequence:', error)
    }
  }

  // 更新设置
  const updateSettings = (newSettings: Partial<SpeechSettings>) => {
    settings.value = { ...settings.value, ...newSettings }
    saveSettings()
  }

  // 保存设置到本地存储
  const saveSettings = () => {
    localStorage.setItem('speechSettings', JSON.stringify(settings.value))
  }

  // 从本地存储加载设置
  const loadSettings = () => {
    try {
      const savedSettings = localStorage.getItem('speechSettings')
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings)
        settings.value = { ...settings.value, ...parsed }
      }
    } catch (error) {
      console.error('Failed to load speech settings:', error)
    }
  }

  // 初始化
  const init = () => {
    loadSettings()
    loadVoices()
    
    // 监听语音变化
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices
    }
  }

  return {
    settings,
    isPlaying,
    isPaused,
    currentTermIndex,
    availableVoices,
    speak,
    pause,
    resume,
    stop,
    pauseSpeaking,
    stopSpeaking,
    speakSequence,
    updateSettings,
    loadVoices,
    init
  }
})