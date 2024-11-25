CREATE TABLE `users` (
    ->   `id` int(11) NOT NULL AUTO_INCREMENT,
    ->   `username` varchar(255) NOT NULL,
    ->   `password` varchar(255) NOT NULL,
    ->   PRIMARY KEY (`id`)
    -> ) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1

CREATE TABLE `all_time_hits` (
  `id` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(100) DEFAULT NULL,
  `cover_url` varchar(255) DEFAULT NULL,
  `description` text,
  `bid` int(11) NOT NULL AUTO_INCREMENT,
  `likes` int(11) DEFAULT '0',
  PRIMARY KEY (`bid`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1 

CREATE TABLE `best_sellers` (
  `id` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(100) DEFAULT NULL,
  `cover_url` varchar(255) DEFAULT NULL,
  `description` text,
  `bid` int(11) NOT NULL AUTO_INCREMENT,
  `likes` int(11) DEFAULT '0',
  PRIMARY KEY (`bid`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1 

CREATE TABLE `featured_books` (
  `id` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(100) DEFAULT NULL,
  `cover_url` varchar(255) DEFAULT NULL,
  `description` text,
  `bid` int(11) NOT NULL AUTO_INCREMENT,
  `likes` int(11) DEFAULT '0',
  `loves` int(11) DEFAULT '0',
  PRIMARY KEY (`bid`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1 


INSERT INTO featured_books (id, title, author, cover_url, description, bid, likes, loves) VALUES
('OL1168083W', '1984', 'George Orwell', 'https://covers.openlibrary.org/b/id/7222246-M.jpg', NULL, 1, 31, 0),
('OL3140822W', 'To Kill a Mockingbird', 'Harper Lee', 'https://covers.openlibrary.org/b/id/7894850-M.jpg', NULL, 2, 30, 0),
('OL468431W', 'The Great Gatsby', 'F. Scott Fitzgerald', 'https://covers.openlibrary.org/b/id/8237890-M.jpg', NULL, 3, 6, 0),
('OL66554W', 'Pride and Prejudice', 'Jane Austen', 'https://covers.openlibrary.org/b/id/8489753-M.jpg', NULL, 4, 5, 0),
('OL5678901W', 'The Catcher in the Rye', 'J.D. Salinger', 'https://covers.openlibrary.org/b/id/8254669-M.jpg', NULL, 6, 0, 0),
('OL6789012W', 'Moby Dick', 'Herman Melville', 'https://covers.openlibrary.org/b/id/8314029-M.jpg', NULL, 7, 0, 0),
('OL7890123W', 'The Hobbit', 'J.R.R. Tolkien', 'https://covers.openlibrary.org/b/id/8306831-M.jpg', NULL, 8, 0, 0),
('OL8901234W', 'Brave New World', 'Aldous Huxley', 'https://covers.openlibrary.org/b/id/8228329-M.jpg', NULL, 9, 0, 0),
('OL9012345W', 'Crime and Punishment', 'Fyodor Dostoevsky', 'https://covers.openlibrary.org/b/id/8158592-M.jpg', NULL, 10, 0, 0),
('1212', 'kdfn', 'oidjf', 'DS', NULL, 12, 0, 0),
('13', 'dfO', 'CDKJVB', 'jdfn', NULL, 14, 0, 0),
('jkinbf', 'okwdn', 'ojwnf', 'sdfaqd', NULL, 15, 0, 0),
('11989', 'vj', 'ksbfoq', 'kjdnj', NULL, 16, 0, 0),
('ksnbco', 'jnfo', 'ojdb', 'boisd', NULL, 17, 0, 0),
('iofnqoi', 'eovbn', 'ofbvqeuo', 'dfboq', NULL, 19, 0, 0),
('21211', 'COS101', 'ME', 'yahoo.com', NULL, 20, 0, 0),
('COS30043', 'Interface', 'Grace', 'google.com', NULL, 21, 0, 0);

INSERT INTO best_sellers (id, title, author, cover_url, description, bid, likes) VALUES
('OL2465347W', 'The Da Vinci Code', 'Dan Brown', 'https://covers.openlibrary.org/b/id/8233376-M.jpg', NULL, 11, 4),
('OL82563W', 'Harry Potter and the Sorcerer\'s Stone', 'J.K. Rowling', 'https://covers.openlibrary.org/b/id/8228788-M.jpg', NULL, 12, 2),
('OL5735363W', 'The Hunger Games', 'Suzanne Collins', 'https://covers.openlibrary.org/b/id/8235311-M.jpg', NULL, 13, 8),
('OL5720023W', 'Twilight', 'Stephenie Meyer', 'https://covers.openlibrary.org/b/id/8240801-M.jpg', NULL, 14, 7),
('OL5684765W', 'The Girl with the Dragon Tattoo', 'Stieg Larsson', 'https://covers.openlibrary.org/b/id/8232056-M.jpg', NULL, 15, 3),
('OL6789054W', 'Fifty Shades of Grey', 'E.L. James', 'https://covers.openlibrary.org/b/id/8237736-M.jpg', NULL, 16, 0),
('OL9023487W', 'The Fault in Our Stars', 'John Green', 'https://covers.openlibrary.org/b/id/8238739-M.jpg', NULL, 17, 0),
('OL4562384W', 'Gone Girl', 'Gillian Flynn', 'https://covers.openlibrary.org/b/id/8232345-M.jpg', NULL, 18, 0),
('OL2340983W', 'The Alchemist', 'Paulo Coelho', 'https://covers.openlibrary.org/b/id/8239934-M.jpg', NULL, 19, 0),
('OL4567854W', 'The Martian', 'Andy Weir', 'https://covers.openlibrary.org/b/id/8240234-M.jpg', NULL, 20, 0);

INSERT INTO all_time_hits (id, title, author, cover_url, description, bid, likes) VALUES
('OL1234567W', 'War and Peace', 'Leo Tolstoy', 'https://covers.openlibrary.org/b/id/8230200-M.jpg', NULL, 11, 4),
('OL2345678W', 'Ulysses', 'James Joyce', 'https://covers.openlibrary.org/b/id/8235678-M.jpg', NULL, 12, 7),
('OL3456789W', 'Don Quixote', 'Miguel de Cervantes', 'https://covers.openlibrary.org/b/id/8236789-M.jpg', NULL, 13, 10),
('OL4567890W', 'One Hundred Years of Solitude', 'Gabriel Garcia Marquez', 'https://covers.openlibrary.org/b/id/8237890-M.jpg', NULL, 14, 7),
('OL5678901W', 'In Search of Lost Time', 'Marcel Proust', 'https://covers.openlibrary.org/b/id/8238901-M.jpg', NULL, 15, 5),
('OL6789012W', 'The Odyssey', 'Homer', 'https://covers.openlibrary.org/b/id/8239012-M.jpg', NULL, 16, 0),
('OL7890123W', 'Crime and Punishment', 'Fyodor Dostoevsky', 'https://covers.openlibrary.org/b/id/8230123-M.jpg', NULL, 17, 0),
('OL8901234W', 'Moby Dick', 'Herman Melville', 'https://covers.openlibrary.org/b/id/8231234-M.jpg', NULL, 18, 0),
('OL9012345W', 'The Divine Comedy', 'Dante Alighieri', 'https://covers.openlibrary.org/b/id/8232345-M.jpg', NULL, 19, 0),
('OL0123456W', 'The Brothers Karamazov', 'Fyodor Dostoevsky', 'https://covers.openlibrary.org/b/id/8233456-M.jpg', NULL, 20, 0);
