/** @vitest-environment jsdom */
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ExpenseList from '@/components/ExpenseList.vue'
import type { Expense } from '@/types'

describe('ExpenseList.vue', () => {

  const sampleExpenses: Expense[] = [
    {
      id: 1,
      amount: 100,
      date: '2023-10-01',
      project_tag: { tag: 'Refeição' },
      project: { name: 'Projeto Teste' },
      status: 'pending'
    },
    {
      id: 2,
      amount: 200,
      date: '2023-10-02',
      project_tag: { tag: 'Transporte' },
      project: { name: 'Projeto B' },
      status: 'accepted'
    }
  ]

  it('renders the table with the correct headers', () => {
    const wrapper = mount(ExpenseList, {
      props: { expenses: sampleExpenses }
    })

    const headers = wrapper.findAll('th')
    expect(headers).toHaveLength(6)
    expect(headers[0].text()).toBe('Valor (R$)')
    expect(headers[1].text()).toBe('Data')
    expect(headers[2].text()).toBe('Tags')
    expect(headers[3].text()).toBe('Projeto')
    expect(headers[4].text()).toBe('Status')
    expect(headers[5].text()).toBe('Ações')
  })

  it('renders the correct number of rows for the expenses', () => {
    const wrapper = mount(ExpenseList, {
      props: { expenses: sampleExpenses }
    })

    const rows = wrapper.findAll('tbody tr')
    expect(rows).toHaveLength(sampleExpenses.length)
  })

  it('displays the expense data correctly including the Chip status', () => {
    const wrapper = mount(ExpenseList, {
      props: { expenses: sampleExpenses }
    })

    const rows = wrapper.findAll('tbody tr')
    sampleExpenses.forEach((expense, index) => {
      const cells = rows[index].findAll('td')
      expect(cells[0].text()).toBe(expense.amount.toString())
      expect(cells[1].text()).toBe(expense.date)
      expect(cells[2].text()).toBe(expense.project_tag.tag)
      expect(cells[3].text()).toBe(expense.project.name)
      // O Chip exibe o status com a primeira letra maiúscula:
      const expectedStatus = expense.status.charAt(0).toUpperCase() + expense.status.slice(1)
      expect(cells[4].text()).toContain(expectedStatus)
    })
  })

  it('emits the "edit" event with expense data when clicking the edit icon', async () => {
    const wrapper = mount(ExpenseList, {
      props: { expenses: sampleExpenses }
    })

    // Procura o ícone de edição (span com a classe "action-icon edit")
    const firstEditIcon = wrapper.find('tbody tr .action-icon.edit')
    await firstEditIcon.trigger('click')

    expect(wrapper.emitted('edit')).toBeTruthy()
    expect(wrapper.emitted('edit')?.[0]).toEqual([sampleExpenses[0]])
  })

  it('emits the "delete" event with expense data when clicking the delete icon', async () => {
    const wrapper = mount(ExpenseList, {
      props: { expenses: sampleExpenses }
    })

    // Procura o ícone de exclusão (span com a classe "action-icon delete")
    const firstDeleteIcon = wrapper.find('tbody tr .action-icon.delete')
    await firstDeleteIcon.trigger('click')

    expect(wrapper.emitted('delete')).toBeTruthy()
    expect(wrapper.emitted('delete')?.[0]).toEqual([sampleExpenses[0]])
  })
})
