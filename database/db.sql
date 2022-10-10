CREATE DATABASE `login-register`;

USE `login-register`;

CREATE TABLE `tbl_users`
(id int primary key auto_increment,
username varchar(255) not null,
email varchar(255) not null,
password varchar(500) not null);

CREATE TABLE `tbl_contacts`
(id int primary key auto_increment,    
username VARCHAR(255) not null,
name VARCHAR(255) not null,
email VARCHAR(255) not null,
number VARCHAR(500) not null);