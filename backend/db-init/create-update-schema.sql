CREATE DATABASE IF NOT EXISTS watchstack;
USE watchstack;

-- 1. Tabella Utenti
CREATE TABLE IF NOT EXISTS app_user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

-- 2. Tabella Watchlist (Testate delle liste)
CREATE TABLE IF NOT EXISTS watchlist (
    list_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

-- 3. Tabella Film Guardati (Relazione Utente-Film + Score)
CREATE TABLE IF NOT EXISTS watched_film (
    user_id INT,
    film_id INT NOT NULL,
    score INT CHECK (score >= 0 AND score <= 10),
    PRIMARY KEY (user_id, film_id),
    CONSTRAINT fk_watched_user FOREIGN KEY (user_id) 
        REFERENCES app_user(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 4. Tabella Associazione Utente-Watchlist
CREATE TABLE IF NOT EXISTS user_watchlist (
    user_id INT,
    list_id INT,
    PRIMARY KEY (user_id, list_id),
    CONSTRAINT fk_uw_user FOREIGN KEY (user_id) 
        REFERENCES app_user(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_uw_list FOREIGN KEY (list_id) 
        REFERENCES watchlist(list_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 5. Tabella Contenuto Watchlist
CREATE TABLE IF NOT EXISTS watchlist_films (
    list_id INT,
    film_id INT NOT NULL,
    PRIMARY KEY (list_id, film_id),
    CONSTRAINT fk_wf_list FOREIGN KEY (list_id) 
        REFERENCES watchlist(list_id) ON DELETE CASCADE
) ENGINE=InnoDB;