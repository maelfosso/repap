export const signIn = (username, password) => fetch('http://localhost:4000/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  body: JSON.stringify({
    username,
    password,
  }),
}).then(response => response.json());

export const handleTokenErrors = response => {
  return response;
};

export const generalError = response => {
  if (response === 'Type Error: Network request failed') {
    return -1;
  }

  return null;
};

export const asyncError = error => error;
