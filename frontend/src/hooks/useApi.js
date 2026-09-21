import { useCallback, useState } from 'react';
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

  const execute = useCallback(
    async (...args) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiFun(...args);

        setData(response);

        onSuccess?.(response);

        if (showSuccessToast) {
          toast.success(response.message);
        }

        return { success: true, data: response };
      } catch (error) {
        const apiError = error.response?.data ?? { message: error.message };

        setError(apiError);

        onError?.(apiError);

        if (showErrorToast) {
          toast.error(apiError.message);
        }

        return { success: false, error: apiError };
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
