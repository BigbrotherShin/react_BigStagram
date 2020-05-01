import { useState, useCallback } from 'react';

export const useInput = (initialValue = null) => {
  const [value, setValue] = useState(initialValue);
  const eventHandler = useCallback(
    (e) => {
      setValue(e.target.value);
    },
    [value],
  );

  return [value, setValue, eventHandler];
};
