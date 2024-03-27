export enum ERequestStatus {
  NEW = 'Новая',
  TRANSIT = 'В работе',
  DONE = 'Выполнено',
}

export interface IRequestType {
  number: number
  date: string
  company: string
  responsible: string
  telephone: string
  comment?: string
  status: ERequestStatus
  code: string
}
