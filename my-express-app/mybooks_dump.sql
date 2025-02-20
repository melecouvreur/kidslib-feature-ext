-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: mybooks
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `mylibrary`
--

DROP TABLE IF EXISTS `mylibrary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mylibrary` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bookId` varchar(40) DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `review` varchar(255) DEFAULT NULL,
   PRIMARY KEY (`id`),
   UNIQUE KEY `unique_bookid` (`bookId`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mylibrary`
--

LOCK TABLES `mylibrary` WRITE;
/*!40000 ALTER TABLE `mylibrary` DISABLE KEYS */;
INSERT INTO `mylibrary` VALUES (1,'YOHACwAAQBAJ',4,'I loved it! More David.'),(6,'W20ZEwsvUo0C',NULL,'This book is so silly! Milo loved the alligator in the bathtub and the monkey on the lamp. Definitely read again.'),(18,'adpNnQEACAAJ',NULL,'Soooo silly! '),(31,'n6OMklDlgiYC',NULL,NULL),(32,'c9QPnwEACAAJ',NULL,NULL),(35,'gk6MDwAAQBAJ',NULL,'The music in this book is really fun.'),(36,'ZbwvDwAAQBAJ',NULL,NULL),(37,'XbwvDwAAQBAJ',NULL,NULL),(42,'BT0iEAAAQBAJ',NULL,NULL),(48,'y1IjEyaQxuIC',NULL,'This is a fun, silly read. Milo likes the end. '),(49,'p2fybyg_fZQC',NULL,NULL),(50,'BDshngEACAAJ',NULL,NULL),(52,'Nd_ACwAAQBAJ',NULL,NULL),(53,'iZM6swEACAAJ',NULL,NULL),(55,'R3IkAQAAMAAJ',NULL,'Loved it so much I got it tattooed on my arm.'),(56,'s_H3_SKNdWIC',NULL,NULL),(57,'M-CocWLBGB4C',NULL,NULL),(58,'UQu8wlL_nE8C',NULL,'This book is so silly! We loved the colorful pictures and funny story.'),(59,'j0oTAgAAQBAJ',NULL,'I love it.');
/*!40000 ALTER TABLE `mylibrary` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-06  8:03:02
