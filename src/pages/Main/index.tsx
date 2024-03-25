import { ControlPanel, TableRequest } from '../../components'

import styles from './Main.module.scss'

export const MainPage = () => {
  return (
    <main className={styles.wrapper}>
      <ControlPanel />
      <TableRequest />
    </main>
  )
}
