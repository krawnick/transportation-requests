import { Modal, ModalProps, Text } from '@gravity-ui/uikit'

import styles from './ModalWindow.module.scss'

interface IModalTypes extends ModalProps {
  title?: string
}

export const ModalWindow = ({ title, children, ...props }: IModalTypes) => {
  return (
    <Modal className={styles.modal} {...props}>
      <div className={styles.content}>
        {title && (
          <Text className={styles.title} variant="header-2">
            {title}
          </Text>
        )}
        {children}
      </div>
    </Modal>
  )
}
