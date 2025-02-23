/** @vitest-environment jsdom */
import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import ProjectsList from '@/components/ProjectsList.vue'
import { useProjectStore } from '@/stores/project'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

vi.mock('axios')
const mockedAxiosGet = axios.get as any

const projectFormStub = { 
  name: 'ProjectForm', 
  template: '<div class="project-form-stub"></div>' 
}

describe('ProjectsList.vue', () => {
  let pinia: any
  let projectStore: any
  const sampleProjects = [
    {
      id: 1,
      name: 'Projeto A',
      description: 'Descrição A',
      budget: 1000,
      project_tags: [{ id: 10, tag: 'Tag A', allocated_budget: 500 }],
    },
    {
      id: 2,
      name: 'Projeto B',
      description: 'Descrição B',
      budget: 2000,
      project_tags: [{ id: 20, tag: 'Tag B', allocated_budget: 800 }],
    },
  ]

  mockedAxiosGet.mockResolvedValueOnce({ data: sampleProjects })

  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()

    pinia = createPinia()
    setActivePinia(pinia)

    projectStore = useProjectStore()
    projectStore.projects = sampleProjects
    projectStore.loading = false
    projectStore.error = null
    projectStore.fetchProjects = vi.fn().mockResolvedValue(undefined)

    const authStore = useAuthStore()
    authStore.role = 'manager'
  })

  it('renders the "Available Projects" title and create button', async () => {
    const wrapper = mount(ProjectsList, {
      global: { plugins: [pinia] },
    })
    await flushPromises()
    expect(wrapper.find('h1').text()).toBe('Projetos Disponíveis')
    expect(wrapper.find('button.btn-create').exists()).toBe(true)
  })

  it('renders project cards with the correct details', async () => {
    const wrapper = mount(ProjectsList, {
      global: { plugins: [pinia] },
    })
    await flushPromises()
    const cards = wrapper.findAll('.project-card')
    expect(cards.length).toBe(sampleProjects.length)

    const firstCard = cards[0]
    expect(firstCard.find('h2').text()).toBe(sampleProjects[0].name)
    expect(firstCard.find('.description').text()).toBe(sampleProjects[0].description)
    expect(firstCard.find('.budget').text()).toContain('R$')
    const tagSpans = firstCard.findAll('.project-tags .tag')
    expect(tagSpans.length).toBe(sampleProjects[0].project_tags.length)
    expect(tagSpans[0].text()).toContain(sampleProjects[0].project_tags[0].tag)
  })

  it('displays the loading indicator when loading is true', async () => {
    projectStore.loading = true
    const wrapper = mount(ProjectsList, {
      global: { plugins: [pinia] },
    })
    await flushPromises()
    const loadingDiv = wrapper.find('.loading')
    expect(loadingDiv.exists()).toBe(true)
    expect(loadingDiv.text()).toContain('Carregando projetos...')
  })

  it('displays error message when error is set', async () => {
    projectStore.error = 'Erro ao carregar projetos'
    const wrapper = mount(ProjectsList, {
      global: { plugins: [pinia] },
    })
    await flushPromises()
    const errorDiv = wrapper.find('.error')
    expect(errorDiv.exists()).toBe(true)
    expect(errorDiv.text()).toContain('Erro ao carregar projetos')
  })

  it('opens the creation form when clicking the create button', async () => {
    const wrapper = mount(ProjectsList, {
      global: {
        plugins: [pinia],
        stubs: {
          ProjectForm: projectFormStub
        }
      }
    })
    await flushPromises()

    expect(wrapper.findComponent({ name: 'ProjectForm' }).exists()).toBe(false)
    await wrapper.find('button.btn-create').trigger('click')
    await flushPromises()
    expect(wrapper.findComponent({ name: 'ProjectForm' }).exists()).toBe(true)
  })
})
