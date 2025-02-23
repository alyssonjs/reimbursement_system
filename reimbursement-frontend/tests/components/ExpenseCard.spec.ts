/** @vitest-environment jsdom */
import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import ExpenseCard from '@/components/ExpenseCard.vue'
import Chip from '@/components/Chip.vue'
import type { Expense } from '@/types'

vi.mock('@/stores/auth', () => ({
  useAuthStore: () => ({
    role: 'employee'
  })
}));

describe('ExpenseCard.vue', () => {
  const sampleExpense: Expense = {
    id: 1,
    amount: 1500,
    date: '2023-10-01',
    project: { id: 1, name: 'Projeto Teste' },
    project_tag: { id: 1, tag: 'Transporte' },
    status: 'pending',
    user: { name: 'João Silva', id: 1 , email: 'test@example.com'}
  };

  it('renders information correctly', () => {
    const wrapper = mount(ExpenseCard, {
      props: { expense: sampleExpense }
    });

    expect(wrapper.find('.project-name').text()).toBe('Projeto Teste');
    expect(wrapper.find('.date').text()).toBe('2023-10-01');
    expect(wrapper.find('.tag').text()).toBe('Transporte');

    const chip = wrapper.findComponent(Chip);
    expect(chip.exists()).toBe(true);
  });

  it('emits "edit" when card is clicked', async () => {
    const wrapper = mount(ExpenseCard, {
      props: { expense: sampleExpense }
    });

    await wrapper.trigger('click');
    expect(wrapper.emitted('edit')).toBeTruthy();
    expect(wrapper.emitted('edit')?.[0]).toEqual([sampleExpense]);
  });

  it('emits "delete" when the delete icon is clicked', async () => {
    const wrapper = mount(ExpenseCard, {
      props: { expense: sampleExpense }
    });

    const deleteIcon = wrapper.find('.delete-icon');
    expect(deleteIcon.exists()).toBe(true);
    await deleteIcon.trigger('click');
    expect(wrapper.emitted('delete')).toBeTruthy();
    expect(wrapper.emitted('delete')?.[0]).toEqual([sampleExpense]);
  });
});
