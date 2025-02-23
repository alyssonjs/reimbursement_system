/** @vitest-environment jsdom */
import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import ExpenseList from '@/components/ExpenseList.vue'
import { useAuthStore } from '@/stores/auth'
import type { Expense } from '@/types'

describe('ExpenseList.vue', () => {
  let pinia

  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()

    pinia = createPinia()
    setActivePinia(pinia)

    const authStore = useAuthStore()
    authStore.role = 'employee'
  })

  const sampleExpenses: Expense[] = [
    {
      id: 1,
      amount: 100,
      date: '2023-10-01',
      project_tag: { id: 1, tag: 'Refeição' },
      project: { id: 1, name: 'Projeto Teste' },
      status: 'pending',
      user: { name: 'Test User', id: 1, email: 'tesst@user.email' }
    },
    {
      id: 2,
      amount: 200,
      date: '2023-10-02',
      project_tag: { id: 2, tag: 'Transporte' },
      project: { id: 1, name: 'Projeto B' },
      status: 'accepted',
      user: { name: 'Test User', id: 2, email: 'tesst@user.email' }
    }
  ]

  it('renders the correct number of expense cards', async () => {
    const wrapper = mount(ExpenseList, {
      global: { plugins: [pinia] },
      props: { expenses: sampleExpenses }
    })

    await flushPromises()

    const cards = wrapper.findAll('.expense-card')

    expect(cards.length).toBe(sampleExpenses.length)
  })

  it('emits the "delete" event with expense data when clicking the delete icon', async () => {
    const wrapper = mount(ExpenseList, {
      global: { plugins: [pinia] },
      props: { expenses: sampleExpenses }
    })

    await flushPromises()

    const firstCard = wrapper.find('.expense-card')
    expect(firstCard.exists()).toBe(true)

    const firstDeleteIcon = firstCard.find('.delete-icon')
    expect(firstDeleteIcon.exists()).toBe(true) 

    await firstDeleteIcon.trigger('click')

    expect(wrapper.emitted('delete')).toBeTruthy()
    expect(wrapper.emitted('delete')?.[0]).toEqual([sampleExpenses[0]])
  })
})
