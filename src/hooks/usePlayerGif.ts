"use client"
import { useEffect, useState } from 'react';
import { gf } from '../lib/giphy';

export function usePlayerGif(...searchParams: string[]) {
  const [gifUrl, setGifUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGif() {
      for (const param of searchParams) {
        try {
          const { data } = await gf.search(param, { limit: 1, type: 'gifs' });
          if (data.length === 0) continue;

          const match = data.find(gif => {
            const title = gif.title?.toLowerCase() || '';
            const slug = gif.slug?.toLowerCase() || '';
            const query = param.toLowerCase();
            return title.includes(query) || slug.includes(query);
          });

          if (match) {
            setGifUrl(match.images.original_mp4?.mp4 || match.images.original?.url);
            return;
          }

        } catch (error) {
          console.error(`Error while fetching gif for "${param}":`, error);
        }
      }

      setGifUrl(null);
    }

    fetchGif();
  }, [searchParams]);

  return gifUrl;
}