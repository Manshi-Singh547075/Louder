const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const api = {
  async suggest(query) {
    const response = await fetch(`${API_BASE_URL}/api/suggest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to get suggestion');
    }
    
    return response.json();
  },
  
  async getHistory() {
    const response = await fetch(`${API_BASE_URL}/api/history`);
    if (!response.ok) {
      throw new Error('Failed to load history');
    }
    return response.json();
  },
  
  async deleteHistoryItem(id) {
    const response = await fetch(`${API_BASE_URL}/api/history/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete item');
    }
    return response.json();
  },
};