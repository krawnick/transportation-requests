import { DatePicker } from '@gravity-ui/date-components'
import { DateTime, dateTime } from '@gravity-ui/date-utils'
import { Button, Select, TextArea, TextInput } from '@gravity-ui/uikit'
import { useEffect, useState } from 'react'

import { ERequestStatus } from '../../enum/Status.enum'
import { IErrorType } from '../../interfaces/Error.interface'
import { IRequestType } from '../../interfaces/Request.interface'
import {
  adminModalClose,
  selectorAdminModal,
} from '../../redux/slices/admin/slice'
import {
  addData,
  selectorGetData,
  updateData,
} from '../../redux/slices/data/slice'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { maxValueArr } from '../../utils/maxValueArr'

import styles from './FormRequest.module.scss'

export const FormRequest = ({ edit }: { edit: boolean }) => {
  const dispatch = useAppDispatch()
  const selectData = useAppSelector(selectorAdminModal).selectItem
  const data = useAppSelector(selectorGetData)

  const [input, setInput] = useState<IRequestType>({
    id: maxValueArr(data, 'id') + 1,
    date: dateTime().toString(),
    company: '',
    responsible: '',
    telephone: '',
    status: ERequestStatus.NEW,
    code: '',
  })

  useEffect(() => {
    if (edit && selectData) {
      setInput(selectData)
    }
  }, [])

  const [error, setError] = useState<IErrorType>({})

  // Обработчик изменений input'ов
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target

    setInput({
      ...input,
      [name]: name === 'id' ? Number(value) : value,
    })
  }

  // Обработчик изменений select'a
  const handleSelectChange = (value: string[]) => {
    setInput({
      ...input,
      status: value[0] as ERequestStatus,
    })
  }

  // Обработчик изменений date
  const handleDateChange = (value: DateTime | null) => {
    if (value) {
      setInput({
        ...input,
        date: value.toString(),
      })
    }
  }

  // Валидация и отправка формы
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const errors: IErrorType = {}

    // Поля для валидации
    const validateKeys: (keyof IRequestType)[] = [
      'id',
      'company',
      'telephone',
      'responsible',
      'code',
    ]

    // Проверка на наличие незаполненных полей
    validateKeys.forEach((item) => {
      if (input[item] == '') {
        errors[item] = 'Заполните поле'
      }
    })

    // Проверка на повтор номера заявки
    edit ||
      data.forEach((item) => {
        if (item.id === input.id) {
          errors.id = 'Такой номер существует'
        }
      })

    // Проверка номера телефона
    if (input.telephone.length !== 10) {
      errors.telephone = 'Неверный номер телефона'
    }

    // Проверка соблюдения всех условий
    if (Object.keys(errors).length === 0) {
      edit ? dispatch(updateData(input)) : dispatch(addData(input))

      dispatch(adminModalClose())
    } else {
      setError(errors)
    }
  }

  return (
    <form className={styles.formRequest} onSubmit={handleSubmit}>
      <label>Номер заявки</label>
      <TextInput
        name="id"
        value={input.id.toString()}
        onChange={handleInputChange}
        className={styles.input}
        size="xl"
        type="number"
        placeholder="Номер заявки..."
        hasClear
        validationState={error.id ? 'invalid' : undefined}
        errorMessage={error.id}
        disabled={edit}
      ></TextInput>

      <label>Дата</label>
      <DatePicker
        name="date"
        value={dateTime({ input: input.date })}
        onUpdate={handleDateChange}
        className={styles.input}
        size="xl"
        placeholder="Дата..."
        format="DD.MM.YYYY, HH:mm"
        disabled={edit}
      ></DatePicker>

      <label>Название компании</label>
      <TextInput
        name="company"
        value={input.company}
        onChange={handleInputChange}
        className={styles.input}
        size="xl"
        type="text"
        placeholder="Название компании..."
        hasClear
        validationState={error.company ? 'invalid' : undefined}
        errorMessage={error.company}
      ></TextInput>

      <label>ФИО исполнителя</label>
      <TextInput
        name="responsible"
        value={input.responsible}
        onChange={handleInputChange}
        className={styles.input}
        size="xl"
        type="text"
        placeholder="ФИО исполнителя..."
        hasClear
        validationState={error.responsible ? 'invalid' : undefined}
        errorMessage={error.responsible}
      ></TextInput>

      <label>Телефон</label>
      <TextInput
        name="telephone"
        value={input.telephone.replace(/\D/g, '')}
        onChange={handleInputChange}
        className={styles.input}
        size="xl"
        type="tel"
        placeholder="Телефон..."
        hasClear
        validationState={error.telephone ? 'invalid' : undefined}
        errorMessage={error.telephone}
      ></TextInput>

      <label>Комментарий</label>

      <TextArea
        name="comment"
        onChange={handleInputChange}
        className={styles.input}
        size="xl"
        placeholder="Комментарий..."
        hasClear
      ></TextArea>

      <label>Статус</label>
      <Select
        placeholder="Статус..."
        className={styles.input}
        value={[input.status]}
        onUpdate={handleSelectChange}
        size="xl"
        options={[
          { value: ERequestStatus.NEW, content: ERequestStatus.NEW },
          { value: ERequestStatus.TRANSIT, content: ERequestStatus.TRANSIT },
          { value: ERequestStatus.DONE, content: ERequestStatus.DONE },
        ]}
        validationState={error.status ? 'invalid' : undefined}
        errorMessage={error.status}
      ></Select>

      <label>Код ATI</label>
      <TextInput
        name="code"
        value={input.code}
        onChange={handleInputChange}
        className={styles.input}
        size="xl"
        type="number"
        placeholder="Код ATI..."
        hasClear
        validationState={error.code ? 'invalid' : undefined}
        errorMessage={error.code}
      />

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
        <Button type="submit" view="outlined-success" size="xl">
          Сохранить
        </Button>
      </div>
    </form>
  )
}
