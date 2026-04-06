import { useState } from "react";
import Icon from "@/components/ui/icon";

// ─── Data ──────────────────────────────────────────────────────────────────

const BOOKS = [
  { id: 1, title: "Мастер и Маргарита", author: "Михаил Булгаков", genre: "Классика", pages: 480, rating: 4.9, cover: "cover-1", year: 1967, desc: "Роман о добре и зле, любви и предательстве в советской Москве." },
  { id: 2, title: "Преступление и наказание", author: "Федор Достоевский", genre: "Классика", pages: 592, rating: 4.8, cover: "cover-2", year: 1866, desc: "Психологический роман о студенте, решившемся на убийство." },
  { id: 3, title: "Дюна", author: "Фрэнк Герберт", genre: "Фантастика", pages: 688, rating: 4.7, cover: "cover-3", year: 1965, desc: "Эпическая сага о пустынной планете и судьбах цивилизаций." },
  { id: 4, title: "1984", author: "Джордж Оруэлл", genre: "Антиутопия", pages: 328, rating: 4.8, cover: "cover-4", year: 1949, desc: "Тоталитарное общество, где Большой Брат следит за каждым." },
  { id: 5, title: "Сто лет одиночества", author: "Габриэль Гарсиа Маркес", genre: "Магический реализм", pages: 432, rating: 4.6, cover: "cover-5", year: 1967, desc: "Семейная сага рода Буэндиа сквозь поколения." },
  { id: 6, title: "Маленький принц", author: "Антуан де Сент-Экзюпери", genre: "Философия", pages: 96, rating: 4.9, cover: "cover-6", year: 1943, desc: "Сказка-притча о дружбе, любви и смысле жизни." },
  { id: 7, title: "Война и мир", author: "Лев Толстой", genre: "Классика", pages: 1225, rating: 4.7, cover: "cover-7", year: 1869, desc: "Монументальная эпопея об эпохе наполеоновских войн." },
  { id: 8, title: "Игра в бисер", author: "Герман Гессе", genre: "Философия", pages: 558, rating: 4.5, cover: "cover-8", year: 1943, desc: "Роман об интеллектуальной элите будущего." },
  { id: 9, title: "Автостопом по галактике", author: "Дуглас Адамс", genre: "Фантастика", pages: 224, rating: 4.8, cover: "cover-9", year: 1979, desc: "Комедийная фантастика о путешествии через вселенную." },
  { id: 10, title: "Граф Монте-Кристо", author: "Александр Дюма", genre: "Приключения", pages: 1276, rating: 4.8, cover: "cover-10", year: 1844, desc: "История мести и торжества справедливости." },
  { id: 11, title: "Цветы для Элджернона", author: "Дэниел Киз", genre: "Фантастика", pages: 311, rating: 4.7, cover: "cover-11", year: 1966, desc: "Трагическая история об интеллекте и человечности." },
  { id: 12, title: "Пикник на обочине", author: "Братья Стругацкие", genre: "Фантастика", pages: 224, rating: 4.7, cover: "cover-12", year: 1972, desc: "Земля после посещения инопланетян, зоны отчуждения." },
];

const GENRES = ["Все", "Классика", "Фантастика", "Антиутопия", "Философия", "Магический реализм", "Приключения"];

const READING_HISTORY = [
  { bookId: 3, progress: 100, date: "2024-12" },
  { bookId: 6, progress: 100, date: "2025-01" },
  { bookId: 9, progress: 78, date: "2025-02" },
  { bookId: 4, progress: 100, date: "2025-02" },
];

const FAVORITES_DEFAULT = [1, 3, 6, 9];

// ─── Components ────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <Icon name="Star" size={12} className="fill-primary text-primary" />
      <span className="text-xs font-semibold text-primary font-body">{rating}</span>
    </div>
  );
}

function BookCover({ book, size = "md", className = "" }: {
  book: typeof BOOKS[0];
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const sizes = {
    sm: "w-16 h-24",
    md: "w-28 h-40",
    lg: "w-36 h-52",
    xl: "w-44 h-64",
  };
  return (
    <div className={`${sizes[size]} ${book.cover} relative rounded-lg flex-shrink-0 overflow-hidden shadow-lg ${className}`}>
      <div className="absolute inset-0 flex flex-col justify-between p-2">
        <div className="w-full h-0.5 bg-white/20 rounded" />
        <div>
          <p className="text-white/90 text-[9px] font-display font-semibold leading-tight line-clamp-3">{book.title}</p>
          <p className="text-white/50 text-[7px] font-body mt-0.5 truncate">{book.author}</p>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-3 h-full bg-black/20" />
    </div>
  );
}

function BookCard({ book, onFav, isFav, onClick }: {
  book: typeof BOOKS[0];
  onFav: (id: number) => void;
  isFav: boolean;
  onClick: (book: typeof BOOKS[0]) => void;
}) {
  return (
    <div
      className="group relative bg-card border border-border rounded-2xl overflow-hidden cursor-pointer hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 animate-fade-in"
      onClick={() => onClick(book)}
    >
      <div className={`w-full h-40 ${book.cover} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <button
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-colors z-10"
          onClick={(e) => { e.stopPropagation(); onFav(book.id); }}
        >
          <Icon name="Heart" size={14} className={isFav ? "fill-red-400 text-red-400" : "text-white/70"} />
        </button>
        <div className="absolute bottom-3 left-3">
          <span className="text-[10px] font-body font-medium px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white/90">{book.genre}</span>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-display text-base font-semibold text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors">{book.title}</h3>
        <p className="text-muted-foreground text-xs font-body mt-0.5 truncate">{book.author}</p>
        <div className="flex items-center justify-between mt-2">
          <StarRating rating={book.rating} />
          <span className="text-muted-foreground text-xs font-body">{book.pages} стр.</span>
        </div>
      </div>
    </div>
  );
}

function BookModal({ book, onClose, isFav, onFav }: {
  book: typeof BOOKS[0];
  onClose: () => void;
  isFav: boolean;
  onFav: (id: number) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-md bg-card border border-border rounded-3xl p-6 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-5">
          <BookCover book={book} size="lg" />
          <div className="flex-1 min-w-0">
            <h2 className="font-display text-2xl font-bold text-foreground leading-tight">{book.title}</h2>
            <p className="text-muted-foreground font-body text-sm mt-1">{book.author}, {book.year}</p>
            <div className="flex items-center gap-3 mt-2">
              <StarRating rating={book.rating} />
              <span className="text-muted-foreground text-xs">{book.pages} стр.</span>
            </div>
            <span className="inline-block mt-2 text-[11px] font-body font-medium px-2.5 py-0.5 rounded-full bg-secondary text-muted-foreground">{book.genre}</span>
          </div>
        </div>
        <p className="text-muted-foreground font-body text-sm mt-4 leading-relaxed">{book.desc}</p>
        <div className="flex gap-3 mt-5">
          <button className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-opacity">
            Начать читать
          </button>
          <button
            className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-colors ${isFav ? "border-red-400 bg-red-400/10" : "border-border hover:border-primary"}`}
            onClick={() => onFav(book.id)}
          >
            <Icon name="Heart" size={18} className={isFav ? "fill-red-400 text-red-400" : "text-muted-foreground"} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Pages ─────────────────────────────────────────────────────────────────

function HomePage({ favorites, onFav, onBookClick }: {
  favorites: number[];
  onFav: (id: number) => void;
  onBookClick: (book: typeof BOOKS[0]) => void;
}) {
  const readIds = READING_HISTORY.map(r => r.bookId);
  const readGenres = READING_HISTORY.map(r => BOOKS.find(b => b.id === r.bookId)?.genre).filter(Boolean);
  const recommended = BOOKS.filter(b => readGenres.includes(b.genre) && !readIds.includes(b.id)).slice(0, 4);
  const trending = BOOKS.slice(0, 6);
  const currentRead = READING_HISTORY.find(r => r.progress < 100);
  const currentBook = currentRead ? BOOKS.find(b => b.id === currentRead.bookId) : null;

  return (
    <div className="pb-24">
      <div className="px-4 pt-8 pb-6">
        <div className="flex items-center justify-between mb-1">
          <p className="text-muted-foreground font-body text-sm">Добро пожаловать</p>
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-primary text-sm font-display font-bold">А</span>
          </div>
        </div>
        <h1 className="font-display text-4xl font-bold text-foreground leading-none">
          Привет, <span className="text-primary italic">Алексей</span>
        </h1>
        <p className="text-muted-foreground font-body text-sm mt-2">Сегодня хороший день для чтения</p>
      </div>

      {currentBook && currentRead && (
        <div className="mx-4 mb-6">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-4 flex items-center gap-4">
            <BookCover book={currentBook} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground font-body mb-1">Продолжить чтение</p>
              <h3 className="font-display text-lg font-semibold text-foreground leading-tight truncate">{currentBook.title}</h3>
              <p className="text-muted-foreground text-xs font-body truncate">{currentBook.author}</p>
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground font-body">{currentRead.progress}%</span>
                  <span className="text-xs text-primary font-body font-medium">читать →</span>
                </div>
                <div className="h-1.5 bg-border rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${currentRead.progress}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6">
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="font-display text-xl font-semibold text-foreground">Рекомендуем вам</h2>
          <span className="text-xs text-primary font-body cursor-pointer">Все →</span>
        </div>
        <div className="flex gap-4 px-4 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          {recommended.map((book, i) => (
            <div
              key={book.id}
              className="flex-shrink-0 cursor-pointer group animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
              onClick={() => onBookClick(book)}
            >
              <BookCover book={book} size="lg" className="group-hover:scale-105 transition-transform duration-300" />
              <div className="mt-2 w-36">
                <p className="font-display text-sm font-semibold text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors">{book.title}</p>
                <p className="text-muted-foreground text-xs font-body truncate mt-0.5">{book.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="font-display text-xl font-semibold text-foreground">В тренде</h2>
        </div>
        <div className="px-4 space-y-3">
          {trending.map((book, i) => (
            <div
              key={book.id}
              className="flex items-center gap-4 cursor-pointer group animate-fade-in"
              style={{ animationDelay: `${i * 60}ms` }}
              onClick={() => onBookClick(book)}
            >
              <span className="font-display text-3xl font-bold text-border w-8 text-right flex-shrink-0 group-hover:text-primary/30 transition-colors">
                {String(i + 1).padStart(2, "0")}
              </span>
              <BookCover book={book} size="sm" className="group-hover:scale-105 transition-transform duration-300" />
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-base font-semibold text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors">{book.title}</h3>
                <p className="text-muted-foreground text-xs font-body mt-0.5 truncate">{book.author}</p>
                <StarRating rating={book.rating} />
              </div>
              <button
                className="w-8 h-8 flex-shrink-0 flex items-center justify-center"
                onClick={(e) => { e.stopPropagation(); onFav(book.id); }}
              >
                <Icon name="Heart" size={16} className={favorites.includes(book.id) ? "fill-red-400 text-red-400" : "text-muted-foreground hover:text-primary transition-colors"} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CatalogPage({ favorites, onFav, onBookClick }: {
  favorites: number[];
  onFav: (id: number) => void;
  onBookClick: (book: typeof BOOKS[0]) => void;
}) {
  const [activeGenre, setActiveGenre] = useState("Все");
  const [search, setSearch] = useState("");

  const filtered = BOOKS.filter(b => {
    const matchGenre = activeGenre === "Все" || b.genre === activeGenre;
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase());
    return matchGenre && matchSearch;
  });

  return (
    <div className="pb-24">
      <div className="px-4 pt-8 pb-4">
        <h1 className="font-display text-4xl font-bold text-foreground">Каталог</h1>
        <p className="text-muted-foreground font-body text-sm mt-1">Более 1 000 книг в вашем распоряжении</p>
      </div>

      <div className="px-4 mb-4">
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск по названию или автору..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
      </div>

      <div className="flex gap-2 px-4 overflow-x-auto pb-2 mb-4" style={{ scrollbarWidth: "none" }}>
        {GENRES.map(genre => (
          <button
            key={genre}
            onClick={() => setActiveGenre(genre)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full font-body text-xs font-medium transition-all duration-200 ${
              activeGenre === genre
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground hover:border-primary/50"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="px-4 grid grid-cols-2 gap-3">
        {filtered.map((book, i) => (
          <div key={book.id} style={{ animationDelay: `${i * 40}ms` }}>
            <BookCard book={book} onFav={onFav} isFav={favorites.includes(book.id)} onClick={onBookClick} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="px-4 py-16 text-center">
          <Icon name="BookX" size={40} className="text-muted-foreground mx-auto mb-3" />
          <p className="font-display text-lg text-muted-foreground">Ничего не найдено</p>
          <p className="text-muted-foreground font-body text-sm mt-1">Попробуйте другой запрос</p>
        </div>
      )}
    </div>
  );
}

function FavoritesPage({ favorites, onFav, onBookClick }: {
  favorites: number[];
  onFav: (id: number) => void;
  onBookClick: (book: typeof BOOKS[0]) => void;
}) {
  const favBooks = BOOKS.filter(b => favorites.includes(b.id));

  return (
    <div className="pb-24">
      <div className="px-4 pt-8 pb-4">
        <h1 className="font-display text-4xl font-bold text-foreground">Избранное</h1>
        <p className="text-muted-foreground font-body text-sm mt-1">
          {favBooks.length > 0 ? `${favBooks.length} книг в вашей коллекции` : "Ваша коллекция пуста"}
        </p>
      </div>

      {favBooks.length === 0 ? (
        <div className="px-4 py-20 text-center">
          <Icon name="Heart" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="font-display text-xl text-muted-foreground">Здесь пока пусто</p>
          <p className="text-muted-foreground font-body text-sm mt-2">Добавляйте книги в избранное, нажимая ♥</p>
        </div>
      ) : (
        <div className="px-4 space-y-3">
          {favBooks.map((book, i) => (
            <div
              key={book.id}
              className="flex items-center gap-4 bg-card border border-border rounded-2xl p-3 cursor-pointer group hover:border-primary/40 transition-all animate-fade-in"
              style={{ animationDelay: `${i * 60}ms` }}
              onClick={() => onBookClick(book)}
            >
              <BookCover book={book} size="sm" className="group-hover:scale-105 transition-transform duration-300" />
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">{book.title}</h3>
                <p className="text-muted-foreground text-xs font-body mt-0.5 truncate">{book.author}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <StarRating rating={book.rating} />
                  <span className="text-[10px] text-muted-foreground font-body">{book.pages} стр.</span>
                </div>
                <span className="inline-block mt-1.5 text-[10px] font-body font-medium px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{book.genre}</span>
              </div>
              <button
                className="w-9 h-9 flex-shrink-0 flex items-center justify-center"
                onClick={(e) => { e.stopPropagation(); onFav(book.id); }}
              >
                <Icon name="Trash2" size={16} className="text-muted-foreground hover:text-destructive transition-colors" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProfilePage() {
  const readCount = READING_HISTORY.filter(r => r.progress === 100).length;
  const totalPages = READING_HISTORY.reduce((sum, r) => {
    const book = BOOKS.find(b => b.id === r.bookId);
    return sum + Math.round((book?.pages || 0) * r.progress / 100);
  }, 0);
  const genres = [...new Set(READING_HISTORY.map(r => BOOKS.find(b => b.id === r.bookId)?.genre).filter(Boolean))];

  const stats = [
    { label: "Прочитано", value: readCount, icon: "BookOpen" },
    { label: "Страниц", value: totalPages, icon: "BookMarked" },
    { label: "Жанров", value: genres.length, icon: "Layers" },
  ];

  return (
    <div className="pb-24">
      <div className="px-4 pt-8 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="font-display text-2xl font-bold text-primary-foreground">А</span>
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Алексей Смирнов</h1>
            <p className="text-muted-foreground font-body text-sm">Читатель с 2023 года</p>
          </div>
        </div>
      </div>

      <div className="px-4 mb-6">
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-2xl p-4 text-center animate-scale-in">
              <Icon name={stat.icon} fallback="BookOpen" size={20} className="text-primary mx-auto mb-2" />
              <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-muted-foreground font-body text-xs mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 mb-6">
        <h2 className="font-display text-xl font-semibold text-foreground mb-3">История чтения</h2>
        <div className="space-y-3">
          {READING_HISTORY.map((record, i) => {
            const book = BOOKS.find(b => b.id === record.bookId);
            if (!book) return null;
            return (
              <div key={record.bookId} className="flex items-center gap-3 bg-card border border-border rounded-2xl p-3 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                <BookCover book={book} size="sm" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-sm font-semibold text-foreground leading-tight truncate">{book.title}</h3>
                  <p className="text-muted-foreground text-xs font-body truncate">{book.author}</p>
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground font-body">{record.progress === 100 ? "Прочитано" : `${record.progress}%`}</span>
                      <span className="text-xs text-muted-foreground font-body">{record.date}</span>
                    </div>
                    <div className="h-1.5 bg-border rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${record.progress === 100 ? "bg-green-500" : "bg-primary"}`}
                        style={{ width: `${record.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="px-4 mb-6">
        <h2 className="font-display text-xl font-semibold text-foreground mb-3">Любимые жанры</h2>
        <div className="flex flex-wrap gap-2">
          {genres.map(genre => (
            <span key={genre as string} className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-body text-sm font-medium">
              {genre}
            </span>
          ))}
        </div>
      </div>

      <div className="px-4">
        <h2 className="font-display text-xl font-semibold text-foreground mb-3">Настройки</h2>
        <div className="space-y-2">
          {[
            { label: "Уведомления", icon: "Bell" },
            { label: "Тема оформления", icon: "Palette" },
            { label: "Язык", icon: "Globe" },
            { label: "О приложении", icon: "Info" },
          ].map((item) => (
            <button key={item.label} className="w-full flex items-center justify-between bg-card border border-border rounded-2xl px-4 py-3.5 hover:border-primary/40 transition-colors group">
              <div className="flex items-center gap-3">
                <Icon name={item.icon} fallback="Settings" size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="font-body text-sm text-foreground">{item.label}</span>
              </div>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Navigation ────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "catalog", label: "Каталог", icon: "Grid3X3" },
  { id: "favorites", label: "Избранное", icon: "Heart" },
  { id: "profile", label: "Профиль", icon: "User" },
];

// ─── App ───────────────────────────────────────────────────────────────────

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [favorites, setFavorites] = useState<number[]>(FAVORITES_DEFAULT);
  const [selectedBook, setSelectedBook] = useState<typeof BOOKS[0] | null>(null);

  const toggleFav = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const pages: Record<string, React.ReactNode> = {
    home: <HomePage favorites={favorites} onFav={toggleFav} onBookClick={setSelectedBook} />,
    catalog: <CatalogPage favorites={favorites} onFav={toggleFav} onBookClick={setSelectedBook} />,
    favorites: <FavoritesPage favorites={favorites} onFav={toggleFav} onBookClick={setSelectedBook} />,
    profile: <ProfilePage />,
  };

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      <main className="overflow-y-auto">
        {pages[activePage]}
      </main>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-card/90 backdrop-blur-xl border-t border-border z-40">
        <div className="flex items-center justify-around px-2 py-2">
          {NAV_ITEMS.map(item => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`relative flex flex-col items-center gap-1 px-5 py-2 rounded-xl transition-all duration-200 ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className={`${isActive ? "scale-110" : ""} transition-transform duration-200`}>
                  <Icon name={item.icon} fallback="Home" size={22} className={item.id === "favorites" && favorites.length > 0 && isActive ? "fill-primary" : ""} />
                  {item.id === "favorites" && favorites.length > 0 && (
                    <span className="absolute -top-0.5 right-2 w-3.5 h-3.5 rounded-full bg-primary text-primary-foreground text-[8px] font-body font-bold flex items-center justify-center">
                      {favorites.length}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] font-body font-medium ${isActive ? "text-primary" : ""}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          isFav={favorites.includes(selectedBook.id)}
          onFav={toggleFav}
        />
      )}
    </div>
  );
}