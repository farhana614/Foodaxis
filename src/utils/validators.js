export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const validatePhone = (phone) => {
  return /^01[3-9]\d{8}$/.test(phone) // Bangladesh format
}

export const validatePassword = (password) => {
  return password.length >= 6
}

export const required = (value) => {
  return value && value.toString().trim().length > 0
}