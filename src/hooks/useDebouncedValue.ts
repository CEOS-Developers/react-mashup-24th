import { useEffect, useState } from "react";

// value 가 delay(ms) 동안 바뀌지 않으면 그 값을 돌려줍니다. (입력할 때마다 요청하지 않으려고 사용)
export function useDebouncedValue<T>(value: T, delay: number) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
