/** @vitest-environment jsdom */
import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import ExpenseForm from '@/components/ExpenseForm.vue'

describe('ExpenseForm.vue', () => {
  let wrapper: any

  const sampleProjects = [
    {
      id: 1,
      name: 'Projeto Teste',
      description: 'Descrição do projeto',
      budget: 1000,
      project_tags: [
        { id: 1, tag: 'refeição', allocated_budget: 500 },
        { id: 2, tag: 'transporte', allocated_budget: 300 }
      ]
    }
  ]

  beforeEach(() => {
    wrapper = mount(ExpenseForm, {
      props: {
        availableProjects: sampleProjects
      }
    })
  })

  it('renders the form with correct title', () => {
    expect(wrapper.text()).toContain('Nova Solicitação de Reembolso')
  })

  it('updates availableTags when a project is selected', async () => {

    expect(wrapper.vm.availableTags).toEqual([])

    const projectSelect = wrapper.find('select')
    await projectSelect.setValue('1')

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.availableTags).toEqual(sampleProjects[0].project_tags)
  })

  it('emits "expense-created" with FormData and handles non-required fields when not provided', async () => {
    const amountInput = wrapper.find('input[type="number"]')
    await amountInput.setValue(200)
  
    const dateInput = wrapper.find('input[type="date"]')
    await dateInput.setValue('2025-02-15')
  
    const projectSelect = wrapper.find('select')
    await projectSelect.setValue('1')
    await wrapper.vm.$nextTick()
  
    await wrapper.find('form').trigger('submit.prevent')
  
    expect(wrapper.emitted()).toHaveProperty('expense-created')
    const emittedPayload = wrapper.emitted('expense-created')[0][0]
  
    expect(emittedPayload instanceof FormData).toBe(true)
    expect(emittedPayload.get('expense[amount]')).toBe('200')
    expect(emittedPayload.get('expense[date]')).toBe('2025-02-15')
    expect(emittedPayload.get('expense[project_id]')).toBe('1')

    expect(emittedPayload.get('expense[description]')).toBe('')
    expect(emittedPayload.get('expense[project_tag_id]')).toBe('')
  })

  it('does not submit the form with a valid value if the required field "amount" is not filled in.', async () => {

    const dateInput = wrapper.find('input[type="date"]')
    await dateInput.setValue('2025-02-15')
  
    const projectSelect = wrapper.find('select')
    await projectSelect.setValue('1')
    await wrapper.vm.$nextTick()
  
    const descriptionTextarea = wrapper.find('textarea')
    await descriptionTextarea.setValue('Evento sem valor')
  
    await wrapper.find('form').trigger('submit.prevent')
  
    const emitted = wrapper.emitted('expense-created')
    expect(emitted).toBeTruthy()
    
    const formData = emitted[0][0]

    expect(formData.get('expense[amount]')).toBeTruthy()
  })
  

  it('emits "cancel" when the Cancel button is clicked', async () => {
    const cancelButton = wrapper.find('button[type="button"]')
    await cancelButton.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('cancel')
  })
})
