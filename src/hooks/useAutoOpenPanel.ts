import { useState } from 'react';

const STORAGE_KEY = 'panelAutoOpen';

export const getAutoOpenPanel = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
};

const saveAutoOpenPanel = (value: boolean) => {
  try {
    localStorage.setItem(STORAGE_KEY, String(value));
  } catch {
    return;
  }
};

export const useAutoOpenPanel = () => {
  const [autoOpen, setAutoOpen] = useState(getAutoOpenPanel);

  const updateAutoOpen = (value: boolean) => {
    setAutoOpen(value);
    saveAutoOpenPanel(value);
  };

  return [autoOpen, updateAutoOpen] as const;
};
