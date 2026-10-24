<template>
  <div class="page-container">
    <div class="page-title">
      <el-icon><Reading /></el-icon>
      学员管理
    </div>

    <StudentStats :stats="studentStats" />

    <div class="card">
      <StudentSearch @search="handleSearch" @reset="loadStudents" />
      <div class="toolbar">
        <el-button type="primary" @click="handleAdd">
          <el-icon><Plus /></el-icon>新增学员
        </el-button>
        <el-button type="warning" @click="handleBatchGraduate">
          <el-icon><Promotion /></el-icon>批量毕业
        </el-button>
      </div>
      <StudentTable
        :students="studentList"
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
          @size-change="loadStudents"
          @current-change="loadStudents"
        />
      </div>
    </div>

    <StudentForm
      v-model="formVisible"
      :is-edit="isEdit"
      :edit-data="editData"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import StudentSearch from '../components/student/StudentSearch.vue'
import StudentTable from '../components/student/StudentTable.vue'
import StudentForm from '../components/student/StudentForm.vue'
import StudentStats from '../components/student/StudentStats.vue'

const studentList = ref([])
const loading = ref(false)
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)
const formVisible = ref(false)
const isEdit = ref(false)
const editData = ref({})

const mockData = [
  { id: 1, name: '小明', studentNo: 'S001', gender: '男', age: 22, course: 'Vue前端开发', phone: '13900139001', enrollDate: '2024-03-01', status: 'studying', progress: 65 },
  { id: 2, name: '小红', studentNo: 'S002', gender: '女', age: 20, course: 'Java后端开发', phone: '13900139002', enrollDate: '2024-02-15', status: 'studying', progress: 80 },
  { id: 3, name: '小刚', studentNo: 'S003', gender: '男', age: 23, course: 'Python数据分析', phone: '13900139003', enrollDate: '2024-01-10', status: 'graduated', progress: 100 },
  { id: 4, name: '小丽', studentNo: 'S004', gender: '女', age: 21, course: 'UI设计', phone: '13900139004', enrollDate: '2024-04-01', status: 'studying', progress: 45 },
  { id: 5, name: '小华', studentNo: 'S005', gender: '男', age: 24, course: 'Vue前端开发', phone: '13900139005', enrollDate: '2023-12-01', status: 'suspended', progress: 30 },
  { id: 6, name: '小芳', studentNo: 'S006', gender: '女', age: 19, course: 'Java后端开发', phone: '13900139006', enrollDate: '2024-03-20', status: 'studying', progress: 55 }
]

const studentStats = computed(() => {
  return {
    total: studentList.value.length,
    studying: studentList.value.filter(s => s.status === 'studying').length,
    suspended: studentList.value.filter(s => s.status === 'suspended').length,
    graduated: studentList.value.filter(s => s.status === 'graduated').length
  }
})

const loadStudents = () => {
  loading.value = true
  setTimeout(() => {
    studentList.value = mockData
    total.value = mockData.length
    loading.value = false
  }, 500)
}

const handleSearch = (params) => {
  loading.value = true
  setTimeout(() => {
    studentList.value = mockData.filter(item => {
      const matchName = !params.name || item.name.includes(params.name)
      const matchNo = !params.studentNo || item.studentNo.includes(params.studentNo)
      const matchCourse = !params.course || item.course === params.course
      const matchStatus = !params.status || item.status === params.status
      return matchName && matchNo && matchCourse && matchStatus
    })
    total.value = studentList.value.length
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
  ElMessageBox.confirm(`确定删除学员 "${row.name}" 吗？`, '提示', {
    type: 'warning'
  }).then(() => {
    const index = studentList.value.findIndex(item => item.id === row.id)
    if (index > -1) {
      studentList.value.splice(index, 1)
      total.value--
    }
    ElMessage.success('删除成功')
  })
}

const handleBatchGraduate = () => {
  ElMessage.info('批量毕业功能')
}

const handleSubmit = (formData) => {
  if (isEdit.value) {
    const index = studentList.value.findIndex(item => item.id === editData.value.id)
    if (index > -1) {
      studentList.value[index] = { ...editData.value, ...formData }
    }
    ElMessage.success('修改成功')
  } else {
    const newStudent = {
      id: Date.now(),
      ...formData
    }
    studentList.value.unshift(newStudent)
    total.value++
    ElMessage.success('新增成功')
  }
}

onMounted(() => {
  loadStudents()
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