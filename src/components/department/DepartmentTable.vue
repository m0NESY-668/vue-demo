<template>
  <el-table :data="departments" v-loading="loading" border stripe>
    <el-table-column type="index" label="序号" width="60" align="center" />
    <el-table-column prop="name" label="部门名称" min-width="150" />
    <el-table-column prop="code" label="部门编码" width="120" />
    <el-table-column prop="manager" label="负责人" width="120" />
    <el-table-column prop="memberCount" label="成员数" width="100" align="center" />
    <el-table-column prop="status" label="状态" width="100">
      <template #default="{ row }">
        <el-tag :type="row.status === 'active' ? 'success' : 'danger'">
          {{ row.status === 'active' ? '启用' : '禁用' }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间" width="180" />
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
  departments: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['edit', 'delete'])
</script>