const memory = new Map();

export function readCache(key) {
  return memory.has(key) ? memory.get(key) : null;
}

export function writeCache(key, value) {
  memory.set(key, value);
  return value;
}

export function patchCache(key, updater) {
  if (!memory.has(key)) return;
  memory.set(key, updater(memory.get(key)));
}
