import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/Login/LoginPage";
import SignupPage from "../pages/Signup/SignupPage";
import MovieDetailsPage from "../pages/MovieDetails/MovieDetailsPage";
import RecommendationsPage from "../pages/Recommendations/RecommendationsPage";
import FavoritesPage from "../pages/Favorites/FavoritesPage";
import WatchlistPage from "../pages/Watchlist/WatchlistPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
        <Route
  path="/favorites"
  element={
    <ProtectedRoute>
      <FavoritesPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/watchlist"
  element={
    <ProtectedRoute>
      <WatchlistPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  }
/>
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
};

export default AppRoutes;