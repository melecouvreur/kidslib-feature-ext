-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: mybooks
-- ------------------------------------------------------
-- Server version	8.0.32

-- Table structure for table `users`

DROP TABLE IF EXISTS `users`; 

CREATE TABLE `users`(
	`id` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL, 
	`username` VARCHAR(255) NOT NULL, 
	`password` VARCHAR(255) NOT NULL, 
	 PRIMARY KEY (id)
);