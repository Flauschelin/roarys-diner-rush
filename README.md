# Roary’s — Diner Rush

Ein spielbares 3D-Browserspiel in einem alten American Diner: Hilf Roary,
Burger, Cola und Pommes rechtzeitig an drei Tresen zu servieren.

**[Direkt spielen – Single-File (Standard)](https://flauschelin.github.io/roarys-diner-rush/)**

**[Multi-File-Version spielen](https://flauschelin.github.io/roarys-diner-rush/multi/)**

Beide Fassungen enthalten denselben aktuellen Spielstand inklusive korrigierter
Mundanimation. Single-File lädt alles als eine HTML-Datei. Multi-File lädt Code,
Modell, Texturen und Audio separat und bietet das Home-Screen-Manifest.

## Steuerung

- Tastatur: ↑/↓ oder W/S zum Wechseln der Station; Leertaste zum Holen/Servieren;
  Q zum Ablegen; P zum Pausieren.
- Touch: links auf der Spielfläche vertikal wischen, rechts zum Holen/Servieren
  tippen. Ein langer Wisch wechselt zwei Stationen.
- Burger oben, Cola in der Mitte, Pommes unten. Bestellungen stehen bei den Kunden.

Benötigt einen aktuellen Browser mit WebGL und Hardwarebeschleunigung. Ton startet
erst nach einer Nutzeraktion. Grafik und Lautstärke lassen sich im Spiel anpassen.
Rekord und Einstellungen werden lokal im Browser gespeichert.

Dieses Repository enthält ausschließlich die gebündelte, minimierte Spielfassung
mit ihren benötigten Laufzeit-Assets. Kein bearbeitbares Quellprojekt, keine
Referenzfotos, Blender-Dateien, Entwicklungstests oder Source Maps. JavaScript und
Assets eines Browserspiels bleiben technisch herunterladbar und einsehbar.

## Ein-Datei-Release · 25.10.2026

Aktuell: **1080p-optimierte Texturen in beiden Versionen**. Roary nutzt zwei
2K-Texturen statt 8K, Leder 512 statt 1024 Pixel. Kamera, Anatomie und Spielregeln
bleiben erhalten. iPhone/iPad behalten den direkten speichersparenden Renderer.
Details: [Texturbudget und Bildvergleich](TEXTURE-OPTIMIZATION.md).
Bei zwischengespeicherter alter Fassung: [neu laden mit Versionsparameter](https://flauschelin.github.io/roarys-diner-rush/?v=textures1).

Die aktuelle Startseite ist selbstständig: Spielcode, Modell, Texturen, Musik,
23 Sprachsamples, sechs Geräusche und Lizenzhinweise stecken in einer HTML-Datei.
Mit korrigierter Sprechanimation: Oberkiefer fest, Unterkiefer öffnet/schließt.

**[Single-File herunterladen](https://github.com/Flauschelin/roarys-diner-rush/releases/latest)**

**[Multi-File als ZIP herunterladen](https://github.com/Flauschelin/roarys-diner-rush/releases/latest/download/roarys-diner-rush-multi.zip)**

Datei: `roarys-diner-rush-single.html`, etwa **37,0 MiB** statt zuvor 43,7 MiB.
ZIP: etwa **23,5 MiB**; entpacken und über einen lokalen Webserver bereitstellen.
SHA-256 steht in
`SHA256SUMS.txt`. Die Datei kann einzeln weitergegeben werden. Ein direkter
Doppelklick-Start wurde vom Nutzer bestätigt; die automatisierte Browserprüfung
erfolgte über HTTP, nicht über file://. Keine externen Spieldateien erforderlich.
Ältere Laufzeitdateien bleiben zur Kompatibilität im Repository, werden von der
aktuellen Single-File-Startseite aber nicht nachgeladen.

Die aktuelle Multi-File-Fassung liegt getrennt im Ordner `multi/`; die Standard-
Startseite bleibt die Single-File-Fassung. Beide Downloads und beide Spieladressen
nutzen die neuen optimierten Assets.

Work-in-progress-Demo, keine abgeschlossene AAA-Produktion. Eine vollständige
Geräte- und Hörabnahme steht noch aus. Die Single-File-Fassung hat kein separates
Home-Screen-Manifest; Vollbild und Einstellungen hängen vom Browser ab.

## Rechte

Die öffentliche Bereitstellung dieses Builds macht ihn nicht Open Source und
erteilt keine pauschale Erlaubnis zur Weiterverwendung seiner Projektassets.
Siehe [Drittanbieterhinweise](THIRD_PARTY_NOTICES.md).
