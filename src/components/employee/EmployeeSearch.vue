<template>
  <div class="search-form">
    <el-input v-model="searchForm.name" placeholder="员工姓名" clearable style="width: 150px" />
    <el-input v-model="searchForm.phone" placeholder="手机号" clearable style="width: 150px" />
    <el-select v-model="searchForm.department" placeholder="所属部门" clearable style="width: 150px">
      <el-option
        v-for="dept in departments"
        :key="dept.value"
        :label="dept.label"
        :value="dept.value"
      />
    </el-select>
    <el-select v-model="searchForm.position" placeholder="职位" clearable style="width: 120px">
      <el-option label="讲师" value="teacher" />
      <el-option label="助教" value="assistant" />
      <el-option label="班主任" value="manager" />
    </el-select>
    <el-button type="primary" @click="handleSearch">
      <el-icon><Search /></el-icon>搜索
    </el-button>
    <el-button @click="handleReset">重置</el-button>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const props = defineProps({
  departments: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['search', 'reset'])

const searchForm = reactive({
  name: '',
  phone: '',
  department: '',
  position: ''
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