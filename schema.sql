CREATE TABLE users (
  id INT AUTO_INCREMENT,
  nickname varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  store_id INT AUTO_INCREMENT,
  PRIMARY KEY (id)
);

CREATE TABLE store (
  id INT AUTO_INCREMENT,
  phone varchar(255) NOT NULL,
  storename varchar(255) NOT NULL,
  address varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE item (
  id INT AUTO_INCREMENT,
  itemname varchar(255) NOT NULL,
  itemphoto varchar(255) NOT NULL,
  itemdesc varchar(255) NOT NULL,
  itemprice varchar(255) NOT NULL,
  store_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE tag (
    id INT AUTO_INCREMENT,
    tagname varchar(255) NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE tag_store (
    tag_id INT,
    store_id INT 
);


ALTER TABLE users ADD FOREIGN KEY (store_id) REFERENCES stores (id);
ALTER TABLE items ADD FOREIGN KEY (store_id) REFERENCES stores (id);
ALTER TABLE tag_stores ADD FOREIGN KEY (store_id) REFERENCES stores (id);
ALTER TABLE tag_stores ADD FOREIGN KEY (tag_id) REFERENCES tags (id);


ALTER TABLE stores CHANGE COLUMN createdAt createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE stores CHANGE COLUMN updatedAt updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;

INSERT INTO users (email, nickname, password, store_id) VALUES ("BBira@gmail.com", "BBira", "1234", 1);
INSERT INTO stores (phone, storename, address) VALUES ("010-1234-5678", "shop", "강북");
-- INSERT INTO tags (tagname) VALUES ()
-- INSERT INTO items (itemname, itemphoto, itemdesc, itemprice) VALUES ()


