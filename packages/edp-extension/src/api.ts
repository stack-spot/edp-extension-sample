export interface Responsible {
  name: string,
  email: string,
  phone: string,
}

export interface AccessRequest {
  id: string,
  workspaceId: string,
  type: AccessRequestType,
  owner: string,
  reason: string,
}

export type AccessRequestType = typeof accessRequestType[number]

export const accessRequestType = [
  'read-git-repo',
  'write-git-repo',
  'read-db',
  'write-db',
  'write-workspace',
] as const

export function getResponsible(workspaceId: string): Responsible | undefined {
  const stored = localStorage.getItem(`itau-extra:responsible:${workspaceId}`)
  return stored ? JSON.parse(stored) : undefined
}

export function setResponsible(workspaceId: string, responsible: Responsible) {
  localStorage.setItem(`itau-extra:responsible:${workspaceId}`, JSON.stringify(responsible))
}

export function getHealth(workspaceId: string): number | undefined {
  const stored = localStorage.getItem(`itau-extra:health:${workspaceId}`)
  return stored ? JSON.parse(stored) : undefined
}

export function setHealth(workspaceId: string, health: number) {
  localStorage.setItem(`itau-extra:health:${workspaceId}`, `${health}`)
}

export function getAllAccessRequests(): AccessRequest[] {
  const stored = localStorage.getItem('itau-extra:access-requests')
  return stored ? JSON.parse(stored) : []
}

export function getAccessRequestsByUserAndWorkspace(email: string, workspaceId: string) {
  const reqs = getAllAccessRequests()
  return reqs?.filter(r => r.owner === email && r.workspaceId === workspaceId)
}

export function saveAccessRequest(request: Omit<AccessRequest, 'id'>) {
  const reqs = getAllAccessRequests()
  localStorage.setItem('itau-extra:access-requests', JSON.stringify([...reqs, { ...request, id: `${Math.random()}` }]))
}
