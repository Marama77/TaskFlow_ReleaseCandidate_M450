# TaskFlow Release Candidate 1.4.0-rc1

Starterprojekt fuer **Modul 450 - LB-02: Release Candidate - Go/No-Go**.

## Voraussetzungen

- Node.js 20 oder neuer
- Terminal
- Optional: Postman. Alternativ kann `curl` verwendet werden.

Es sind keine externen npm-Pakete notwendig.

## Start

```bash
npm start
```

Die API laeuft danach standardmaessig unter:

```text
http://localhost:3000
```

Health Check:

```text
GET http://localhost:3000/api/health
```

## Startertests

```bash
npm test
```

Die vorhandenen Tests sind nur ein Startpunkt und zaehlen nicht zu den neu zu implementierenden Tests der LB-02.

## Testkonten

| Rolle | E-Mail | Passwort | Beispiel-Token |
|---|---|---|---|
| Mitarbeiter | alice@example.test | Start123! | token-alice |
| Mitarbeiter | bob@example.test | Start123! | token-bob |
| Administrator | admin@example.test | Admin123! | token-admin |

Alle Konten und Daten sind rein fiktiv.

## Wichtige Unterlagen

- `docs/Anforderungen.md` - fachliche und technische Anforderungen
- `docs/API_Vertrag.md` - Endpoints, Statuscodes und Beispielrequests
- `docs/Risikomatrix_Vorlage.csv`
- `docs/Testfaelle_Vorlage.csv`
- `docs/Testprotokoll_Vorlage.csv`
- `docs/Defectliste_Vorlage.csv`
- `docs/TEAMBEITRAG_Vorlage.md`
- `postman/TaskFlow_LB02.postman_collection.json`
- `postman/TaskFlow_LB02.postman_environment.json`

## Auftrag

Die verbindliche Aufgabenstellung und Bewertung stehen im Dokument **Modul_450_LB-02.docx**.

Der Release Candidate ist bewusst als Pruefungsprojekt vorbereitet. Gehen Sie nicht davon aus, dass bestehender Code oder bestehende Tests korrekt oder vollstaendig sind. Arbeiten Sie risikobasiert und dokumentieren Sie Ihre Entscheidungen nachvollziehbar.
