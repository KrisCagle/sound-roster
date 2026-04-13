const baseUrl = "http://localhost:3001"

export const loginUser = (email, password) => {
  return fetch(`${baseUrl}/users?email=${email}&password=${password}`)
    .then(res => res.json())
    .then(users => {
      if (users.length > 0) {
        return users[0]
      } else {
        return null
      }
    })
}

export const registerUser = (newUser) => {
  return fetch(`${baseUrl}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser)
  })
    .then(res => res.json())
}

export const getUserById = (id) => {
  return fetch(`${baseUrl}/users/${id}`)
    .then(res => res.json())
}