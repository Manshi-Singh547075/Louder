import { useState, useCallback, useEffect } from 'react';
import { api } from '../lib/api';

export function useEventSearch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentResult, setCurrentResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);

  const submit = useCallback(async (query) => {
    setLoading(true);
    setError(null);
    setCurrentResult(null);
    
    try {
      const result = await api.suggest(query);
      setCurrentResult(result);
      // Refresh history after new submission
      await loadHistory();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadHistory = useCallback(async () => {
    if (historyLoaded) return;
    
    setHistoryLoading(true);
    try {
      const data = await api.getHistory();
      setHistory(data);
      setHistoryLoaded(true);
    } catch (err) {
      console.error('Failed to load history:', err);
      setError('Failed to load history');
    } finally {
      setHistoryLoading(false);
    }
  }, [historyLoaded]);

  const remove = useCallback(async (id) => {
    try {
      await api.deleteHistoryItem(id);
      setHistory(prev => prev.filter(item => item._id !== id));
      // If the deleted item is currently viewed, clear it
      if (currentResult?._id === id) {
        setCurrentResult(null);
      }
    } catch (err) {
      setError('Failed to delete item');
    }
  }, [currentResult]);

  return {
    loading,
    error,
    currentResult,
    history,
    historyLoaded,
    historyLoading,
    submit,
    loadHistory,
    remove,
    setCurrentResult,
  };
}