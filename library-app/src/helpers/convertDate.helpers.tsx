export const convertDateToString = (date: string, format: 'yyyy-MM-dd' | 'dd.MM.yyyy') => {
  const parts = date.split('T')
  const dashSplit = parts[0].split('-')
  const year = dashSplit[0]
  const month = dashSplit[1].padStart(2, '0')
  const day = dashSplit[2].padStart(2, '0')
  const mydate = (format === 'yyyy-MM-dd') ? (`${year}-${month}-${day}`) : (`${day}.${month}.${year}`)
  return mydate
}
