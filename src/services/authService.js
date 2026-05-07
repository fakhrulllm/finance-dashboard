const USER_KEY = "users"
const CURRENT_USER = "currentUser"

export const getUsers = () => {
  const data = localStorage.getItem(USER_KEY)
  return data ? JSON.parse(data) : []
}

export const saveUsers = (users) => {
  localStorage.setItem(USER_KEY, JSON.stringify(users))
}

export const registerUser = (user) => {
  const users = getUsers()

  const exist = users.find(u => u.email === user.email)
  if (exist) throw new Error("Email sudah terdaftar")

  users.push(user)
  saveUsers(users)
}

export const loginUser = (email, password) => {
  const users = getUsers()

  const user = users.find(
    u => u.email === email && u.password === password
  )

  if (!user) throw new Error("Email / Password salah")

  localStorage.setItem(CURRENT_USER, JSON.stringify(user))
}

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem(CURRENT_USER))
}

export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER)
}