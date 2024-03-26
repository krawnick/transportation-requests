import { Modal, ModalProps, Text } from '@gravity-ui/uikit'

import styles from './ModalWindow.module.scss'

interface IModalTypes extends ModalProps {
  title?: string
}

export const ModalWindow = ({ title, children, ...props }: IModalTypes) => {
  return (
    <Modal
      className={styles.modal}
      contentClassName={styles.content}
      {...props}
    >
      {title && (
        <Text className={styles.title} variant="header-2">
          {title}
        </Text>
      )}
      {children}
    </Modal>
  )
}
