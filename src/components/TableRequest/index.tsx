import {
  Table,
  TableActionConfig,
  TableColumnConfig,
  TableDataItem,
  Text,
  withTableActions,
} from '@gravity-ui/uikit'

import {
  adminModalShow,
  selectorAdminMode,
} from '../../redux/slices/admin/slice'
import { deleteItem, selectorGetData } from '../../redux/slices/data/slice'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { tranformDataForTable } from '../../utils/transformDataForTable'

import styles from './TableRequest.module.scss'

const columns: TableColumnConfig<TableDataItem>[] = [
  { id: 'number', name: 'Номер', align: 'center' },
  { id: 'date', name: 'Дата', align: 'center' },
  { id: 'company', name: 'Компания', align: 'center' },
  {
    id: 'responsible',
    name: 'Исполнитель',
    align: 'center',
  },
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
        handler: (selectItem) => {
          dispatch(
            adminModalShow({
              type: 'edit',
              selectItem: data.find(
                (item) => item.number === selectItem.number
              ),
            })
            // adminModalShow({ type: 'edit', selectItem: item as IRequestType })
          )
        },
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
    <>
      <Text variant="body-2">
        Количество заявок: <Text variant="body-3">{data.length}</Text>
      </Text>
      <TableActions
        className={styles.table}
        columns={columns}
        data={tranformDataForTable(data)}
        wordWrap
        emptyMessage={emptyMessage}
        getRowActions={admin ? getRowActions : undefined}
      ></TableActions>
    </>
  )
}
