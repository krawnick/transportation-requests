import {
  Table,
  TableActionConfig,
  TableColumnConfig,
  TableDataItem,
  withTableActions,
} from '@gravity-ui/uikit'

import {
  ERequestStatus,
  IRequestType,
} from '../../interfaces/Request.interface'
import { tranformDataForTable } from '../../utils/transformDataForTable'

const currentDate = new Intl.DateTimeFormat('ru-RU', {
  dateStyle: 'short',
  timeStyle: 'short',
}).format(new Date())

const columns: TableColumnConfig<TableDataItem>[] = [
  { id: 'number', name: 'Номер', align: 'center' },
  { id: 'date', name: 'Дата', align: 'center' },
  { id: 'company', name: 'Компания', align: 'center' },
  { id: 'responsible', name: 'Исполнитель', align: 'center' },
  { id: 'telephone', name: 'Телефон', align: 'center' },
  { id: 'comment', name: 'Комментарий', align: 'center' },
  { id: 'status', name: 'Состояние', align: 'center' },
  { id: 'code', name: 'Код ATI', align: 'center' },
]
const data: IRequestType[] = [
  {
    number: 1,
    date: currentDate,
    company: 'Hoff',
    responsible: 'Иванов И. В.',
    telephone: 9991234567,
    comment: 'Доставить по будням после 17:00',
    status: ERequestStatus.TRANSIT,
    code: 54321,
  },
]
const emptyMessage = 'Данные отсутствуют'

export const TableRequest = () => {
  const TableActions = withTableActions(Table)

  const getRowActions: (
    item: TableDataItem,
    index: number
  ) => TableActionConfig<TableDataItem>[] = () => {
    return [
      {
        text: 'Редактировать',
        handler: () => {},
      },
      {
        text: 'Удалить',
        handler: () => {},
        theme: 'danger',
      },
    ]
  }

  return (
    <TableActions
      columns={columns}
      data={tranformDataForTable(data)}
      wordWrap
      emptyMessage={emptyMessage}
      getRowActions={getRowActions}
    ></TableActions>
  )
}
