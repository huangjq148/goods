const TokenKey = 'token';
const accessTokenKey = `${TokenKey}-access`;


export function getToken() {
  const access_token = localStorage.getItem(accessTokenKey) || '';

  return {
    access_token,
  };
}

export function getAccessToken() {
  return localStorage.getItem(accessTokenKey);
}

export function setToken(token) {
  try {
    if (token.access_token) {
      setAuthToken(token);
      return true;
    }
  } catch (error) {
    return false;
  }
}

export function setAuthToken(token) {
  const { access_token, expires_in } = token;
  localStorage.setItem(accessTokenKey, access_token);
  localStorage.setItem(`${accessTokenKey}_expires_in`, expires_in + '');
}

export function removeToken() {
  localStorage.removeItem(accessTokenKey);
  return true;
}

export function hasToken() {
  return !!localStorage.getItem(accessTokenKey) || false;
}
