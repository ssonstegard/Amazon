use amazon_db;

create table amazonItems(
id int not null auto_increment,
product_name varchar(255),
department_name varchar (255),
price decimal (5,2),
stock_quantity integer (4),
primary key (id)
);