/** @vitest-environment jsdom */
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import HomeView from '@/views/HomeView.vue'
import { useAuthStore } from '../../src/stores/auth'

vi.mock('@/stores/auth', () => ({
  useAuthStore: vi.fn()
}));

const routerLinkStub = {
  template: '<a><slot /></a>'
};

describe('HomeView.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders welcome message and login link when user is not authenticated', () => {
    (useAuthStore as any).mockReturnValue({
      token: null,
      role: null
    })

    const wrapper = mount(HomeView, {
      global: {
        stubs: {
          RouterLink: routerLinkStub
        }
      }
    })

    expect(wrapper.find('h1').text()).toBe('Bem-vindo ao Sistema de Reembolsos')

    expect(wrapper.text()).toContain('Login')

    expect(wrapper.text()).not.toContain('Minhas Solicitações')
    expect(wrapper.text()).not.toContain('Dashboard')
  })

  it('renders employee expenses link when user is authenticated as employee', () => {
    (useAuthStore as any).mockReturnValue({
      token: 'fake-token',
      role: 'employee'
    })

    const wrapper = mount(HomeView, {
      global: {
        stubs: {
          RouterLink: routerLinkStub
        }
      }
    })

    expect(wrapper.text()).toContain('Minhas Solicitações')
    expect(wrapper.text()).not.toContain('Login')
    expect(wrapper.text()).not.toContain('Dashboard')
  })

  it('renders manager dashboard link when user is authenticated as manager', () => {
    (useAuthStore as any).mockReturnValue({
      token: 'fake-token',
      role: 'manager'
    })

    const wrapper = mount(HomeView, {
      global: {
        stubs: {
          RouterLink: routerLinkStub
        }
      }
    })

    expect(wrapper.text()).toContain('Dashboard')
    expect(wrapper.text()).not.toContain('Login')
    expect(wrapper.text()).not.toContain('Minhas Solicitações')
  })
})
