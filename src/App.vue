<template>
  <div class="app-wrapper">
    <AppSidebar />
    <div class="main-container">
      <AppHeader />
      <div class="app-main">
        <Breadcrumb />
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
      <AppFooter />
    </div>
  </div>
</template>

<script setup>
import AppHeader from './components/common/AppHeader.vue'
import AppSidebar from './components/common/AppSidebar.vue'
import AppFooter from './components/common/AppFooter.vue'
import Breadcrumb from './components/common/Breadcrumb.vue'
</script>

<style scoped>
.app-wrapper {
  display: flex;
  height: 100vh;
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.app-main {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: #f0f2f5;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>