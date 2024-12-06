-- phpMyAdmin SQL Dump
-- version 4.9.11
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Erstellungszeit: 06. Dez 2024 um 16:05
-- Server-Version: 10.5.27-MariaDB-ubu2004-log
-- PHP-Version: 7.4.33-nmm7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `d03c9058`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Account`
--

CREATE TABLE `Account` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `provider` varchar(191) NOT NULL,
  `providerAccountId` varchar(191) NOT NULL,
  `refresh_token` text DEFAULT NULL,
  `access_token` varchar(191) DEFAULT NULL,
  `expires_at` int(11) DEFAULT NULL,
  `token_type` varchar(191) DEFAULT NULL,
  `scope` varchar(191) DEFAULT NULL,
  `id_token` varchar(191) DEFAULT NULL,
  `session_state` varchar(191) DEFAULT NULL,
  `refresh_token_expires_in` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Anschprechpartner`
--

CREATE TABLE `Anschprechpartner` (
  `id` varchar(191) NOT NULL,
  `Name` varchar(191) NOT NULL,
  `Telefon` varchar(191) DEFAULT NULL,
  `Mobil` varchar(191) DEFAULT NULL,
  `Mail` varchar(191) DEFAULT NULL,
  `lieferantenId` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Aussteller`
--

CREATE TABLE `Aussteller` (
  `id` int(11) NOT NULL,
  `Artikelnummer` varchar(255) NOT NULL,
  `Artikelname` varchar(255) NOT NULL,
  `Specs` text NOT NULL,
  `Preis` decimal(10,2) NOT NULL,
  `Bild` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Einkauf`
--

CREATE TABLE `Einkauf` (
  `id` varchar(191) NOT NULL,
  `Paypal` tinyint(1) NOT NULL,
  `Abonniert` tinyint(1) NOT NULL,
  `Geld` varchar(191) DEFAULT NULL,
  `Pfand` varchar(191) DEFAULT NULL,
  `Dinge` longtext DEFAULT NULL,
  `mitarbeiterId` varchar(191) NOT NULL,
  `Abgeschickt` datetime(3) DEFAULT NULL,
  `Bild1` varchar(191) DEFAULT NULL,
  `Bild2` varchar(191) DEFAULT NULL,
  `Bild3` varchar(191) DEFAULT NULL,
  `Bild1Date` datetime(3) DEFAULT NULL,
  `Bild2Date` datetime(3) DEFAULT NULL,
  `Bild3Date` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `fischer`
--

CREATE TABLE `fischer` (
  `username` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Lieferanten`
--

CREATE TABLE `Lieferanten` (
  `id` varchar(191) NOT NULL,
  `Firma` varchar(191) NOT NULL,
  `Kundennummer` varchar(191) DEFAULT NULL,
  `Webseite` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Mitarbeiter`
--

CREATE TABLE `Mitarbeiter` (
  `id` varchar(191) NOT NULL,
  `Name` varchar(191) NOT NULL,
  `Short` varchar(191) DEFAULT NULL,
  `Gruppenwahl` varchar(191) DEFAULT NULL,
  `InternTelefon1` varchar(191) DEFAULT NULL,
  `InternTelefon2` varchar(191) DEFAULT NULL,
  `FestnetzAlternativ` varchar(191) DEFAULT NULL,
  `FestnetzPrivat` varchar(191) DEFAULT NULL,
  `HomeOffice` varchar(191) DEFAULT NULL,
  `MobilBusiness` varchar(191) DEFAULT NULL,
  `MobilPrivat` varchar(191) DEFAULT NULL,
  `Email` varchar(191) DEFAULT NULL,
  `Azubi` tinyint(1) DEFAULT NULL,
  `Geburtstag` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `pdfs`
--

CREATE TABLE `pdfs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Session`
--

CREATE TABLE `Session` (
  `id` varchar(191) NOT NULL,
  `sessionToken` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `expires` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `shorts`
--

CREATE TABLE `shorts` (
  `id` int(11) NOT NULL,
  `origin` varchar(500) NOT NULL,
  `short` varchar(255) NOT NULL,
  `count` int(11) DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `User`
--

CREATE TABLE `User` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `emailVerified` datetime(3) DEFAULT NULL,
  `image` varchar(191) DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `VerificationToken`
--

CREATE TABLE `VerificationToken` (
  `identifier` varchar(191) NOT NULL,
  `token` varchar(191) NOT NULL,
  `expires` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Warenlieferung`
--

CREATE TABLE `Warenlieferung` (
  `id` int(11) NOT NULL,
  `Name` varchar(191) NOT NULL,
  `angelegt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `geliefert` datetime(3) DEFAULT NULL,
  `AlterPreis` decimal(65,30) DEFAULT 0.000000000000000000000000000000,
  `NeuerPreis` decimal(65,30) DEFAULT 0.000000000000000000000000000000,
  `Preis` datetime(3) DEFAULT NULL,
  `Artikelnummer` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Wiki`
--

CREATE TABLE `Wiki` (
  `id` varchar(191) NOT NULL,
  `Name` varchar(191) NOT NULL,
  `Inhalt` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `Account`
--
ALTER TABLE `Account`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Account_provider_providerAccountId_key` (`provider`,`providerAccountId`),
  ADD KEY `Account_userId_fkey` (`userId`);

--
-- Indizes für die Tabelle `Anschprechpartner`
--
ALTER TABLE `Anschprechpartner`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Anschprechpartner_lieferantenId_fkey` (`lieferantenId`);

--
-- Indizes für die Tabelle `Aussteller`
--
ALTER TABLE `Aussteller`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `Einkauf`
--
ALTER TABLE `Einkauf`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Einkauf_mitarbeiterId_key` (`mitarbeiterId`);

--
-- Indizes für die Tabelle `fischer`
--
ALTER TABLE `fischer`
  ADD PRIMARY KEY (`username`);

--
-- Indizes für die Tabelle `Lieferanten`
--
ALTER TABLE `Lieferanten`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `Mitarbeiter`
--
ALTER TABLE `Mitarbeiter`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Mitarbeiter_id_key` (`id`);

--
-- Indizes für die Tabelle `pdfs`
--
ALTER TABLE `pdfs`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `pdfs` ADD FULLTEXT KEY `pdfs_title_body_idx` (`title`,`body`);

--
-- Indizes für die Tabelle `Session`
--
ALTER TABLE `Session`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Session_sessionToken_key` (`sessionToken`),
  ADD KEY `Session_userId_fkey` (`userId`);

--
-- Indizes für die Tabelle `shorts`
--
ALTER TABLE `shorts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `short` (`short`);

--
-- Indizes für die Tabelle `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Indizes für die Tabelle `VerificationToken`
--
ALTER TABLE `VerificationToken`
  ADD UNIQUE KEY `VerificationToken_token_key` (`token`),
  ADD UNIQUE KEY `VerificationToken_identifier_token_key` (`identifier`,`token`);

--
-- Indizes für die Tabelle `Warenlieferung`
--
ALTER TABLE `Warenlieferung`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `Wiki`
--
ALTER TABLE `Wiki`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Name` (`Name`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `Aussteller`
--
ALTER TABLE `Aussteller`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `pdfs`
--
ALTER TABLE `pdfs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `shorts`
--
ALTER TABLE `shorts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `Account`
--
ALTER TABLE `Account`
  ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `Anschprechpartner`
--
ALTER TABLE `Anschprechpartner`
  ADD CONSTRAINT `Anschprechpartner_lieferantenId_fkey` FOREIGN KEY (`lieferantenId`) REFERENCES `Lieferanten` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `Einkauf`
--
ALTER TABLE `Einkauf`
  ADD CONSTRAINT `Einkauf_mitarbeiterId_fkey` FOREIGN KEY (`mitarbeiterId`) REFERENCES `Mitarbeiter` (`id`) ON UPDATE CASCADE;

--
-- Constraints der Tabelle `Session`
--
ALTER TABLE `Session`
  ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
