// Zentrale Einstellungen der Seite. Texte und Zahlen hier ändern,
// nicht in den einzelnen Seiten.

export const site = {
  name: 'Stephan Albinus',
  tagline: 'Bikepacking, Schotter und Nächte im Zelt',
  description:
    'Touren, Routen und Ausrüstung: ein Bikepacking-Blog über Mehrtagestouren, Overnighter und das selbst aufgebaute Rad.',
  url: 'https://stephan-albinus.de',
  author: 'Stephan Albinus',

  hero: {
    headline: 'Raus, aufs Rad, weiter als geplant',
    intro:
      'Ich packe Zelt und Kocher ans Gravelbike und fahre los. Hier stehen die Routen, die Geschichten und alles, was ich unterwegs dabeihabe.',
  },

  // Zahlen für "Über mich" auf der Startseite. Leere Werte werden nicht angezeigt.
  stats: [
    { value: '', label: 'Kilometer auf Schotter' },
    { value: '', label: 'Nächte im Zelt' },
    { value: '', label: 'Bundesländer durchquert' },
  ],

  about: {
    short:
      'Ich heiße Stephan und fahre am liebsten dorthin, wo der Asphalt aufhört. Mein Rad habe ich selbst aufgebaut, meine Routen plane ich selbst, und meistens übernachte ich draußen.',
  },

  // Leer lassen, was es (noch) nicht gibt.
  social: {
    instagram: '',
    strava: '',
    komoot: '',
  },
} as const;

// Kategorien für Touren. Schlüssel = URL-Teil.
export const kategorien = {
  mehrtagestour: {
    name: 'Mehrtagestouren',
    text: 'Mehrere Tage unterwegs, mit allem am Rad.',
  },
  overnighter: {
    name: 'Overnighter',
    text: 'Eine Nacht draußen, egal wie weit.',
  },
  tagestour: {
    name: 'Tagestouren',
    text: 'Lange Runden ohne Gepäck.',
  },
  ausruestung: {
    name: 'Ausrüstung',
    text: 'Taschen, Schlafsystem, Rad und was sich bewährt hat.',
  },
} as const;

export type KategorieKey = keyof typeof kategorien;
