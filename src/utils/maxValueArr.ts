// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TObj = Record<string, any>

export const maxValueArr = (arr: TObj[], key: string) => {
  if (arr.length > 0) {
    return arr.reduce((acc, item) => {
      if (typeof item[key] === 'number') {
        return acc > item[key] ? acc : item[key]
      }
    }, arr[0][key])
  } else {
    return 0
  }
}
