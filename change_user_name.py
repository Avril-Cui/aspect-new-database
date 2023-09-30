import psycopg2
import os
from dotenv import load_dotenv
load_dotenv()

DATABASE_HOST = os.getenv("DATABASE_HOST")
DATABASE_USER = os.getenv("DATABASE_USER")
DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")
DATABASE_ROOT_NAME = os.getenv("DATABASE_ROOT_NAME")
DATABASE_PORT = os.getenv("DATABASE_PORT")
conn = psycopg2.connect(
    host=DATABASE_HOST if DATABASE_HOST!=None else "localhost",
    database=DATABASE_ROOT_NAME if DATABASE_ROOT_NAME!=None else "aspectdatabase",
    user=DATABASE_USER if DATABASE_USER!=None else "postgres",
    password=DATABASE_PASSWORD if DATABASE_PASSWORD!=None else "Xiaokeai0717",
    port=DATABASE_PORT,
    sslmode='require'
)
cur = conn.cursor()

cur.execute(f"""
   select * from portfolio where uid='aswalfredz@gmail.com';
""")
data = cur.fetchall()
print(data)

# import matplotlib.pyplot as plt

# DB = db()
# conn, cur = db.initialize_connection()

# for company in ["ast", "dsc", "fsin", "hhw", "jky", "sgo", "wrkn", "index"]:
#     lst = []
#     price = db.get_price_from_database(company, cur)
#     print(len())
#     plt.plot(price)
#     plt.show()