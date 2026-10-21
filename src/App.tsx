import { lazy, Suspense, useEffect } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ToastHost from './components/common/Toast';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingScreen from './components/common/LoadingScreen';
import PhotoDetailsModal from './components/photography/PhotoDetailsModal';
import { useSettingsStore } from './store/useSettingsStore';
import { usePhotoStore } from './store/usePhotoStore';

const HomePage = lazy(() => import('./pages/HomePage'));
const MuseumPage = lazy(() => import('./pages/MuseumPage'));
const CollectionsPage = lazy(() => import('./pages/CollectionsPage'));
const PhotographersPage = lazy(() => import('./pages/PhotographersPage'));
const ExplorePage = lazy(() => import('./pages/ExplorePage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function ThemeSync() {
  const theme = useSettingsStore((s) => s.theme);
  const accent = useSettingsStore((s) => s.accent);
  const reduced = useSettingsStore((s) => s.reducedMotion);
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-bs-theme', theme);
    root.style.setProperty('--accent', accent);
    root.dataset.reduceMotion = reduced ? 'true' : 'false';
  }, [theme, accent, reduced]);
  return null;
}

function RouteEffects() {
  const { pathname } = useLocation();
  const close = usePhotoStore((s) => s.closePhoto);
  useEffect(() => { window.scrollTo(0, 0); close(); }, [pathname, close]);
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <ThemeSync />
      <RouteEffects />
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar />
      <ErrorBoundary label="This page failed to load">
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/museum" element={<MuseumPage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/photographers" element={<PhotographersPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
      <Footer />
      <PhotoDetailsModal />
      <ToastHost />
    </HashRouter>
  );
}
