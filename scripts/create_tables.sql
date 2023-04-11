CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE status_type AS ENUM('OPEN', 'ORDERED');

CREATE TABLE users (
  id uuid NOT null DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT null,
  email text NOT null,
  password text NOT null
);

CREATE TABLE carts (
	id uuid NOT null DEFAULT uuid_generate_v4() PRIMARY KEY,
	user_id uuid NOT null REFERENCES users(id) ON DELETE CASCADE,
	created_at date NOT null,
	updated_at date NOT null,
	status status_type
);

CREATE TABLE cart_items (
  id uuid NOT null DEFAULT uuid_generate_v4() PRIMARY KEY,
  cart_id uuid REFERENCES carts(id) ON DELETE CASCADE,
  product_id uuid NOT null,
  count INT NOT null
);

CREATE TABLE orders (
  id uuid NOT null DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  cart_id uuid REFERENCES carts(id) ON DELETE CASCADE,
  payment json,
  delivery json,
  comments text,
  status status_type,
  total INT
);
