import { books } from "@/data/books";
import BookCard from "@/components/BookCard";
import Icon from "@/components/ui/icon";
import { useReaderState } from "@/hooks/useReaderState";

interface HomeProps {
  state: ReturnType<typeof useReaderState>;
}

export default function Home({ state }: HomeProps) {
  const { isFavorite, toggleFavorite, getProgress, reading } = state;
  const trending = books.filter((b) => b.trending);
  const newBooks = books.filter((b) => b.new);
  const currentlyReading = reading.filter((r) => r.progress > 0 && r.progress < 100);

  return (
    <div className="pb-24 pt-4 px-4 max-w-md mx-auto space-y-8">
      <div className="relative overflow-hidden rounded-2xl p-6 cover-2 noise min-h-[160px] flex flex-col justify-between">
        <div>
          <p className="text-white/60 text-sm font-medium">Привет, читатель 👋</p>
          <h1 className="text-white text-2xl font-display font-bold mt-1 leading-tight">
            Что читаем<br />сегодня?
          </h1>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <div className="text-center">
            <p className="text-white text-xl font-bold">{reading.filter(r => r.progress === 100).length}</p>
            <p className="text-white/60 text-xs">прочитано</p>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center">
            <p className="text-white text-xl font-bold">{currentlyReading.length}</p>
            <p className="text-white/60 text-xs">читаю сейчас</p>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center">
            <p className="text-white text-xl font-bold">{state.favorites.length}</p>
            <p className="text-white/60 text-xs">в избранном</p>
          </div>
        </div>
      </div>

      {currentlyReading.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Icon name="BookOpen" size={16} className="text-primary" />
            <h2 className="text-base font-semibold text-foreground">Продолжить чтение</h2>
          </div>
          <div className="space-y-3">
            {currentlyReading.map((entry) => {
              const book = books.find((b) => b.id === entry.bookId);
              if (!book) return null;
              return (
                <div key={book.id} className="flex gap-3 items-center bg-card border border-border rounded-xl p-3">
                  <div className={`${book.coverClass} noise w-12 h-16 rounded-lg flex-shrink-0 flex items-center justify-center`}>
                    <span className="text-white/30 text-xl font-display font-bold">{book.title.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{book.title}</p>
                    <p className="text-xs text-muted-foreground">{book.author}</p>
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between text-[10px] text-muted-foreground">
                        <span>Прогресс</span>
                        <span className="text-primary font-medium">{entry.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                          style={{ width: `${entry.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground flex-shrink-0" />
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section>
        <div className="flex items-center gap-2 mb-3">
          <Icon name="TrendingUp" size={16} className="text-primary" />
          <h2 className="text-base font-semibold text-foreground">В тренде</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {trending.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isFavorite={isFavorite(book.id)}
              progress={getProgress(book.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </section>

      {newBooks.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Icon name="Sparkles" size={16} className="text-accent" />
            <h2 className="text-base font-semibold text-foreground">Новинки</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {newBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                isFavorite={isFavorite(book.id)}
                progress={getProgress(book.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
