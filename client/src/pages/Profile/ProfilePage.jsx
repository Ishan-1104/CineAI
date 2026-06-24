import { useAuth } from "../../contexts/AuthContext";
import { useFavorites } from "../../contexts/FavoritesContext";
import { useWatchlist } from "../../contexts/WatchlistContext";

const ProfilePage = () => {
  const { user, logout } =
    useAuth();

  const { favorites } =
    useFavorites();

  const { watchlist } =
    useWatchlist();

  if (!user) {
    return (
      <div className="p-10">
        User not found
      </div>
    );
  }

  return (
    <section
      className="
        max-w-4xl
        mx-auto
        px-6
        py-10
      "
    >
      <div
        className="
          bg-slate-900
          border
          border-slate-800
          rounded-3xl
          p-8
        "
      >
        <div className="flex items-center gap-6">
          <div
            className="
              h-24
              w-24
              rounded-full
              bg-red-500
              flex
              items-center
              justify-center
              text-4xl
              font-bold
            "
          >
            {user.name?.charAt(0)}
          </div>

          <div>
            <h1
              className="
                text-4xl
                font-bold
              "
            >
              {user.name}
            </h1>

            <p
              className="
                text-slate-400
                mt-2
              "
            >
              {user.email}
            </p>
          </div>
        </div>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
            mt-10
          "
        >
          <div
            className="
              bg-slate-800
              rounded-2xl
              p-6
            "
          >
            <h3
              className="
                text-slate-400
              "
            >
              Favorites
            </h3>

            <p
              className="
                text-4xl
                font-bold
                mt-2
              "
            >
              {favorites.length}
            </p>
          </div>

          <div
            className="
              bg-slate-800
              rounded-2xl
              p-6
            "
          >
            <h3
              className="
                text-slate-400
              "
            >
              Watchlist
            </h3>

            <p
              className="
                text-4xl
                font-bold
                mt-2
              "
            >
              {watchlist.length}
            </p>
          </div>

          <div
            className="
              bg-slate-800
              rounded-2xl
              p-6
            "
          >
            <h3
              className="
                text-slate-400
              "
            >
              Member Since
            </h3>

            <p
              className="
                text-lg
                font-semibold
                mt-3
              "
            >
              {new Date(
                user.createdAt
              ).toLocaleDateString()}
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          className="
            mt-10
            bg-red-500
            hover:bg-red-600
            transition
            px-6
            py-3
            rounded-xl
            font-semibold
          "
        >
          Logout
        </button>
      </div>
    </section>
  );
};

export default ProfilePage;