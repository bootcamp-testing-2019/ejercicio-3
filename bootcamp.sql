-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: localhost    Database: 
-- ------------------------------------------------------
-- Server version	5.7.26

CREATE DATABASE IF NOT EXISTS `bootcamp` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;

CREATE USER IF NOT EXISTS 'bootcamp_user'@'%' IDENTIFIED BY '123456';

GRANT ALL ON `bootcamp`.* TO 'bootcamp_user'@'%';
