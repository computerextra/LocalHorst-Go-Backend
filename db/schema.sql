CREATE TABLE `Anschprechpartner` (
  `id` varchar(191) NOT NULL,
  `Name` varchar(191) NOT NULL,
  `Telefon` varchar(191) DEFAULT NULL,
  `Mobil` varchar(191) DEFAULT NULL,
  `Mail` varchar(191) DEFAULT NULL,
  `lieferantenId` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Aussteller` (
  `id` int(11) NOT NULL,
  `Artikelnummer` varchar(255) NOT NULL,
  `Artikelname` varchar(255) NOT NULL,
  `Specs` text NOT NULL,
  `Preis` decimal(10,2) NOT NULL,
  `Bild` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

CREATE TABLE `fischer` (
  `username` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `Lieferanten` (
  `id` varchar(191) NOT NULL,
  `Firma` varchar(191) NOT NULL,
  `Kundennummer` varchar(191) DEFAULT NULL,
  `Webseite` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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

CREATE TABLE `pdfs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `shorts` (
  `id` int(11) NOT NULL,
  `origin` varchar(500) NOT NULL,
  `short` varchar(255) NOT NULL,
  `count` int(11) DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `Anschprechpartner`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Anschprechpartner_lieferantenId_fkey` (`lieferantenId`);

ALTER TABLE `Aussteller`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `Einkauf`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Einkauf_mitarbeiterId_key` (`mitarbeiterId`);

ALTER TABLE `fischer`
  ADD PRIMARY KEY (`username`);

ALTER TABLE `Lieferanten`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `Mitarbeiter`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Mitarbeiter_id_key` (`id`);

ALTER TABLE `pdfs`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `pdfs` ADD FULLTEXT KEY `pdfs_title_body_idx` (`title`,`body`);

ALTER TABLE `shorts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `short` (`short`);

ALTER TABLE `Warenlieferung`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `Aussteller`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `pdfs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `shorts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `Anschprechpartner`
  ADD CONSTRAINT `Anschprechpartner_lieferantenId_fkey` FOREIGN KEY (`lieferantenId`) REFERENCES `Lieferanten` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `Einkauf`
  ADD CONSTRAINT `Einkauf_mitarbeiterId_fkey` FOREIGN KEY (`mitarbeiterId`) REFERENCES `Mitarbeiter` (`id`) ON UPDATE CASCADE;

