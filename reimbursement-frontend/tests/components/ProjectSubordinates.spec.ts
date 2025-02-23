/** @vitest-environment jsdom */
import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import ProjectSubordinates from '@/components/ProjectSubordinates.vue'

describe('ProjectSubordinates.vue', () => {
  let wrapper: any;
  const sampleUsers = [
    { id: 1, name: 'João', email: 'joao@example.com' },
    { id: 2, name: 'Maria', email: 'maria@example.com' }
  ];
  const initialSelected = [1];

  beforeEach(() => {
    wrapper = mount(ProjectSubordinates, {
      props: {
        subordinates: sampleUsers,
        subordinateIds: initialSelected
      }
    });
  });

  it('displays the title "Associate Subordinates"', () => {
    expect(wrapper.find('h3').text()).toBe('Associar Subordinados');
  });

  it('renders a checkbox for each user', async () => {
    await flushPromises();
    const checkboxes = wrapper.findAll('input[type="checkbox"]');
    expect(checkboxes.length).toBe(sampleUsers.length);
  });

  it('reflects selections correctly and emits "update:subordinateIds" event', async () => {
    expect(wrapper.vm.selectedSubordinateIds).toEqual([1]);

    const checkboxes = wrapper.findAll('input[type="checkbox"]');
    await checkboxes[1].setChecked(true);
    await flushPromises();

    expect(wrapper.emitted()['update:subordinateIds']).toBeTruthy();

    const emittedValue = wrapper.emitted()['update:subordinateIds'][0][0];
    expect(emittedValue).toEqual([1, 2]);
  });
});
