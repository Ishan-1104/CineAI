import { useState } from "react";

import { Link } from "react-router-dom";

import {
  FaBars,
  FaTimes,
} from "react-icons/fa";

import Button from "../../ui/Button/Button";

import {
  useAuth,
} from "../../../contexts/AuthContext";

const Navbar = () => {
  const {
    user,
    logout,
  } = useAuth();

  const [menuOpen, setMenuOpen] =
    useState(false);

  return (
    <header
      className="
        sticky
        top-0
        z-50
        backdrop-blur-xl
        bg-slate-950/60
        border-b
        border-slate-800
      "
    >
      <nav
        className="
          max-w-7xl
          mx-auto
          px-6
          py-4
          flex
          items-center
          justify-between
        "
      >
        <Link
          to="/"
          className="
            text-3xl
            font-bold
            tracking-tight
          "
        >
          <span className="text-red-500">
            Cine
          </span>
          <span>AI</span>
        </Link>

        {/* Desktop Menu */}
        <div
          className="
            hidden
            md:flex
            items-center
            gap-8
          "
        >
          <Link to="/">
            Home
          </Link>

          <Link to="/recommendations">
            Recommendations
          </Link>

          {user && (
            <>
              <Link to="/favorites">
                Favorites
              </Link>

              <Link to="/watchlist">
                Watchlist
              </Link>

              <Link to="/profile">
                Profile
              </Link>
            </>
          )}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <Button
                as={Link}
                to="/login"
              >
                Login
              </Button>

              <Button
                as={Link}
                to="/signup"
                variant="secondary"
              >
                Signup
              </Button>
            </>
          ) : (
            <>
              <span
                className="
                  text-sm
                  text-slate-300
                "
              >
                Hi, {user.name}
              </span>

              <Button
                onClick={logout}
              >
                Logout
              </Button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() =>
            setMenuOpen(
              !menuOpen
            )
          }
          className="
            md:hidden
            text-2xl
          "
        >
          {menuOpen ? (
            <FaTimes />
          ) : (
            <FaBars />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="
            md:hidden
            bg-slate-900
            border-t
            border-slate-800
            px-6
            py-4
            flex
            flex-col
            gap-4
          "
        >
          <Link
            to="/"
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Home
          </Link>

          <Link
            to="/recommendations"
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Recommendations
          </Link>

          {user && (
            <>
              <Link
                to="/favorites"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Favorites
              </Link>

              <Link
                to="/watchlist"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Watchlist
              </Link>

              <Link
                to="/profile"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Profile
              </Link>

              <button
                onClick={() => {
                  logout();
                  setMenuOpen(
                    false
                  );
                }}
                className="
                  text-left
                  text-red-500
                "
              >
                Logout
              </button>
            </>
          )}

          {!user && (
            <>
              <Link
                to="/login"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;