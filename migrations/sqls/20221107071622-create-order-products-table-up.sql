CREATE TABLE order_products(id SERIAL PRIMARY KEY ,quantity integer ,product_id integer REFERENCES products(id) , order_id integer REFERENCES orders(id) );