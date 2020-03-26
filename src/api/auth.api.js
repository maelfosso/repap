export const signIn = (username, password) => {
  return fetch(`http://localhost:4000/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  }).then(response => response.json())
}