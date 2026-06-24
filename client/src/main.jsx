import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";

import { SearchProvider } from "./contexts/SearchContext";
import { RecommendationProvider } from "./contexts/RecommendationContext";
import { AuthProvider } from "./contexts/AuthContext";
import { FavoritesProvider} from "./contexts/FavoritesContext";
import { WatchlistProvider} from "./contexts/WatchlistContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <BrowserRouter>
    <AuthProvider>
      <SearchProvider>
        <RecommendationProvider>
          <FavoritesProvider>
            <WatchlistProvider>
              <App />
              <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 3000,
                    style: {
                      background: "#0f172a",
                      color: "#fff",
                      border: "1px solid #334155",
                    },
                  }}
                />
            </WatchlistProvider>
          </FavoritesProvider>
        </RecommendationProvider>
      </SearchProvider>
    </AuthProvider>
  </BrowserRouter>
);