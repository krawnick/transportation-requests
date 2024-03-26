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
  const showModal = useAppSelector(selectorAdminModal)

  return (
    <main className={styles.wrapper}>
      <ModalWindow
        open={showModal.show}
        onClose={() => dispatch(adminModalClose())}
        title={
          showModal.type === 'add' ? 'Добавить заявку' : 'Редактировать заявку'
        }
      >
        <FormRequest />
      </ModalWindow>
      <ControlPanel />
      <TableRequest />
    </main>
  )
}
