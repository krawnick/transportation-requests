import { Plus } from '@gravity-ui/icons'
import { Button, Icon, Switch } from '@gravity-ui/uikit'

import styles from './ControlPanel.module.scss'

export const ControlPanel = () => {
  return (
    <section className={styles.controlPanel}>
      <Button size="xl" view="action">
        <Icon data={Plus} size={16} />
        Добавить заявку
      </Button>
      <Switch size="l" checked={false}>
        Администратор
      </Switch>
    </section>
  )
}
