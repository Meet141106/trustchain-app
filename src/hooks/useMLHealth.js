import { useState, useCallback } from 'react';
import mlClient from '../api/mlClient';

export function useMLHealth() {
  const [isOnline, setIsOnline] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [lastChecked, setLastChecked] = useState(null);

  const recheck = useCallback(async () => {
    setIsChecking(true);
    try {
      const response = await mlClient.checkHealth();
      if (response && response.status === 'ok') {
        setIsOnline(true);
      } else {
        setIsOnline(false);
      }
    } catch (err) {
      setIsOnline(false);
    } finally {
      setIsChecking(false);
      setLastChecked(new Date());
    }
  }, []);

  return { isOnline, isChecking, lastChecked, recheck };
}
