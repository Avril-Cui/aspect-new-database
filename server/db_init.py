from User.user_database import UserDatabaseCommands
from Price.prices_init import  get_index_price, get_ast_price, get_dsc_price, get_fsin_price, get_hhw_price, get_jky_price, get_sgo_price, get_wrkn_price
import psycopg2
import os
from dotenv import load_dotenv
load_dotenv()
import matplotlib.pyplot as plt
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

plt.plot(index_price)
plt.show()
plt.plot(ast_price)
plt.show()
plt.plot(dsc_price)
plt.show()
plt.plot(fsin_price)
plt.show()
plt.plot(hhw_price)
plt.show()
plt.plot(jky_price)
plt.show()
plt.plot(sgo_price)
plt.show()
plt.plot(wrkn_price)
plt.show()
# prices_list = [index_price, ast_price, dsc_price, fsin_price, hhw_price, jky_price, sgo_price, wrkn_price]
# companies = ["index", "ast", "dsc", "fsin", "hhw", "jky", "sgo", "wrkn"]

# DATABASE_HOST = os.getenv("DATABASE_HOST")
# DATABASE_USER = os.getenv("DATABASE_USER")
# DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")
# DATABASE_ROOT_NAME = os.getenv("DATABASE_ROOT_NAME")

# conn = psycopg2.connect(
#     host=DATABASE_HOST if DATABASE_HOST!=None else "localhost",
#     database=DATABASE_ROOT_NAME if DATABASE_ROOT_NAME!=None else "aspectdatabase",
#     user=DATABASE_USER if DATABASE_USER!=None else "postgres",
#     password=DATABASE_PASSWORD if DATABASE_PASSWORD!=None else "Xiaokeai0717"
# )

# cur = conn.cursor()

# user_database_commands = UserDatabaseCommands(conn, cur)
# user_database_commands.create_user_table()
# user_database_commands.create_portfolio_table()
# user_database_commands.create_trade_history_table()

# cur.execute(f'DROP TABLE IF EXISTS prices;')
# cur.execute(f"""
#     CREATE TABLE prices (
#     company_id varchar (100) PRIMARY KEY,
#     price_list NUMERIC [] NOT NULL
#     );
# """)
# conn.commit()

# # cur.execute(f"""
# #     INSERT INTO prices VALUES (
# #         'dsc',
# #         ARRAY {dsc_price}
# #     );
# # """)
# # conn.commit()

# for i in range(len(prices_list)):
#     cur.execute(f"""
#         INSERT INTO prices VALUES (
#             '{companies[i]}',
#             ARRAY {prices_list[i]}
#         );
#     """)
#     conn.commit()