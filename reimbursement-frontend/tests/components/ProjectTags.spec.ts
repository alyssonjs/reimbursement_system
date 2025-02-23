/** @vitest-environment jsdom */

import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest'
import ProjectTags from '@/components/ProjectTags.vue';
import BaseInput from '@/components/form/BaseInput.vue';

describe('ProjectTags.vue', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(ProjectTags, {
      props: {
        tags: [{ tag: 'Marketing', allocated_budget: 5000 }]
      },
      global: {
        components: { BaseInput }
      }
    });
  });

  it('should render correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('h3').text()).toBe('Tags do Projeto');
  });

  it('should display the initial tag passed as prop', async () => {
    await flushPromises();

    const inputs = wrapper.findAllComponents(BaseInput);
    expect(inputs.length).toBe(2);
    expect(inputs[0].props('modelValue')).toBe('Marketing');
    expect(inputs[1].props('modelValue')).toBe(5000);
  });

  it('must add a new tag when clicking the button', async () => {
    await wrapper.find('.btn-add').trigger('click');
    await flushPromises();

    const inputs = wrapper.findAllComponents(BaseInput);
    expect(inputs.length).toBe(4);
  });

  it('must remove a tag by clicking the remove button', async () => {
    await wrapper.find('.btn-remove').trigger('click');
    await flushPromises();

    const inputs = wrapper.findAllComponents(BaseInput);
    expect(inputs.length).toBe(0);
  });

  it('must correctly update the tag value', async () => {
    const nameInput = wrapper.findAllComponents(BaseInput)[0];
    await nameInput.setValue('Nova Tag');
    await flushPromises();

    expect(wrapper.props('tags')[0].tag).toBe('Nova Tag');
  });

  it('should emit event when tag list changes', async () => {
    await wrapper.find('.btn-add').trigger('click');
    await flushPromises();

    expect(wrapper.emitted('update:tags')).toBeTruthy();
  });
});