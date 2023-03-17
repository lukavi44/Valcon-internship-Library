export const convertDateToString = (date: string) => {
  const parts = date.split('-')
  const parts2 = parts[2].split('T')
  const mydate = new Date(+parts[0], +parts[1] - 1, +parts2[0])
  return new Intl.DateTimeFormat('sr-RS').format(new Date(mydate))
}
