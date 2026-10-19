const TOKEN_KEY = "dsa_token";
const USER_KEY = "dsa_user";

const listeners = new Set();
let cachedRaw = undefined;
let cachedUser = null;

function emit() {
  listeners.forEach((fn) => fn());
}

export function subscribeAuth(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function saveSession(token, user) {
  localStorage.setItem(TOKEN_KEY, token);
  const raw = JSON.stringify(user);
  localStorage.setItem(USER_KEY, raw);
  cachedRaw = raw;
  cachedUser = user;
  emit();
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (raw === cachedRaw) return cachedUser;
  cachedRaw = raw;
  if (!raw) {
    cachedUser = null;
    return null;
  }
  try {
    cachedUser = JSON.parse(raw);
  } catch {
    cachedUser = null;
  }
  return cachedUser;
}

export function clearSession() {
 
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  cachedRaw = null;
  cachedUser = null;
  emit();
}
