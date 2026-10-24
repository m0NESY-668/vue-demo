<template>
  <div class="page-container">
    <div class="page-title">
      <el-icon><UserFilled /></el-icon>
      员工管理
    </div>
    
    <div class="card">
      <EmployeeSearch
        :departments="departmentOptions"
        @search="handleSearch"
        @reset="loadEmployees"
      />
      <div class="toolbar">
        <el-button type="primary" @click="handleAdd">
          <el-icon><Plus /></el-icon>新增员工
        </el-button>
        <el-button type="success" @click="handleExport">
          <el-icon><Download /></el-icon>导出
        </el-button>
      </div>
      <EmployeeTable
        :employees="employeeList"
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
          @size-change="loadEmployees"
          @current-change="loadEmployees"
        />
      </div>
    </div>

    <EmployeeForm
      v-model="formVisible"
      :is-edit="isEdit"
      :edit-data="editData"
      :departments="departmentOptions"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import EmployeeSearch from '../components/employee/EmployeeSearch.vue'
import EmployeeTable from '../components/employee/EmployeeTable.vue'
import EmployeeForm from '../components/employee/EmployeeForm.vue'

const employeeList = ref([])
const loading = ref(false)
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)
const formVisible = ref(false)
const isEdit = ref(false)
const editData = ref({})

const departmentOptions = [
  { value: '教学部', label: '教学部' },
  { value: '市场部', label: '市场部' },
  { value: '技术部', label: '技术部' },
  { value: '行政部', label: '行政部' }
]

const mockData = [
  { id: 1, name: '张三', employeeNo: 'E001', department: '教学部', position: 'teacher', phone: '13800138001', email: 'zhangsan@talism.com', entryDate: '2024-01-15', status: 'active' },
  { id: 2, name: '李四', employeeNo: 'E002', department: '市场部', position: 'manager', phone: '13800138002', email: 'lisi@talism.com', entryDate: '2024-02-20', status: 'active' },
  { id: 3, name: '王五', employeeNo: 'E003', department: '技术部', position: 'teacher', phone: '13800138003', email: 'wangwu@talism.com', entryDate: '2024-03-10', status: 'active' },
  { id: 4, name: '赵六', employeeNo: 'E004', department: '行政部', position: 'assistant', phone: '13800138004', email: 'zhaoliu@talism.com', entryDate: '2023-12-01', status: 'inactive' },
  { id: 5, name: '孙七', employeeNo: 'E005', department: '教学部', position: 'assistant', phone: '13800138005', email: 'sunqi@talism.com', entryDate: '2024-04-05', status: 'active' }
]

const loadEmployees = () => {
  loading.value = true
  setTimeout(() => {
    employeeList.value = mockData
    total.value = mockData.length
    loading.value = false
  }, 500)
}

const handleSearch = (params) => {
  loading.value = true
  setTimeout(() => {
    employeeList.value = mockData.filter(item => {
      const matchName = !params.name || item.name.includes(params.name)
      const matchPhone = !params.phone || item.phone.includes(params.phone)
      const matchDept = !params.department || item.department === params.department
      const matchPos = !params.position || item.position === params.position
      return matchName && matchPhone && matchDept && matchPos
    })
    total.value = employeeList.value.length
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
  ElMessageBox.confirm(`确定删除员工 "${row.name}" 吗？`, '提示', {
    type: 'warning'
  }).then(() => {
    const index = employeeList.value.findIndex(item => item.id === row.id)
    if (index > -1) {
      employeeList.value.splice(index, 1)
      total.value--
    }
    ElMessage.success('删除成功')
  })
}

const handleExport = () => {
  ElMessage.success('导出成功')
}

const handleSubmit = (formData) => {
  if (isEdit.value) {
    const index = employeeList.value.findIndex(item => item.id === editData.value.id)
    if (index > -1) {
      employeeList.value[index] = { ...editData.value, ...formData }
    }
    ElMessage.success('修改成功')
  } else {
    const newEmployee = {
      id: Date.now(),
      ...formData
    }
    employeeList.value.unshift(newEmployee)
    total.value++
    ElMessage.success('新增成功')
  }
}

onMounted(() => {
  loadEmployees()
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