DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	id INT AUTO_INCREMENT,
    product_name VARCHAR(100),
    department_name VARCHAR(50),
    price INT NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (id)
);

-- So "insert into" and "values" are separated for readability. However this entire command --
-- to generate one row exists on exactly one line. -- 
insert into products (product_name, department_name, price, stock_quantity)
values ("Pizza Cutter", "Home Goods", 7, 100);

insert into products (product_name, department_name, price, stock_quantity)
values ("Crossbow Trap", "Home Goods", 60, 20);

insert into products (product_name, department_name, price, stock_quantity)
values ("Teleportation Chamber", "Home Networking", 1000000, 1);

insert into products (product_name, department_name, price, stock_quantity)
values ("1 qubit", "Electronics Accessories", 50000, 1000000000);

insert into products (product_name, department_name, price, stock_quantity)
values ("Time-traveling Sword", "LARP Gear", 500, 50);

insert into products (product_name, department_name, price, stock_quantity)
values ("Triforce of Courage", "World-Saving Equipment", 1, 1);

insert into products (product_name, department_name, price, stock_quantity)
values ("Slightly Used Nose Ring", "Men's Grooming", 20, 10000);

insert into products (product_name, department_name, price, stock_quantity)
values ("Trunk of Hopes and Dreams", "Luxury Beauty", 500, 50);

insert into products (product_name, department_name, price, stock_quantity)
values ("Qin Dynasty Tapestry", "Fine Art", 200, 2);

insert into products (product_name, department_name, price, stock_quantity)
values ("Transfigured Pocketwatch", "Wearable Tech", 1000, 100);

