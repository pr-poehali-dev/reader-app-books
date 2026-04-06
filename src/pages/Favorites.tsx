import BookCard from "@/components/BookCard";
import Icon from "@/components/ui/icon";
import { useReaderState } from "@/hooks/useReaderState";

interface FavoritesProps {
  state: ReturnType<typeof useReaderState>;
}

export default function Favorites({ state }: FavoritesProps) {
  const { isFavorite, toggleFavorite, getProgress, favoriteBooks } = state;

  return (
    <div className="pb-24 pt-4 px-4 max-w-md mx-auto space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
          <Icon name="Heart" size={20} className="text-red-400 fill-red-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Избранное</h1>
          <p className="text-sm text-muted-foreground">{favoriteBooks.length} книг</p>
        </div>
      </div>

      {favoriteBooks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
            <Icon name="Heart" size={32} className="text-muted-foreground/40" />
          </div>
          <div className="text-center">
            <p className="text-foreground font-medium">Пока пусто</p>
            <p className="text-muted-foreground text-sm mt-1">
              Добавляй книги в избранное,<br />нажав на сердечко на обложке
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3">
            {favoriteBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                isFavorite={isFavorite(book.id)}
                progress={getProgress(book.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>

          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Icon name="BarChart3" size={16} className="text-primary" />
              <h2 className="text-sm font-semibold text-foreground">Статистика избранного</h2>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">{favoriteBooks.length}</p>
                <p className="text-[11px] text-muted-foreground">книг</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">
                  {favoriteBooks.reduce((sum, b) => sum + b.pages, 0).toLocaleString()}
                </p>
                <p className="text-[11px] text-muted-foreground">страниц</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">
                  {(favoriteBooks.reduce((sum, b) => sum + b.rating, 0) / favoriteBooks.length).toFixed(1)}
                </p>
                <p className="text-[11px] text-muted-foreground">ср. рейтинг</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
