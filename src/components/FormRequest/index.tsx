import { DatePicker } from '@gravity-ui/date-components'
import { Button, TextArea, TextInput } from '@gravity-ui/uikit'

import { adminModalClose } from '../../redux/slices/admin/slice'
import { useAppDispatch } from '../../redux/store'

import styles from './FormRequest.module.scss'

export const FormRequest = () => {
  const dispatch = useAppDispatch()
  return (
    <form className={styles.formRequest}>
      <TextInput
        className={styles.input}
        size="xl"
        type="number"
        placeholder="Номер заявки..."
        errorMessage="Такой номер заявки существует"
        validationState="invalid"
        hasClear
      ></TextInput>
      <DatePicker
        className={styles.input}
        size="xl"
        placeholder="Дата..."
        format="DD.MM.YYYY, HH:mm"
        errorMessage=""
        validationState="invalid"
        hasClear
      ></DatePicker>
      <TextInput
        className={styles.input}
        size="xl"
        type="text"
        placeholder="Название компании..."
        errorMessage=""
        validationState="invalid"
        hasClear
      ></TextInput>
      <TextInput
        className={styles.input}
        size="xl"
        type="text"
        placeholder="ФИО исполнителя..."
        errorMessage=""
        validationState="invalid"
        hasClear
      ></TextInput>
      <TextInput
        className={styles.input}
        size="xl"
        type="tel"
        placeholder="Телефон..."
        errorMessage=""
        validationState="invalid"
        hasClear
      ></TextInput>
      <TextArea
        className={styles.input}
        size="xl"
        placeholder="Комментарий..."
        hasClear
      ></TextArea>
      <TextInput
        className={styles.input}
        size="xl"
        type="number"
        placeholder="Код ATI..."
        errorMessage=""
        validationState="invalid"
      ></TextInput>
      <div className={styles.bottom}>
        <Button
          view="outlined"
          size="xl"
          onClick={() => {
            dispatch(adminModalClose())
          }}
        >
          Отмена
        </Button>
        <Button view="outlined-success" size="xl">
          Сохранить
        </Button>
      </div>
    </form>
  )
}
