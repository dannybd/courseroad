-- phpMyAdmin SQL Dump
-- version 4.0.10.9
-- http://www.phpmyadmin.net
--
-- Host: sql.mit.edu
-- Generation Time: May 26, 2015 at 04:02 PM
-- Server version: 5.1.66-0+squeeze1-log
-- PHP Version: 5.5.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

-- --------------------------------------------------------

--
-- Table structure for table `roads`
--

CREATE TABLE IF NOT EXISTS `roads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hash` text NOT NULL,
  `user` text NOT NULL,
  `classes` longtext NOT NULL COMMENT 'encrypted',
  `majors` text NOT NULL COMMENT 'encrypted',
  `public` int(11) NOT NULL DEFAULT '0',
  `comment` varchar(100) NOT NULL COMMENT 'user-defined description of road',
  `ip` text NOT NULL,
  `added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `athena` varchar(100) NOT NULL,
  `class_year` int(11) NOT NULL DEFAULT '2019',
  `view_req_lines` int(11) NOT NULL DEFAULT '1',
  `autocomplete` int(11) NOT NULL DEFAULT '1',
  `need_permission` int(11) NOT NULL DEFAULT '0',
  `advisors` mediumtext NOT NULL,
  `advisees` mediumtext NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `athena` (`athena`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `warehouse`
--

CREATE TABLE IF NOT EXISTS `warehouse` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` int(11) NOT NULL,
  `subject_id` varchar(8) NOT NULL COMMENT '8.012',
  `subject_code` varchar(3) NOT NULL COMMENT '8',
  `subject_number` varchar(4) NOT NULL COMMENT '012',
  `subject_title` varchar(100) NOT NULL COMMENT 'Physics I',
  `joint_subjects` varchar(120) NOT NULL,
  `equiv_subjects` varchar(120) NOT NULL,
  `gir` varchar(4) NOT NULL,
  `ci` varchar(4) NOT NULL,
  `hass` varchar(8) NOT NULL,
  `is_variable_units` int(11) NOT NULL COMMENT 'If Y=units are arranged and other units are 0; else N=units are fixed.  ',
  `unitload` varchar(8) NOT NULL COMMENT '3-4-5',
  `total_units` int(11) NOT NULL,
  `grade_type` varchar(1) NOT NULL COMMENT 'L=Letter graded. P=P/D/F  ',
  `grade_rule` varchar(1) NOT NULL COMMENT 'J=JU grading allowed (Continuing and Repeatable). N=Not repeatable for credit. R=Can be repeated for credit. T=T grading allowed.',
  `reqstr` varchar(100) NOT NULL COMMENT 'original database requisite string',
  `reqs` mediumtext NOT NULL COMMENT 'processed tree of requisites',
  `desc` mediumtext NOT NULL,
  `offered_this_year` int(11) NOT NULL,
  `fall` int(11) NOT NULL,
  `iap` int(11) NOT NULL,
  `spring` int(11) NOT NULL,
  `summer` int(11) NOT NULL,
  `fall_instructors` varchar(180) NOT NULL,
  `spring_instructors` varchar(180) NOT NULL,
  `design_units` int(11) NOT NULL,
  `tuition_attr` varchar(4) NOT NULL COMMENT 'not sure if needed.',
  `supervisor_attr` varchar(4) NOT NULL COMMENT 'not sure if needed.',
  `hgn_code` varchar(1) NOT NULL COMMENT 'Code indentifies whether the subject can be taken at a graduate level: H (Higher level graduate program), G (Graduate program), N (Not for Graduate Credit).  ',
  `hgn_except` varchar(90) NOT NULL COMMENT 'Descriptive text for HGN codes: U=Undergraduate, G=Graduate, H=High graduate. This IS NOT the same as HGN_CODE in SUBJECT_OFFERED.  ',
  `last_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `notes` text NOT NULL COMMENT 'DO NOT TOUCH THIS IN WARHEOUSE, ONLY IN EXCEPTIONS',
  `extraclasses` text NOT NULL COMMENT 'DO NOT TOUCH THIS IN WARHEOUSE, ONLY IN EXCEPTIONS',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `warehouse_exceptions`
--

CREATE TABLE IF NOT EXISTS `warehouse_exceptions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` int(11) NOT NULL,
  `subject_id` varchar(8) NOT NULL COMMENT '8.012',
  `subject_code` varchar(3) NOT NULL COMMENT '8',
  `subject_number` varchar(4) NOT NULL COMMENT '012',
  `subject_title` varchar(100) NOT NULL COMMENT 'Physics I',
  `joint_subjects` varchar(120) NOT NULL,
  `equiv_subjects` varchar(120) NOT NULL,
  `gir` varchar(4) NOT NULL,
  `ci` varchar(4) NOT NULL,
  `hass` varchar(8) NOT NULL,
  `is_variable_units` int(11) NOT NULL COMMENT 'If Y=units are arranged and other units are 0; else N=units are fixed.  ',
  `unitload` varchar(8) NOT NULL COMMENT '3-4-5',
  `total_units` int(11) NOT NULL,
  `grade_type` varchar(1) NOT NULL COMMENT 'L=Letter graded. P=P/D/F  ',
  `grade_rule` varchar(1) NOT NULL COMMENT 'J=JU grading allowed (Continuing and Repeatable). N=Not repeatable for credit. R=Can be repeated for credit. T=T grading allowed.',
  `reqstr` varchar(100) NOT NULL COMMENT 'original database requisite string',
  `reqs` mediumtext NOT NULL COMMENT 'processed tree of requisites',
  `desc` mediumtext NOT NULL,
  `offered_this_year` int(11) NOT NULL,
  `fall` int(11) NOT NULL,
  `iap` int(11) NOT NULL,
  `spring` int(11) NOT NULL,
  `summer` int(11) NOT NULL,
  `fall_instructors` varchar(180) NOT NULL,
  `spring_instructors` varchar(180) NOT NULL,
  `design_units` int(11) NOT NULL,
  `tuition_attr` varchar(4) NOT NULL COMMENT 'not sure if needed.',
  `supervisor_attr` varchar(4) NOT NULL COMMENT 'not sure if needed.',
  `hgn_code` varchar(1) NOT NULL COMMENT 'Code indentifies whether the subject can be taken at a graduate level: H (Higher level graduate program), G (Graduate program), N (Not for Graduate Credit).  ',
  `hgn_except` varchar(90) NOT NULL COMMENT 'Descriptive text for HGN codes: U=Undergraduate, G=Graduate, H=High graduate. This IS NOT the same as HGN_CODE in SUBJECT_OFFERED.  ',
  `last_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `notes` text NOT NULL,
  `extraclasses` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
