export function errorMessage(error) {
  if (!error) return "";
  if (error instanceof Error) return error.message;
  return String(error);
}
