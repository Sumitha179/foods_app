import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

interface UseAppwriteOptions<T, P extends Record<string, any>> {
  fn: (params: P) => Promise<T>;
  params?: P;
  skip?: boolean;
}

interface UseAppwriteReturn<T, P> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: (newParams?: P) => Promise<void>;
}

const useAppwrite = <T, P extends Record<string, any>>({
  fn,
  params = {} as P,
  skip = false,
}: UseAppwriteOptions<T, P>): UseAppwriteReturn<T, P> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (fetchParams: P) => {
      setLoading(true);
      setError(null);

      try {
        const result = await fn(fetchParams);
        setData(result);
      } catch (err: any) {
        const message = err instanceof Error ? err.message : "Unknown error occurred";
        setError(message);
           console.error("useAppwrite Error:", message, err);
      } finally {
        setLoading(false);
      }
    },
    [fn]
  );

  useEffect(() => {
    if (!skip) {
      fetchData(params);
    }
  }, [fetchData, skip]);

  const refetch = async (newParams?: P) => {
    try {
      await fetchData(newParams || params);
    } catch (error) {
      // error already handled in fetchData. this just prevents unhandled promise rejections
      console.error("Refetch error:", error);
    }
  }; 

  return { data, loading, error, refetch };
};

export default useAppwrite;
