const useEnv = () => {
  return {
    apiUrl: import.meta.env.API_URL,
  }
}

export default useEnv
