import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-xxl">
        <div className="row g-4">
          <div className="col-lg-5">
            <p className="brand-line">PhotoVerse 3D</p>
            <p className="text-faint">Explore the World Through a Different Lens. A demo project: photographers and camera metadata are fictional or illustrative, and visitor statistics are simulated.</p>
          </div>
          <div className="col-6 col-lg-3">
            <h2 className="footer-h">Explore</h2>
            <ul className="list-unstyled footer-links">
              <li><Link to="/museum">3D Museum</Link></li>
              <li><Link to="/collections">Collections</Link></li>
              <li><Link to="/photographers">Photographers</Link></li>
              <li><Link to="/explore">Explorer</Link></li>
            </ul>
          </div>
          <div className="col-6 col-lg-4">
            <h2 className="footer-h">Your space</h2>
            <ul className="list-unstyled footer-links">
              <li><Link to="/favorites">Favorites</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/settings">Settings</Link></li>
            </ul>
          </div>
        </div>
        <p className="tiny text-faint mt-4 mb-0">Photographs are served from Unsplash under its licence. Check the terms before reuse.</p>
      </div>
    </footer>
  );
}
