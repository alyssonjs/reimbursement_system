/** @vitest-environment jsdom */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ExpenseForm from '@/components/ExpenseForm.vue';
import type { Project } from '@/types';

describe('ExpenseForm.vue', () => {
  let wrapper: any;
  const availableProjects: Project[] = [
    { id: 1, name: 'Projeto A', project_tags: [{ id: 10, tag: 'Tag A' }] },
    { id: 2, name: 'Projeto B', project_tags: [{ id: 20, tag: 'Tag B' }] }
  ];

  beforeEach(() => {
    wrapper = mount(ExpenseForm, {
      props: {
        availableProjects
      }
    });
  });

  it('renders the form with correct title', () => {
    expect(wrapper.find('h2').text()).toBe('Nova Solicitação de Reembolso');
  });

  it('does not emit "expense-created" if the amount is invalid', async () => {
    await wrapper.find('form').trigger('submit.prevent');
    
    const emitted = wrapper.emitted('expense-created');
    expect(emitted).toBeFalsy();
  });

  it('emits "expense-created" with valid data', async () => {
    await wrapper.find('input[type="text"]').setValue('100');
    await wrapper.find('input[type="date"]').setValue('2025-02-23');
    await wrapper.find('textarea').setValue('Descrição teste');
    await wrapper.find('select').setValue(1);

    await wrapper.find('form').trigger('submit.prevent');
    
    const emitted = wrapper.emitted('expense-created');
    expect(emitted).toBeTruthy();
    expect(emitted?.[0]?.[0] instanceof FormData).toBe(true);
  });

  it('emits "cancel" when the Cancel button is clicked', async () => {
    await wrapper.find('button[type="button"]').trigger('click');
    expect(wrapper.emitted('cancel')).toBeTruthy();
  });
});
