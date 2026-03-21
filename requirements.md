# WatchStack

## Introduzione
L'applicativo WatchStack si pone l'obiettivo di aiutare gli utenti nella scelta dei film da vedere, al fine di ridurre il più possibile il tempo passato a scegliere cosa guardare. Permetterà agli utenti di inserire i film da vedere in una lista proponendogli una serie di film, basati su alcuni filtri totalmente personalizzabili, oppure offrendo la possibilità di cercare uno specifico film e salvarlo. Sarà possibile creare varie liste dove salvare i differenti film. I film saranno ricercati usando le API TMDB (The movie DB).

## Stack di sviluppo

### FE
La parte frontend sarà sviluppata usando Vue e Vuetify

### BE
La parte backend prevederà l'utilizzo di un database MariaDB e di un server Node per gestire i servizi rest. Anche le chiamate alle API di TMDB saranno wrappate dentro servizi custom. Il server BE sarà orchestrato usando docker.

## Obiettivi
La prima versione potrà essere definita completa quando:
- l'utente potrà accedere ad una propria area personalizzata;
- l'utente potrà inserire i film nella lista con il meccanismo di swipe della card;
- i film proposti all'utente saranno filtrati sulla base di filtri personalizzati;
- i filtri disponibili per l'utente includono almeno: piattaforma, anno e genere;
- l'utente potrà cercare film specifici e aggiungerli alla propria lista;
- l'utente avrà accesso a 2 liste: film da vedere e film già visti;
- l'interfaccia deve essere mobile first in vista di una futura migrazione a flutter.