<template>
  <el-table :data="students" v-loading="loading" border stripe>
    <el-table-column type="selection" width="55" align="center" />
    <el-table-column prop="name" label="姓名" min-width="100" />
    <el-table-column prop="studentNo" label="学号" width="120" />
    <el-table-column prop="gender" label="性别" width="80" align="center">
      <template #default="{ row }">
        <el-tag :type="row.gender === '男' ? 'primary' : 'danger'" size="small">
          {{ row.gender }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="age" label="年龄" width="80" align="center" />
    <el-table-column prop="course" label="所选课程" min-width="150" />
    <el-table-column prop="phone" label="联系电话" width="140" />
    <el-table-column prop="enrollDate" label="报名日期" width="120" />
    <el-table-column prop="status" label="状态" width="100">
      <template #default="{ row }">
        <el-tag :type="statusTypeMap[row.status]">
          {{ statusMap[row.status] }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="progress" label="学习进度" width="180">
      <template #default="{ row }">
        <el-progress :percentage="row.progress" :status="row.progress === 100 ? 'success' : ''" />
      </template>
    </el-table-column>
    <el-table-column label="操作" width="180" fixed="right">
      <template #default="{ row }">
        <el-button type="primary" size="small" @click="$emit('edit', row)">编辑</el-button>
        <el-button type="danger" size="small" @click="$emit('delete', row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
defineProps({
  students: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['edit', 'delete'])

const statusMap = {
  studying: '在读',
  suspended: '休学',
  graduated: '毕业'
}

const statusTypeMap = {
  studying: 'primary',
  suspended: 'warning',
  graduated: 'success'
}
</script>