import { Plus } from '@gravity-ui/icons'
import { Button, Icon, Switch } from '@gravity-ui/uikit'
import cn from 'classnames'

import {
  adminModalShow,
  adminMode,
  selectorAdminMode,
} from '../../redux/slices/admin/slice'
import { useAppDispatch, useAppSelector } from '../../redux/store'

import styles from './ControlPanel.module.scss'

export const ControlPanel = () => {
  const dispatch = useAppDispatch()

  const admin = useAppSelector(selectorAdminMode)
  const changeAdminMode = () => dispatch(adminMode())

  return (
    <section
      className={cn(
        !admin ? styles.controlPanel : [styles.controlPanel, styles.admin]
      )}
    >
      {admin && (
        <Button
          size="xl"
          view="action"
          onClick={() => dispatch(adminModalShow({ type: 'add' }))}
        >
          <Icon data={Plus} size={16} />
          Добавить заявку
        </Button>
      )}
      <Switch
        className={styles.switch}
        size="l"
        checked={admin}
        onChange={changeAdminMode}
      >
        Администратор
      </Switch>
    </section>
  )
}
