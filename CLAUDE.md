# Bikepacking-Blog von Stephan Albinus

Statische Seite mit Astro, live auf https://stephan-albinus.de (Host Europe, cPanel).
Stephan kümmert sich nur um Inhalte. Claude übernimmt Beiträge, Design, Technik und Pflege.

## Veröffentlichen

Jeder Push auf `main` baut die Seite (GitHub Action `.github/workflows/deploy.yml`)
und lädt `dist/` per SFTP nach `public_html`. Zugangsdaten liegen als GitHub-Secrets
(`SFTP_HOST`, `SFTP_PORT`, `SFTP_USER`, `SFTP_PASSWORD`, optional `SFTP_PATH`).
Niemals Zugangsdaten in Dateien schreiben oder im Chat erfragen.

Vor jedem Push: `npm run build` muss fehlerfrei laufen.

## Neue Tour anlegen

Stephan schickt meist: Notizen oder diktierten Text, Fotos, eine GPX-Datei.

1. Ordner `src/content/touren/<slug>/` anlegen. Slug: kurz, klein, Bindestriche, ohne Umlaute
   (z. B. `harz-overnighter-2027`).
2. Fotos dort ablegen, sinnvoll benennen (`01-start.jpg` …). Fotos vorher auf max. 2400 px
   lange Kante verkleinern; Astro erzeugt daraus WebP in mehreren Größen.
   **Vor dem Speichern GPS-Daten (EXIF) aus den Fotos entfernen**, damit der Wohnort
   nicht verraten wird.
3. GPX als `track.gpx` ablegen. Distanz und Höhenmeter berechnet die Seite selbst.
   Wenn der Track zu Hause startet: Start und Ende vorher um ein paar hundert Meter kürzen
   und Stephan darauf hinweisen.
4. `index.md` schreiben:

```md
---
title: "Titel der Tour"
description: "Ein bis zwei Sätze für Vorschau und Suchmaschinen."
date: 2027-05-14
kategorie: overnighter   # mehrtagestour | overnighter | tagestour | ausruestung
cover: ./01-start.jpg
coverAlt: "Was auf dem Bild zu sehen ist"
region: Harz
tage: 2
gpx: track.gpx
# distanz: 120        # nur setzen, wenn kein GPX vorhanden
# hoehenmeter: 1800
# entwurf: true       # nicht veröffentlichen
---

Text in Markdown. Bilder mit ![Beschreibung](./02-lager.jpg)
```

Schreibstil: Stephans Notizen in seiner Stimme ausformulieren, Ich-Form, locker und konkret,
keine erfundenen Erlebnisse oder Fakten. Was unklar ist, bei Stephan nachfragen.
Überschriften `##` für Abschnitte (z. B. pro Tag).

## Aufbau

- `src/site.config.ts` – Name, Hero-Text, Zahlen auf der Startseite, Social-Links, Kategorien
- `src/content/touren/` – alle Beiträge (ein Ordner pro Tour)
- `src/pages/` – Seiten (Start, Touren, Kategorien, Über mich, Impressum, Datenschutz, RSS)
- `src/components/` – Header, Footer, TourCard, TourListe, TourMap
- `src/lib/gpx.ts` – liest GPX zur Build-Zeit (Distanz, Höhenmeter, Karte, Höhenprofil)
- `src/styles/global.css` – Farben und Schriften (Big Shoulders Display + Source Serif 4, selbst gehostet)
- `src/assets/placeholder/` – Platzhalterbilder, nach und nach durch echte Fotos ersetzen

## Design

Farben: Kiefer `#1f2e28`, Senf `#e0a526`, Sand `#ebe7df`, Tinte `#18211d`.
Überschriften in Big Shoulders Display, Text in Source Serif 4. Gestrichelte Senf-Linie
unter Abschnittstiteln steht für die Route. Keine Cookies, kein Tracking, keine externen
Schriften; die Karte lädt OpenStreetMap erst nach Klick (Datenschutz).

## Offene Punkte

- Beispiel-Touren (`beispiel-*`) löschen, sobald die erste echte Tour online ist
- Platzhalterbilder (Hero, Kategorien, Über mich) durch echte Fotos ersetzen
- Zahlen in `site.config.ts` (stats) füllen
- HTTPS-Weiterleitung in `public/.htaccess` aktivieren, sobald das Zertifikat gilt
