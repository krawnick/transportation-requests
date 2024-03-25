import {
  Table,
  TableActionConfig,
  TableColumnConfig,
  TableDataItem,
  withTableActions,
} from '@gravity-ui/uikit'

import { selectorAdminMode } from '../../redux/slices/admin/slice'
import { deleteItem, selectorGetData } from '../../redux/slices/data/slice'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { tranformDataForTable } from '../../utils/transformDataForTable'

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

export const TableRequest = () => {
  const admin = useAppSelector(selectorAdminMode)
  const data = useAppSelector(selectorGetData)

  const dispatch = useAppDispatch()

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
        handler: (item) => dispatch(deleteItem(item.number)),
        theme: 'danger',
      },
    ]
  }

  const emptyMessage = 'Данные отсутствуют'

  return (
    <TableActions
      columns={columns}
      data={tranformDataForTable(data)}
      wordWrap
      emptyMessage={emptyMessage}
      getRowActions={admin ? getRowActions : undefined}
    ></TableActions>
  )
}
