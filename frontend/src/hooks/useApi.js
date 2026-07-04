import { useCallback } from 'react';
import { toast } from 'react-hot-toast';

export const useApi = (apiFun, options = {}) => {
  const {
    onError,
    onSuccess,
    showErrorToast = true,
    showSuccessToast = false,
    successMessage = 'Success',
  } = options;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const excute = useCallback(
    async (...args) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiFun(...args);
        if (response) {
          setData(response);
        }
        if (showSuccessToast) toast.success(successMessage);
        onSuccess?.(response);
        return response;
      } catch (error) {
        const message =
          error.response?.data?.message ||
          error.message ||
          'Something went wrong during api call';
        setError(message);
        if (showErrorToast) toast.error(message);
        onError?.(error);
      } finally {
        setIsLoading(false);
      }
    },
    [apiFun],
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return { data, isLoading, error, execute, reset };
};
