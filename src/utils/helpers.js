export const generateOrderId = () => {
  return `ORD-${Date.now().toString(36).toUpperCase()}`
}

export const calculateETA = (prepTime, distance = 0) => {
  const prep = parseInt(prepTime) || 15
  const travel = distance * 5 // 5 min per km
  return prep + travel
}

export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const group = item[key]
    result[group] = result[group] || []
    result[group].push(item)
    return result
  }, {})
}

export const debounce = (fn, delay) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}