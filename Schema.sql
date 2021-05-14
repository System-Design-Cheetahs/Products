

CREATE TABLE features ( productId int, feature VARCHAR , value VARCHAR)
CREATE TABLE photos (id int, styleId int, url VARCHAR, thumbnail_url VARCHAR)
CREATE TABLE product (id int, name VARCHAR, slogan VARCHAR, description VARCHAR, category VARCHAR, default_price int)
CREATE TABLE related (id int, current_product_id int, related_product_id int)
CREATE TABLE skus (id int, stlyleId int, size VARCHAR, quantity int)
CREATE TABLE styles (id int, productId int, name VARCHAR, sale_price int, original_price int, default_style boolean)

\COPY photos(id, styleId, url, thumbnail_url)
TO '/Users/thecoolzone/Documents/HackReactor/SDC/cleandata
CSV HEADER;

\COPY product(id, name, slogan, description, category, default_price)
FROM '/Users/thecoolzone/Documents/HackReactor/SDC/fec12/db/data/product.csv'
CSV HEADER;

\COPY related(id, current_product_id, related_product_id)
FROM '/Users/thecoolzone/Documents/HackReactor/SDC/fec12/db/data/related.csv'
CSV HEADER;

\COPY skus(id, styleId, size, quantity)
FROM '/Users/thecoolzone/Documents/HackReactor/SDC/fec12/db/data/skus.csv'
CSV HEADER;

\COPY styles(id, productId, name, sale_price, original_price, default_style)
FROM '/Users/thecoolzone/Documents/HackReactor/SDC/fec12/db/data/styles.csv'
CSV HEADER;

\COPY features(id, productId, feature, value)
FROM “/Users/thecoolzone/Documents/HackReactor/SDC/fec12/db/data/features.csv”
CSV HEADER;

ALTER TABLE photos ADD COLUMN id SERIAL PRIMARY KEY;