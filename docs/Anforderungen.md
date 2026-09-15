# TaskFlow - Anforderungen fuer Release Candidate 1.4.0-rc1

## 1. Ziel

TaskFlow ist eine kleine Aufgabenverwaltung. Der Release Candidate soll vor der Produktivsetzung fachlich, technisch und sicherheitsbezogen geprueft werden.

## 2. Benutzer und Rollen

Es gibt zwei Rollen:

- **employee**: Mitarbeiter
- **admin**: Administrator

### Berechtigungsregeln

1. Ein Mitarbeiter darf nur seine eigenen Tasks sehen.
2. Ein Mitarbeiter darf nur seine eigenen Tasks bearbeiten.
3. Ein Administrator darf alle Tasks sehen und bearbeiten.
4. Ohne gueltige Authentifizierung duerfen keine Task-Daten gelesen oder veraendert werden.

## 3. Login

1. Login erfolgt mit E-Mail und Passwort.
2. Korrekte Anmeldedaten liefern HTTP 200 und ein Token.
3. Falsche Anmeldedaten liefern HTTP 401.
4. Nach **5 aufeinanderfolgenden fehlgeschlagenen Loginversuchen** wird das Konto gesperrt.
5. Ein gesperrtes Konto liefert HTTP 423.
6. Ein erfolgreicher Login setzt die Zahl der vorherigen Fehlversuche auf 0 zurueck.

## 4. Task erstellen

Endpoint: `POST /api/tasks`

Pflicht- und Validierungsregeln:

- `title` ist erforderlich.
- `title` muss nach dem Trimmen zwischen **3 und 100 Zeichen** lang sein.
- `priority` ist optional und darf nur `LOW`, `MEDIUM` oder `HIGH` sein.
- Wenn `priority` fehlt, gilt standardmaessig `MEDIUM`.
- `dueDate` ist optional, muss aber ein gueltiges ISO-Datum sein und darf nicht in der Vergangenheit liegen.
- Ein neuer Task erhaelt den Status `OPEN`.
- Der angemeldete Benutzer wird automatisch als Owner gesetzt.

## 5. Task bearbeiten

Endpoint: `PATCH /api/tasks/{id}`

- Erlaubte Felder: `title`, `description`, `priority`, `status`, `dueDate`.
- `status` darf nur `OPEN`, `IN_PROGRESS` oder `DONE` sein.
- Die gleichen Regeln fuer `title`, `priority` und `dueDate` wie beim Erstellen gelten auch beim Bearbeiten.
- Ein Mitarbeiter darf keine fremden Tasks bearbeiten.
- Ein Administrator darf jeden Task bearbeiten.

## 6. Fehlerbehandlung und Security

1. Fehlende oder ungueltige Authentifizierung liefert HTTP 401.
2. Authentifizierte Benutzer ohne ausreichende Berechtigung erhalten HTTP 403.
3. Nicht vorhandene Tasks liefern HTTP 404.
4. Ungueltige Eingaben liefern HTTP 400 mit einer verstaendlichen Fehlermeldung.
5. Fehlerantworten duerfen keine Stacktraces, Dateipfade, Secrets oder internen Implementierungsdetails enthalten.
6. Die API darf bei ungueltigem JSON nicht abstuerzen.

## 7. Release-Ziel

Das Team muss am Ende genau eine Entscheidung treffen:

- **GO** - der Release Candidate kann aus Sicht des Teams produktiv gesetzt werden.
- **NO-GO** - der Release Candidate soll vor der Produktivsetzung korrigiert werden.

Die Entscheidung muss mit Testresultaten, offenen Defects und Risikoargumenten begruendet werden.
