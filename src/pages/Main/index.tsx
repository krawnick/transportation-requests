import { useEffect } from 'react'

import {
  ControlPanel,
  FormRequest,
  ModalWindow,
  TableRequest,
} from '../../components'
import {
  adminModalClose,
  selectorAdminModal,
} from '../../redux/slices/admin/slice'
import { getData } from '../../redux/slices/data/slice'
import { useAppDispatch, useAppSelector } from '../../redux/store'

import styles from './Main.module.scss'

export const MainPage = () => {
  const dispatch = useAppDispatch()
  const adminModal = useAppSelector(selectorAdminModal)

  useEffect(() => {
    dispatch(getData())
  }, [])

  return (
    <main className={styles.wrapper}>
      <ModalWindow
        open={adminModal.show}
        onClose={() => dispatch(adminModalClose())}
        title={
          adminModal.type === 'add'
            ? 'Добавление заявки'
            : 'Редактирование заявки'
        }
      >
        <FormRequest edit={adminModal.type === 'edit'} />
      </ModalWindow>
      <ControlPanel />
      <TableRequest />
    </main>
  )
}
