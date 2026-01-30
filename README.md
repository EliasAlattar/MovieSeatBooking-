# Movie Seat Booking

Detta projekt är en webbaserad applikation för att boka bioplatser.
Användaren kan välja film, se pris per biljett och välja lediga säten i biosalongen.
Projektet är genomfört som en del av kursen Frontend 2.

## Funktionalitet

- Filmer och priser hämtas från ett API (JSON Server vid lokal utveckling)
- Filmer visas i en dropdown-meny
- Användaren kan välja och avmarkera lediga säten
- Upptagna säten kan inte väljas
- Antal valda säten och totalpris uppdateras dynamiskt
- Valda säten sparas i LocalStorage
- Valda säten sparas per film
- Senast vald film sparas och återställs vid omladdning

## Tekniker

- HTML
- CSS
- JavaScript
- JSON Server (lokalt)
- LocalStorage
- Git & GitHub

## Köra projektet lokalt

1. Klona repot:
   ```bash
   git clone https://github.com/EliasAlattar/MovieSeatBooking-.git
   ```

## Loggbok

### Dag 1 – Genomgång och planering

- Gick igenom uppgiften och kravspecifikationen

- Verifierade att HTML- och CSS-strukturen redan var färdig

- Förstod hur biosalong, rader och säten var uppbyggda i HTML

- Identifierade vad som var hårdkodat och behövde ersättas med JavaScript

- Påbörjade arbetet med JavaScript-logiken

### Dag 2 – Sätesval och prisberäkning

- Implementerade klickfunktion för säten med event delegation

- Skapade logik för att välja och avmarkera säten

- Säkerställde att upptagna säten inte kan väljas

- Uppdaterade antal valda säten och totalpris dynamiskt i UI

### Dag 3 – LocalStorage och persistens

- Sparade valda säten i LocalStorage

- Återställde valda säten vid sidladdning

- Sparade senast vald film i LocalStorage

- Säkerställde att både säten och filmval återställs korrekt vid omladdning

### Dag 4 – Filmval och säten per film

- Förbättrade lagringen så att valda säten sparas per film

- Skapade dynamiska LocalStorage-nycklar baserat på vald film

- Rensade och laddade rätt säten vid filmbyte

- Säkerställde att pris och säten alltid matchar vald film

### Dag 5 – API-integration och struktur

- Hämtade filmer och priser från API med fetch

- Ersatte hårdkodade filmer i HTML med dynamiskt innehåll

- Skapade en Movie-klass för tydligare hantering av filmdata

- Lade till felhantering med try/catch för API-anrop

### Dag 6 – Kodförbättringar och stabilitet

- Gick igenom och förbättrade kodstruktur och funktionernas ansvar

- Uppdaterade och förenklade kommentarer i JavaScript-filen

- Säkerställde att alla funktioner körs i rätt ordning vid sidladdning

- Testade olika scenarion (refresh, filmbyte, tom LocalStorage)

### Dag 7 – GitHub och inlämningsförberedelser

- Initierade Git-repository lokalt

- Skapade publikt GitHub-repository

- Pushade projektet till GitHub

- Lade till .gitignore för att exkludera node_modules

- Skapade README med projektbeskrivning och loggbok

- Förberedde projektet för publicering via GitHub Pages
