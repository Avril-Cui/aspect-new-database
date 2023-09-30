import os
from dotenv import load_dotenv
import psycopg2
load_dotenv()
DATABASE_HOST = os.getenv("DATABASE_HOST")
DATABASE_USER = os.getenv("DATABASE_USER")
DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")
DATABASE_ROOT_NAME = os.getenv("DATABASE_ROOT_NAME")
# DATABASE_PORT = os.getenv("DATABASE_PORT")
conn = psycopg2.connect(
    host=DATABASE_HOST if DATABASE_HOST!=None else "localhost",
    database=DATABASE_ROOT_NAME if DATABASE_ROOT_NAME!=None else "aspectdatabase",
    user=DATABASE_USER if DATABASE_USER!=None else "postgres",
    password=DATABASE_PASSWORD if DATABASE_PASSWORD!=None else "Xiaokeai0717",
    # port=DATABASE_PORT,
    # sslmode='require'
)
cur = conn.cursor()

from User.user_database import UserDatabaseCommands
from Price.prices_init import  get_index_price, get_ast_price, get_dsc_price, get_fsin_price, get_hhw_price, get_jky_price, get_sgo_price, get_wrkn_price
import numpy as np
np.random.seed(17)

index_price = get_index_price()
ast_price = get_ast_price()
dsc_price = get_dsc_price()
fsin_price = get_fsin_price()
hhw_price = get_hhw_price()
jky_price = get_jky_price()
sgo_price = get_sgo_price()
wrkn_price = get_wrkn_price()

prices_list = [index_price, ast_price, dsc_price, fsin_price, hhw_price, jky_price, sgo_price, wrkn_price]
companies = ["index", "ast", "dsc", "fsin", "hhw", "jky", "sgo", "wrkn"]

user_database_commands = UserDatabaseCommands(conn, cur)
# user_database_commands.create_user_table()
# user_database_commands.create_portfolio_table()
user_database_commands.create_trade_history_table()
cur.execute(f'DROP TABLE IF EXISTS prices;')
cur.execute(f"""
    CREATE TABLE prices (
    company_id varchar (100) PRIMARY KEY,
    price_list NUMERIC [] NOT NULL
    );
""")
conn.commit()
print("HERE")
for i in range(len(companies)):
    cur.execute(f"""
        INSERT INTO prices VALUES (
            '{companies[i]}',
            ARRAY {prices_list[i][len(companies)-1382400:]}
        );
    """)
    conn.commit()
    print(i)