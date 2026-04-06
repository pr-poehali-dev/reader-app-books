import Icon from "@/components/ui/icon";

type Tab = "home" | "catalog" | "favorites" | "profile";

interface BottomNavProps {
  active: Tab;
  onChange: (tab: Tab) => void;
  favoritesCount: number;
}

const tabs: { id: Tab; icon: string; label: string }[] = [
  { id: "home", icon: "Home", label: "Главная" },
  { id: "catalog", icon: "BookMarked", label: "Каталог" },
  { id: "favorites", icon: "Heart", label: "Избранное" },
  { id: "profile", icon: "User", label: "Профиль" },
];

export default function BottomNav({ active, onChange, favoritesCount }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-around px-2 py-2 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className="flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all relative"
            >
              <div className={`relative transition-transform ${isActive ? "scale-110" : ""}`}>
                <Icon
                  name={tab.icon as "Home"}
                  size={22}
                  className={`transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  } ${tab.id === "favorites" && isActive ? "fill-primary" : ""}`}
                />
                {tab.id === "favorites" && favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {favoritesCount > 9 ? "9+" : favoritesCount}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-medium transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}