import jwtDecode from "jwt-decode";

const tokenKey = "authToken";

export function setJwt(token) {
  localStorage.setItem(tokenKey, token);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    console.log(ex);
  }
}

export default {
  setJwt,
  logout,
  getUser,
  getJwt
};