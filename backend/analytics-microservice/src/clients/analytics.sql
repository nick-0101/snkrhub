CREATE TABLE analytics (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id VARCHAR(128) NOT NULL,
    inventoryValue DECIMAL NOT NULL,
    inventoryCount INTEGER NOT NULL,
    netIncome DECIMAL NOT NULL,
    inventorySold INTEGER NOT NULL
);