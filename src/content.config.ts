import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const touren = defineCollection({
  // Jede Tour ist ein Ordner: src/content/touren/<slug>/index.md
  loader: glob({ pattern: '**/index.md', base: './src/content/touren', generateId: ({ entry }) => entry.replace(/\/index\.md$/, '') }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      kategorie: z.enum(['mehrtagestour', 'overnighter', 'tagestour', 'ausruestung']),
      cover: image(),
      coverAlt: z.string().default(''),
      region: z.string().optional(),
      // Optional: wird sonst aus track.gpx berechnet
      distanz: z.number().optional(),
      hoehenmeter: z.number().optional(),
      tage: z.number().optional(),
      // Dateiname der GPX-Datei im Tour-Ordner
      gpx: z.string().optional(),
      entwurf: z.boolean().default(false),
    }),
});

export const collections = { touren };
