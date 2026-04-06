import { useState } from "react";
import { books, Book } from "@/data/books";

export interface ReadingEntry {
  bookId: number;
  progress: number;
  addedAt: string;
}

export function useReaderState() {
  const [favorites, setFavorites] = useState<number[]>([1, 7, 5]);
  const [reading, setReading] = useState<ReadingEntry[]>([
    { bookId: 1, progress: 68, addedAt: "2024-03-01" },
    { bookId: 7, progress: 100, addedAt: "2024-01-15" },
    { bookId: 2, progress: 32, addedAt: "2024-03-10" },
  ]);

  const toggleFavorite = (bookId: number) => {
    setFavorites((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );
  };

  const isFavorite = (bookId: number) => favorites.includes(bookId);

  const getProgress = (bookId: number) => {
    const entry = reading.find((r) => r.bookId === bookId);
    return entry ? entry.progress : 0;
  };

  const setProgress = (bookId: number, progress: number) => {
    setReading((prev) => {
      const exists = prev.find((r) => r.bookId === bookId);
      if (exists) {
        return prev.map((r) => (r.bookId === bookId ? { ...r, progress } : r));
      }
      return [...prev, { bookId, progress, addedAt: new Date().toISOString().split("T")[0] }];
    });
  };

  const favoriteBooks = books.filter((b) => favorites.includes(b.id));

  const getRecommendations = (): Book[] => {
    const readGenres = reading
      .map((r) => books.find((b) => b.id === r.bookId)?.genre)
      .filter(Boolean) as string[];
    const readIds = reading.map((r) => r.bookId);
    const favIds = favorites;

    return books
      .filter((b) => !readIds.includes(b.id) && !favIds.includes(b.id))
      .sort((a, b) => {
        const aMatch = readGenres.includes(a.genre) ? 1 : 0;
        const bMatch = readGenres.includes(b.genre) ? 1 : 0;
        return bMatch - aMatch || b.rating - a.rating;
      })
      .slice(0, 4);
  };

  return {
    favorites,
    reading,
    toggleFavorite,
    isFavorite,
    getProgress,
    setProgress,
    favoriteBooks,
    getRecommendations,
  };
}
