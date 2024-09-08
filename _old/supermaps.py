import sqlite3

# Connexion à la base de données
conn = sqlite3.connect('supermaps.db')

# Créez un curseur
cur = conn.cursor()

# Exemple de création d'une table
cur.execute('''CREATE TABLE IF NOT EXISTS PointsOfInterest (
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               name TEXT NOT NULL,
               description TEXT,
               latitude REAL,
               longitude REAL,
               category TEXT,
               address TEXT,
               city TEXT,
               rating REAL DEFAULT 0)''')

# Committer les changements et fermer la connexion
conn.commit()
conn.close()
