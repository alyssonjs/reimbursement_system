/** @vitest-environment jsdom */
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Pagination from '@/components/Pagination.vue'

describe('Pagination.vue', () => {
  const totalItems = 25;
  const pageSize = 10;
  const currentPage = 1;

  it('renders the correct page buttons', () => {
    const wrapper = mount(Pagination, {
      props: {
        totalItems,
        pageSize,
        currentPage
      }
    });

    const pageButtons = wrapper.findAll('button').filter(btn => btn.text().match(/^\d+$/));
    expect(pageButtons.length).toBe(3);
  });

  it('emits "update:currentPage" when clicking a page button', async () => {
    const wrapper = mount(Pagination, {
      props: {
        totalItems,
        pageSize,
        currentPage
      }
    });

    const pageButtons = wrapper.findAll('button').filter(btn => btn.text().match(/^\d+$/));
    await pageButtons[1].trigger('click');

    expect(wrapper.emitted('update:currentPage')).toBeTruthy();
    expect(wrapper.emitted('update:currentPage')?.[0]).toEqual([2]);
  });
});
