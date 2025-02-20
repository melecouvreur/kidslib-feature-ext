-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: mybooks
-- ------------------------------------------------------
-- Server version	8.0.32

--
-- Drop Tables
--

DROP TABLE IF EXISTS `users`; 

-- NB: books_users serves as the junction table for multi-user applications.
-- I didn't managed to finish this, but here is at least some code to get you started!
DROP TABLE IF EXISTS `books_users`; 

--
-- Create Tables
--

CREATE TABLE `users`(
	`id` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL, 
	`username` VARCHAR(255) NOT NULL, 
	`password` VARCHAR(255) NOT NULL, 
	 PRIMARY KEY (id),
     UNIQUE KEY `unique_username` (`username`)
);

CREATE TABLE books_users (
    bId INT NOT NULL,
    uId INT NOT NULL,
    PRIMARY KEY (bId, uId),
    FOREIGN KEY (bId) REFERENCES mylibrary(id) ON DELETE CASCADE,
    FOREIGN KEY (uId) REFERENCES users(id) ON DELETE CASCADE
);

--
-- Insert Sample Data. NB - You can only insert this sample data once you have created at least 2 users.
-- Create users by simply registering on the front end :)
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

