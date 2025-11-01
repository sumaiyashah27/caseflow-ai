import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'

export const api = axios.create({ baseURL })

export async function login(email: string, password: string) {
  const { data } = await api.post('/auth/login', { email, password })
  api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
  return data
}

export async function getDocuments() {
  const { data } = await api.get('/documents')
  return data
}

export async function createDocument(payload: { title: string, content: string, caseId?: number }) {
  const { data } = await api.post('/documents', payload)
  return data
}

export async function getCases() {
  const { data } = await api.get('/cases')
  return data
}

export async function createCase(payload: { name: string, status?: string }) {
  const { data } = await api.post('/cases', payload)
  return data
}

export async function search(q: string) {
  const { data } = await api.get('/search', { params: { q } })
  return data
}

export async function analyze(content: string) {
  const { data } = await api.post('/ai/analyze', { content })
  return data
}
