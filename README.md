# Trovex MVP

Trovex ist eine Collectibles-Trading-Plattform ("Robinhood für Sammlerstücke") für den DACH-Markt. Dieses MVP konzentriert sich auf die Kern-Funktion: Eine digitale Sammlung mit Portfolio-Übersicht und Live-Pricing (manuell/simuliert).

## Features

- **Authentifizierung:** Sicherer Login & Registrierung via Supabase Auth.
- **Sammlungs-Management:** CRUD-Operationen für Sammlerstücke inklusive Multi-Bild-Upload (Supabase Storage).
- **Dashboard:** Portfolio-Zusammenfassung mit Recharts-Visualisierungen (Wertentwicklung, Kategorien-Verteilung).
- **Suche & Entdecken:** Volltextsuche und Filterung innerhalb der eigenen Sammlung.
- **Watchlist:** Items beobachten und Preis-Ziele setzen.
- **Einstellungen:** Profil bearbeiten, Währung wählen und CSV-Datenexport.

## Tech-Stack

- **Frontend:** React (Vite), TypeScript, Tailwind CSS
- **Backend:** Supabase (PostgreSQL, Auth, Storage)
- **Charts:** Recharts
- **Icons:** Lucide React

## Setup & Installation

1. **Repository klonen**
2. **Abhängigkeiten installieren:**
   ```bash
   npm install
   ```
3. **Umgebungsvariablen:**
   Erstelle eine `.env` Datei basierend auf `.env.example` und trage deine Supabase URL und den Anon Key ein.
4. **Datenbank-Setup:**
   Führe die SQL-Migrations aus `supabase/migrations/` in deinem Supabase SQL Editor aus.
5. **Entwicklungs-Server starten:**
   ```bash
   npm run dev
   ```

## Projektstruktur

- `/src/components`: Wiederverwendbare UI-Komponenten (Auth, Collection, Dashboard etc.)
- `/src/pages`: Seiten-Komponenten (Dashboard, Collection, Search etc.)
- `/src/hooks`: Custom React Hooks für Daten-Fetching und Logik.
- `/src/lib`: Supabase-Client und Hilfsfunktionen.
- `/src/types`: TypeScript Interfaces.
- `/supabase`: Datenbank-Migrationen und Seed-Daten.

## Lizenz

© 2024 Trovex. Alle Rechte vorbehalten.
