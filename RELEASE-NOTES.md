# Roary’s — Diner Rush · 2026.10.25

## iOS-Startpatch · ios1

- Reaktion auf Safari-Abbruch unmittelbar nach fertig geladenem Startmenü.
- iPhone/iPad: beide Modelltexturen schon beim Decodieren auf 2048px begrenzt,
  keine Composer-/AO-/Bloom-Puffer, DPR höchstens 1, Standard-Qualität beim Start.
- Quellmodell, Anatomie, Spielregeln und Kamera unverändert. Desktop und Android
  behalten bisherige Texturqualität und Rendering-Auswahl.
- WebGL-Kontextverlust zeigt eine bleibende Fehlermeldung statt blind weiterzulaufen.
- 105 Tests und beide Builds erfolgreich. Kompatibilitätspfad im Desktop-Browser
  erzwungen und 2K/direct kontrolliert; Gegenprobe 8K/composer erfolgreich.
- **Keine physische iPhone-Abnahme**: Speicherdruck ist die wahrscheinliche Ursache,
  ein Safari-Prozessprotokoll liegt nicht vor. Nutzer muss die Änderung bestätigen.
- Single-File bleibt Standard; Multi-File wurde ebenfalls aktualisiert.

- Selbstständiges Single-File-HTML, 1920-fähige responsive WebGL-Spielfläche.
- Sprechanimation korrigiert: getrennte Zahnreihen, fester Oberkiefer,
  beweglicher Unterkiefer und dunkler Mundinnenraum. Original-GLB unverändert.
- Bestehende Steuerung, Kameraperspektive, Musik, 23 Sprachsamples und sechs
  Geräusche enthalten. Keine Änderung der Spielmechanik.
- 59 eingebettete Dateien, ca. 43,7 MiB; keine externen Laufzeitdateien nötig.
- Browserprüfung: echtes Intro mit sichtbarer Mundöffnung, Stummschaltung und
  Übergang ins Spiel. Details der vorherigen Prüfungen im privaten Quellprojekt.
- Keine neue physische Handy- oder vollständige Hörabnahme. Ressourcenintensive
  Erstanzeige auf schwächeren Geräten möglich. Kein neues PWA-Manifest.

Herkunft und Lizenzhinweise sind im Spiel unter „Lizenzen & Herkunft“ eingebettet.
Suno-Aufnahmen sind nicht CC0; keine pauschale Asset-Weiterverwendungslizenz.
