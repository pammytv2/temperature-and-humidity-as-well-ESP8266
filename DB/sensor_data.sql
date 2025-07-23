-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 23, 2025 at 08:45 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `esp8266`
--

-- --------------------------------------------------------

--
-- Table structure for table `sensor_data`
--

CREATE TABLE `sensor_data` (
  `id` int(11) NOT NULL,
  `temperature` decimal(5,2) DEFAULT NULL,
  `humidity` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sensor_data`
--

INSERT INTO `sensor_data` (`id`, `temperature`, `humidity`, `created_at`) VALUES
(1, 22.00, 70, '2025-07-19 11:13:50'),
(2, 26.80, 70, '2025-07-19 11:15:21'),
(3, 27.20, 68, '2025-07-19 11:15:21'),
(4, 25.50, 72, '2025-07-19 11:15:21'),
(5, 30.10, 60, '2025-07-19 11:15:21'),
(6, 50.00, 40, '2025-07-19 11:15:21'),
(7, 29.50, 65, '2025-07-19 14:00:02'),
(8, 29.50, 65, '2025-07-19 14:00:03'),
(9, 29.50, 65, '2025-07-19 14:16:53'),
(10, 30.50, 65, '2025-07-19 14:16:59'),
(11, 10.50, 65, '2025-07-19 14:18:37'),
(12, 11.50, 65, '2025-07-19 14:20:23'),
(13, 11.50, 65, '2025-07-19 14:20:28'),
(14, 11.50, 40, '2025-07-19 14:20:36'),
(15, 11.50, 40, '2025-07-19 14:20:37'),
(16, 11.50, 40, '2025-07-19 14:20:37'),
(17, 11.50, 40, '2025-07-19 14:20:38'),
(18, 11.50, 40, '2025-07-19 14:20:38'),
(19, 11.50, 40, '2025-07-19 14:20:39'),
(20, 21.50, 40, '2025-07-19 14:36:31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sensor_data`
--
ALTER TABLE `sensor_data`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sensor_data`
--
ALTER TABLE `sensor_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
