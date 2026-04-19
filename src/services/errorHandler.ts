export const handleError = (error: any): string => {
  if (error.response) {
    const status = error.response.status

    switch (status) {
      case 401:
        return 'Unauthorized. Please login again.'
      case 403:
        return 'You do not have permission.'
      case 404:
        return 'Resource not found.'
      case 500:
        return 'Server error. Try again later.'
      default:
        return 'Unexpected error occurred.'
    }
  }

  if (error.request) {
    return 'Network error. Check your connection.'
  }

  return 'Something went wrong.'
}