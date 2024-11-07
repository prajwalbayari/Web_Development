CREATE TABLE IF NOT EXISTS user(
    id VARCHAR(50) primary key,
    username VARCHAR(50) unique,
    email varchar(50) not null,
    password varchar(50) not null
);