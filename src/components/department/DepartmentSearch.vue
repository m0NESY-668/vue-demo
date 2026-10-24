<template>
  <div class="search-form">
    <el-input
      v-model="searchForm.name"
      placeholder="请输入部门名称"
      clearable
      style="width: 200px"
    />
    <el-select v-model="searchForm.status" placeholder="状态" clearable style="width: 120px">
      <el-option label="启用" value="active" />
      <el-option label="禁用" value="inactive" />
    </el-select>
    <el-button type="primary" @click="handleSearch">
      <el-icon><Search /></el-icon>搜索
    </el-button>
    <el-button @click="handleReset">重置</el-button>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['search', 'reset'])

const searchForm = reactive({
  name: '',
  status: ''
})

const handleSearch = () => {
  emit('search', { ...searchForm })
}

const handleReset = () => {
  searchForm.name = ''
  searchForm.status = ''
  emit('reset')
}
</script>

<style scoped>
.search-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
</style>