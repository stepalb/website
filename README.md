# stephan-albinus.de

Bikepacking-Blog, gebaut mit [Astro](https://astro.build). Jeder Push auf `main` wird automatisch veröffentlicht.

## Lokal ansehen

```sh
npm install
npm run dev
```

## Veröffentlichen einrichten (einmalig)

Im GitHub-Repo unter **Settings → Secrets and variables → Actions → New repository secret** anlegen:

| Name | Wert |
| --- | --- |
| `SFTP_HOST` | Server aus cPanel (z. B. aus „FTP-Konten“ oder „SSH-Zugriff“) |
| `SFTP_PORT` | SSH/SFTP-Port (meist `22`) |
| `SFTP_USER` | cPanel-Benutzername |
| `SFTP_PASSWORD` | Passwort dazu |
| `SFTP_PATH` | optional, Standard ist `public_html` |

Danach unter **Actions → Bauen und veröffentlichen → Run workflow** einmal starten.

Wie Beiträge angelegt werden, steht in `CLAUDE.md`.
