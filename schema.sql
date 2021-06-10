CREATE TABLE user (
  id INT AUTO_INCREMENT,
  nickname varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  store_id INT,
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


ALTER TABLE user ADD FOREIGN KEY (store_id) REFERENCES store (id);
ALTER TABLE item ADD FOREIGN KEY (store_id) REFERENCES store (id);
ALTER TABLE item ADD FOREIGN KEY (store_id) REFERENCES store (id);
ALTER TABLE tag_store ADD FOREIGN KEY (store_id) REFERENCES store (id);
ALTER TABLE tag_store ADD FOREIGN KEY (tag_id) REFERENCES tag (id);


INSERT INTO user (email, nickname, password, store_id) VALUES ("BBira@gmail.com", "BBira", "1234", 1);
INSERT INTO store (phone, storename, address) VALUES ("010-1234-5678", "shop", "강북");
-- INSERT INTO tag (tagname) VALUES ()
-- INSERT INTO item (itemname, itemphoto, itemdesc, itemprice) VALUES ()


