# Fellfarben-Rechner
## [DEMO-LINK](https://lisa-pan.github.io/coat-calculator/)
Dies ist ein Fellfarben-Rechner für Hunde, der auf echter (aber vereinfachter) Genetik basiert.
Es ermöglicht die Eingabe des Genotyps zweier Hunde und erstellt dann ein Bild, das zeigt, wie der mögliche Nachwuchs dieser Hunde aussehen könnte. Das Ergebnis wird durch transparente Illustrationen dargestellt,
die übereinander geschichtet werden, um den Phänotyp des Welpen zu visualisieren. 

### Einführung und Beispiel
Gib den Genotyp zweier Hunde mittels Dropdown-Menüs für jeden Gen-Lokus ein und klick auf den Button um zu sehen, wie ein Welpe aus dieser Verpaarung aussehen könnte. 
Der Output ist **ein mögliches (zufällig generiertes) Ergebnis** aus dieser Verpaarung. Klick den Button mehrmals um andere mögliche Ergebnisse zu sehen. 
Die Default-Optionen sind das dominanteste Allel auf jedem Lokus (resultiert in einem einfarbig schwarzen Hund). Darunter sind alle weiteren Allele in absteigender Dominanzfolge.

Als Beispiel hier ein Labrador-Simulator: wir verpaaren *zwei schwarze Labradore*, die beide die rezessiven Gene für braune und blonde Fellfarbe tragen.
Wähle für den **I-Lokus** bei beiden Hund **helles Phäomelanin (creme)** aus. 
Wähle jetzt für beide Hunde die letzte mischerbige Option auf dem **E-Lokus**, also: **Wildtyp, trägt rezessives Rot (E/e)**. 
Zuletzt noch die mischerbige Option auf dem **B-Lokus**: **Schwarz, trägt Braun (B/b)**.
Alles andere bleibt auf default.
Das Ergebnis wird zu 9/16 schwarz, 3/16 braun, 3/16 blond mit schwarzer Nase, und 1/16 blond mit brauner Nase sein.

![Screenshot des Labrador-Beispiels](https://github.com/lisa-pan/coat-calculator/assets/132587189/fbc06c05-13c0-420b-ab17-8baba0a5a3d3)

### Wie es funktioniert
Bei Klick auf den Welpen-Button werden zunächst alle Input-Werte erfasst und daraus der Genotyp des Welpen in Form eines neuen Arrays erstellt. 
Die Funktion getInputValues (in der Datei input.js) überprüft für jeden Lokus zunächst ob es einen (reinerbig) oder zwei (mischerbig) Werte gibt. Gibt es nur einen Wert wird dieser
direkt ins neue Array übertragen. Gibt es zwei Werte wird davon mit der Math.random-Methode zufällig einer ausgewählt.

**Beispiel**:
Auf dem S-Lokus wird für Hund 1 die option reinerbig piebald (sp) gewählt und für Hund 2 die Option mischerbig (s, si).
Hund 1: ['sp'] (vererbt immer 'sp')
Hund 2: ['S', 'si'] (vererbt zufällig einen der beiden Werte)
-> Genotyp des Welpen: ['sp', 'S'] oder ['sp', 'si']
Das Ergebnis wird alphabetisch sortiert um die Interpretation zu erleichtern. Dies wird für alle Gen-Loki wiederholt (´loci.forEach(...)´). 

Der Genotyp des Welpen steht jetzt fest und muss noch interpretiert werden. Bevor die Bilder generiert werden, müssen noch 3 Werte bestimmt werden.
1. Bestimmung der Eumelanin- und Phäomelanin-Werte (Farbton des schwarzen und roten Pigments)
2. Bestimmung der boolean Variable isExpressingAgouti. Die A-Serie wird nicht ausgedrückt, wenn der Hund ein 'K' auf dem K-Lokus oder zwei rezessive 'e' auf dem E-Lokus trägt.
   
Danach folgen alle Funktionen, die den Genotyp interpretieren und Illustrationen übereinander schichten und somit das Bild des Welpen erstellen. 
1. wenn kein Agouti: Eumelanin-Layer
2. wenn Agouti ODER rezessives Rot vorliegt: Phäomelanin-Layer
3. wenn Agouti ausgedrückt wird: Agouti-Fellzeichnung bestimmen und Layer hinzufügen
4. wenn Agouti und Stromung vorhanden sind: Stromung hinzufügen
5. Masken-Layer
6. Weißscheckung-Layer
7. Outline (immer)  
Das Ergebnis zeigt eine Darstellung eines möglichen Welpen, bestehend aus 2 - 6 übereinander geschichteten Illustrationen.

Du kannst den Button wiederholt klicken um andere mögliche Ergebnisse zu zeigen. Bleibt das Ergebnis gleich, gibt es dafür drei verschiedene Ursachen:
1. Nur reinerbige Optionen wurden gewählt, es gibt nur eine mögliches Ergebnis.
2. Eine mischerbige Option wurde gewählt, ist aber rezessiv und wird daher nie ausgedrückt
   (Beispiel: reinerbig schwarz (B/B) + schwarz, trägt braun (B/b) = Welpe ist immer schwarz, trägt zu 50% das rezessive Gen für Braun)
3. Andere Ergebnisse sind zwar möglich, es wurde aber zufällig nochmal das gleiche Ergebnis generiert.

### Illustrationen
Die Illustrationen wurden von mir erstellt. Ich bin kein Künstler, darum sehen manche etwas merkwürdig aus. 
Bei schwarzen Tanmarken in Kombination mit Stromung zeigt sich die Stromung leider auf den schwarzen Bereichen. Ich weiß nicht, warum das nur bei Schwarz der Fall ist.

![Fehlerhafte Illustration: Stromung auf schwarzen Tanmarken](https://github.com/lisa-pan/coat-calculator/assets/132587189/e5a6ed2b-cf2a-4c15-8bf6-0a2d2a2f0eb6)

Sobald ich rausfinde, wie ich das beheben kann, werde ich die entsprechenden Bilder aktualisieren. 

### In der Realität...
Der Rechner basiert auf echter Genetik, ist aber in vielen Bereichen vereinfacht. 
Wer mehr über das Thema erfahren möchte kann das auf [doggenetics.co.uk](http://doggenetics.co.uk/index.htm) oder
sieht sich einfach mein anderes Projekt, die [Fellfarben-Galerie](https://lisa-pan.github.io/color-gallery/), an. :smiley:

Am stärksten vereinfacht wurde die Bestimmung der Phäomelanin-Farbe auf dem I-Lokus. 
In der Realität wurden bisher Gene auf 5 verschiedenen Loki identifiziert, die Einfluss auf die Intensität des Phäomelanin-Pigments haben. Wahrscheinlich existieren noch weitere, da auch
diese 5 nicht das komplette Spektrum von weiß (z.B. Malteser) bis mahagonirot (z.B. Irish Setter) erklären.

Das Gen für Weißscheckung im Irish Spotting Muster liegt vermutlich nicht auf dem S-Lokus mit dem Piebald-Gen. Es wurde allerdings noch nicht identifiziert. Auch viele andere Aspekte
der Weißscheckung sind noch unbekannt, darum habe ich sie für dieses Projekt vereinfacht.
Viele Fellzeichnungen können noch von weiteren Genen modifiziert werden und nicht bei allen Variationen ist die genetische Basis bekannt. Das betrifft zum Beispiel die Größe der Maske,
die Stärke der dunklen "Schattierung" bei Zobel ("clear sable" bis "shaded sable"), oder Sattelzeichnung (z.B. Deutscher Schäferhund, Beagle). 

Gene, die nur bestimmte Rassen oder Rassegruppen betreffen, habe ich für dieses Projekt weggelassen. Das betrifft unter anderem Merle, Ticking, Progressives Ergrauen,
Domino, Grizzle, Urajiro, rezessives Schwarz, und einige weitere. 
Einige dieser Gene werde ich vielleicht in späteren Versionen noch hinzufügen.
