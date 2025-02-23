/** @vitest-environment jsdom */
import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import ExpenseDetailsModal from '@/components/ExpenseDetailsModal.vue'
import type { Expense } from '@/types'

describe('ExpenseDetailsModal.vue', () => {

  const sampleExpense: Expense = {
    id: 1,
    amount: 1500,
    date: '2023-10-01',
    comment: '',
    description: 'Descrição teste',
    project: { id: 1, name: 'Projeto Teste' },
    project_tag: { id: 1, tag: 'Transporte' },
    status: 'pending',
    receipt_url: '',
    fiscal_coupon_url: '',
    user: { id: 1, name: 'Test User', email: 'test@example.com' }
  };
      
  const sampleProjects = [{ id: 1, name: 'Projeto Teste', project_tags: [] }];

  let wrapper: any;
  beforeEach(() => {
    wrapper = mount(ExpenseDetailsModal, {
      props: {
        expense: sampleExpense,
        availableProjects: sampleProjects
      },
      global: {
        stubs: {
          ModalWrapper: { template: '<div><slot /></div>' },
          ExpenseForm: true,
          Chip: {
            props: ['status'],
            setup(props: { status: string }) {
              return { status: props.status }
            },
            template: '<div class="chip">{{ status }}</div>'
          }
        }
      }
    });
  });

  it('displays details correctly', async () => {
    await flushPromises();
    const header = wrapper.find('h2');
    expect(header.exists()).toBe(true);
    expect(header.text()).toBe('Detalhes da Solicitação');
    expect(wrapper.html()).toContain('R$');
    expect(wrapper.html()).toContain(sampleExpense.date);
    expect(wrapper.html()).toContain(sampleExpense.description);
    expect(wrapper.html()).toContain(sampleExpense.project.name);
    expect(wrapper.html()).toContain(sampleExpense.project_tag.tag);
    expect(wrapper.html()).toContain('pending');
  });

  it('emits "close" when the close button is clicked', async () => {
    const closeButton = wrapper.find('button.btn-close');
    await closeButton.trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
  });
});
