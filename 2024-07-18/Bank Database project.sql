create database BM_DB;
use BM_DB;
show databases;
-- customer personal info
show tables;
create table personal_info(
customer_id varchar(5),
customer_name varchar(10),
date_of_birth date,
guardian_name varchar(50),
address varchar (50),
contact_no bigint(10),
mail_id varchar(100),
gender char(1),
marital_status varchar(10),
identification_doctype varchar(20),
citizenship varchar(20),
constraint cust_pers_info_pk primary key(customer_id)
);
-- customer reference info
CREATE TABLE customer_ref_info (
    customer_id VARCHAR(5),
    ref_acc_name VARCHAR(20),
    ref_acc_no BIGINT(16),
    ref_acc_address VARCHAR(50),
    relation VARCHAR(25),
    CONSTRAINT cust_ref_info_pk PRIMARY KEY (customer_id),
    CONSTRAINT cust_ref_info_fk FOREIGN KEY (customer_id) REFERENCES personal_info(customer_id)
);
-- bank info
create table bank_info
( ifsc_code varchar(50),
bank_name varchar(25),
branch_name varchar(25),
constraint bank_info_pk primary key(ifsc_code)
);

-- account infor
create table account_info
(
account_no bigint(16),
customer_id varchar(5),
account_type varchar(10),
registration_date date,
activation_date date,
ifsc_code varchar(50),
interest decimal(7,2),
initial_deposit bigint(10),
constraint acc_info_pk primary key(account_no),
constraint acc_info_pers_fk foreign key(customer_id) REFERENCES personal_info(customer_id),
constraint acc_info_bank_fk foreign key(ifsc_code) references bank_info(ifsc_code)
);
show tables;

INSERT INTO personal_info VALUES 
('C001', 'John', '1985-06-15', 'Robert Doe', '123 Main St', 9876543210, 'john@example.com', 'M', 'Single', 'Passport', 'US'),
('C002', 'Jane', '1990-09-22', 'Alice Smith', '456 Oak St', 8765432109, 'jane@example.com', 'F', 'Married', 'Driver License', 'US'),
('C003', 'Mike', '1988-03-10', 'Richard Roe', '789 Pine St', 7654321098, 'mike@example.com', 'M', 'Single', 'SSN', 'US'),
('C004', 'Anna', '1992-12-12', 'Helen Lee', '135 Cedar St', 9543210786, 'anna@example.com', 'F', 'Single', 'Passport', 'US'),
('C005', 'James', '1980-11-20', 'Paul King', '246 Elm St', 9432109875, 'james@example.com', 'M', 'Married', 'Driver License', 'US'),
('C006', 'Emily', '1987-07-07', 'Nancy White', '357 Maple St', 9321098764, 'emily@example.com', 'F', 'Single', 'SSN', 'US'),
('C007', 'David', '1975-05-30', 'Thomas Black', '468 Birch St', 9210987653, 'david@example.com', 'M', 'Married', 'Passport', 'US'),
('C008', 'Olivia', '1995-03-25', 'Sandra Brown', '579 Pine St', 9109876543, 'olivia@example.com', 'F', 'Single', 'Driver License', 'US'),
('C009', 'Liam', '1983-08-08', 'George Green', '681 Oak St', 9098765432, 'liam@example.com', 'M', 'Single', 'SSN', 'US'),
('C010', 'Sophia', '1998-02-15', 'Betty Blue', '792 Maple St', 8987654321, 'sophia@example.com', 'F', 'Married', 'Passport', 'US');

-- Insert sample data into customer_ref_info
INSERT INTO customer_ref_info VALUES 
('C001', 'David', 1234567890123456, '321 Birch St', 'Friend'),
('C002', 'Emma', 2345678901234567, '654 Maple St', 'Sister'),
('C003', 'Lucy', 3456789012345678, '987 Cedar St', 'Colleague'),
('C004', 'Michael', 4567890123456789, '112 Willow St', 'Brother'),
('C005', 'Sarah', 5678901234567890, '223 Palm St', 'Wife'),
('C006', 'Daniel', 6789012345678901, '334 Spruce St', 'Cousin'),
('C007', 'Laura', 7890123456789012, '445 Fir St', 'Sister'),
('C008', 'James', 8901234567890123, '556 Oak St', 'Friend'),
('C009', 'Emily', 9012345678901234, '667 Pine St', 'Colleague'),
('C010', 'Christopher', 1234509876543210, '778 Maple St', 'Husband');

-- Insert sample data into bank_info
INSERT INTO bank_info VALUES 
('IFSC001', 'Bank of America', 'Downtown'),
('IFSC002', 'Chase Bank', 'Uptown'),
('IFSC003', 'Wells Fargo', 'Midtown'),
('IFSC004', 'Citibank', 'Suburb'),
('IFSC005', 'HSBC', 'West End');

-- Insert sample data into account_info
INSERT INTO account_info VALUES 
(1234567890123456, 'C001', 'Saving', '2020-01-01', '2020-01-05', 'IFSC001', 3.50, 5000),
(2345678901234567, 'C002', 'Checking', '2021-02-02', '2021-02-10', 'IFSC002', 0.75, 3000),
(3456789012345678, 'C003', 'Saving', '2022-03-03', '2022-03-15', 'IFSC003', 2.00, 7000),
(4567890123456789, 'C004', 'Checking', '2019-04-04', '2019-04-10', 'IFSC004', 1.25, 4000),
(5678901234567890, 'C005', 'Saving', '2023-05-05', '2023-05-15', 'IFSC005', 3.00, 6000),
(6789012345678901, 'C006', 'Checking', '2018-06-06', '2018-06-12', 'IFSC001', 0.50, 2000),
(7890123456789012, 'C007', 'Saving', '2020-07-07', '2020-07-20', 'IFSC002', 2.75, 8000),
(8901234567890123, 'C008', 'Checking', '2021-08-08', '2021-08-22', 'IFSC003', 1.00, 3500),
(9012345678901234, 'C009', 'Saving', '2022-09-09', '2022-09-25', 'IFSC004', 3.25, 4500),
(1234509876543210, 'C010', 'Checking', '2023-10-10', '2023-10-30', 'IFSC005', 1.50, 2500);
