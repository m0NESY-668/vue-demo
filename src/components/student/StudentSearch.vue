<template>
  <div class="search-form">
    <el-input v-model="searchForm.name" placeholder="学员姓名" clearable style="width: 150px" />
    <el-input v-model="searchForm.studentNo" placeholder="学号" clearable style="width: 150px" />
    <el-select v-model="searchForm.course" placeholder="所选课程" clearable style="width: 150px">
      <el-option label="Vue前端开发" value="vue" />
      <el-option label="Java后端开发" value="java" />
      <el-option label="Python数据分析" value="python" />
      <el-option label="UI设计" value="ui" />
    </el-select>
    <el-select v-model="searchForm.status" placeholder="学习状态" clearable style="width: 120px">
      <el-option label="在读" value="studying" />
      <el-option label="休学" value="suspended" />
      <el-option label="毕业" value="graduated" />
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
  studentNo: '',
  course: '',
  status: ''
})

const handleSearch = () => {
  emit('search', { ...searchForm })
}

const handleReset = () => {
  Object.keys(searchForm).forEach(key => searchForm[key] = '')
  emit('reset')
}
</script>

<style scoped>
.search-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
</style>