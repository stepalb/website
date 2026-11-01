import fs from 'node:fs';
import path from 'node:path';

export interface TrackData {
  /** [lat, lon] reduziert für die Karte */
  line: [number, number][];
  /** [km, Höhe] reduziert für das Höhenprofil */
  profile: [number, number][];
  distanzKm: number;
  hoehenmeter: number;
  minEle: number;
  maxEle: number;
}

function haversine(a: number[], b: number[]) {
  const R = 6371;
  const dLat = ((b[0] - a[0]) * Math.PI) / 180;
  const dLon = ((b[1] - a[1]) * Math.PI) / 180;
  const la1 = (a[0] * Math.PI) / 180;
  const la2 = (b[0] * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Liest eine GPX-Datei zur Build-Zeit. entryFile = filePath des Content-Eintrags. */
export function readTrack(entryFile: string | undefined, gpxName: string | undefined): TrackData | null {
  if (!entryFile || !gpxName) return null;
  const file = path.join(path.dirname(path.resolve(entryFile)), gpxName);
  if (!fs.existsSync(file)) return null;
  const xml = fs.readFileSync(file, 'utf8');

  const pts: { lat: number; lon: number; ele: number | null }[] = [];
  const re = /<(?:trkpt|rtept)\b([^>]*?)(?:\/>|>([\s\S]*?)<\/(?:trkpt|rtept)>)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml))) {
    const lat = parseFloat(/lat="([^"]+)"/.exec(m[1])?.[1] ?? 'NaN');
    const lon = parseFloat(/lon="([^"]+)"/.exec(m[1])?.[1] ?? 'NaN');
    const eleM = m[2] ? /<ele>([^<]+)<\/ele>/.exec(m[2]) : null;
    if (!isNaN(lat) && !isNaN(lon)) pts.push({ lat, lon, ele: eleM ? parseFloat(eleM[1]) : null });
  }
  if (pts.length < 2) return null;

  let dist = 0;
  let gain = 0;
  // Höhe glätten, damit GPS-Rauschen die Höhenmeter nicht aufbläht
  let lastEle: number | null = pts[0].ele;
  const cum: number[] = [0];
  for (let i = 1; i < pts.length; i++) {
    dist += haversine([pts[i - 1].lat, pts[i - 1].lon], [pts[i].lat, pts[i].lon]);
    cum.push(dist);
    const e = pts[i].ele;
    if (e != null && lastEle != null) {
      const d = e - lastEle;
      if (Math.abs(d) >= 5) {
        if (d > 0) gain += d;
        lastEle = e;
      }
    } else if (e != null) lastEle = e;
  }

  const target = 400;
  const step = Math.max(1, Math.floor(pts.length / target));
  const line: [number, number][] = [];
  const profile: [number, number][] = [];
  for (let i = 0; i < pts.length; i += step) {
    line.push([+pts[i].lat.toFixed(5), +pts[i].lon.toFixed(5)]);
    if (pts[i].ele != null) profile.push([+cum[i].toFixed(2), Math.round(pts[i].ele!)]);
  }
  const last = pts[pts.length - 1];
  line.push([+last.lat.toFixed(5), +last.lon.toFixed(5)]);
  if (last.ele != null) profile.push([+dist.toFixed(2), Math.round(last.ele)]);

  const eles = profile.map((p) => p[1]);
  return {
    line,
    profile,
    distanzKm: Math.round(dist),
    hoehenmeter: Math.round(gain / 10) * 10,
    minEle: eles.length ? Math.min(...eles) : 0,
    maxEle: eles.length ? Math.max(...eles) : 0,
  };
}

/** SVG-Pfad für das Höhenprofil (viewBox 0 0 w h) */
export function profilePath(t: TrackData, w = 1000, h = 120) {
  if (t.profile.length < 2) return { line: '', area: '' };
  const maxKm = t.profile[t.profile.length - 1][0] || 1;
  const pad = (t.maxEle - t.minEle) * 0.15 || 10;
  const lo = t.minEle - pad;
  const hi = t.maxEle + pad;
  const pts = t.profile.map(([km, e]) => [(km / maxKm) * w, h - ((e - lo) / (hi - lo)) * h]);
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join('');
  return { line, area: `${line}L${w},${h}L0,${h}Z` };
}

export const fmt = (n: number) => n.toLocaleString('de-DE');
