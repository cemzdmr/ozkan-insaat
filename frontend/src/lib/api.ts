import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// API Methods
export const apiClient = {
  // Pages
  getPages: (lang: string = 'TR') => api.get(`/pages?lang=${lang}`),
  getPage: (slug: string, lang: string = 'TR') => api.get(`/pages/${slug}?lang=${lang}`),
  
  // Projects
  getProjects: (params?: any) => api.get('/projects', { params }),
  getProject: (slug: string, lang: string = 'TR') => api.get(`/projects/${slug}?lang=${lang}`),
  
  // Categories
  getCategories: (lang: string = 'TR') => api.get(`/categories?lang=${lang}`),
  
  // References
  getReferences: (lang: string = 'TR') => api.get(`/references?lang=${lang}`),
  
  // Contact
  getContactInfo: (lang: string = 'TR') => api.get(`/contact/info?lang=${lang}`),
  submitContactForm: (data: any) => api.post('/contact/submit', data),
  
  // Settings
  getPublicSettings: () => api.get('/settings/public'),
  
  // Auth
  login: (credentials: { email: string; password: string }) => 
    api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me'),
  
  // Admin - Pages
  getAllPagesAdmin: () => api.get('/pages/admin/all'),
  createPage: (data: any) => api.post('/pages', data),
  updatePage: (id: string, data: any) => api.put(`/pages/${id}`, data),
  createSection: (pageId: string, data: any) => api.post(`/pages/${pageId}/sections`, data),
  updateSection: (id: string, data: any) => api.put(`/pages/sections/${id}`, data),
  deleteSection: (id: string) => api.delete(`/pages/sections/${id}`),
  reorderSections: (pageId: string, sections: any[]) => 
    api.post(`/pages/${pageId}/sections/reorder`, { sections }),
  
  // Admin - Projects
  getAllProjectsAdmin: () => api.get('/projects/admin/all'),
  createProject: (data: any) => api.post('/projects', data),
  updateProject: (id: string, data: any) => api.put(`/projects/${id}`, data),
  deleteProject: (id: string) => api.delete(`/projects/${id}`),
  
  // Admin - References
  getAllReferencesAdmin: () => api.get('/references/admin/all'),
  createReference: (data: any) => api.post('/references', data),
  updateReference: (id: string, data: any) => api.put(`/references/${id}`, data),
  deleteReference: (id: string) => api.delete(`/references/${id}`),
  
  // Admin - Media
  uploadMedia: (file: File, alt?: string) => {
    const formData = new FormData();
    formData.append('file', file);
    if (alt) formData.append('alt', alt);
    return api.post('/media/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getMedia: (params?: any) => api.get('/media', { params }),
  deleteMedia: (id: string) => api.delete(`/media/${id}`),
  
  // Admin - Contact
  getSubmissions: (archived?: boolean) => 
    api.get('/contact/submissions', { params: { archived } }),
  markSubmissionRead: (id: string) => api.patch(`/contact/submissions/${id}/read`),
  archiveSubmission: (id: string) => api.patch(`/contact/submissions/${id}/archive`),
  
  // Admin - Settings
  getAllSettings: () => api.get('/settings'),
  updateSetting: (key: string, value: any) => api.put(`/settings/${key}`, { value }),
  updateSettingsBulk: (settings: any) => api.post('/settings/bulk', settings),
};

export default api;
