# Texturbudget · 1920 × 1080

Die aktuelle Spielversion nutzt diese Dateien, nicht nur optionale Testkopien:

| Bereich | Vorher | Aktuell |
|---|---:|---:|
| Roarys Farbe | 8192² | 2048² |
| Roarys Rauheit/Metall | 8192² | 2048² |
| Leder: Farbe, Normalen, Rauheit | 1024² | 512² |
| Logo, Küche, Arbeitsflächen | Originalauflösung | unverändert |

Eine nicht dargestellte Bodentextur wird nicht mehr geladen/eingebettet. Alle
Quellen bleiben archiviert; Herkunft und Lizenzen wurden nicht geändert.

Grundlage: farbige Mip-Stufen in sechs Originalkamera-Ansichten bei 1920×1080 / DPR1.
Danach 18 Bilder mit Original-/4K-/2K-Texturen bei identischer eingefrorener Pose,
Kamera, Zeit und Beleuchtung. Das große sprechende Intro wurde einbezogen, nicht
nur die entfernte Spielkamera. Der 1:1-Detailvergleich wurde visuell geprüft.

Mittlere RGB-Abweichung von 2K gegenüber Original auf Roary: im Intro maximal
0,531 von 255, im oberen 40%-Ausschnitt maximal 0,563; normale Spielkamera
0,264–0,366. Kein Beweis perfekter Gleichheit, keine universelle Optimalitäts-
garantie und keine FPS-Messung. Kleine Filter-/Kompressionsunterschiede bleiben.

Modellgeometrie, UVs, Skelett, Gewichte und Animationen sind bytegleich erhalten;
der fehlende linke Hinterfuß wurde nicht verändert. Nur eingebettete Bilder und
notwendige Container-Offsets wurden angepasst. Die neue GLB-Datei hat
10.283.636 statt 13.862.052 Bytes. Prüfsummen und Budget: [TEXTURE-BUDGET.json](TEXTURE-BUDGET.json).

Für Roarys zwei Bilder beträgt der **rechnerische** RGBA8-Bedarf mit Mip-Ketten
ca. 43 statt 683 MiB (93,75 % weniger), nicht der gesamte Grafikspeicherverbrauch.
Der Renderpuffer ist auf maximal 1920×1080 begrenzt; CSS, Schrift und Kamera bleiben
unverändert. iOS nutzt weiter den direkten Renderpfad ohne Nachbearbeitungs-Puffer.

Single-File und Multi-File enthalten dieselben aktiven Asset-Bytes. Kein automatischer
Rückfall auf die archivierten 8K-Dateien. Sechs Querformatansichten und emulierte
Browsergrößen ersetzen keinen physischen iPhone-12-mini-Test.
