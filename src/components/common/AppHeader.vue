<template>
  <header class="app-header">
    <div class="header-left">
      <el-icon class="toggle-btn" @click="toggleSidebar"><Fold /></el-icon>
      <h1 class="system-title">TALIS 智能学习辅助系统</h1>
    </div>
    <div class="header-right">
      <el-badge :value="3" class="message-badge">
        <el-icon><Bell /></el-icon>
      </el-badge>
      <el-dropdown @command="handleCommand">
        <span class="user-info">
          <el-avatar :size="32" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <span class="username">管理员</span>
          <el-icon><ArrowDown /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile">个人中心</el-dropdown-item>
            <el-dropdown-item command="settings">系统设置</el-dropdown-item>
            <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const isCollapsed = ref(false)

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const handleCommand = (command) => {
  if (command === 'logout') {
    alert('退出登录')
  }
}
</script>

<style scoped>
.app-header {
  height: 60px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.toggle-btn {
  font-size: 20px;
  cursor: pointer;
  color: #606266;
}

.system-title {
  font-size: 18px;
  color: #303133;
  font-weight: 600;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.message-badge {
  font-size: 20px;
  cursor: pointer;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.username {
  font-size: 14px;
  color: #606266;
}
</style>