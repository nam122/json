import sqlite3

conn = sqlite3.connect('data.db')

cursor = conn.cursor()

cursor.execute('CREATE TABLE IF NOT EXISTS Customer('
               'id INTEGER PRIMARY KEY, '
               'customer TEXT, '
               'address TEXT)')

conn.commit()

cursor.execute('CREATE TABLE IF NOT EXISTS Orderinf('
               'id INTEGER PRIMARY KEY, '
               'customer TEXT,'
               'address TEXT,'
               'order_date DATE,'
               'order_time TIME'
               'state TEXT)')

conn.commit()

cursor.execute('CREATE TABLE IF NOT EXISTS Items('
               'id INTEGER, '
               'name TEXT, '
               'quantity INT, '
               'PRIMARY KEY(id, name),'
               'FOREIGN KEY(id) REFERENCES "Orderinf" (id))')

conn.commit()

cursor.execute('CREATE TABLE IF NOT EXISTS Product('
               'id INTEGER PRIMARY KEY, '
               'name TEXT, '
               'price FLOAT)')

conn.commit()

conn.close()
