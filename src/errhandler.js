
export function handleApiError(err, fallbackMessage = 'Operation failed') {
  console.error(err.response?.data || err);

  const errorData = err.response?.data;
  if (Array.isArray(errorData) && errorData[0]?.message) {
    alert(fallbackMessage + ': ' + errorData[0].message);
  } else {
    alert(fallbackMessage + ': ' + (err.message || 'Unknown error'));
  }
}
