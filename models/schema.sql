DROP DATABASE IF EXISTS youGotThis_db;
CREATE DATABASE youGotThis_db;
use youGotThis_db;

CREATE TABLE events (
    id INTEGER auto_Increment primary key,
    eventName VARCHAR(55) not Null,
    eventDate VARCHAR(55) not null,
    locationName VARCHAR(100),
    eventType VARCHAR(50), not NULL
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
    status BOOLEAN DEFAULT false,
    type VARCHAR(255),
    eventID INT(10)
)
