import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// Dynamically import all view components
const modules = import.meta.glob('../views/*.vue')

const routes: RouteRecordRaw[] = Object.keys(modules).map((filepath) => {
  const name = filepath.match(/\.\/views\/(.*)\.vue$/)?.[1]
  const path = name === 'Home' ? '/' : `/${name?.toLowerCase()}`

  return {
    path,
    name,
    component: modules[filepath],
  }
})

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
