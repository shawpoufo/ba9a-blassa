const today = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const day = today.getDate()
  return `${year}-${month < 10 ? `0${month}` : month}-${day}`
}

export { today }
