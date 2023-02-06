import psycopg2
import time
import os

DATABASE_HOST = os.getenv('DATABASE_HOST')
DATABASE_USER = os.getenv("DATABASE_USER")
DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")
DATABASE_ROOT_NAME = os.getenv("DATABASE_ROOT_NAME")
DATABASE_NAME = os.getenv("DATABASE_NAME")

conn = psycopg2.connect(
    host=DATABASE_HOST if DATABASE_HOST!=None else "localhost",
    database=DATABASE_NAME if DATABASE_NAME!=None else "aspectdatabase",
    user=DATABASE_USER if DATABASE_USER!=None else "postgres",
    password=DATABASE_PASSWORD if DATABASE_PASSWORD!=None else "Xiaokeai0717"
    )
conn.autocommit = True

cur = conn.cursor()

cur.execute(f"""
    SELECT user_name, cashvalue, RANK() OVER (ORDER BY cashvalue DESC) as rank FROM users;
""")
result = list(cur.fetchall())
ranking = {}
for index in range(len(result)):
    ranking[result[index][0]] = {
        "cash_value": float(round(result[index][1], 2)),
        "value_change": float(round(result[index][1]-100000, 2)),
        "pct_change": float(round((result[index][1]-100000)/100000, 4)),
        "ranking": int(round(result[index][2]))
    }
print(ranking)