import { useState } from 'react';
import type { Category } from '../../types/photography';
import { placeholderFor } from '../../utils/imageUtils';

interface Props {
  src: string;
  alt: string;
  category: Category;
  title: string;
  className?: string;
  eager?: boolean;
  width?: number;
  height?: number;
}

/** Lazy image with shimmer while loading and a local generated fallback on failure. */
export default function SmartImage({ src, alt, category, title, className = '', eager = false, width = 900, height = 600 }: Props) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const url = failed ? placeholderFor(category, title, width, height) : src;
  return (
    <span className={`smart-img ${loaded ? 'is-loaded' : ''} ${className}`}>
      <img
        src={url}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        width={width}
        height={height}
        onLoad={() => setLoaded(true)}
        onError={() => { if (!failed) setFailed(true); else setLoaded(true); }}
      />
    </span>
  );
}
