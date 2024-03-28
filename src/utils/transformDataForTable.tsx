import { dateTimeParse } from '@gravity-ui/date-utils'
import parsePhoneNumber from 'libphonenumber-js'

import { IRequestType } from '../interfaces/Request.interface'

// Трансформация данных для корректного отображения в таблице заявок.
export const tranformDataForTable = (data: IRequestType[]) => {
  return data.map((item) => {
    const phone = parsePhoneNumber(item.telephone.toString(), 'RU')?.number

    return {
      ...item,
      date: dateTimeParse(item.date)?.format('DD.MM.YYYY, HH:mm'),
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
