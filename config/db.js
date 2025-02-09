const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/casaluxe.db', (err) => {
  if (err) {
    console.error('Database opening error: ', err);
  }
});

// Skapa tabeller om de inte finns
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    price REAL,
    image TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )`);

  // Lägg till exempelprodukter
  db.get("SELECT COUNT(*) AS count FROM products", (err, row) => {
    if (row.count === 0) {
      const stmt = db.prepare("INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)");
      stmt.run("Soffa", "En bekväm soffa", 2999.99, "/images/soffa.jpg");
      stmt.run("Stol", "En stilren stol", 599.99, "/images/stol.jpg");
      stmt.run("Bord", "Ett modernt bord", 1499.99, "/images/bord.jpg");
      stmt.finalize();
    }
  });
});

module.exports = db;

db.get("SELECT COUNT(*) AS count FROM posts", (err, row) => {
  if (row.count === 0) {
    const stmt = db.prepare("INSERT INTO posts (featuredImage, namn, beskrivning ,brand, pris, urlSlug ) VALUES (?, ?, ?, ?, ?, ?, ?)");
    stmt.run("/img/uppload/image1.jpg", "Nya Möbler","Smartphone XYZ är den senaste modellen från Brand XYZ. Den har en 6,5-tums AMOLED-skärm, en kraftfull Snapdragon 888-processor och ett 48 MP kamerasytem. Perfekt för både arbete och underhållning, med lång batteritid och snabb laddning." ,"Casa Luxe", "1990 SEK","Mörkgrå");
    stmt.run("/img/uppload/image1.jpg", "Nya Möbler","Smartphone XYZ är den senaste modellen från Brand XYZ. Den har en 6,5-tums AMOLED-skärm, en kraftfull Snapdragon 888-processor och ett 48 MP kamerasytem. Perfekt för både arbete och underhållning, med lång batteritid och snabb laddning." ,"Casa Luxe", "1990 SEK","Mörkgrå");
    stmt.run("/img/uppload/image1.jpg", "Nya Möbler","Smartphone XYZ är den senaste modellen från Brand XYZ. Den har en 6,5-tums AMOLED-skärm, en kraftfull Snapdragon 888-processor och ett 48 MP kamerasytem. Perfekt för både arbete och underhållning, med lång batteritid och snabb laddning." ,"Casa Luxe", "1990 SEK","Mörkgrå");
    stmt.run("/img/uppload/image1.jpg", "Nya Möbler","Smartphone XYZ är den senaste modellen från Brand XYZ. Den har en 6,5-tums AMOLED-skärm, en kraftfull Snapdragon 888-processor och ett 48 MP kamerasytem. Perfekt för både arbete och underhållning, med lång batteritid och snabb laddning." ,"Casa Luxe", "1990 SEK","Mörkgrå");
    stmt.run("/img/uppload/image1.jpg", "Nya Möbler","Smartphone XYZ är den senaste modellen från Brand XYZ. Den har en 6,5-tums AMOLED-skärm, en kraftfull Snapdragon 888-processor och ett 48 MP kamerasytem. Perfekt för både arbete och underhållning, med lång batteritid och snabb laddning." ,"Casa Luxe", "1990 SEK","Mörkgrå");
    stmt.run("/img/uppload/image1.jpg", "Nya Möbler","Smartphone XYZ är den senaste modellen från Brand XYZ. Den har en 6,5-tums AMOLED-skärm, en kraftfull Snapdragon 888-processor och ett 48 MP kamerasytem. Perfekt för både arbete och underhållning, med lång batteritid och snabb laddning." ,"Casa Luxe", "1990 SEK","Mörkgrå");
    stmt.run("/img/uppload/image1.jpg", "Nya Möbler","Smartphone XYZ är den senaste modellen från Brand XYZ. Den har en 6,5-tums AMOLED-skärm, en kraftfull Snapdragon 888-processor och ett 48 MP kamerasytem. Perfekt för både arbete och underhållning, med lång batteritid och snabb laddning." ,"Casa Luxe", "1990 SEK","Mörkgrå");
    stmt.run("/img/uppload/image1.jpg", "Nya Möbler","Smartphone XYZ är den senaste modellen från Brand XYZ. Den har en 6,5-tums AMOLED-skärm, en kraftfull Snapdragon 888-processor och ett 48 MP kamerasytem. Perfekt för både arbete och underhållning, med lång batteritid och snabb laddning." ,"Casa Luxe", "1990 SEK","Mörkgrå");
    stmt.finalize();
  }
});


module.exports = db;
