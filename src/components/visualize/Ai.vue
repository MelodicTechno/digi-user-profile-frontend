<template>
  <div class="h-screen bg-gray-100 flex">
    <!-- 左侧历史对话 -->
    <div class="w-80 bg-white border-r border-gray-200 flex flex-col">
      <div class="p-4 border-b border-gray-200">
        <h2 class="text-xl font-bold text-gray-800">历史对话</h2>
      </div>
      <div class="flex-1 overflow-y-auto">
        <div
            v-for="(conversation, index) in history"
            :key="index"
            class="p-4 hover:bg-blue-50 cursor-pointer transition-colors"
            :class="{ 'bg-blue-50': activeIndex === index }"
            @click="switchConversation(index)"
        >
          <div class="text-sm font-medium text-gray-800 truncate">
            {{ conversation.title || '未命名对话' }}
          </div>
          <div class="text-xs text-gray-500 mt-1">
            {{ formatTime(conversation.time) }}
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧主对话区 -->
    <div class="flex-1 flex flex-col">
      <!-- 对话内容区 -->
      <div class="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white to-gray-50">
        <div
            v-for="(msg, index) in messages"
            :key="index"
            class="flex"
            :class="{ 'justify-end': msg.role === 'user' }"
        >
          <div
              class="max-w-2xl p-4 rounded-xl"
              :class="{
              'bg-blue-500 text-white': msg.role === 'user',
              'bg-white shadow-md': msg.role === 'assistant',
              'animate-pulse': msg.isLoading
            }"
          >
            <div v-if="msg.isLoading" class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
            </div>
            <template v-else>
              {{ msg.content }}
            </template>
          </div>
        </div>
      </div>

      <!-- 输入区 -->
      <div class="p-6 border-t border-gray-200 bg-white">
        <div class="max-w-4xl mx-auto flex items-center space-x-4">
          <input
              v-model="inputMessage"
              type="text"
              placeholder="输入您的问题..."
              class="flex-1 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @keyup.enter="sendMessage"
          >
          <button
              class="px-6 py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50"
              @click="sendMessage"
              :disabled="isSending"
          >
            <span v-if="!isSending">发送</span>
            <span v-else>发送中...</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getAIResponse } from '@/api/analyze'

// 对话数据
const history = ref([
  {
    title: '产品功能咨询',
    time: new Date(),
    messages: []
  },
  {
    title: '技术问题讨论',
    time: new Date(Date.now() - 3600*1000),
    messages: []
  }
])

const activeIndex = ref(0)
const inputMessage = ref('')
const isSending = ref(false)

// 当前对话消息
const messages = computed(() => history.value[activeIndex.value]?.messages || [])

// 切换对话
const switchConversation = (index) => {
  activeIndex.value = index
}

// 发送消息
const sendMessage = async () => {
  const content = inputMessage.value.trim()
  if (!content || isSending.value) return

  try {
    isSending.value = true

    // 添加用户消息
    messages.value.push({
      role: 'user',
      content: content,
      time: new Date()
    })

    // 添加加载状态
    messages.value.push({
      role: 'assistant',
      content: '',
      isLoading: true,
      time: new Date()
    })

    // 获取AI回复
    const response = await getAIResponse(content)

    // 更新最后一条消息
    messages.value.pop()
    messages.value.push({
      role: 'assistant',
      content: response.reply,
      time: new Date()
    })

  } catch (error) {
    console.error('请求失败:', error)
    messages.value.push({
      role: 'system',
      content: '服务暂时不可用，请稍后再试',
      isError: true,
      time: new Date()
    })
  } finally {
    inputMessage.value = ''
    isSending.value = false
  }
}

// 时间格式化
const formatTime = (date) => {
  return new Date(date).toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style>
/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* 加载动画 */
.delay-100 {
  animation-delay: 0.1s;
}
.delay-200 {
  animation-delay: 0.2s;
}
</style>