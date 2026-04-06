import { useState } from "react";
import { useReaderState } from "@/hooks/useReaderState";
import BottomNav from "@/components/BottomNav";
import Home from "./Home";
import Catalog from "./Catalog";
import Favorites from "./Favorites";
import Profile from "./Profile";

type Tab = "home" | "catalog" | "favorites" | "profile";

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const state = useReaderState();

  return (
    <div className="min-h-screen bg-background">
      <main className="overflow-y-auto">
        {activeTab === "home" && <Home state={state} />}
        {activeTab === "catalog" && <Catalog state={state} />}
        {activeTab === "favorites" && <Favorites state={state} />}
        {activeTab === "profile" && <Profile state={state} />}
      </main>
      <BottomNav
        active={activeTab}
        onChange={setActiveTab}
        favoritesCount={state.favorites.length}
      />
    </div>
  );
};

export default Index;
