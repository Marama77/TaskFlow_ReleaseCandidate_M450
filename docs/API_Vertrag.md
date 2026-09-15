# TaskFlow API-Vertrag

Basis-URL lokal:

```text
http://localhost:3000
```

## GET /api/health

Erwartung: HTTP 200

```json
{
  "status": "ok",
  "version": "1.4.0-rc1"
}
```

## POST /api/login

Request:

```json
{
  "email": "alice@example.test",
  "password": "Start123!"
}
```

Erfolgreich: HTTP 200

```json
{
  "token": "token-alice",
  "user": {
    "id": "u1",
    "name": "Alice Meier",
    "role": "employee"
  }
}
```

Fehlerhafte Credentials: HTTP 401.
Gesperrtes Konto: HTTP 423.

## GET /api/tasks

Header:

```text
Authorization: Bearer <token>
```

Erwartung: HTTP 200 und nur die Tasks, die fuer die Rolle sichtbar sein duerfen.

## POST /api/tasks

Header:

```text
Authorization: Bearer <token>
Content-Type: application/json
```

Beispiel:

```json
{
  "title": "Release Checkliste erstellen",
  "description": "Alle offenen Punkte kontrollieren",
  "priority": "HIGH",
  "dueDate": "2026-09-30"
}
```

Erfolgreich: HTTP 201.
Validierungsfehler: HTTP 400.

## PATCH /api/tasks/{id}

Header:

```text
Authorization: Bearer <token>
Content-Type: application/json
```

Beispiel:

```json
{
  "status": "DONE"
}
```

Moegliche Statuscodes:

- 200 - erfolgreich geaendert
- 400 - ungueltige Eingabe
- 401 - nicht authentifiziert
- 403 - keine Berechtigung
- 404 - Task nicht vorhanden
