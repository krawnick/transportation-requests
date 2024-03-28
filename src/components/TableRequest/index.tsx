import {
  Loader,
  Table,
  TableActionConfig,
  TableColumnConfig,
  TableDataItem,
  Text,
  withTableActions,
} from '@gravity-ui/uikit'

import { ELoadingStatus } from '../../enum/Status.enum'
import {
  adminModalShow,
  selectorAdminMode,
} from '../../redux/slices/admin/slice'
import {
  deleteData,
  selectorGetData,
  selectorStatusLoadingData,
} from '../../redux/slices/data/slice'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { tranformDataForTable } from '../../utils/transformDataForTable'

import styles from './TableRequest.module.scss'

// Параметры таблицы
const columns: TableColumnConfig<TableDataItem>[] = [
  { id: 'id', name: 'Номер', align: 'center', width: '10%' },
  { id: 'date', name: 'Дата', align: 'center', width: '10%' },
  { id: 'company', name: 'Компания', align: 'center', width: '12%' },
  { id: 'responsible', name: 'Исполнитель', align: 'center', width: '12%' },
  { id: 'telephone', name: 'Телефон', align: 'center', width: '12%' },
  { id: 'comment', name: 'Комментарий', align: 'center', width: '18%' },
  { id: 'status', name: 'Состояние', align: 'center', width: '10%' },
  { id: 'code', name: 'Код ATI', align: 'center', width: '10%' },
]

export const TableRequest = () => {
  const admin = useAppSelector(selectorAdminMode)
  const data = useAppSelector(selectorGetData)
  const statusLoadingData = useAppSelector(selectorStatusLoadingData)

  const dispatch = useAppDispatch()

  // Добавление столбца с действиями
  const TableActions = withTableActions(Table)

  // Массив конфигураций действий для TableActions
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
              selectItem: data.find((item) => item.id === selectItem.id),
            })
          )
        },
      },
      {
        text: 'Удалить',
        handler: (item) => dispatch(deleteData(item.id)),
        theme: 'danger',
      },
    ]
  }

  const emptyMessage = 'Данные отсутствуют'

  if (statusLoadingData === ELoadingStatus.LOADING) {
    return <Loader />
  }

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
