/** @vitest-environment jsdom */
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import EmployeeExpensesView from '@/views/EmployeeExpensesView.vue'
import axios from 'axios'

vi.mock('axios')
const mockedAxiosGet = axios.get as any

describe('EmployeeExpensesView.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls axios.get on mounted and retrieves expenses', async () => {
    const fakeExpenses = [{ id: 1, amount: 50, date: '2023-11-01' }]
    mockedAxiosGet.mockResolvedValueOnce({ data: fakeExpenses })

    mount(EmployeeExpensesView, {
      global: {
        stubs: {
          EmployeeDashboard: true
        }
      }
    })


    expect(mockedAxiosGet).toHaveBeenCalledWith('/api/expenses')
  })

  it('renders the EmployeeDashboard component', async () => {
    mockedAxiosGet.mockResolvedValueOnce({ data: [] })

    const wrapper = mount(EmployeeExpensesView, {
      global: {
        stubs: {
          EmployeeDashboard: true
        }
      }
    })

    const employeeDashboard = wrapper.findComponent({ name: 'EmployeeDashboard' })
    expect(employeeDashboard.exists()).toBe(true)
  })

  it('has the correct container class', async () => {
    mockedAxiosGet.mockResolvedValueOnce({ data: [] })

    const wrapper = mount(EmployeeExpensesView, {
      global: {
        stubs: {
          EmployeeDashboard: true
        }
      }
    })

    expect(wrapper.classes()).toContain('employee-expenses-view')
  })
})
