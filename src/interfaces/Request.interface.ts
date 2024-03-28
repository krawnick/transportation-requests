import { ERequestStatus } from '../enum/Status.enum'

export interface IRequestType {
  id: number
  date: string
  company: string
  responsible: string
  telephone: string
  comment?: string
  status: ERequestStatus
  code: string
}
