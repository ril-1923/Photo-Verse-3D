import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, Moon, Sun, X, Aperture } from 'lucide-react';
import { useSettingsStore } from '../../store/useSettingsStore';

const links = [
  { to: '/', label: 'Home' },
  { to: '/museum', label: 'Museum' },
  { to: '/collections', label: 'Collections' },
  { to: '/photographers', label: 'Photographers' },
  { to: '/explore', label: 'Explore' },
  { to: '/favorites', label: 'Favorites' },
  { to: '/dashboard', label: 'Dashboard' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const theme = useSettingsStore((s) => s.theme);
  const setSetting = useSettingsStore((s) => s.set);
  return (
    <header className="site-nav">
      <nav className="container-xxl d-flex align-items-center gap-3" aria-label="Main navigation">
        <Link to="/" className="brand" onClick={() => setOpen(false)} aria-label="PhotoVerse 3D home">
          <Aperture size={22} strokeWidth={1.6} aria-hidden="true" /> PhotoVerse <span>3D</span>
        </Link>
        <ul className={`nav-links ${open ? 'is-open' : ''}`}>
          {links.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.to === '/'} className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setOpen(false)}>{l.label}</NavLink>
            </li>
          ))}
          <li className="d-lg-none"><NavLink to="/settings" onClick={() => setOpen(false)}>Settings</NavLink></li>
        </ul>
        <div className="ms-auto d-flex align-items-center gap-2">
          <button className="icon-btn" onClick={() => setSetting('theme', theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="icon-btn d-lg-none" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
