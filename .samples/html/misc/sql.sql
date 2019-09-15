CREATE SCHEMA my_schema;
CREATE TABLE my_schema.parent_table (
  id SERIAL PRIMARY KEY,
  name TEXT,
  description TEXT,
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON TABLE my_schema.parent_table IS 'Provide a description for your parent table.';
CREATE TABLE my_schema.child_table (
  id SERIAL PRIMARY KEY,
  name TEXT,
  description TEXT,
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  parent_table_id INTEGER NOT NULL REFERENCES my_schema.parent_table(id)
);
COMMENT ON TABLE my_schema.child_table IS 'Provide a description for your child table.';

INSERT INTO my_schema.parent_table
  (name, description)
VALUES
  ('Parent name 1', 'Parent description 1'),
  ('Parent name 2', 'Parent description 2'),
  ('Parent name 3', 'Parent description 3');
  ('Parent name 4', 'Parent description 4');

INSERT INTO my_schema.child_table
  (name, description, parent_table_id)
VALUES
  ('Child name 1', 'Child description 1', 1),
  ('Child name 2', 'Child description 2', 2),
  ('Child name 3', 'Child description 3', 3);
  ('Child name 4', 'Child description 4', 4);

CREATE USER zirdev WITH ENCRYPTED PASSWORD 'zirdev';
GRANT ALL PRIVILEGES ON DATABASE my_database TO zirdev;

SELECT EMP_ID, LAST_NAME FROM EMPLOYEE_TBL
WHERE CITY = 'INDIANAPOLIS' ORDER BY EMP_ID asc;

SELECT COUNT(price), price FROM orders 
WHERE price < 70 GROUP BY price ORDER BY price

CREATE VIEW Failing_Students AS
SELECT S_NAME, Student_ID
FROM STUDENT
WHERE GPA > 40;

CREATE OR REPLACE VIEW [ Product List] AS
SELECT ProductID, ProductName, Category
FROM Products
WHERE Discontinued = No;

/* This query below is commented so it won't execute*/
/*
SELECT item FROM Orders 
WHERE date ALL = (SELECT Order_ID FROM Orders
WHERE quantity > 50)
*/
 
/* the sql query below the will be executed 
ignoring the text after "--"
*/
 
SELECT item -- single comment  
FROM Orders -- another single comment
WHERE id 
ALL = (SELECT ID FROM Orders
WHERE quantity > 25)

DELETE FROM people WHERE name = 'Joe';

DROP TABLE people;

IF OBJECT_ID (N'dbo.ufnGetInventoryStock', N'FN') IS NOT NULL  
    DROP FUNCTION ufnGetInventoryStock;  
GO  
CREATE FUNCTION dbo.ufnGetInventoryStock(@ProductID int)  
RETURNS int   
AS   
-- Returns the stock level for the product.  
BEGIN  
    DECLARE @ret int;  
    SELECT @ret = SUM(p.Quantity)   
    FROM Production.ProductInventory p   
    WHERE p.ProductID = @ProductID   
        AND p.LocationID = '6';  
     IF (@ret IS NULL)   
        SET @ret = 0;  
    RETURN @ret;  
END; 

CREATE FUNCTION dbo.StripWWWandCom (@input VARCHAR(250))
RETURNS VARCHAR(250)
AS BEGIN
    DECLARE @Work VARCHAR(250)

    SET @Work = @Input

    SET @Work = REPLACE(@Work, 'www.', '')
    SET @Work = REPLACE(@Work, '.com', '')

    RETURN @work
END