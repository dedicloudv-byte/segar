CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    type TEXT,
    size TEXT,
    image_key TEXT,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS promos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    discount_text TEXT,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
);

-- Initial settings
INSERT OR IGNORE INTO settings (key, value) VALUES ('site_name', 'SUJUD NANAS');
INSERT OR IGNORE INTO settings (key, value) VALUES ('address', 'Jl. Nenas No. 1, Riau, Indonesia');
INSERT OR IGNORE INTO settings (key, value) VALUES ('contact_phone', '+62 812 3456 7890');
INSERT OR IGNORE INTO settings (key, value) VALUES ('contact_email', 'info@sujudnanas.com');
INSERT OR IGNORE INTO settings (key, value) VALUES ('luxury_theme_color', '#D4AF37'); -- Gold
INSERT OR IGNORE INTO settings (key, value) VALUES ('admin_password', 'sujudnanas123');
