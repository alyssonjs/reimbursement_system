/** @vitest-environment jsdom */
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { nextTick, reactive } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { routes } from '@/router'

const createTestRouter = () => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes,
  })

  router.beforeEach((to, _from, next) => {
    const authStore = fakeAuthStore
    const isAuthenticated = !!authStore.token
    const userRole = authStore.role

    if (to.meta.requiresAuth && !isAuthenticated) {
      return next({ name: 'Login' })
    }

    if (to.name === 'Login' && isAuthenticated) {
      if (userRole === 'manager') {
        return next({ name: 'ManagerDashboard' })
      } else if (userRole === 'employee') {
        return next({ name: 'EmployeeExpenses' })
      }
    }

    if (to.meta.role && to.meta.role !== userRole) {
      if (userRole === 'manager') {
        return next({ name: 'ManagerDashboard' })
      } else if (userRole === 'employee') {
        return next({ name: 'EmployeeExpenses' })
      }
    }

    next()
  })

  return router
}

let fakeAuthStore = reactive({
  token: '',
  role: ''
})

vi.mock('@/stores/auth', () => ({
  useAuthStore: () => fakeAuthStore
}))

describe('Router Navigation Guards', () => {
  let testRouter: ReturnType<typeof createTestRouter>

  beforeEach(async () => {
    fakeAuthStore.token = ''
    fakeAuthStore.role = ''

    testRouter = createTestRouter()

  })

  it('redirects authenticated employee from Login to EmployeeExpenses', async () => {
    fakeAuthStore.token = 'validToken'
    fakeAuthStore.role = 'employee'
    await testRouter.push({ name: 'Login' })
    expect(testRouter.currentRoute.value.name).toBe('EmployeeExpenses')
  })

  it('redirects authenticated manager from Login to ManagerDashboard', async () => {
    fakeAuthStore.token = 'validToken'
    fakeAuthStore.role = 'manager'
    await testRouter.push({ name: 'Login' })
    await nextTick()
    expect(testRouter.currentRoute.value.name).toBe('ManagerDashboard')
  })

  it('redirects unauthenticated users from a protected route to Login', async () => {
    await testRouter.push({ name: 'Home' })
    await nextTick()
    expect(testRouter.currentRoute.value.name).toBe('Login')
  })

  it('allows authenticated user to access Home route', async () => {
    fakeAuthStore.token = 'validToken'
    fakeAuthStore.role = 'manager'
    await testRouter.push({ name: 'Home' })
    await nextTick()
    expect(testRouter.currentRoute.value.name).toBe('Home')
  })

  it('allows authenticated employee to access EmployeeExpenses route', async () => {
    fakeAuthStore.token = 'validToken'
    fakeAuthStore.role = 'employee'
    await testRouter.push({ name: 'EmployeeExpenses' })
    await nextTick()
    expect(testRouter.currentRoute.value.name).toBe('EmployeeExpenses')
  })

  it('redirects employee trying to access ManagerDashboard to EmployeeExpenses', async () => {
    fakeAuthStore.token = 'validToken'
    fakeAuthStore.role = 'employee'
    await testRouter.push({ name: 'ManagerDashboard' })
    await nextTick()
    expect(testRouter.currentRoute.value.name).toBe('EmployeeExpenses')
  })

  it('allows authenticated manager to access ManagerDashboard route', async () => {
    fakeAuthStore.token = 'validToken'
    fakeAuthStore.role = 'manager'
    await testRouter.push({ name: 'ManagerDashboard' })
    await nextTick()
    expect(testRouter.currentRoute.value.name).toBe('ManagerDashboard')
  })

  it('redirects manager trying to access EmployeeExpenses to ManagerDashboard', async () => {
    fakeAuthStore.token = 'validToken'
    fakeAuthStore.role = 'manager'
    await testRouter.push({ name: 'EmployeeExpenses' })
    await nextTick()
    expect(testRouter.currentRoute.value.name).toBe('ManagerDashboard')
  })
})
