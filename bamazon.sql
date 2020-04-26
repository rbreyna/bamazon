drop database if exists bamazon_db;
create database bamazon_db;

use bamazon_db;

drop table if exists products;

create table products(
	item_id int auto_increment not null,
    product_name varchar(100) not null,
    department_name varchar(100) not null,
    price decimal(6,2) not null,
    stock_quantity int not null,
    PRIMARY KEY(item_id)    
);

truncate products;

select * from products;

