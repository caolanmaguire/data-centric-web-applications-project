-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: proj2023
-- ------------------------------------------------------
-- Server version	8.0.34

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

DROP DATABASE IF EXISTS `proj2023`;
CREATE DATABASE `proj2023`;
USE `proj2023`;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `pid` varchar(5) NOT NULL,
  `productdesc` varchar(50) DEFAULT NULL,
  `supplier` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`PID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('CORNF','CorkFlakes 100g','Kellogs'),('DF5KG','Dog Food 5kg Bag','C&D Foods'),('DFTIN','Dog Food 6 Tins','C&D Foods'),('LOAFB','Brown Sliced Pan','Brennans'),('LOAFW','White Sliced Pan','Brennans'),('MLK1L','Milk Full Fat 1L','Dawn Dairies'),('MLK2L','Milk Full Fat 2L','Dawn Dairies'),('RICEC','Rice Krispies 100g','Kellogs');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_store`
--

DROP TABLE IF EXISTS `product_store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_store` (
  `pid` varchar(5) NOT NULL,
  `sid` varchar(5) NOT NULL,
  `Price` double(5,2) DEFAULT NULL,
  PRIMARY KEY (`pid`,`sid`),
  KEY `SID` (`sid`),
  CONSTRAINT `product_store_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `product` (`pid`),
  CONSTRAINT `product_store_ibfk_2` FOREIGN KEY (`sid`) REFERENCES `store` (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_store`
--

LOCK TABLES `product_store` WRITE;
/*!40000 ALTER TABLE `product_store` DISABLE KEYS */;
INSERT INTO `product_store` VALUES ('CORNF','GAYBB',1.15),('CORNF','GAYEQ',1.19),('CORNF','WHMUL',1.11),('DFTIN','GAYBB',4.99),('DFTIN','GAYEQ',4.99),('DFTIN','TUAM1',5.01),('DFTIN','WHATH',5.01),('DFTIN','WHMUL',4.98),('MLK1L','GAYBB',1.42),('MLK1L','GAYEQ',1.49),('MLK1L','TUAM1',1.42),('MLK1L','WHATH',1.44),('MLK1L','WHMUL',1.45),('RICEC','TUAM1',5.25),('RICEC','WHATH',4.84),('RICEC','WHMUL',5.38);
/*!40000 ALTER TABLE `product_store` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store`
--

DROP TABLE IF EXISTS `store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store` (
  `sid` varchar(5) NOT NULL,
  `location` varchar(50) DEFAULT NULL,
  `mgrid` varchar(4) DEFAULT NULL,
  PRIMARY KEY (`sid`),
  UNIQUE KEY `mgrid` (`mgrid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store`
--

LOCK TABLES `store` WRITE;
/*!40000 ALTER TABLE `store` DISABLE KEYS */;
INSERT INTO `store` VALUES ('GAYBB','Galway Ballybrit','M002'),('GAYEQ','Galway Eyre Square','M001'),('TUAM1','Tuam','M003'),('WHATH','Athlone, Co. Westmeath','M004'),('WHMUL','Mullingar, Co. Westmeath','M005');
/*!40000 ALTER TABLE `store` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-23 13:01:25