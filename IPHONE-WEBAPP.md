# Roary auf dem iPhone als Web-App

So spielst du ohne die üblichen Safari-Adress- und Tab-Leisten. Ein App-Store-Download ist nicht nötig.

1. Öffne die [Web-App-Version von Roary in Safari](https://flauschelin.github.io/roarys-diner-rush/multi/).
2. Rufe **Teilen** auf: das Quadrat mit Pfeil nach oben. Bei manchen Safari-Layouts findest du es unter **Mehr ( … )**.
3. Wähle **Zu Home-Bildschirm hinzufügen**. Wenn der Eintrag fehlt, suche unten unter **Aktionen bearbeiten**.
4. Aktiviere **Als Web-App öffnen**, sofern diese Option angezeigt wird, und bestätige mit **Hinzufügen**. Auf älteren iOS-Versionen kann dieser Schalter fehlen.
5. Starte Roary anschließend über das neue Symbol auf deinem Home-Bildschirm, nicht über den bisherigen Safari-Tab.
6. Drehe das iPhone ins Querformat. Bleibt das Bild hochkant, prüfe im Kontrollzentrum die Ausrichtungssperre.

Die Bedienung bleibt gleich: links vertikal wischen zum Stationswechsel, rechts auf die freie Spielfläche tippen zum Holen/Servieren. Ein langer Wisch wechselt zwei Stationen.

## Warum fehlt der Vollbildknopf?

Das Spiel zeigt ihn nur bei nutzbarer Fullscreen-API an. Ein fehlender Knopf ist daher nicht automatisch ein Updatefehler. Die Home-Bildschirm-Web-App ist ein anderer Startmodus; sie benötigt diesen Knopf nicht. Systemleisten und Hinweise können je nach iOS weiterhin erscheinen.

Safari bietet Webseiten auf iOS keinen programmatisch aufrufbaren Installationsdialog. Der Spielbutton **Web-App** oben rechts erklärt deshalb nur die nötigen Schritte. Er erscheint auf erkannten iPhones/iPads im Browser und verschwindet beim Start im erkannten Web-App-Modus. Eine Installation muss immer selbst bestätigt werden.

## Gut zu wissen

- Für die Installation empfehlen wir die oben verlinkte Multi-File-Version mit Manifest und App-Symbolen. Der normale [Standardlink](https://flauschelin.github.io/roarys-diner-rush/) bleibt die Single-File-Fassung.
- Die Anleitung öffnet den Web-App-Link in einem neuen Tab. So wird die gerade laufende Schicht nicht durch einen Seitenwechsel ersetzt.
- **Keine Offline-Zusage:** Internet bleibt erforderlich. Das Hinzufügen lädt nicht automatisch alle Spieldateien dauerhaft herunter.
- Ein laufendes Spiel wird nicht übertragen. Rekord und Einstellungen können im Web-App-Modus getrennt gespeichert werden.
- Falls du Roary in einer anderen App geöffnet hast, öffne die Adresse zuerst in Safari.
- Bei Problemen: Internet prüfen, Web-App schließen und neu öffnen. Nach Updates kann ein erneuter Seitenaufruf nötig sein.

Die Schritte gelten sinngemäß auch für iPads; Beschriftungen können je nach Version und Layout abweichen. Die tatsächliche Installation und Darstellung müssen noch auf einem physischen iPhone geprüft werden.

Quellen: [Apple: Website als App verwenden](https://support.apple.com/de-de/guide/iphone/iphea86e5236/ios), [MDN: Installierbare Web-Apps und iOS-Einschränkungen](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable).
