import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SmartImage from '../components/common/SmartImage';
import PhotoGrid from '../components/photography/PhotoGrid';
import { photographs, photoById } from '../data/photographs';
import { photographers } from '../data/photographers';
import { avatarFor } from '../utils/imageUtils';
import type { Category } from '../types/photography';

const collectionCards: { name: string; category: Category; blurb: string; cover: string }[] = [
  { name: 'Nature & Landscapes', category: 'Landscape', blurb: 'Peaks, valleys and wide horizons at their best light.', cover: 'ph-06' },
  { name: 'Architecture & Cities', category: 'Architecture', blurb: 'Glass, concrete and the rhythm of city streets.', cover: 'ph-11' },
  { name: 'Wildlife & Animals', category: 'Wildlife', blurb: 'Animals caught being entirely themselves.', cover: 'ph-18' },
  { name: 'Automotive', category: 'Automotive', blurb: 'Machines, motion and the shine of wet asphalt.', cover: 'ph-21' },
  { name: 'Portraits & People', category: 'Portrait', blurb: 'Faces and the quiet stories inside them.', cover: 'ph-26' },
  { name: 'Night Sky & Space', category: 'Night Sky', blurb: 'Milky Way cores, aurora curtains and star trails.', cover: 'ph-41' },
];

export default function HomePage() {
  const nav = useNavigate();
  const hero = photoById('ph-06');
  const featured = photographs.filter((p) => p.featured).slice(0, 8);
  const star = photographers.find((p) => p.id === 'p3');
  const starWorks = photographs.filter((p) => p.photographerId === 'p3').slice(0, 3);

  return (
    <main id="main">
      <section className="hero">
        {hero && <SmartImage className="hero-img" src={hero.imageUrl.replace('w=1260', 'w=1920').replace('h=840', 'h=1080')} alt={`${hero.title}: a mountain landscape`} category="Landscape" title={hero.title} eager width={1920} height={1080} />}
        <div className="hero-shade" aria-hidden="true" />
        <div className="particles" aria-hidden="true">{Array.from({ length: 16 }, (_, i) => <span key={i} style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i * 0.9) % 9}s`, animationDuration: `${12 + (i % 5) * 3}s` }} />)}</div>
        <div className="container-xxl hero-copy">
          <p className="hero-tag">Explore the World Through a Different Lens</p>
          <h1>Every Photograph Tells a Universe.</h1>
          <p className="hero-lead">Step inside an immersive photography museum where extraordinary moments, breathtaking landscapes, and creative visions come alive.</p>
          <div className="d-flex flex-wrap gap-3">
            <Link to="/museum" className="btn btn-accent btn-lg">Enter the Museum</Link>
            <Link to="/collections" className="btn btn-glass btn-lg">Explore Collections</Link>
          </div>
        </div>
      </section>

      <section className="section container-xxl" aria-labelledby="h-col">
        <div className="section-head"><h2 id="h-col">Featured collections</h2><Link to="/collections" className="link-accent">All collections <ArrowRight size={15} aria-hidden="true" /></Link></div>
        <div className="row g-4">
          {collectionCards.map((c) => {
            const cover = photoById(c.cover);
            const n = photographs.filter((p) => p.category === c.category).length;
            return (
              <div key={c.name} className="col-md-6 col-lg-4">
                <article className="collection-card">
                  {cover && <SmartImage src={cover.thumbUrl} alt={`Cover for ${c.name}: ${cover.title}`} category={c.category} title={c.name} width={900} height={600} />}
                  <div className="cc-body">
                    <h3>{c.name}</h3>
                    <p className="mb-1">{c.blurb}</p>
                    <p className="small text-faint">{n} photographs</p>
                    <button className="btn btn-glass btn-sm" onClick={() => nav(`/collections?category=${encodeURIComponent(c.category)}`)} aria-label={`Explore ${c.name}`}>Explore</button>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section container-xxl" aria-labelledby="h-feat">
        <div className="section-head"><h2 id="h-feat">Featured photographs</h2></div>
        <PhotoGrid photos={featured} layout="masonry" />
      </section>

      <section className="section container-xxl" aria-labelledby="h-about">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <h2 id="h-about">About PhotoVerse</h2>
            <p className="lead-text">PhotoVerse 3D is a demo photography museum you can walk through. Three galleries hold forty-five photographs; every frame can be opened, saved and compared.</p>
            <p className="text-faint">Photographers are fictional, camera details are illustrative, and visitor statistics are simulated. The images are served from Unsplash.</p>
          </div>
          <div className="col-lg-6">
            <div className="stats-band">
              <div><strong>{photographs.length}</strong><span>photographs</span></div>
              <div><strong>9</strong><span>categories</span></div>
              <div><strong>{photographers.length}</strong><span>photographers</span></div>
              <div><strong>3</strong><span>galleries</span></div>
            </div>
          </div>
        </div>
      </section>

      {star && (
        <section className="section container-xxl" aria-labelledby="h-star">
          <h2 id="h-star">Featured photographer</h2>
          <div className="panel star-panel">
            <img src={avatarFor(star.name, star.hue)} width={120} height={120} alt={`Illustrated avatar for ${star.name}, a fictional demo photographer`} className="avatar" />
            <div>
              <h3 className="mb-0">{star.name}</h3>
              <p className="text-accent">{star.specialty}, {star.country}</p>
              <p>{star.bio}</p>
              <Link to="/photographers" className="link-accent">Meet all photographers <ArrowRight size={15} aria-hidden="true" /></Link>
            </div>
            <div className="star-works">
              {starWorks.map((w) => <SmartImage key={w.id} src={w.thumbUrl} alt={w.title} category={w.category} title={w.title} width={300} height={200} />)}
            </div>
          </div>
        </section>
      )}

      <section className="container-xxl section">
        <div className="cta-banner">
          <h2>The museum is open.</h2>
          <p>Walk the galleries, change the light and save the frames you love.</p>
          <Link to="/museum" className="btn btn-accent btn-lg">Enter the Museum</Link>
        </div>
      </section>
    </main>
  );
}
