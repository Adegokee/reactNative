import React, { createContext, useState, useEffect } from 'react';

export const YouTubeContext = createContext();

export const YouTubeProvider = ({children}) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=terminator&key=AIzaSyD8PtGw7UNYhfOGaYrzITtYoPcES3hN7iY;

  const API_KEY = 'AIzaSyD8PtGw7UNYhfOGaYrzITtYoPcES3hN7iY';
  const BASE_URL = 'https://youtube.googleapis.com/youtube/v3/search';

  const fetchVideos = async (query = '') => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${BASE_URL}?part=snippet&maxResults=50&q=${encodeURIComponent(query)}&key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }

      const data = await response.json();
      setVideos(data.items);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <YouTubeContext.Provider value={{ videos, loading, error, fetchVideos }}>
      {children}
    </YouTubeContext.Provider>
  );
};
