# Server Guide

## Database
windows setup
```
cd C:\Program Files\MySQL\MySQL Server 8.0\bin

mysql -u root -p
```

`users` table:
```sql
CREATE DATABASE playpal;
use playpal;

    CREATE TABLE users ( 
        id INT unsigned NOT NULL AUTO_INCREMENT,  
        name VARCHAR(150) NOT NULL,
        created_date VARCHAR(255),
        last_modified_date VARCHAR(255),
        email VARCHAR(150) NOT NULL, PRIMARY KEY (id)  
    );

    CREATE TABLE posts (
       id INT unsigned NOT NULL AUTO_INCREMENT,
       creator_id INT unsigned,
       title VARCHAR(150) NOT NULL,
       content VARCHAR(150) NOT NULL, 
       location VARCHAR(255),
       is_virtual BIT NOT NULL,
       
       liked_user_ids VARCHAR(255),
       joined_user_ids VARCHAR(255),
       
       created_date VARCHAR(255),
       last_modified_date VARCHAR(255),
       
       PRIMARY KEY (id),
       FOREIGN KEY (creator_id) REFERENCES users(id)
    );

    CREATE TABLE comments (
       id INT unsigned NOT NULL AUTO_INCREMENT,
       creator_id INT unsigned,
       post_id INT unsigned,
       created_date VARCHAR(255),
       last_modified_date VARCHAR(255),
       content VARCHAR(150) NOT NULL,
       PRIMARY KEY (id),
       FOREIGN KEY (creator_id) REFERENCES users(id),
       FOREIGN KEY (post_id) REFERENCES posts(id)
    );

    CREATE TABLE messages (
        id INT unsigned NOT NULL AUTO_INCREMENT,
        sender_id INT unsigned,
        post_id INT unsigned,
        content VARCHAR(150) NOT NULL,
        created_date VARCHAR(255),
        last_modified_date VARCHAR(255),
        PRIMARY KEY(id),
        FOREIGN KEY (sender_id) REFERENCES users(id),
        FOREIGN KEY (post_id) REFERENCES posts(id)
    );   
    
    CREATE TABLE tags (
        id INT unsigned NOT NULL AUTO_INCREMENT,
        label VARCHAR(255) NOT NULL,
        PRIMARY KEY(id),
    );
    
    CREATE TABLE likes (
        id INT unsigned NOT NULL AUTO_INCREMENT,
        user_id INT unsigned,
        post_id INT unsigned,
        PRIMARY KEY(id),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (post_id) REFERENCES posts(id)
    );
    
    CREATE TABLE joins (
        id INT unsigned NOT NULL AUTO_INCREMENT,
        user_id INT unsigned,
        post_id INT unsigned,
        PRIMARY KEY(id),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (post_id) REFERENCES posts(id)
    );
    
    CREATE TABLE follows (
        id INT unsigned NOT NULL AUTO_INCREMENT,
        follower_id INT unsigned,
        followee_id INT unsigned,
        PRIMARY KEY(id),
        FOREIGN KEY (follower_id) REFERENCES users(id),
        FOREIGN KEY (followee_id) REFERENCES users(id)
    );
    
```