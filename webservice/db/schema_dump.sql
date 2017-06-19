-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Erstellungszeit: 19. Jun 2017 um 18:39

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `contract`
--

CREATE TABLE `contract` (
  `id` int(11) NOT NULL,
  `title` varchar(250) NOT NULL,
  `validfrom` date NOT NULL,
  `validto` date NOT NULL,
  `vendor` int(11) NOT NULL,
  `payagreement` int(11) DEFAULT NULL,
  `shippagreement` int(11) DEFAULT NULL,
  `payguarantee` varchar(1) DEFAULT NULL,
  `status` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `releasedby` int(11) DEFAULT NULL,
  `createdon` date NOT NULL,
  `releasedon` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `contract`
--

INSERT INTO `contract` (`id`, `title`, `validfrom`, `validto`, `vendor`, `payagreement`, `shippagreement`, `payguarantee`, `status`, `createdby`, `releasedby`, `createdon`, `releasedon`) VALUES
(3, 'Rabatte', '2017-04-23', '2017-04-30', 1, 1, 1, '1', 2, 1, NULL, '0000-00-00', '0000-00-00'),
(24, 'Werbekosten-zuschuss', '2017-05-20', '2017-05-20', 2, 1, 2, '1', 3, 3, 1, '0000-00-00', '0000-00-00'),
(25, 'Verkaufsförderung', '2017-05-01', '2017-05-18', 2, 2, 2, '0', 3, 1, NULL, '0000-00-00', '0000-00-00'),
(29, 'Bäuerlicher Vertrag ', '2015-12-26', '2016-12-25', 1, 1, 1, '1', 2, 2, 3, '0000-00-00', '0000-00-00'),
(33, 'Vertrag Test', '2017-05-15', '2017-05-14', 0, 2, 0, '1', 4, 3, 2, '0000-00-00', NULL),
(37, 'Tomaten Vertrag 2', '2017-05-31', '2017-06-29', 0, 2, 1, '1', 1, 2, NULL, '0000-00-00', NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `contractstatus`
--

CREATE TABLE `contractstatus` (
  `id` int(1) NOT NULL,
  `value` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `contractstatus`
--

INSERT INTO `contractstatus` (`id`, `value`) VALUES
(1, 'Neu'),
(2, 'In Prüfung'),
(3, 'Aktiv'),
(4, 'Gekündigt');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `payagreement`
--

CREATE TABLE `payagreement` (
  `id` int(11) NOT NULL,
  `value` float NOT NULL,
  `name` varchar(30) NOT NULL,
  `validfrom` date NOT NULL,
  `validto` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `payagreement`
--

INSERT INTO `payagreement` (`id`, `value`, `name`, `validfrom`, `validto`) VALUES
(1, 2.3, '14 Tage 2% | 30 Tage netto', '2017-04-22', '2017-05-31'),
(2, 1.5, '30 Tage netto', '2017-04-22', '2017-05-31');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `person`
--

CREATE TABLE `person` (
  `id` int(11) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `role` varchar(10) NOT NULL,
  `uid` varchar(45) NOT NULL,
  `passwd` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `person`
--

INSERT INTO `person` (`id`, `firstname`, `lastname`, `role`, `uid`, `passwd`) VALUES
(1, 'Max', 'Mustermann', 'Buyer', 'MUSTER', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220'),
(2, 'Sascha', 'Bauer', 'Buyer', 'BAUER', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220'),
(3, 'Denis', 'Yuzhakov', 'Buyer', 'YUZHAKOV', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `shippagreement`
--

CREATE TABLE `shippagreement` (
  `id` int(11) NOT NULL,
  `value` float NOT NULL,
  `name` varchar(30) NOT NULL,
  `validfrom` date NOT NULL,
  `validto` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `shippagreement`
--

INSERT INTO `shippagreement` (`id`, `value`, `name`, `validfrom`, `validto`) VALUES
(0, 5, 'Abholung Zentrallager', '0000-00-00', '2017-04-25'),
(1, 5, 'Lieferung frei Haus', '2017-04-21', '2017-04-25'),
(2, 5, '350 € je Einheit', '2017-04-21', '2017-04-25');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `test`
--

CREATE TABLE `test` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `test`
--

INSERT INTO `test` (`id`, `name`) VALUES
(1, 'Hallo'),
(2, 'Welt');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `vendor`
--

CREATE TABLE `vendor` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `vendor`
--

INSERT INTO `vendor` (`id`, `name`) VALUES
(0, 'Coca-Cola Erfrischungsgetränke AG'),
(1, 'Procter & Gamble Company'),
(2, 'Unilever');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `contract`
--
ALTER TABLE `contract`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payagreement` (`payagreement`,`shippagreement`,`status`,`createdby`,`releasedby`),
  ADD KEY `shippagreement` (`shippagreement`),
  ADD KEY `releasedby` (`releasedby`),
  ADD KEY `createdby` (`createdby`),
  ADD KEY `status` (`status`);

--
-- Indizes für die Tabelle `contractstatus`
--
ALTER TABLE `contractstatus`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `payagreement`
--
ALTER TABLE `payagreement`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `person`
--
ALTER TABLE `person`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `shippagreement`
--
ALTER TABLE `shippagreement`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `vendor`
--
ALTER TABLE `vendor`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `contract`
--
ALTER TABLE `contract`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
--
-- AUTO_INCREMENT für Tabelle `contractstatus`
--
ALTER TABLE `contractstatus`
  MODIFY `id` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `payagreement`
--
ALTER TABLE `payagreement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `person`
--
ALTER TABLE `person`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT für Tabelle `shippagreement`
--
ALTER TABLE `shippagreement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `test`
--
ALTER TABLE `test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `vendor`
--
ALTER TABLE `vendor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `contract`
--
ALTER TABLE `contract`
  ADD CONSTRAINT `contract_ibfk_11` FOREIGN KEY (`payagreement`) REFERENCES `payagreement` (`id`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `contract_ibfk_12` FOREIGN KEY (`shippagreement`) REFERENCES `shippagreement` (`id`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `contract_ibfk_13` FOREIGN KEY (`status`) REFERENCES `contractstatus` (`id`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `contract_ibfk_14` FOREIGN KEY (`createdby`) REFERENCES `person` (`id`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `contract_ibfk_15` FOREIGN KEY (`releasedby`) REFERENCES `person` (`id`) ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
