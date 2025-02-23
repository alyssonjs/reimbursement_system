/** @vitest-environment jsdom */
import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import ManagerDashboardView from '@/views/ManagerDashboardView.vue'
import axios from 'axios'

vi.mock('axios')
const mockedAxiosGet = axios.get as any

describe('ManagerDashboardView.vue', () => {
  let pinia

  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
    pinia = createPinia()
    setActivePinia(pinia)
  })
  
  it('calls axios.get on mount and retrieves expenses', async () => {
    const fakeExpenses = [
      { id: 1,
        amount: 100,
        date: '2023-10-01',
        project: { name: 'test' },
        project_tag: { tag: 'test' },
        status: 'accepted'
      }
    ]
    mockedAxiosGet.mockResolvedValueOnce({ data: fakeExpenses })
  
    const wrapper = mount(ManagerDashboardView, {
      global: {
        plugins: [pinia],
        stubs: {
          ManagerDashboard: false
        }
      }
    })
  
    await flushPromises()
  
    expect(mockedAxiosGet).toHaveBeenCalledTimes(2)
    expect(mockedAxiosGet).toHaveBeenCalledWith("http://localhost:3000/api/v1/manager/projects", {
      headers: { Authorization: "Bearer " }
    })
    
  })

  it('renders the ManagerDashboard component', async () => {
    mockedAxiosGet.mockResolvedValueOnce({ data: [] })

    const wrapper = mount(ManagerDashboardView, {
      global: {
        plugins: [pinia],
        stubs: {
          ManagerDashboard: true
        }
      }
    })

    await flushPromises()

    const managerDashboard = wrapper.findComponent({ name: 'ManagerDashboard' })
    expect(managerDashboard.exists()).toBe(true)
  })

  it('has the correct container class', async () => {
    mockedAxiosGet.mockResolvedValueOnce({ data: [] })

    const wrapper = mount(ManagerDashboardView, {
      global: {
        plugins: [pinia],
        stubs: {
          ManagerDashboard: true
        }
      }
    })

    await flushPromises()

    expect(wrapper.classes()).toContain('manager-dashboard-view')
  })
})
