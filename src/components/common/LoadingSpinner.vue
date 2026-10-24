<template>
  <div class="loading-container" v-if="loading">
    <el-icon class="loading-icon"><Loading /></el-icon>
    <span class="loading-text">{{ text }}</span>
  </div>
</template>

<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: '加载中...'
  }
})
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.loading-icon {
  font-size: 40px;
  color: #409EFF;
  animation: rotate 1s linear infinite;
}

.loading-text {
  margin-top: 10px;
  color: #909399;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>