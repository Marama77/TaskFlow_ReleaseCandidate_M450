# Release-Entscheid TaskFlow 1.4.0-rc1

## Entscheidung

**NO-GO**

Aufgrund von **mehreren kritischen Sicherheitslücken** sowie **mangelhafter Fehlerbehandlung** wird die Produktivsetzung dieses Release Candidates abgelehnt. Eine Nachbesserung ist dringend erforderlich.

## Begruendung

1. Alle Benutzer können auf alle Tasks zugreifen, sie lesen und verändern = Sicherheitsrisiko
2. Tasks können auf Daten in der Vergangenheit gesetzt werden = Sicherheitsrisiko.
3. Kontosperrung erfolgt erst nach 6, nicht nach 5 erfolglosen Einloggungs-Versuchen = Sicherheitsrisiko.

## Offene Defects

| Defect-ID | Severity | Risiko fuer Release | Begruendung |
|---|---|---|---|
| | | | |

## Testabdeckung

Welche wesentlichen Risiken wurden ausreichend getestet? Welche Risiken bleiben offen?

## Empfohlene naechste Schritte

Was muss vor oder nach einem Release noch gemacht werden?

Der Code muss vollständig von Fehlern befreit und geprüft werden, um die Anforderungen und den API-Vertrag zu erfüllen. 
