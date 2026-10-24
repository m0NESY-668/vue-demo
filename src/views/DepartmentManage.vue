<template>
  <div class="page-container">
    <div class="page-title">
      <el-icon><OfficeBuilding /></el-icon>
      部门管理
    </div>
    
    <div class="card">
      <DepartmentSearch @search="handleSearch" @reset="loadDepartments" />
      <div class="toolbar">
        <el-button type="primary" @click="handleAdd">
          <el-icon><Plus /></el-icon>新增部门
        </el-button>
        <el-button type="danger" @click="handleBatchDelete">
          <el-icon><Delete /></el-icon>批量删除
        </el-button>
      </div>
      <DepartmentTable
        :departments="departmentList"
        :loading="loading"
        @edit="handleEdit"
        @delete="handleDelete"
      />
      <div class="pagination">
        <el-pagination
          v-model:current-page="page"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next"
          @size-change="loadDepartments"
          @current-change="loadDepartments"
        />
      </div>
    </div>

    <DepartmentForm
      v-model="formVisible"
      :is-edit="isEdit"
      :edit-data="editData"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import DepartmentSearch from '../components/department/DepartmentSearch.vue'
import DepartmentTable from '../components/department/DepartmentTable.vue'
import DepartmentForm from '../components/department/DepartmentForm.vue'

const departmentList = ref([])
const loading = ref(false)
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)
const formVisible = ref(false)
const isEdit = ref(false)
const editData = ref({})

// 模拟数据
const mockData = [
  { id: 1, name: '教学部', code: 'DEPT001', manager: '张老师', memberCount: 15, status: 'active', createTime: '2024-01-15' },
  { id: 2, name: '市场部', code: 'DEPT002', manager: '李老师', memberCount: 8, status: 'active', createTime: '2024-02-20' },
  { id: 3, name: '技术部', code: 'DEPT003', manager: '王老师', memberCount: 12, status: 'active', createTime: '2024-03-10' },
  { id: 4, name: '行政部', code: 'DEPT004', manager: '赵老师', memberCount: 5, status: 'inactive', createTime: '2024-01-05' }
]

const loadDepartments = () => {
  loading.value = true
  setTimeout(() => {
    departmentList.value = mockData
    total.value = mockData.length
    loading.value = false
  }, 500)
}

const handleSearch = (params) => {
  loading.value = true
  setTimeout(() => {
    departmentList.value = mockData.filter(item => {
      const matchName = !params.name || item.name.includes(params.name)
      const matchStatus = !params.status || item.status === params.status
      return matchName && matchStatus
    })
    total.value = departmentList.value.length
    loading.value = false
  }, 300)
}

const handleAdd = () => {
  isEdit.value = false
  editData.value = {}
  formVisible.value = true
}

const handleEdit = (row) => {
  isEdit.value = true
  editData.value = { ...row }
  formVisible.value = true
}

const handleDelete = (row) => {
  ElMessageBox.confirm(`确定删除部门 "${row.name}" 吗？`, '提示', {
    type: 'warning'
  }).then(() => {
    const index = departmentList.value.findIndex(item => item.id === row.id)
    if (index > -1) {
      departmentList.value.splice(index, 1)
      total.value--
    }
    ElMessage.success('删除成功')
  })
}

const handleBatchDelete = () => {
  ElMessage.info('批量删除功能')
}

const handleSubmit = (formData) => {
  if (isEdit.value) {
    const index = departmentList.value.findIndex(item => item.id === editData.value.id)
    if (index > -1) {
      departmentList.value[index] = { ...editData.value, ...formData }
    }
    ElMessage.success('修改成功')
  } else {
    const newDept = {
      id: Date.now(),
      ...formData,
      memberCount: 0,
      createTime: new Date().toISOString().split('T')[0]
    }
    departmentList.value.unshift(newDept)
    total.value++
    ElMessage.success('新增成功')
  }
}

onMounted(() => {
  loadDepartments()
})
</script>

<style scoped>
.toolbar {
  margin-bottom: 20px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>