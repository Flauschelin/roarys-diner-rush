# Roary’s — Diner Rush · 2026.10.25

## iPhone/iPad-Web-App-Hilfe · webapp1

- Neuer „Web-App“-Button oben rechts auf erkannten iPhones/iPads; ausgeblendet
  im erkannten Standalone-Modus. Öffnet eine Anleitung, keinen Installationsdialog.
- Safari-Schritte und Link zur Multi-File-Web-App. Eigene Markdown-Anleitung
  `IPHONE-WEBAPP.md`, auch im Multi-File-ZIP enthalten und im README verlinkt.
- Laufende Schicht pausiert beim Lesen und wird danach fortgesetzt; eine bereits
  pausierte Schicht bleibt pausiert. Sprache stoppt, vorgemerkte Eingaben werden
  gelöscht. Menülink und Tastaturzugang ergänzen den Button.
- 119 Tests bestanden; beide Builds und Modellvalidierung erfolgreich.
- Browserprüfung mit explizit simuliertem iPhone-Detektor: Hoch-/Querformat,
  Button ohne HUD-Überlappung, scrollbare Anleitung, Menülink, Schließen sowie
  Pause/Fortsetzen. Keine tatsächliche iPhone-Installation geprüft.
- Single-File bleibt Standard. Keine Änderung von Grafik, Anatomie oder Regeln.

## Mobiles Querformat · landscape1

- Automatische Vollbild-Anfrage auf Touchgeräten im kurzen Querformat; bei
  Aktivierungssperre ein weiterer Versuch bei der nächsten echten Eingabe.
- Bewusstes Verlassen wird respektiert, erneutes Scharfschalten erst nach
  Hochformat. Keine Orientierungssperre; Desktop und Home-Screen-Modus erhalten.
- Scoreboard im Querformat linksbündig mit Safe-Area-Abständen.
- 115 Tests bestanden; Single-/Multi-Build und Modellvalidierung erfolgreich.
- Browserprüfung: echtes Vollbild, externes Verlassen, Quer-/Hochformatlayout,
  lange Werte und simulierte Safe Areas. Dreh-Erkennung durch automatisierte
  Tests geprüft; keine neue physische Smartphone-Abnahme.
- Optimierte Texturen unverändert; Single-File bleibt Standard.

## 1080p-Texturoptimierung · textures1

- Beide aktuellen Spielfassungen verwenden optimierte Texturen: Roary 2048 statt
  8192 Pixel, CC0-Leder 512 statt 1024 Pixel. Logo und Küchenflächen unverändert.
- Auswahl anhand farbiger GPU-Mips und sechs eingefrorener Original-/4K-/2K-
  Vergleichsansichten. Geometrie, UVs, Gewichte und Animationsdaten bytegleich.
- Maximal 1920×1080 tatsächliche 3D-Renderpixel, auch bei Retina/4K. iOS-Sparpfad
  erhalten; keine Änderung von Kamera, Spielmechanik oder Roarys Anatomie.
- Single-HTML ca. 37,0 statt 43,7 MiB; Multi-File als Website und ZIP (ca. 23,5 MiB).
  Single-File bleibt die Standard-Spieladresse.
- Beide Release-Builds und Modellvalidierung erfolgreich. 111/112 Tests bestanden;
  einzig der bekannte Zugriffstest auf ein ursprüngliches Referenzfoto scheitert
  an macOS EPERM. Keine Tests deaktiviert und keine Dateirechte verändert.
- Browser: Single-File mit erfolgreicher Zustellung, Pause, Neustart, Sprache und
  Stumm; Multi-File mit Start und emuliertem Hoch-/Querformat geprüft. Keine neue
  physische iPhone-Abnahme oder vollständige Hörprüfung behauptet.

## Frühere Änderungen

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
