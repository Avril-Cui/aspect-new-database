import psycopg2
import os
from dotenv import load_dotenv
import time
from itertools import accumulate
import datetime
seconds = time.time()
start_time = time.time() - (60*60*24)*10
end_time = start_time + (60*60*24)*29 + 36000
start_date = datetime.datetime.now()
load_dotenv()
DATABASE_HOST = os.getenv("DATABASE_HOST")
DATABASE_USER = os.getenv("DATABASE_USER")
DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")
DATABASE_ROOT_NAME = os.getenv("DATABASE_ROOT_NAME")

companies_current_prices = {}

def get_current_prices(company_list):
	start_time = time.time() - (60*60*24)*10 - 10
	current_time = time.time()
	index_lst = int(int((current_time-start_time))/86400)
	current_time = time.time()
	index_tmp = int(current_time-start_time-index_lst*86400)
	print(index_tmp, index_lst)
	print(current_time-start_time)
	current_prices = {}

	for company in company_list:
		conn = psycopg2.connect(
			host=DATABASE_HOST if DATABASE_HOST!=None else "localhost",
			database=DATABASE_ROOT_NAME if DATABASE_ROOT_NAME!=None else "aspectdatabase",
			user=DATABASE_USER if DATABASE_USER!=None else "postgres",
			password=DATABASE_PASSWORD if DATABASE_PASSWORD!=None else "Xiaokeai0717"
		)

		cur = conn.cursor()
		cur.execute(f"""
			SELECT price_list from prices WHERE company_id='{company}';
		""")
		price_list = list(cur.fetchone()[0])
		price_list = [price_list[x - y: x] for x, y in zip(
		accumulate([36000 for _ in range(len(price_list)//36000)]), [36000 for i in range(len(price_list)//36000)])]
		if index_tmp <= 36000:
			open_price = float(price_list[index_lst][0])
			current_price = float(price_list[index_lst][index_tmp])
			print(open_price, current_price)
			print(index_tmp)
			companies_current_prices[company] = {
				"price": round(current_price, 2),
				"change": round(current_price-open_price, 2),
				"pct_change":round((current_price-open_price)/open_price*100, 2)
			}
		elif index_tmp > 36000 and index_tmp <= 86400:
			open_price = float(price_list[index_lst][0])
			current_price = float(price_list[index_lst][-1])
			companies_current_prices[company] = {
				"price": round(current_price, 2),
				"change": round(current_price-open_price, 2),
				"pct_change":round((current_price-open_price)/open_price*100, 2)
			}
	return current_prices

import threading
import queue
que = queue.Queue()

def get_all_current_price(company_list):
 company_list_1 = company_list[:2]
 company_list_2 = company_list[2:5]
 company_list_3 = company_list[5:-1]
 thread_1 = threading.Thread(target=get_current_prices, args=(company_list_1, ))
 thread_2 = threading.Thread(target=get_current_prices, args=(company_list_2,))
 thread_3 = threading.Thread(target=get_current_prices, args=(company_list_3,))
 thread_1.start()
 thread_2.start()
 thread_3.start()
 thread_1.join()
 thread_2.join()
 thread_3.join()

import time
start_time = time.time()
get_all_current_price(["ast", "dsc", "fsin", "hhw", "jky", "sgo", "wrkn"])
keys = list(companies_current_prices.keys())
keys.sort()
sorted_dict = {i: companies_current_prices[i] for i in keys}
print(sorted_dict)
print("--- %s seconds ---" % (time.time() - start_time))

def get_day_price_list(company):
	start_time = time.time() - (60*60*24)*10 - 10
	current_time = time.time()
	index_lst = int(int((current_time-start_time))/86400)
	current_time = time.time()
	index_tmp = int(current_time-start_time-index_lst*86400)
	current_prices = {}
	conn = psycopg2.connect(
		host=DATABASE_HOST if DATABASE_HOST!=None else "localhost",
		database=DATABASE_ROOT_NAME if DATABASE_ROOT_NAME!=None else "aspectdatabase",
		user=DATABASE_USER if DATABASE_USER!=None else "postgres",
		password=DATABASE_PASSWORD if DATABASE_PASSWORD!=None else "Xiaokeai0717"
	)

	cur = conn.cursor()
	cur.execute(f"""
		SELECT price_list from prices WHERE company_id='{company}';
	""")
	fetched_list = list(cur.fetchone()[0])
	price_list = [fetched_list[x - y: x] for x, y in zip(
	accumulate([36000 for _ in range(len(fetched_list)//36000)]), [36000 for i in range(len(fetched_list)//36000)])]
	del fetched_list
		
	return price_list[index_lst]

def get_tick_price_list(company):
	start_time = time.time() - (60*60*24)*10 - 10
	current_time = time.time()
	index_lst = int(int((current_time-start_time))/86400)
	current_time = time.time()
	index_tmp = int(current_time-start_time-index_lst*86400)
	conn = psycopg2.connect(
		host=DATABASE_HOST if DATABASE_HOST!=None else "localhost",
		database=DATABASE_ROOT_NAME if DATABASE_ROOT_NAME!=None else "aspectdatabase",
		user=DATABASE_USER if DATABASE_USER!=None else "postgres",
		password=DATABASE_PASSWORD if DATABASE_PASSWORD!=None else "Xiaokeai0717"
	)

	cur = conn.cursor()
	
	cur.execute(f"""
		SELECT price_list from prices WHERE company_id='{company}';
	""")
	fetched_list = list(cur.fetchone()[0])
	price_list = [fetched_list[x - y: x] for x, y in zip(
	accumulate([36000 for _ in range(len(fetched_list)//36000)]), [36000 for i in range(len(fetched_list)//36000)])]
	del fetched_list
	tick_price_graph = []
	if index_tmp <= 36000:
		for index in range(index_tmp):
			if index % (300) == 0 and index != 36000 and index != 0:
				tick_price_graph.append({"time": (
							index+start_time), "value": round(price_list[index_lst][index], 2)})
	else:
		for index in range(36000):
			if index % (300) == 0 and index != 36000 and index != 0:
				tick_price_graph.append({"time": (
					index+start_time), "value": round(price_list[index_lst][index], 2)})
		
	return tick_price_graph