-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: mybooks
-- ------------------------------------------------------
-- Server version	8.0.32
--
-- Drop Tables
--

DROP TABLE IF EXISTS `users`; 
DROP TABLE IF EXISTS `books_users`; 

--
-- Create Tables
--

CREATE TABLE `users`(
	`id` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL, 
	`username` VARCHAR(255) NOT NULL, 
	`password` VARCHAR(255) NOT NULL, 
	 PRIMARY KEY (id)
);

CREATE TABLE books_users (
    bId INT NOT NULL,
    uId INT NOT NULL,
    PRIMARY KEY (bId, uId),
    FOREIGN KEY (bId) REFERENCES mylibrary(id) ON DELETE CASCADE,
    FOREIGN KEY (uId) REFERENCES users(id) ON DELETE CASCADE
);

--
-- Insert Sample Data
--

INSERT INTO books_users (uId, bId)
VALUES
    (1, 1),
    (1, 6),
    (1, 18),
    (1, 31),
    (1, 32),
    (1, 35),
	(2, 1),
    (2, 6),
    (2, 18),
    (2, 31),
    (2, 32),
    (2, 35);


--- myLibraryIds = [1,6,18,31,32,35,36,37,42,48,49,50,52,53,55,56,57,58,59]