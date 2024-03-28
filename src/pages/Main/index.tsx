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
import { useAppDispatch, useAppSelector } from '../../redux/store'

import styles from './Main.module.scss'

export const MainPage = () => {
  const dispatch = useAppDispatch()
  const adminModal = useAppSelector(selectorAdminModal)

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
