-- Creates a document for every user, tracks profile stats
CREATE TABLE inventory_analytics (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id VARCHAR(128) NOT NULL UNIQUE,
    inventoryCount INTEGER NOT NULL,
    netIncome DECIMAL NOT NULL,
    inventorySold INTEGER NOT NULL
);

-- Keeps track of inventory value for historical analysis
CREATE TABLE inventory_value (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id VARCHAR(128) NOT NULL,
    inventoryValue DECIMAL NOT NULL,
    "createdAt" DATE NOT NULL
);