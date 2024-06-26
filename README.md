# ЗАЯВКИ ГРУЗОПЕРЕВОЗОК

## Фидбэк по проекту
```
Плюсы:
1. Выполнены все основные условия задания
2. Проект запускается и работает
3. Хорошо написано ReadMe
4. Переиспользуемые компоненты
5. Хороший codestyle
6. В проекте используются env
7. Есть favicon
8. json-server
9. Есть валидация полей формы
10. Использование линтеров
11. По документации к REST API вопросов нет

То, что вызвало вопросы:
1. Не увидели необходимости применять SCSS, вместо CSS
2. В поле ввода номера телефона было бы лучше добавить маску
```

> [!IMPORTANT]
> Для корректной работы необходим запущенный json-server

## Запуск проекта

```shell
npm start
```

## Сборка проекта

```shell
npm run build
```

Проект реализован на TypeScript + React

### Дополнительные библиотеки:

- `Redux Toolkit`
- `Gravity UI`
- `json-server`
- `sass`
- `classnames`

### Линтеры

- `ESLint`
- `Stylelint`

# Документация к REST API

Данная документация к REST API поможет найти описание доступных эндпоинтов, параметры запросов для работы с заявками.

#### Основные методы запросов и маршруты:

```
GET    /requests
GET    /requests/:id
POST   /requests
PUT    /requests/:id
DELETE /requests/:id
```

## POST

#### Добавление новой заявки.

```
POST /requests
```

Добавьте в `body` запроса объект, содержащий следующие свойства:
`id`, `date`, `company`, `responsible`, `telephone`, `status`, `code`
Необязательное свойство: `comment`

```json
{
  "id": 1,
  "date": "Wed, 27 Mar 2024 11:31:20 GMT",
  "company": "Hoff",
  "responsible": "Иванов И. В.",
  "telephone": "9617756907",
  "status": "Новая",
  "code": "54321"
}
```

```JavaScript
fetch(API_URL/requests, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(obj),
  })
```

## DELETE

#### Удаление существующей заявки.

```
DELETE /requests/:id
```

```JavaScript
fetch(API_URL/requests/:id, {
      method: 'DELETE',
    })
```

## PUT

#### Полная замена существующей заявки.

```
PUT    /requests/:id
```

```JavaScript
fetch(API_URL/requests/:id, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(obj),
  })
```

## GET

#### Получение заявок (всех или по условию).

```
GET    /requests
GET    /requests/:id
```

```JavaScript
fetch(API_URL/requests)
```

#### Условия для метода GET:

Диапозон получения заявок:
`_start`
`_end`
`_limit`

```
GET /requests?_start=0&_limit=10
```

Сортировка заявок и порядок:

`_sort`
`_order`

```
GET /requests?_sort=company&_order=desc
```
