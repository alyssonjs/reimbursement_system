/** @vitest-environment jsdom */

import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import EmployeeDashboard from '@/components/EmployeeDashboard.vue'
import ExpenseForm from '@/components/ExpenseForm.vue'
import ExpenseList from '@/components/ExpenseList.vue'

describe('EmployeeDashboard.vue', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(EmployeeDashboard, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: true,
            createSpy: vi.fn,
            initialState: {
              expense: {
                expenses: [
                  {
                    id: 1,
                    amount: 100,
                    date: '2025-01-01',
                    project_tag: { tag: '123'},
                    status: 'pending',
                    project: {
                        id: 1,
                        name: 'Test Project',
                        description: 'Project description',
                        budget: 1000,
                      },
                  },
                ],
                loading: false,
                error: null
              },
              project: {
                projects: [
                  {
                    id: 1,
                    name: 'Test Project',
                    description: 'Project description',
                    budget: 1000,
                    project_tags: [
                      { id: 1, tag: 'meal', allocated_budget: 500 }
                    ]
                  }
                ],
                loading: false,
                error: null
              }
            }
          })
        ]
      }
    })
  })

  it('fetches employee expenses and projects on mount', () => {
    const expenseStore = wrapper.vm.expenseStore
    const projectStore = wrapper.vm.projectStore
    expect(expenseStore.fetchEmployeeExpenses).toHaveBeenCalled()
    expect(projectStore.fetchEmployeeProjects).toHaveBeenCalled()
  })

  it('renders the dashboard with an ExpenseList and a button to open ExpenseForm', () => {
    expect(wrapper.text()).toContain('Minhas Solicitações')
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    const expenseList = wrapper.findComponent(ExpenseList)
    expect(expenseList.exists()).toBe(true)
  })

  it('opens the ExpenseForm modal when the open button is clicked', async () => {
    expect(wrapper.findComponent(ExpenseForm).exists()).toBe(false)
    await wrapper.find('button').trigger('click')
    expect(wrapper.findComponent(ExpenseForm).exists()).toBe(true)
  })
})
