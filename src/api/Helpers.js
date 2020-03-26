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

export const handleTokenErrors = (response) => {
  if (response.status == 401) {
    // store.dispatch(invalidToken());
  } else if (response.status == 411) {
    // store.dispatch(tokenNotSupplied())
  }
  
  return response;
}

export const generalError = (response) => {
  if (response == 'Type Error: Network request failed') {
    // store.dispatch(connectionError("Network request failed"));
  }
  
  return null; // store.dispatch(connectionError("There is an error."))
}

export const asyncError = (error) => {
  return null; // store.dispatch(asyncError(error));
}
