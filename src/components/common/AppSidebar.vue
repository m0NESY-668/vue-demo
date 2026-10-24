<template>
  <aside class="sidebar">
    <div class="logo">
      <el-icon class="logo-icon"><School /></el-icon>
      <span class="logo-text">TALIS</span>
    </div>
    <el-menu
      :default-active="activeMenu"
      class="sidebar-menu"
      router
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <el-menu-item index="/department">
        <el-icon><OfficeBuilding /></el-icon>
        <template #title>部门管理</template>
      </el-menu-item>
      <el-menu-item index="/employee">
        <el-icon><UserFilled /></el-icon>
        <template #title>员工管理</template>
      </el-menu-item>
      <el-menu-item index="/student">
        <el-icon><Reading /></el-icon>
        <template #title>学员管理</template>
      </el-menu-item>
    </el-menu>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeMenu = computed(() => route.path)
</script>

<style scoped>
.sidebar {
  width: 210px;
  background: #304156;
  flex-shrink: 0;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #2b3649;
}

.logo-icon {
  font-size: 28px;
  color: #409EFF;
}

.logo-text {
  font-size: 20px;
  color: #fff;
  font-weight: bold;
}

.sidebar-menu {
  border-right: none;
}
</style>