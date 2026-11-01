import { getCollection, type CollectionEntry } from 'astro:content';
import { readTrack } from './gpx';

export type Tour = CollectionEntry<'touren'>;

/** Alle veröffentlichten Touren, neueste zuerst. Entwürfe nur im Dev-Modus. */
export async function alleTouren(): Promise<Tour[]> {
  const all = await getCollection('touren', ({ data }) => import.meta.env.DEV || !data.entwurf);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Kennzahlen: Frontmatter hat Vorrang, sonst aus der GPX-Datei. */
export function kennzahlen(t: Tour) {
  const track = readTrack(t.filePath, t.data.gpx);
  return {
    track,
    distanz: t.data.distanz ?? track?.distanzKm,
    hoehenmeter: t.data.hoehenmeter ?? track?.hoehenmeter,
    tage: t.data.tage,
  };
}

export const datum = (d: Date) =>
  d.toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });

export function lesezeit(body: string | undefined) {
  const w = (body ?? '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(w / 200));
}
