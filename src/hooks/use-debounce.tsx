import { useSignal, useTask$ } from "@builder.io/qwik";

export const useDebounce = (value: any, delay: number) => {
  const debouncedSig = useSignal(value);

  useTask$(({ track }) => {
    track(() => value);
    track(() => delay);
    const handler = setTimeout(() => {
      debouncedSig.value = value;
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  });

  return debouncedSig;
};
