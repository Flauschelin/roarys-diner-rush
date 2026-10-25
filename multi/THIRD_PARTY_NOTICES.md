# Asset-Herkunft und Lizenzstatus

## Mip-gemessene 1080p-Texturvarianten (25.10.2026)

Aktiv ist `public/models/roary-meshy-1080p.glb` statt der archivierten 8K-Fassung.
Zwei eingebettete JPEGs auf 2048 × 2048, Blender 5.2.3, JPEG-Qualität 95; Farbkarte
als sRGB, Rauheit/Metall als Nicht-Farbdaten. Keine Mesh-Neuexportierung: sämtliche
nicht bildbezogenen BufferViews sowie Geometrie-/UV-/Skin-/Animationsdefinitionen
sind bytegleich zum animierten Original. Fehlender linker Hinterfuß unverändert.
Originaldateien und bestehende Anbieter-/Nutzungsrechte bleiben erhalten; keine
CC0-Neulizenzierung des Hundemodells oder der Suno-Aufnahmen.

Vorhandenes CC0-Leder von Poly Haven als 512er Kopien unter `textures/optimized`,
Normalen nach Skalierung renormalisiert. Quelldateien unverändert. Der neue
`provenance.json` bindet Quellen- und Ergebnisprüfsummen. Die nicht benutzte
Farbkarte `dirty_tiles_color.jpg` wird nicht mehr geladen oder eingebettet;
sichtbarer prozeduraler Boden sowie seine Normal-/Rauheitskarten bleiben erhalten.

Messbasis: sechs 1920×1080-Ansichten mit farbigen Mips, danach zwölf eingefrorene
Original-/4K-/2K-Vergleichspaare. Roary im Intro: 2K mittlere RGB-Abweichung maximal
0,531/255; oberer 40%-Bereich maximal 0,563/255. 1:1-Detailvergleich geprüft.
Versiegelte Läufe: `run_1792918809937_482f6e546c704151b6c49b99a0a027c0` und
`run_1792919618595_45ff449383884f0cbc79148c7996d5f8`. Keine physische iPhone-Abnahme,
keine behauptete FPS-Messung. Budget/Hashes: `assets/texture-optimization.json`.

## Laufzeit-Texturbudget für iPhone/iPad (25.10.2026)

Die zwei eingebetteten 8192er JPEG-Texturen des aktiven GLBs werden auf iOS beim
ImageBitmap-Decodieren mit 2048 × 2048 Pixeln angefordert. Keine Quelltexturen oder
GLB-Dateien umgeschrieben, keine Geometrie-/Anatomieänderung, keine neuen Assets,
Provider-Aufträge oder Lizenzannahmen. Andere Plattformen behalten die bisherigen
Auflösungen. Technischer Ursprung: eigener Code in `device-profile.js` / `view.js`.

## Kieferöffnung statt gemeinsamer Gebiss-Verformung (25.10.2026)

Eigener Code in `src/game/roary-mouth.js`: Laufzeitkopie des bestehenden Meshes
an der Bisslinie aufgetrennt, Schnittattribute einschließlich Hautgewichten
interpoliert und Unterkiefer-Morph auf die unteren Flächen begrenzt. Der neue
dunkle Mundinnenraum ist prozedurale Geometrie mit demselben vorhandenen Skelett.
Keine externen Assets, Käufe oder Generierungen. Original-GLB und Texturen bleiben
unverändert. Bisherige Herkunfts-/Lizenzhinweise gelten weiterhin; die Bearbeitung
verleiht dem Mesh oder den Suno-Aufnahmen ausdrücklich keine CC0-Lizenz.

## Drei rote Vordergrund-Hocker

`src/game/diner-stools.js`: eigene prozedurale runde Polster, vier leicht
ausgestellte Stahlrohrbeine, Chrom-Sitzring, Fußring und Gummikappen. Vorhandenes
Poly-Haven-Ledermaterial wiederverwendet (Herkunft/Lizenz unten), separat rot
eingefärbt, Originalmaterial unverändert. Keine neuen Downloads oder Käufe.
Statische Geometrie mit weniger als 6000 Dreiecken insgesamt, vorhandenes
Raum-Batching übernimmt die Teile; keine zusätzlichen Lichter oder Shader.

## Vorwärtslauf mit seitlichem Service-Blick

`roary-gait.js` / `roary-animation.js`: eigener vorwärts gerichteter Tragezyklus
und ruhige Tragepose auf dem vorhandenen 19-Gelenk-Skelett. `roary-service-gaze.js`
dreht additiv nur Hals/Kopf. Die zwischenzeitlich erprobten Seitwärtszyklen wurden
nach Klarstellung des Nutzers verworfen; der Körper folgt der Laufrichtung.
Quell-GLB, Oberfläche, Gewichte, Texturen und fehlender linker Hinterfuß unverändert.
Temporärer IK-Endpunkt nur auf der Authoring-Kopie am intakten rechten Hinterlauf,
kein zusätzliches Deformationsgelenk, kein linker Hinterfuß und kein neues Mesh.
Keine Downloads, Provider-Generierungen, Käufe oder neue Lizenzannahmen.

## Cola-Zapfanimation

`src/game/cola-pour.js` und `cola-timing.js`: eigene prozedurale Geometrie und
Animation, vorhandenes Bechermaterial wiederverwendet. Keine externen Assets,
Provider-Aufträge oder Käufe. Ein wiederverwendeter Strahl und acht instanzierte
Kohlensäurebläschen, keine Texturen, Lichter oder Partikel-Emitter hinzugefügt.
Das vorhandene Suno-Zapfgeräusch bleibt unverändert und **nicht CC0**. Zur Laufzeit
wird ein Ausschnitt ab 0,18 s für 0,315 s mit kurzem Fade verwendet; dessen Start
liegt 0,025 s nach erfolgreicher Aufnahme. Herkunft und Originaldatei unverändert.

## Animiertes Frittieröl

`src/game/fryer-oil.js`: eigener GLSL-Code für warme, leicht transparente
Öloberflächen und analytische Oberflächenbläschen. Keine kopierten Fremdshader,
Texturdownloads, zusätzlichen Fonts, Provider-Aufträge oder Käufe. Three.js
unter bestehender MIT-Lizenz. Eigene offene Beckengeometrie mit denselben
Außenmaßen; die bisherigen Körbe, Griffe und Pommes-Verpackung bleiben erhalten.
Zwei kleine Flächen, jeweils 64 Dreiecke, keine Partikelsimulation oder
Rendertexturen. Die entfernte Pommes-Abzugshaube bleibt entfernt.

## Individuelle Tresenausstattung

`src/game/counter-dressing.js`: original im Projekt codegebaute Requisiten
für Burger-, Cola- und Pommes-Tresen, einschließlich Geometrie, Labels und
Gebrauchsspuren. Keine externen Modelle, Bilddownloads, neuen Fonts oder
kostenpflichtigen Generierungen. Verwendet Three.js unter bestehender MIT-Lizenz,
die vorhandenen Canvas-Label-Helfer mit Systemschrift und die vorhandene lokale
gealterte Küchenmetall-Textur (Herkunft unverändert unten dokumentiert).
Keine zusätzliche Drittanbieter-Lizenz und keine Behauptung eines externen
CC0-Imports. Kleine Requisiten sind Teil des Szenencodes, kein neu exportiertes
oder als CLI-Paket validiertes GLB-Asset.

## Vollständiger Sprachsatz: 23 Suno-MP3s

Aktueller Stand ersetzt die ältere Drei-Intro-Integration weiter unten. Alle
MP3s aus `assets/audio/suno-voices-2026-10-24/complete-v1/` werden bytegleich nach
`public/audio/voices/` übernommen. `tools/prepare-all-speech.mjs` prüft die
SHA-256-Werte gegen `complete-v1/report.json` und verweigert abweichende bereits
vorhandene Zieldateien. Originalaufnahmen und vorbereitete WAV/MP3s unverändert.
Vollständiger Herkunfts-, Schnitt- und Dateinachweis im Runtime-`provenance.json`.

**Nicht CC0.** Suno-Kontobedingungen gelten, unabhängige kommerzielle Freigabe
weiterhin offen. Nutzer hat ausdrücklich den Einbau vor eigener Hörabnahme
gewünscht; keine menschliche Hörprüfung durch den Assistenten behauptet.
Keine zusätzlichen Käufe, Generierungen oder Tarifänderungen.

`game-dev` 1.5.1 ist inzwischen installiert. Die lokale Audiovorbereitung ist
aber kein CLI-Katalogpaket: `package verify complete-v1` findet kein erforderliches
`manifest.json`; die dokumentierte `package build`-Schnittstelle erwartet GLB.
Daher kein vorgetäuschter game-dev-Vendor-Lock: lokale MP3-Integrität über den
vorhandenen Schnittbericht und verifizierte Kopien dokumentiert.

Untertitel aus der ursprünglichen 23er-Spruchliste des Hauptchats, nicht blind
aus ASR übernommen. `zufall_03`: unklare ASR-Abweichung, Hörvergleich offen;
`erfolg_02`: im ASR kein finales „Fast.“, deshalb im Untertitel weggelassen.
Keine wortgenaue Timing-/Aussprache-Abnahme; Untertitel beginnen/enden mit der
tatsächlichen Clipwiedergabe. Die bisherigen drei Intro-Lip-Sync-Hüllkurven
bleiben bytegleich zu denselben MP3s zugeordnet, kein neuer Modellumbau.

## Sechs Suno-Geräusche vom 24.10.2026

Auf ausdrücklichen Einbauauftrag aus
`assets/audio/suno-sfx-2026-10-24/MAIN_CHAT_PROMPT.md` lokal übernommen:
Tablett, Cola, Türglocke und Registrierkasse als vorbereitete MP3-Dateien;
Fritteuse und Grill als vorbereitete 4-Sekunden-PCM-WAV-Loops.
`npm run prepare:sfx` vergleicht die SHA-256-Werte vor dem Import und verweigert
abweichende bestehende Zieldateien. Keine erneute Klangbearbeitung/Generierung.
Die Originale, Prompts und das Quellmanifest bleiben unverändert.

Runtime-Dateien und vollständige Herkunfts-/Hash-Belege:
`public/audio/sfx/provenance.json`. Das Paket ist **nicht CC0**; Suno-Kontobedingungen
gelten. Eine unabhängige kommerzielle Veröffentlichungsfreigabe und menschliche
Hörabnahme sind weiterhin offen. Kein Kauf oder Tarifwechsel im Zuge des Einbaus.
Kein versiegeltes game-dev-Paket: CLI nicht installiert; der Einbauauftrag erlaubt
ausdrücklich den lokalen Import der vorbereiteten Dateien.

## Raum-, Material- und Lichtüberarbeitung

Die neue Umgebung entsteht direkt aus originalem Three.js-Code in
`src/game/art.js` und `src/game/diner-surfaces.js`. Keine neuen Modellpakete,
Texturdownloads, Bildgeneratoren oder kostenpflichtigen Dienste verwendet.

- Originale abgerundete Extrusionsgeometrie für Tresen, getrennte gealterte
  Kantenmaterialien, tatsächliche Fugen und 816 Fliesen in drei Instanzgruppen.
- Originale deterministische Canvas-Texturen für Putz, Fliesen-Farbstruktur,
  gerippte Matte, Schmutz-/Getränkeabdrücke und Kreidetafel. Keine Bearbeitung
  fremder Texturbilder. Bestehende Poly-Haven-Normal-/Rauheitsmaps sowie Leder,
  Metall und Blender-Bakes werden weiterverwendet. Die frühere Dirty-Tiles-
  Farbkarte wird für den neuen Fliesen-Farblook nicht mehr eingesetzt.
- Originale Raumgeometrie: Seitenwände mit tatsächlicher Fensteröffnung,
  Jalousie-Streben, Tür, Abzugshauben, Rohre, Polster-/Hockerdetails, verformter
  Mülleimer und gefaltete Stoffgeometrie. Keine Änderung an Roarys GLB.
- Schattenwerfer: gerichtetes Fenster-/Umgebungslicht und Licht durch das
  Seitenfenster. Warme lokale Lampen und Küchen-Arbeitslichter ergänzen diese.
- Three.js-Postprocessing: GTAOPass, UnrealBloomPass, OutputPass und FXAAShader,
  MIT. Originaler ShaderPass für sehr leichte Entsättigung/Randabdunklung.
  Three.js-Lizenztext wird unter `public/licenses/three-LICENSE.txt` mitgeliefert.
- Kein behauptetes Raytracing, keine echte globale Beleuchtung oder volumetrische
  Simulation. AO ist bildschirmbasiert; Bloom bleibt bewusst dezent.
- Keine zusätzlichen externen Kosten. Herkunft/Rechte von Modell, Logo und Musik
  bleiben wie in den jeweiligen Abschnitten beschrieben.

## Neues Restaurantlogo „Roary’s Dinner“

- Grafik: `public/branding/roarys-dinner-logo-v1.png`, 2172 × 724 Pixel, 3:1.
- Erstellt mit eingebautem ImageGen-Werkzeug; neue Logo-Grafik auf Basis der
  bereitgestellten Roary-Identitätsreferenz, kein CLI-/API-Fallback.
- Name gemäß aktuellem Auftrag mit zwei N: „Roary’s Dinner“. Der Spieltitel
  „Diner Rush“ und die Verpackungs-/UI-W-Signets bleiben unverändert.
- Originale Illustration mit Roarys Kopf, eigener Wortmarke und kantigem W;
  Petrol/Creme/Rostrot/Gold passend zur Restaurantgestaltung.
- Vollständiger Prompt und Abgrenzung: `assets/branding/logo-prompt.md`.
- Datei-, Referenz- und Prompt-SHA-256: `assets/branding/active-logo.json`.
- Die unverzerrte Bildfläche sitzt auf einem dreidimensionalen Schild mit
  Metallrahmen, rückseitigen Haltern und vier Befestigungen. Keine Wiederholung
  des Logos auf Seitenflächen. Lokal ausgeliefert, keine Remote-Bildanfragen.
- KI-generiertes Projektasset, kein behaupteter CC0-Status, keine Markenprüfung
  und keine übernommene externe Fontdatei.

## Vom Nutzer bereitgestellte Hintergrundmusik

Explizit zur Verwendung als wechselnde Level-Hintergrundmusik freigegeben:

| Level | Originaldatei | Browserfassung | Länge |
| --- | --- | --- | --- |
| 1 | `Bouncy Blues Shuffle.m4a` | `public/audio/music/bouncy-blues-shuffle.m4a` | 78,81 s |
| 2 | `Greasy Groove.m4a` | `public/audio/music/greasy-groove.m4a` | 89,57 s |
| 3 | `Held Phrase.m4a` | `public/audio/music/held-phrase.m4a` | 184,01 s |

Die Originale sind Opus in MP4/M4A. `tools/prepare-diner-music.mjs` konvertiert
lokal mit FFmpeg nach AAC-LC, 160 kbit/s, Stereo, 48 kHz und Faststart.
Kein Schnitt, keine Lautheitsnormalisierung, kein Upload und keine Änderung der
Originaldateien. Jede Ausgabe wurde mit ffprobe geprüft und vollständig mit
FFmpeg dekodiert. Original- und Ausgabe-SHA-256, Bytegrößen und Codecangaben
stehen in `public/audio/music/provenance.json`; Tests prüfen den Bestand.

Ein einziges HTML-Audioelement spielt jeweils einen Titel in Schleife. Keine
parallelen Player, keine externen Musikdienste. Zuordnung zyklisch über den
Levelindex; ein neuer Spielversuch startet wieder mit dem ersten Titel.

Rechtestatus: vom Nutzer bereitgestellt und für dieses Projekt autorisiert.
Urheber, Anbieterbeleg und genaue Veröffentlichungslizenz liegen nicht vor.
Die Musik wird ausdrücklich **nicht** als CC0, frei lizenziert oder selbst
komponiert ausgegeben. Vor einer öffentlichen/kommerziellen Veröffentlichung
muss der entsprechende Rechtebeleg vorliegen. Zusätzliche Kosten: 0 EUR.

## In Blender gebackene Gebrauchsspuren, 24. Oktober 2026

- Generator: `tools/bake-diner-weathering.py`, reproduzierbar mit `npm run bake:diner`.
- Bearbeitbare Quelle: `assets/diner-weathering/diner-weathering.blend` mit drei
  prozeduralen Materialien und gepackten Bake-Bildern.
- Laufzeitbilder: `public/textures/diner-weathering/`, neun originale PNG-Dateien.
  Tresen: 2048 × 256; Kochstellen-Metall und Lack: jeweils 1024 × 1024.
- Tatsächliches Blender-Cycles-CPU-Baking: Farb- und Rauheitsinformationen über
  EMIT; Tangent-Space-Normalmaps aus dem prozeduralen Bump über NORMAL.
- Inhalt: schmutzige Randbereiche, örtliche Fett-/Getränkespuren, unregelmäßiger
  Abrieb und freiliegendes Material. Kantenmasken sind UV-basiert, kein behauptetes
  High-Poly-Curvature-Baking oder Geometrie-Scan.
- Anwendung: Tresenplatten, Lackpaneele sowie Arbeitsflächen, Verkleidungen und
  Spritzschutz an Grill/Fritteuse. Cola-Station bleibt vergleichsweise sauber.
- Keine externen Texturinputs oder Generierungsdienste; originale Projektassets.
  Die ursprünglichen Poly-Haven-Dateien und Roarys Modell bleiben unverändert.
- Byteanzahlen/SHA-256: `public/textures/diner-weathering/provenance.json`.
  `tests/weathering.test.mjs` prüft PBR-Vollständigkeit, PNG-Maße und Dateihashes.
- Der Browser lädt fertige PBR-Bilder, keine Blender-Noise- oder Schmutzknoten.
  Direkter lokaler Blender-Workflow statt des weiterhin nicht verfügbaren `game-dev`;
  keine kanonische Plugin-Paketvalidierung behauptet. Zusätzliche Kosten: 0 EUR.

## Restaurant und Spiel (24. Oktober 2026)

Direkter lokaler Texturimport ausdrücklich vom Nutzer genehmigt, nachdem das
im Game-Asset-Skill verlangte `game-dev`-CLI hier nicht verfügbar war.
Keine Plugin-Paketvalidierung oder kanonische Vendoring-Quittung behauptet.
Stattdessen: Originaldownload-URL, Byteanzahl, Anbieter-MD5 und lokale SHA-256
für jede der neun Dateien in `public/textures/polyhaven/provenance.json`.
`tests/textures.test.mjs` prüft den vollständigen Bestand bei jedem Build.

| Quelle | Verwendung | Lizenz |
| --- | --- | --- |
| https://polyhaven.com/a/dirty_tiles | Küchen-/Restaurantboden, Base Color, GL-Normal und Roughness | CC0-1.0 |
| https://polyhaven.com/a/fabric_leather_02 | Rote Diner-Bänke und Hockerpolster, drei PBR-Maps | CC0-1.0 |
| https://polyhaven.com/a/rusty_painted_metal | Thekensockel, Schildträger, drei PBR-Maps | CC0-1.0 |

Lizenz auf https://polyhaven.com/license direkt geprüft. Alle Texturen lokal
ausgeliefert, keine Remote-Asset-Anfragen im laufenden Spiel. Import reproduzierbar
mit `node tools/import-diner-textures.mjs` (benötigt Internet, verwendet API-Metadaten
und prüft deren MD5 vor dem Schreiben). Farbgebung, Kachelung und Normalstärke
sind Laufzeitmaterial-Einstellungen, die Original-JPGs bleiben unverändert.

Weitere vom Nutzer genannte Quellen wurden geprüft, aber nicht importiert:

- BlendSwap „Morning at the Diner“, https://blendswap.com/blend/7733:
  Anbieter beschreibt die `.blend` als CC0; aus der geprüften öffentlichen Seite
  war kein direkter Dateidownload verfügbar. Keine darin enthaltenen Modelle
  oder Texturen werden als verwendet behauptet.
- Blendkit „Diner Stool“ bleibt Reserve, nicht eingebunden; abweichende
  Royalty-Free-Lizenz nicht in den CC0-Bestand gemischt.
- ambientCG bleibt alternative Materialquelle, keine Dateien übernommen.
- UnrealBloomPass wurde als mögliche MIT-Option genannt, bisher nicht verwendet.

Tresen, Küchenstationen, Hockergeometrie, Bänke, Speisen, Tablett, Kunden,
Serviettenspender, Flaschen, Fensterkulisse und W-Logo sind originale
projektinterne Three.js-Geometrie/Canvas-Grafik. Nicht als fremde Modellimports
ausgeben. Shader: Three.js MeshStandardMaterial/ACES, MIT. Fonts: vorhandene
Systemschriften, keine eingebetteten Fontdateien. Effekte: originale WebAudio-
Synthese, keine Samples. Dialog: originale deutsche Texte und optional lokale
System-TTS mit vorhandenen Stimmen, kein Stimmklon und keine neue Audiodatei.
Die Systemstimme wird nicht mit dem Spiel verteilt. Zusätzliche Kosten: 0 EUR.

## Aktuelle Animation der Meshy-Grundlage

- Bearbeitbar: `assets/meshy/roary-meshy-animated.blend`
- Runtime: `public/models/roary-meshy-animated.glb`
- Erstellung: `tools/animate_meshy.py`, lokal mit Blender
- Neu erstellt: Skelett mit 19 deformierenden Gelenken, vier zusätzlichen
  Blender-IK-Kontrollknochen, Vertexgewichte und vier Bewegungsclips.
- Unverändert: Ruhegeometrie/UVs der 200k-Arbeitskopie und beide eingebetteten
  Originaltexturbilder. Letztere sind bytegleich zur übernommenen Basis.
- Die vier neuen Clips heißen `Idle`, `Run`, `Carry`, `Serve`. Keine externen
  Animationsdownloads und kein automatisierter kostenpflichtiger Dienst.
- Die vom Nutzer akzeptierten Hinterstümpfe bleiben erhalten. Das Rig ergänzt
  keine fehlenden Hinterpfoten.
- Kosten der lokalen Weiterbearbeitung: 0 EUR. Rechte am gelieferten Modell
  werden durch die eigene Rig-/Animationsarbeit nicht erweitert.

## Aktuelle Grundlage: vom Nutzer geliefertes Meshy-Modell

- Original: `Hi3D_Untitled_allparts_20261024_135538.glb`
- Nutzerangabe: Meshy. GLB-Metadaten nennen Trimesh als Exporter, keinen
  überprüfbaren Generierungsauftrag.
- SHA-256: `a1ec023067819605fbaceca894e4fe84e9d0a2788d16473115e046354f748145`
- Originalinhalt: ein Mesh, 2.000.000 Dreiecke, zwei eingebettete JPEG-Texturen
  für Base Color und Metallic/Roughness. Kein Skelett und keine Animationen.
- Arbeitsdatei: `assets/meshy/roary-meshy-base.blend`; Detailquelle und separate
  Browserkopie mit 200.000 Dreiecken, ohne Umgestaltung der Figur.
- Laufzeitdatei: `public/models/roary-meshy-base.glb` mit ursprünglichen
  Texturen/UVs und neu berechneten Vertexnormalen. Nur Arbeitskopie ist
  zentriert, gleichmäßig skaliert und auf Bodenhöhe versetzt.
- Rechte: bereitgestellt zur Arbeit am Projekt; Anbieterbeleg und genaue
  Ausgabelizenz liegen nicht vor. Nicht als CC0 oder selbst geschaffen ausgeben.
- Zusätzliche externe Kosten für Import und Aufbereitung: 0 EUR.
- Sichtprüfung: linker Hinterstumpf vorhanden; auch das rechte Hinterbein wirkt
  unvollständig. Die gelieferte Anatomie wurde bei der Übernahme beibehalten.

## Roary-Fotoreferenzen

- `WhatsApp Image 2026-10-17 at 19.18.08.jpeg`
- `WhatsApp Image 2026-10-17 at 19.17.01.jpeg`
- Herkunft: vom Nutzer im Projektordner bereitgestellt
- Verwendung: Identitäts-, Farb-, Kleidungs- und Silhouettenreferenz
- Hinweis: Die Referenzbilder enthalten fremde Markenmerkmale. Diese wurden
  nicht in das finale 3D-Modell übernommen.

## Turnaround-Referenz

- Datei: `assets/reference/roary-turnaround.png`
- Erzeugung: OpenAI ImageGen, 24. Oktober 2026
- Eingaben: beide oben genannten Nutzerreferenzen
- Zweck: konsistente Vorder-, Seiten- und Rückansicht als Modellierhilfe
- Status: projektspezifisches Zwischenasset; nicht als Textur in der GLB
  eingebettet
- Anatomische Korrektur: Der Turnaround ergänzt irrtümlich vier vollständige
  Pfoten. Verbindlich sind Originalfoto und Nutzerangabe: Roary fehlt hinten
  links der Fuß. Diese Stelle des Turnarounds darf nicht als Vorlage dienen.

### Finaler ImageGen-Prompt

> Create a clean four-view character turnaround sheet of the same dog character
> Roary from the two reference images: front, left profile, back, and right
> profile. Preserve the dog's distinctive identity: tiny hairless
> Chihuahua-like body, pink-gray mottled spotted skin, sparse wiry hairs, very
> large sideways ears, large dark eyes, black nose, exaggerated broad
> human-like toothy grin, thin tail, and sleeveless blue denim work vest. Use a
> neutral relaxed standing pose with all four paws visible and consistent body
> proportions across all views. Remove the cap, McDonald's logos, brand text,
> employee badge, and all readable writing. Replace any vest patch with a
> simple original upside-down yellow W emblem, clearly different from existing
> fast-food trademarks. Flat warm light-gray studio background, orthographic,
> no props, no text labels, no watermark.

## Früherer 3D-Platzhalter (erhalten)

- Datei: `public/models/roary.glb`
- Generator: `tools/build-roary-model.mjs`
- Geometrie: vollständig projektintern aus Three.js-Grundkörpern erzeugt
- Texturen: keine
- Materialien: projektintern definierte PBR-Farbmaterialien
- Animationen: `Idle`, `Run`, `Carry`, `Serve`
- Anatomie: linkes Hinterbein mit verkürztem, verheiltem Stumpf ohne Fuß;
  reduzierte Bewegung dieses Beins im Laufclip. Die Bewegung ist stilisiert.
- Lizenzstatus: neu erzeugtes Projektasset; keine externen Modell- oder
  Texturdateien eingebunden

## Software-Abhängigkeiten

- Three.js: MIT License
- Vite: MIT License
- Blender: GPL, lokal über Homebrew aus offizieller Distribution installiert
- glTF Validator: Apache-2.0, nur zur technischen Prüfung

## Aktuelles Blender-Modell

- Quelle: `assets/blender/roary-blender-v1.blend`
- Browserdatei: `public/models/roary-blender-v1.glb`
- Aufbau: `tools/build_roary_blender.py`, reproduzierbarer lokaler Blender-Aufbau
- Geometrie: verbundene anatomische Volumen, geformte Ohrmuscheln, Augen,
  Zahnreihen, Nase, drei vollständige Pfoten, linker Hinterstumpf, Haare und
  modellierte Jeansweste mit Nähten
- Materialien: selbst erstellte prozedurale Haut- und Denim-Shader, gebacken auf
  eigene 2048er Farb-/Normaltexturen; in der GLB als WebP eingebettet
- Rig: 21 Knochen, gewichtetes Skinning; vier NLA-Aktionen
- Renderbilder: echte Blender-Cycles-Ausgaben unter `public/renders/`
- KI-Mesh-Dienste, externe Texturdownloads, Sounds und zusätzliche Fonts: keine
- Externe Herstellungskosten: 0 EUR
- Originalfotos: visuelle Referenz; keine Fototexturen und keine fremden
  Markenpatches ins Mesh übertragen. Das Turnaroundbild ist nicht die
  Geometriegrundlage des Blender-Modells.
- Neue Mesh-/Materialbestandteile wurden für dieses Projekt erstellt; keine
  zusätzliche Drittanbieter-Assetlizenz erforderlich. Rechte an Nutzerfotos
  und bestehenden Softwarekomponenten bleiben davon unberührt.
- Qualitätsgrenze: detailliertere modellierte Annäherung, keine belegte
  Fotogrammetrie und keine abgenommene AAA-Qualität.

Vor einer Veröffentlichung sollten die endgültige Spielbezeichnung, das
W-Logo und das gesamte Restaurantdesign noch einmal separat auf ausreichenden
Markenabstand geprüft werden.
# Sprachsamples und Runtime-Animationsphasen (24.10.2026)

Eigener Kamera-/Sprech-Idle-Code `src/game/roary-speech-idle.js` ergänzt das bestehende
Rig additiv um Blickkontakt, Kopf-/Hals-/Ohrenbewegung. Keine neuen Provider-Assets,
Downloads oder Kosten; Quelldatei, Hautgewichte und Anatomie unverändert. Bestehende
Meshy-/Suno-Bedingungen gelten weiter. Keine zusätzlichen Augenbones oder Behauptung
eines vollständigen Facial-Rigs.

Zusätzlich eigener Browser-Unterkiefer-Morph (`src/game/roary-mouth.js`) und lokale
Audioanalyse (`tools/analyze-intro-lipsync.mjs`). `public/audio/voices/lip-sync.json`
enthält MP3-Hashes, 100-Hz-Energiekurven und Analyseparameter. Keine neuen Audio-
oder Bildanbieter, Downloads oder Kosten. Kein neuer Lizenzanspruch: Kurven sind
aus den Benutzer-Aufnahmen abgeleitet, deren vorhandene Bedingungen weiter gelten.
Mundbewegung ist sprachenergie-, nicht phonemgesteuert. Die geometrische Ruhepose
bleibt die unveränderte Quellposition; die Verformung existiert nur zur Laufzeit.

Historischer Drei-Intro-Stand (inzwischen durch den vollständigen Sprachsatz oben ersetzt):
Drei Benutzer-Suno-Aufnahmen aus `assets/audio/suno-voices-2026-10-24/edited-v1/`
als byte-identische MP3-Kopien in `public/audio/voices/` eingebunden. Reproduzierbar
mit `node tools/prepare-intro-speech.mjs`; Quellpfade, Hashes, Größen und Dauer in
`public/audio/voices/provenance.json`. Suno-Kontobedingungen gelten weiterhin;
nicht CC0, keine unabhängige Rechtefreigabe. Keine neue Generierung oder Kosten.
Der zusätzliche Fehlerspruch ist nicht Teil dieses Drei-Intro-Einbaus.

`src/game/roary-animation.js` ist eigener Code. Zusätzliche Bewegungsphasen werden
im Browser aus den vorhandenen vier gebackenen Skelettclips abgeleitet und weich
gemischt. Keine Neumodellierung, keine Änderung an GLB/Blender, Texturen, Hautgewichten
oder Anatomie. Die GLB enthält weiterhin vier Quellclips; die neun Phasen entstehen
in der Laufzeit. Bestehende Meshy-Rechtebedingungen bleiben unverändert.

## Kleine Diner-Geschichten

`public/textures/optimized/roary-staff-photo.jpg` ist eine 256-Pixel-Kopie des
vom Nutzer bereitgestellten Roary-Fotos, ausschließlich als kleines Requisit
im Spiel. Original unverändert; Quell-/Ausgabehashes und Transformation:
`public/textures/optimized/staff-photo-provenance.json`. Kein CC0-Asset und keine
pauschale Weiterverwendungserlaubnis. Die Jahreszahl im Mitarbeiterrahmen ist
fiktive Hintergrundgeschichte. Dienstplan, Uhr und Bestellschild entstehen aus
eigenem Canvas-Code als gemeinsame 1024×512-Textur mit Systemschrift, ohne neue
externe Fonts, Shader oder Modelle. Radio und Feierabendrequisiten verwenden
eigene Geometrie und vorhandene Spielmaterialien.

Fünf zusätzliche Suno-Speech-Kommentare aus dem autorisierten bestehenden Konto:
`public/audio/personality/`. Kein CC0. Exakte Skripte, Tone-Prompts, Rohaufnahmen,
Schnitte und Prüfgrenzen: `assets/audio/suno-personality-2026-10-25/README.md`;
öffentliche Herkunfts-/Hashdaten: `public/audio/personality/provenance.json`.
Die Radioknackser sind eigene deterministische Klangbearbeitung, keine weitere
fremde Aufnahme. Bestehende 23 Sprachsamples wurden nicht überschrieben.

## Home-Bildschirm-Symbole

`public/icons/roary-180.png`, `roary-192.png` und `roary-512.png` sind eigene
geometrische W-Symbole in den Diner-Farben. Reproduzierbar mit
`node tools/build-app-icons.mjs`; keine externen Bilder, Fonts, Käufe oder
Generierungen über kostenpflichtige Dienste. Keine fremden Lizenzpflichten neu
hinzugefügt. Bestehende Rechte an anderen Spiel-Assets bleiben unverändert.

