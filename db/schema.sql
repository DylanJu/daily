DROP TABLE IF EXISTS Customers;
CREATE TABLE IF NOT EXISTS Customers (CustomerId INTEGER PRIMARY KEY, CompanyName TEXT, ContactName TEXT);
INSERT INTO Customers (CustomerID, CompanyName, ContactName) VALUES (1, 'Alfreds Futterkiste', 'Maria Anders'), (4, 'Around the Horn', 'Thomas Hardy'), (11, 'Bs Beverages', 'Victoria Ashworth'), (13, 'Bs Beverages', 'Random Name');

DROP TABLE IF EXISTS journals;
CREATE TABLE IF NOT EXISTS journals (journal_id INTEGER PRIMARY KEY, title TEXT, content TEXT, created_at TEXT, updated_at TEXT, user_id INTEGER, timestamp TEXT, time TEXT)
