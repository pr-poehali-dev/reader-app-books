import Icon from "@/components/ui/icon";
import { Book } from "@/data/books";

interface BookCardProps {
  book: Book;
  isFavorite: boolean;
  progress?: number;
  onToggleFavorite: (id: number) => void;
  size?: "sm" | "md" | "lg";
}

export default function BookCard({ book, isFavorite, progress = 0, onToggleFavorite, size = "md" }: BookCardProps) {
  const coverH = size === "sm" ? "h-36" : size === "lg" ? "h-64" : "h-48";
  const coverW = size === "sm" ? "w-24" : size === "lg" ? "w-44" : "w-32";

  return (
    <div className="group relative flex flex-col rounded-xl overflow-hidden bg-card border border-border card-shadow hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:card-shadow-hover">
      <div className={`relative ${coverH} ${coverW === "w-32" ? "w-full" : ""} flex-shrink-0`}>
        <div className={`${book.coverClass} noise absolute inset-0 flex flex-col items-center justify-center p-4`}>
          <div className="text-white/20 text-5xl font-display font-bold select-none">
            {book.title.charAt(0)}
          </div>
        </div>

        {book.trending && (
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            Тренд
          </div>
        )}
        {book.new && (
          <div className="absolute top-2 left-2 bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            Новинка
          </div>
        )}

        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(book.id); }}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
        >
          <Icon name={isFavorite ? "Heart" : "Heart"} size={14} className={isFavorite ? "text-red-400 fill-red-400" : "text-white"} />
        </button>

        {progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col gap-1 flex-1">
        <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">{book.genre}</p>
        <h3 className="text-sm font-semibold text-foreground leading-tight line-clamp-2">{book.title}</h3>
        <p className="text-xs text-muted-foreground">{book.author}</p>
        <div className="flex items-center gap-1 mt-auto pt-1">
          <Icon name="Star" size={11} className="text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-medium text-foreground">{book.rating}</span>
          <span className="text-xs text-muted-foreground ml-auto">{book.pages} стр.</span>
        </div>
        {progress > 0 && progress < 100 && (
          <p className="text-[10px] text-primary font-medium">Читаю · {progress}%</p>
        )}
        {progress === 100 && (
          <p className="text-[10px] text-green-400 font-medium">Прочитано ✓</p>
        )}
      </div>
    </div>
  );
}