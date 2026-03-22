# Schema DB

## app_user
- user_id
- name
- surname
- username
- password

## watched_film
Film visti da un utente con eventuale punteggio
- user_id
- film_id
- score

## watchlist (nome subottimo ma list penso sia riservato come nome)
Una singola lista
- list_id
- name

## user_watchlist
Liste di un utente (associazione utente a watchlist)
- user_id
- list_id

## watchlist_films
Associaizone tra film e liste
- list_id
- film_id
