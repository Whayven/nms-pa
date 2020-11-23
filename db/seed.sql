create table users (
  user_id serial primary key,
  username varchar(50) not null,
  password text not null,
  console varchar(15)
);

create table star (
  star_id serial primary key,
  name varchar(50) not null,
  star_type varchar(10) not null,
  galaxy varchar(50) not null,
  economy integer not null,
  conflict varchar(10) not null,
  address varchar(20),
  user_id integer references users(user_id)
);

create table planet (
  planet_id serial primary key,
  name varchar(50) not null,
  type varchar(50) default "Unknown",
  hazard varchar(10) not null,
  sentinels varchar(25) not null,
  star_id integer references star(star_id)
);

create table planet_image (
  planet_image_id serial primary key,
  planet_image_url text not null,
  planet_id integer references planet(planet_id)
);