import BookCard from "@/components/BookCard";
import Icon from "@/components/ui/icon";
import { useReaderState } from "@/hooks/useReaderState";
import { books } from "@/data/books";

interface ProfileProps {
  state: ReturnType<typeof useReaderState>;
}

const achievements = [
  { icon: "BookOpen", label: "Первая книга", unlocked: true },
  { icon: "Flame", label: "7 дней подряд", unlocked: true },
  { icon: "Star", label: "5 прочитано", unlocked: false },
  { icon: "Trophy", label: "Книжный червь", unlocked: false },
];

export default function Profile({ state }: ProfileProps) {
  const { isFavorite, toggleFavorite, getProgress, reading, getRecommendations } = state;
  const recommendations = getRecommendations();
  const readBooks = reading.filter((r) => r.progress === 100);
  const inProgress = reading.filter((r) => r.progress > 0 && r.progress < 100);
  const totalPages = reading.reduce((sum, r) => {
    const book = books.find((b) => b.id === r.bookId);
    return book ? sum + Math.round((book.pages * r.progress) / 100) : sum;
  }, 0);

  const favoriteGenres = (() => {
    const genreMap: Record<string, number> = {};
    reading.forEach((r) => {
      const book = books.find((b) => b.id === r.bookId);
      if (book) {
        genreMap[book.genre] = (genreMap[book.genre] || 0) + r.progress;
      }
    });
    return Object.entries(genreMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([genre]) => genre);
  })();

  return (
    <div className="pb-24 pt-4 px-4 max-w-md mx-auto space-y-5">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl cover-10 noise flex items-center justify-center">
            <span className="text-2xl font-display font-bold text-white/40">А</span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Check" size={10} className="text-primary-foreground" />
          </div>
        </div>
        <div>
          <h1 className="text-lg font-bold text-foreground">Алексей Читатель</h1>
          <p className="text-sm text-muted-foreground">Читаю с января 2024</p>
          <div className="flex gap-1 mt-1">
            {favoriteGenres.map((g) => (
              <span key={g} className="text-[10px] bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { value: readBooks.length, label: "Прочитано", icon: "CheckCircle", color: "text-green-400" },
          { value: inProgress.length, label: "Читаю", icon: "BookOpen", color: "text-primary" },
          { value: totalPages.toLocaleString(), label: "Страниц", icon: "FileText", color: "text-accent" },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-3 text-center">
            <Icon name={stat.icon as "CheckCircle"} size={18} className={`${stat.color} mx-auto mb-1`} />
            <p className="text-lg font-bold text-foreground">{stat.value}</p>
            <p className="text-[10px] text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <section>
        <div className="flex items-center gap-2 mb-3">
          <Icon name="Award" size={16} className="text-yellow-400" />
          <h2 className="text-base font-semibold text-foreground">Достижения</h2>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {achievements.map((a) => (
            <div
              key={a.label}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                a.unlocked
                  ? "bg-primary/10 border-primary/30"
                  : "bg-secondary/50 border-border opacity-40"
              }`}
            >
              <Icon name={a.icon as "BookOpen"} size={20} className={a.unlocked ? "text-primary" : "text-muted-foreground"} />
              <p className="text-[9px] text-center text-foreground leading-tight">{a.label}</p>
            </div>
          ))}
        </div>
      </section>

      {reading.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Icon name="History" size={16} className="text-muted-foreground" />
            <h2 className="text-base font-semibold text-foreground">История чтения</h2>
          </div>
          <div className="space-y-2">
            {reading.map((entry) => {
              const book = books.find((b) => b.id === entry.bookId);
              if (!book) return null;
              return (
                <div key={book.id} className="flex items-center gap-3 bg-card border border-border rounded-xl p-3">
                  <div className={`${book.coverClass} noise w-10 h-14 rounded-lg flex-shrink-0 flex items-center justify-center`}>
                    <span className="text-white/30 text-sm font-display font-bold">{book.title.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{book.title}</p>
                    <p className="text-xs text-muted-foreground">{book.author}</p>
                  </div>
                  {entry.progress === 100 ? (
                    <span className="text-[10px] bg-green-500/15 text-green-400 px-2 py-1 rounded-full font-medium">Прочитано</span>
                  ) : (
                    <span className="text-[10px] bg-primary/15 text-primary px-2 py-1 rounded-full font-medium">{entry.progress}%</span>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {recommendations.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-1">
            <Icon name="Wand2" size={16} className="text-accent" />
            <h2 className="text-base font-semibold text-foreground">Рекомендации для тебя</h2>
          </div>
          <p className="text-xs text-muted-foreground mb-3">На основе твоей истории чтения</p>
          <div className="grid grid-cols-2 gap-3">
            {recommendations.map((book) => (
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
