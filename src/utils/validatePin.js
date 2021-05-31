const validatePin = (pin) => {
  if (pin.length !== 4) return false
  if (!pin.match(/^[0-9]{4}/)) return false

  return true
}

export default validatePin
