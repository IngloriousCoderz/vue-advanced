const STATUS_UNAUTHORIZED = 401

export function auth(http) {
  http.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config

      if (error.response?.status === STATUS_UNAUTHORIZED && !originalRequest._retry) {
        originalRequest._retry = true

        try {
          const newToken = await refreshToken()

          originalRequest.headers.Authorization = `Bearer ${newToken}`
          return http(originalRequest)
        } catch (refreshError) {
          window.location.href = '/login'
          return Promise.reject(refreshError)
        }
      }

      return Promise.reject(error)
    },
  )
}

async function refreshToken() {
  return 'bear with me'
}
