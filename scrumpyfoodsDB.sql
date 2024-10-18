CREATE DATABASE  IF NOT EXISTS `scrumpyfoods` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `scrumpyfoods`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: scrumpyfoods
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `acc_id` int NOT NULL AUTO_INCREMENT,
  `acc_username` varchar(255) NOT NULL,
  `acc_password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `acc_address` varchar(255) DEFAULT NULL,
  `acc_email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`acc_id`),
  UNIQUE KEY `acc_username` (`acc_username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'admin','scrumpy','admin','1234 UTSA Drive','scrumpyfoods@gmail.com');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appetizers`
--

DROP TABLE IF EXISTS `appetizers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appetizers` (
  `appetizer_id` int NOT NULL AUTO_INCREMENT,
  `appetizer_name` varchar(255) DEFAULT NULL,
  `appetizer_price` float DEFAULT NULL,
  `appetizer_description` varchar(255) DEFAULT NULL,
  `appetizer_image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`appetizer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appetizers`
--

LOCK TABLES `appetizers` WRITE;
/*!40000 ALTER TABLE `appetizers` DISABLE KEYS */;
INSERT INTO `appetizers` VALUES (1,'Wings',9.99,'Breaded, deep fried, and tossed in your choice of Scrumpy Foods sauce. Served with a side of celery, carrots, and your choice of dipping sauce.','https://shorturl.at/aiVCg'),(2,'Mozzarella Sticks',6.99,'Mozzarella Cheese coated in a fresh tortilla chip breading and served with your choice of dipping sauce.','https://shorturl.at/lhfLr'),(3,'Cheese Platter',12.99,'A curated selection of our favorite cheeses paired with fresh fruit, nuts, and crackers.','https://shorturl.at/R8063'),(4,'Mini Skewers',5.99,'Bite sized mix of tender marinated meats and crisp vegetables perfectly seasoned to taste.','https://shorturl.at/1E03m'),(5,'Nachos',5.99,'Freshly made crispy tortilla chips piled high with melted cheese, your choice of meats or vegetarian friendly toppings, and our Scrumpy Foods sauce.','https://shorturl.at/vYiRx'),(6,'Scrumpy Foods Dip',5.99,'Creamy, cheesy Buffalo Chicken Dip, made with fresh chicken, tangy buffalo sauce, and a blend of melted cheeses.','https://shorturl.at/SaRJ4');
/*!40000 ALTER TABLE `appetizers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `desserts`
--

DROP TABLE IF EXISTS `desserts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `desserts` (
  `dessert_id` int NOT NULL AUTO_INCREMENT,
  `dessert_name` varchar(255) DEFAULT NULL,
  `dessert_price` float DEFAULT NULL,
  `dessert_description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`dessert_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `desserts`
--

LOCK TABLES `desserts` WRITE;
/*!40000 ALTER TABLE `desserts` DISABLE KEYS */;
INSERT INTO `desserts` VALUES (1,'Cake',3.99,'A slice of moist, fluffy cake topped with rich frosting.'),(2,'Pie',3.99,'A slice of homemade pie with a flaky crust and sweet filling.'),(3,'Brownie',2.99,'A rich, fudgy brownie with a decadent chocolate flavor.'),(4,'Cookies',1.99,'2 freshly baked cookies with a soft, chewy center and crispy edges.'),(5,'Cheesecake',4.99,'A slice of creamy, smooth cheesecake with a buttery graham cracker crust.'),(6,'Tiramisu',3.99,'A delicate Italian dessert made with layers of espresso-soaked ladyfingers and mascarpone cream, dusted with cocoa powder.'),(7,'Ice Cream',2.99,'2 large scoops of your favorite ice cream flavor, creamy and refreshing.');
/*!40000 ALTER TABLE `desserts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drinks`
--

DROP TABLE IF EXISTS `drinks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `drinks` (
  `drink_id` int NOT NULL AUTO_INCREMENT,
  `drink_name` varchar(255) DEFAULT NULL,
  `drink_price` float DEFAULT NULL,
  `drink_description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`drink_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drinks`
--

LOCK TABLES `drinks` WRITE;
/*!40000 ALTER TABLE `drinks` DISABLE KEYS */;
INSERT INTO `drinks` VALUES (1,'L Fountain Soda',1.99,'Large refreshing fountain soda to quench your thirst, available in multiple flavors.'),(2,'M Fountain Soda',1.79,'Medium refreshing fountain soda to quench your thirst, available in multiple flavors.'),(3,'S Fountain Soda',1.49,'Small refreshing fountain soda to quench your thirst, available in multiple flavors.'),(4,'Sweet Tea',1.49,'Classic sweet tea, brewed fresh and perfectly sweetened.'),(5,'Coffee',2.49,'Hot brewed coffee, bold and aromatic, perfect for a caffeine boost.'),(6,'Beer',2.99,'A chilled bottle of your favorite beer, crisp and refreshing.'),(7,'Water',0.99,'A bottle of pure, refreshing water to stay hydrated.');
/*!40000 ALTER TABLE `drinks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `main_courses`
--

DROP TABLE IF EXISTS `main_courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `main_courses` (
  `main_id` int NOT NULL AUTO_INCREMENT,
  `main_name` varchar(255) DEFAULT NULL,
  `main_price` float DEFAULT NULL,
  `main_description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`main_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `main_courses`
--

LOCK TABLES `main_courses` WRITE;
/*!40000 ALTER TABLE `main_courses` DISABLE KEYS */;
INSERT INTO `main_courses` VALUES (1,'Steak',24.99,'A perfectly seared steak, seasoned to perfection, and served with a side of roasted vegetables and fried potato wedges.'),(2,'Roasted Chicken',16.99,'Juicy, tender roasted chicken infused with herbs and spices, paired with garlic mashed potatoes.'),(3,'Fried Chicken',13.99,'Crispy, golden fried chicken, cooked to perfection, served with a side of coleslaw and fries.'),(4,'Ribs',17.99,'Slow-cooked, fall-off-the-bone ribs smothered in a smoky barbecue sauce, with a side of cornbread.'),(5,'Alfredo',15.99,'Creamy Alfredo pasta, topped with grilled chicken and Parmesan cheese, served with garlic bread.'),(6,'Spaghetti',14.99,'Classic spaghetti pasta tossed in a rich tomato marinara sauce, topped with fresh basil and Parmesan cheese.'),(7,'Salmon',23.99,'Grilled salmon filet, seasoned with lemon and herbs, served with steamed asparagus and white rice.'),(8,'Soft Tacos',11.99,'Warm softshell tortillas filled with grilled sliced meats, sautéed peppers, onions, and fresh salsa.'),(9,'Hardshell Tacos',11.99,'Crispy hardshell tacos filled with seasoned ground beef, lettuce, tomatoes, and cheddar cheese.'),(10,'Vegetable Stir Fry',12.99,'A vibrant mix of stir-fried vegetables, served over jasmine rice with a savory soy-ginger sauce.');
/*!40000 ALTER TABLE `main_courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salads`
--

DROP TABLE IF EXISTS `salads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salads` (
  `salad_id` int NOT NULL AUTO_INCREMENT,
  `salad_name` varchar(255) DEFAULT NULL,
  `salad_price` float DEFAULT NULL,
  `salad_description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`salad_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salads`
--

LOCK TABLES `salads` WRITE;
/*!40000 ALTER TABLE `salads` DISABLE KEYS */;
INSERT INTO `salads` VALUES (1,'Caesar Salad',11.99,'Crisp romaine lettuce topped with crunchy croutons and dressed with lemon juice, olive oil, eggs, worchestershire sauce, anchovies, garlic, dijon mustard, parmesan cheese, and black pepper.'),(2,'House Salad',10.99,'A fresh and vibrant mix of crisp greens, juicy tomatoes, cucumbers, and red onions, topped with a light vinaigrette.'),(3,'Greek Salad',12.99,'A fresh Greek salad with vine-ripe tomatoes, cucumber, Kalamata olives, red onions, and feta, tossed in olive oil, lemon, and oregano dressing.'),(4,'Chicken Salad',14.99,'A hearty chicken salad with fried chicken tender bits, crisp mixed greens, cherry tomatoes, and avocado, drizzled with a light lemon herb vinaigrette.'),(5,'Tuna Salad',11.99,'Flavorful flaky tuna, crisp greens, cherry tomatoes, red onions, cucumber, mayo, hard boiled eggs, and a tangy lemon-caper dressing.'),(6,'Caprese Salad',13.99,'Sliced fresh mozzarella, tomatoes, and sweet basil, seasoned with salt, and olive oil.');
/*!40000 ALTER TABLE `salads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sides`
--

DROP TABLE IF EXISTS `sides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sides` (
  `side_id` int NOT NULL AUTO_INCREMENT,
  `side_name` varchar(255) DEFAULT NULL,
  `side_price` float DEFAULT NULL,
  `side_description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`side_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sides`
--

LOCK TABLES `sides` WRITE;
/*!40000 ALTER TABLE `sides` DISABLE KEYS */;
INSERT INTO `sides` VALUES (1,'Cajun Fries',3.99,'Crispy fries tossed in a bold Cajun seasoning.'),(2,'Fries',3.99,'Golden, crispy fries seasoned with a touch of salt.'),(3,'Mashed Potatoes',4.99,'Creamy mashed potatoes with a hint of butter and garlic, with an option of gravy.'),(4,'Onion Rings',3.99,'Crispy, battered, and rolled in fresh breadcrumbs for the perfect crust, served golden brown.'),(5,'Grilled Vegetables',4.99,'A fresh medley of seasonal vegetables, grilled to perfection.'),(6,'Garlic Bread',3.99,'Toasted garlic bread with a crispy crust and buttery garlic spread.'),(7,'Mac n Cheese',5.99,'Rich and creamy macaroni and cheese topped with bacon bits.'),(8,'Coleslaw',3.99,'Crunchy coleslaw mixed with a creamy, tangy dressing.'),(9,'White Rice',3.99,'Steamed white rice, light and fluffy.');
/*!40000 ALTER TABLE `sides` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `order_id` int NOT NULL,
  `order_date` date DEFAULT NULL,
  `order_total` float DEFAULT NULL,
  `order_status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-18  9:35:48
