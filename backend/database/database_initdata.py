import sqlite3

conn = sqlite3.connect('data.db')

cursor = conn.cursor()
insert_query = 'INSERT INTO Product VALUES(?, ?, ?)'

data = []

data.append((None, 'Apple', 3 ))
data.append((None, 'Soft drink', 1.5))
data.append((None, 'Potato chip', 15))

cursor.executemany(insert_query, data)

conn.commit()
conn.close()
