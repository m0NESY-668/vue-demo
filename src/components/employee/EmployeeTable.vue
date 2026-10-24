<template>
  <el-table :data="employees" v-loading="loading" border stripe>
    <el-table-column type="selection" width="55" align="center" />
    <el-table-column prop="name" label="姓名" min-width="100" />
    <el-table-column prop="employeeNo" label="工号" width="120" />
    <el-table-column prop="department" label="所属部门" width="150" />
    <el-table-column prop="position" label="职位" width="120">
      <template #default="{ row }">
        <el-tag>{{ positionMap[row.position] || row.position }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="phone" label="手机号" width="140" />
    <el-table-column prop="email" label="邮箱" min-width="180" />
    <el-table-column prop="entryDate" label="入职日期" width="120" />
    <el-table-column prop="status" label="状态" width="100">
      <template #default="{ row }">
        <el-tag :type="row.status === 'active' ? 'success' : 'info'">
          {{ row.status === 'active' ? '在职' : '离职' }}
        </el-tag>
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
  employees: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['edit', 'delete'])

const positionMap = {
  teacher: '讲师',
  assistant: '助教',
  manager: '班主任'
}
</script>