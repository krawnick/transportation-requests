import { DatePicker } from '@gravity-ui/date-components'
import { DateTime, dateTime } from '@gravity-ui/date-utils'
import { Button, Select, TextArea, TextInput } from '@gravity-ui/uikit'
import { useState } from 'react'

import {
  ERequestStatus,
  IRequestType,
} from '../../interfaces/Request.interface'
import { adminModalClose } from '../../redux/slices/admin/slice'
import { addItem, selectorGetData } from '../../redux/slices/data/slice'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { maxValueArr } from '../../utils/maxValueArr'

import styles from './FormRequest.module.scss'

export const FormRequest = () => {
  const dispatch = useAppDispatch()
  const data = useAppSelector(selectorGetData)

  const [input, setInput] = useState<IRequestType>({
    number: maxValueArr(data, 'number') + 1,
    date: dateTime().toString(),
    company: '',
    responsible: '',
    telephone: '',
    status: ERequestStatus.NEW,
    code: '',
  })
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setInput({
      ...input,
      [name]: name === 'number' ? +value : value,
    })
  }

  const handleDateChange = (value: DateTime | null) => {
    if (value) {
      setInput({
        ...input,
        date: value.toString(),
      })
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(addItem(input))
  }

  return (
    <form className={styles.formRequest} onSubmit={handleSubmit}>
      <label>Номер заявки</label>
      <TextInput
        name="number"
        value={input.number.toString()}
        onChange={handleInputChange}
        className={styles.input}
        size="xl"
        type="number"
        placeholder="Номер заявки..."
        hasClear
      ></TextInput>

      <label>Дата</label>
      <DatePicker
        value={dateTime({ input: input.date })}
        name="date"
        onUpdate={handleDateChange}
        className={styles.input}
        size="xl"
        placeholder="Дата..."
        format="DD.MM.YYYY, HH:mm"
      ></DatePicker>

      <label>Название компании</label>
      <TextInput
        name="company"
        onChange={handleInputChange}
        className={styles.input}
        size="xl"
        type="text"
        placeholder="Название компании..."
        hasClear
      ></TextInput>

      <label>ФИО исполнителя</label>
      <TextInput
        name="responsible"
        onChange={handleInputChange}
        className={styles.input}
        size="xl"
        type="text"
        placeholder="ФИО исполнителя..."
        hasClear
      ></TextInput>

      <label>Телефон</label>
      <TextInput
        name="telephone"
        value={input.telephone}
        onChange={handleInputChange}
        className={styles.input}
        size="xl"
        type="tel"
        placeholder="Телефон..."
        errorMessage=""
        hasClear
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
        size="xl"
        options={[
          { value: ERequestStatus.NEW, content: ERequestStatus.NEW },
          { value: ERequestStatus.TRANSIT, content: ERequestStatus.TRANSIT },
          { value: ERequestStatus.DONE, content: ERequestStatus.DONE },
        ]}
      ></Select>

      <label>Код ATI</label>
      <TextInput
        name="code"
        onChange={handleInputChange}
        className={styles.input}
        size="xl"
        type="number"
        placeholder="Код ATI..."
        hasClear
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
