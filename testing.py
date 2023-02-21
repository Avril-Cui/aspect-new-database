import psycopg2
import os
from dotenv import load_dotenv
import time
from itertools import accumulate
import datetime
seconds = time.time()
start_time = time.time() - (60*60*24)-60*60*24 -1
end_time = start_time + (60*60*24)*29 + 36000
start_date = datetime.datetime.now()
load_dotenv()
DATABASE_HOST = os.getenv("DATABASE_HOST")
DATABASE_USER = os.getenv("DATABASE_USER")
DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")
DATABASE_ROOT_NAME = os.getenv("DATABASE_ROOT_NAME")
conn = psycopg2.connect(
host=DATABASE_HOST if DATABASE_HOST!=None else "localhost",
database=DATABASE_ROOT_NAME if DATABASE_ROOT_NAME!=None else "aspectdatabase",
user=DATABASE_USER if DATABASE_USER!=None else "postgres",
password=DATABASE_PASSWORD if DATABASE_PASSWORD!=None else "Xiaokeai0717"
)

cur = conn.cursor()

def get_current_prices(company_list):
 current_time = time.time()
 index_lst = int(int((current_time-start_time))/86400)
 index_tmp = int(current_time-start_time-index_lst*86400)
 current_prices = {}
 
 for company in company_list:
  cur.execute(f"""
    SELECT price_list from prices WHERE company_id='{company}';
  """)
  price_list = list(cur.fetchone()[0])
  price_list = [price_list[x - y: x] for x, y in zip(
  accumulate([36000 for _ in range(len(price_list)//36000)]), [36000 for i in range(len(price_list)//36000)])]
  current_prices[company] = price_list[index_lst][index_tmp]
 print(current_prices)
 return current_prices

import time
start_time = time.time()
get_current_prices(["ast", "dsc", "fsin", "hhw", "jky", "sgo", "wrkn"])
print("--- %s seconds ---" % (time.time() - start_time))