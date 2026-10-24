import { createRouter, createWebHistory } from 'vue-router'
import DepartmentManage from '../views/DepartmentManage.vue'
import EmployeeManage from '../views/EmployeeManage.vue'
import StudentManage from '../views/StudentManage.vue'

const routes = [
  {
    path: '/',
    redirect: '/department'
  },
  {
    path: '/department',
    name: 'Department',
    component: DepartmentManage,
    meta: { title: '部门管理' }
  },
  {
    path: '/employee',
    name: 'Employee',
    component: EmployeeManage,
    meta: { title: '员工管理' }
  },
  {
    path: '/student',
    name: 'Student',
    component: StudentManage,
    meta: { title: '学员管理' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - TALIS系统` : 'TALIS 智能学习辅助系统'
  next()
})

export default router