import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/theme.css';
import './styles/global.css';
import './styles/museum.css';
import './styles/responsive.css';
import App from './App';

const el = document.getElementById('root');
if (el) createRoot(el).render(<StrictMode><App /></StrictMode>);
