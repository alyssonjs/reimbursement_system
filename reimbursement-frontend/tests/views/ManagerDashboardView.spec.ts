/** @vitest-environment jsdom */
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ManagerDashboardView from '@/views/ManagerDashboardView.vue'
import axios from 'axios'

vi.mock('axios')
const mockedAxiosGet = axios.get as any

describe('ManagerDashboardView.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls axios.get on mount and retrieves expenses', async () => {
    const fakeExpenses = [{ id: 1, amount: 100, date: '2023-10-01' }]
    mockedAxiosGet.mockResolvedValueOnce({ data: fakeExpenses })

    mount(ManagerDashboardView, {
      global: {
        stubs: {
          ManagerDashboard: true
        }
      }
    })

    expect(mockedAxiosGet).toHaveBeenCalledWith('/api/expenses')
  })

  it('renders the ManagerDashboard component', async () => {
    mockedAxiosGet.mockResolvedValueOnce({ data: [] })

    const wrapper = mount(ManagerDashboardView, {
      global: {
        stubs: {
          ManagerDashboard: true
        }
      }
    })

    const managerDashboard = wrapper.findComponent({ name: 'ManagerDashboard' })
    expect(managerDashboard.exists()).toBe(true)
  })

  it('has the correct container class', async () => {
    mockedAxiosGet.mockResolvedValueOnce({ data: [] })

    const wrapper = mount(ManagerDashboardView, {
      global: {
        stubs: {
          ManagerDashboard: true
        }
      }
    })

    expect(wrapper.classes()).toContain('manager-dashboard-view')
  })
})
