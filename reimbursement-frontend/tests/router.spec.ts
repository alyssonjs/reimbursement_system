/** @vitest-environment jsdom */
import { describe, it, expect, beforeEach } from 'vitest'
import { nextTick, reactive } from 'vue'
import { createRouter, createMemoryHistory, type Router } from 'vue-router'
import { routes } from '../src/router'

let fakeAuthStore = reactive({
  token: '',
  role: ''
})

vi.mock('@/stores/auth', () => ({
  useAuthStore: () => fakeAuthStore
}))

let router: Router

describe('Router Navigation Guards', () => {
  beforeEach(async () => {
    fakeAuthStore.token = ''
    fakeAuthStore.role = ''

    router = createRouter({
      history: createMemoryHistory(),
      routes
    })

    await router.isReady()
  })

  it('redirects authenticated employee from Login to EmployeeExpenses', async () => {
    fakeAuthStore.token = 'validToken'
    fakeAuthStore.role = 'employee'
    await router.push({ name: 'Login' })
    await nextTick()

    expect(router.currentRoute.value.name).toBe('EmployeeExpenses')
  })

  it('redirects authenticated manager from Login to ManagerDashboard', async () => {
    fakeAuthStore.token = 'validToken'
    fakeAuthStore.role = 'manager'
    await router.push({ name: 'Login' })
    await nextTick()
    expect(router.currentRoute.value.name).toBe('ManagerDashboard')
  })
  
  it('redirects unauthenticated users from a protected route to Login', async () => {
    await router.push({ name: 'Home' })
    await nextTick()

    expect(router.currentRoute.value.name).toBe('Login')
  })

  it('allows authenticated employee to access Home route', async () => {
    fakeAuthStore.token = 'validToken'
    fakeAuthStore.role = 'manager'
    await router.push({ name: 'Home' })
    await nextTick()

    expect(router.currentRoute.value.name).toBe('Home')
  })

  it('allows authenticated employee to access EmployeeExpenses route', async () => {
    fakeAuthStore.token = 'validToken'
    fakeAuthStore.role = 'employee'
    await router.push({ name: 'EmployeeExpenses' })
    await nextTick()
    expect(router.currentRoute.value.name).toBe('EmployeeExpenses')
  })

  it('redirects employee trying to access ManagerDashboard to EmployeeExpenses', async () => {
    fakeAuthStore.token = 'validToken'
    fakeAuthStore.role = 'employee'
    await router.push({ name: 'ManagerDashboard' })
    await nextTick()
    expect(router.currentRoute.value.name).toBe('EmployeeExpenses')
  })

  it('allows authenticated manager to access ManagerDashboard route', async () => {
    fakeAuthStore.token = 'validToken'
    fakeAuthStore.role = 'manager'
    await router.push({ name: 'ManagerDashboard' })
    await nextTick()
    expect(router.currentRoute.value.name).toBe('ManagerDashboard')
  })

  it('redirects manager trying to access EmployeeExpenses to ManagerDashboard', async () => {
    fakeAuthStore.token = 'validToken'
    fakeAuthStore.role = 'manager'
    await router.push({ name: 'EmployeeExpenses' })
    await nextTick()
    expect(router.currentRoute.value.name).toBe('ManagerDashboard')
  })
})
