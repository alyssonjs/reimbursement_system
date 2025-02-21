/** @vitest-environment jsdom */
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import LoginView from '@/views/LoginView.vue'

const pushMock = vi.fn()
let loginMock = vi.fn()
let authRole = 'employee'

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: pushMock
  })
}))

vi.mock('@/stores/auth', () => ({
  useAuthStore: () => ({
    login: loginMock,
    get role() {
      return authRole
    }
  })
}))

describe('LoginView.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    loginMock = vi.fn(() => Promise.resolve())
    authRole = 'employee'
  })

  it('renders the login form correctly', () => {
    const wrapper = mount(LoginView)
    expect(wrapper.find('h1').text()).toBe('Login')
    expect(wrapper.find('input#email').exists()).toBe(true)
    expect(wrapper.find('input#password').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').text()).toBe('Entrar')
  })

  it('calls authStore.login and navigates to employee expenses on successful login (employee role)', async () => {
    authRole = 'employee'
    const wrapper = mount(LoginView)

    await wrapper.find('input#email').setValue('user@example.com')
    await wrapper.find('input#password').setValue('password123')
    await wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()

    expect(loginMock).toHaveBeenCalledWith('user@example.com', 'password123')
    expect(pushMock).toHaveBeenCalledWith('/employee/expenses')
  })

  it('calls authStore.login and navigates to manager dashboard on successful login (manager role)', async () => {
    authRole = 'manager'
    const wrapper = mount(LoginView)

    await wrapper.find('input#email').setValue('manager@example.com')
    await wrapper.find('input#password').setValue('managerpass')
    await wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()

    expect(loginMock).toHaveBeenCalledWith('manager@example.com', 'managerpass')
    expect(pushMock).toHaveBeenCalledWith('/manager/dashboard')
  })

  it('displays an error message if login fails', async () => {
    loginMock.mockRejectedValueOnce('Invalid credentials')
    const wrapper = mount(LoginView)

    await wrapper.find('input#email').setValue('user@example.com')
    await wrapper.find('input#password').setValue('wrongpassword')
    await wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('p.error').text()).toBe('Invalid credentials')
  })
})
