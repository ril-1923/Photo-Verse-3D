import type { Photographer } from '../../types/photography';
import { avatarFor } from '../../utils/imageUtils';

interface Props { photographer: Photographer; photoCount: number; onOpen: (p: Photographer) => void }

export default function PhotographerCard({ photographer: p, photoCount, onOpen }: Props) {
  return (
    <article className="photographer-card">
      <img src={avatarFor(p.name, p.hue)} alt={`Illustrated avatar for ${p.name}, a fictional demo photographer`} width={96} height={96} />
      <div>
        <h3>{p.name}</h3>
        <p className="text-accent mb-1">{p.specialty}</p>
        <p className="text-faint small mb-2">{p.country}</p>
        <p className="small">{p.bio}</p>
        <div className="d-flex gap-3 small text-faint mb-3">
          <span>{photoCount} photographs</span><span>{p.collections} collections</span>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => onOpen(p)} aria-label={`View profile of ${p.name}`}>View profile</button>
      </div>
    </article>
  );
}
