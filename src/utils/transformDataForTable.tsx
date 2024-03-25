import parsePhoneNumber from 'libphonenumber-js'

import { IRequestType } from '../interfaces/Request.interface'

export const tranformDataForTable = (data: IRequestType[]) => {
  return data.map((item) => {
    const phone = parsePhoneNumber(item.telephone.toString(), 'RU')?.number

    const transformDate = (date: string) => {
      return new Intl.DateTimeFormat('ru-RU', {
        dateStyle: 'short',
        timeStyle: 'short',
      }).format(new Date(date))
    }

    return {
      ...item,
      date: transformDate(item.date),
      telephone: (
        <a href={`tel: ${phone}`} style={{ color: 'inherit' }}>
          {phone}
        </a>
      ),
      code: (
        <a
          target="_blank"
          style={{ color: 'inherit' }}
          href={`https://ati.su/firms/${item.code}/info`}
          rel="noreferrer"
        >
          {item.code}
        </a>
      ),
    }
  })
}
