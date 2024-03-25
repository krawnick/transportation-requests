import parsePhoneNumber from 'libphonenumber-js'

import { IRequestType } from '../interfaces/Request.interface'

export const tranformDataForTable = (data: IRequestType[]) => {
  console.log(parsePhoneNumber(data[0].telephone.toString(), 'RU'))

  return data.map((item) => {
    const phone = parsePhoneNumber(item.telephone.toString(), 'RU')?.number

    return {
      ...item,
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
