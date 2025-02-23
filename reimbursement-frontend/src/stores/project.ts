import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './auth';
import type { Project, ProjectInput } from '../types'

const apiUrl = import.meta.env.VITE_API_URL;

export const useProjectStore = defineStore('project', {
  state: () => ({
    projects: [] as Project[],
    loading: false,
    error: '' as string | null,
  }),
  actions: {
    async fetchProjects() {
      this.loading = true;
      try {
        const authStore = useAuthStore();
        const response = await axios.get(`${apiUrl}/v1/manager/projects`, {
          headers: { Authorization: `Bearer ${authStore.token}` },
        });
        this.projects = response.data;
      } catch (err: any) {
        this.error = err.response?.data?.error || err.message;
      } finally {
        this.loading = false;
      }
    },
    async createProject(projectData: ProjectInput) {
      this.loading = true;
      try {
        const authStore = useAuthStore();
        const response = await axios.post(`${apiUrl}/v1/manager/projects`, projectData, {
          headers: { Authorization: `Bearer ${authStore.token}` },
        });
        this.projects.push(response.data);
        await this.fetchProjects();
      } catch (err: any) {
        this.error = err.response?.data?.error || err.message;
      } finally {
        this.loading = false;
      }
    },
    async updateProject(projectId: number, projectData: Partial<ProjectInput>) {
      this.loading = true;
      try {
        const authStore = useAuthStore();
        const response = await axios.put(`${apiUrl}/v1/manager/projects/${projectId}`, projectData, {
          headers: { Authorization: `Bearer ${authStore.token}` },
        });
        const index = this.projects.findIndex(project => project.id === projectId);
        if (index !== -1) {
          this.projects[index] = response.data;
        }
      } catch (err: any) {
        this.error = err.response?.data?.error || err.message;
      } finally {
        this.loading = false;
      }
    },
    async deleteProject(projectId: number) {
      this.loading = true;
      try {
        const authStore = useAuthStore();
        await axios.delete(`${apiUrl}/v1/manager/projects/${projectId}`, {
          headers: { Authorization: `Bearer ${authStore.token}` },
        });
        this.projects = this.projects.filter(project => project.id !== projectId);
      } catch (err: any) {
        this.error = err.response?.data?.error || err.message;
      } finally {
        this.loading = false;
      }
    },
    async fetchEmployeeProjects() {
      this.loading = true;
      try {
        const authStore = useAuthStore();
        const response = await axios.get(`${apiUrl}/v1/employee/projects`, {
          headers: { Authorization: `Bearer ${authStore.token}` },
        });
        this.projects = response.data;
      } catch (err: any) {
        this.error = err.response?.data?.error || err.message;
      } finally {
        this.loading = false;
      }
    },
    async fetchEmployeeProject(projectId: number): Promise<Project | undefined> {
      this.loading = true;
      try {
        const authStore = useAuthStore();
        const response = await axios.get(`${apiUrl}/v1/employee/projects/${projectId}`, {
          headers: { Authorization: `Bearer ${authStore.token}` },
        });
        return response.data;
      } catch (err: any) {
        this.error = err.response?.data?.error || err.message;
      } finally {
        this.loading = false;
      }
      return undefined;
    },
  },
});
