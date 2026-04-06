import { useState } from "react";
import { books, genres } from "@/data/books";
import BookCard from "@/components/BookCard";
import Icon from "@/components/ui/icon";
import { useReaderState } from "@/hooks/useReaderState";

interface CatalogProps {
  state: ReturnType<typeof useReaderState>;
}

export default function Catalog({ state }: CatalogProps) {
  const { isFavorite, toggleFavorite, getProgress } = state;
  const [activeGenre, setActiveGenre] = useState("Все");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"rating" | "year" | "title">("rating");

  const filtered = books
    .filter((b) => {
      const matchGenre = activeGenre === "Все" || b.genre === activeGenre;
      const matchSearch =
        search.trim() === "" ||
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase());
      return matchGenre && matchSearch;
    })
    .sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "year") return b.year - a.year;
      return a.title.localeCompare(b.title);
    });

  return (
    <div className="pb-24 pt-4 px-4 max-w-md mx-auto space-y-4">
      <div>
        <h1 className="text-xl font-bold text-foreground">Каталог</h1>
        <p className="text-sm text-muted-foreground">{books.length} книг</p>
      </div>

      <div className="relative">
        <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Название или автор..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-card border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => setActiveGenre(g)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeGenre === g
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Icon name="SlidersHorizontal" size={14} className="text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Сортировка:</span>
        {(["rating", "year", "title"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSort(s)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              sort === s ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {s === "rating" ? "Рейтинг" : s === "year" ? "Год" : "А–Я"}
          </button>
        ))}
        <span className="ml-auto text-xs text-muted-foreground">{filtered.length} найдено</span>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <Icon name="BookX" size={40} className="text-muted-foreground/40" />
          <p className="text-muted-foreground text-sm">Книги не найдены</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isFavorite={isFavorite(book.id)}
              progress={getProgress(book.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
