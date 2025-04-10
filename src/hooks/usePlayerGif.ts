"use client"
import { useEffect, useState } from 'react';
import { gf } from '../lib/giphy';

export function usePlayerGif(searchParam: string) {
  const [gifUrl, setGifUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGif() {
      try {
        const { data } = await gf.search(searchParam, { limit: 1, type: 'gifs' });
        console.log(data)
        if (data.length > 0) {
          setGifUrl(data[0].images.original_mp4.mp4 || data[0].images.original.url);
        }
      } catch (error) {
        console.error('Error willing search gif:', error);
      }
    }

    fetchGif();
  }, [searchParam]);

  return gifUrl;
}