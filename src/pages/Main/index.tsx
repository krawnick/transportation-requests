import { ControlPanel, ModalWindow, TableRequest } from '../../components'

import styles from './Main.module.scss'

export const MainPage = () => {
  return (
    <main className={styles.wrapper}>
      <ModalWindow title="Edit DATA" open></ModalWindow>
      <ControlPanel />
      <TableRequest />
    </main>
  )
}
