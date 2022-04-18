CREATE TABLE inventory (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id VARCHAR(128) NOT NULL,
    name VARCHAR(128) NOT NULL,
    styleId VARCHAR(25),
    brand VARCHAR(25),
    colour VARCHAR(25),
    condition VARCHAR(25),
    shoeSize DECIMAL,
    purchasePrice DECIMAL,
    tax DECIMAL,
    shipping DECIMAL,
    purchaseDate DATE NOT NULL,
    orderNumber VARCHAR
    createdAt DATE NOT NULL
)