
CREATE TABLE IF NOT EXISTS assets(
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    type VARCHAR(50) NULL,
    owner VARCHAR(120) NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- Info inicial
INSERT INTO assets(name, type, owner) VALUES
    ('MacBook Pro 14"', 'Laptop', 'Carlos'),
    ('Lenovo ThinkPad X1', 'Laptop', 'Ana'),
    ('iPhone 13', 'Celular', 'Mariana'),
    ('Dell Ultra 27', 'Monitor', 'Ventas'); 