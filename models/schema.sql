DROP DATABASE IF EXISTS youGotThis_db;
CREATE DATABASE youGotThis_db;
use youGotThis_db;

CREATE TABLE events (
    id INTEGER auto_Increment primary key,
    eventName VARCHAR(55) not Null,
    eventDate DATE not null,
    location VARCHAR(100),
    score INT(10) DEFAULT null,
    userID INT(10)
);

CREATE TABLE users (
    id INTEGER auto_Increment primary key,
    userName VARCHAR(55) not Null,
    pWord VARCHAR(55) not Null,
    firstName VARCHAR(55) not Null,
    lastName VARCHAR(55)
);

CREATE TABLE tasks (
    id INTEGER auto_Increment primary key,
    task VARCHAR(255) not null,
    eventID INT(10)
)

