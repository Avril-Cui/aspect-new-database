from Model.User.user_database import UserDatabaseCommands
import psycopg2
import os
from dotenv import load_dotenv
load_dotenv()
import time
from datetime import datetime
import datetime
from Model.House.auction_house import AuctionHouse
seconds = time.time()
start_time = 1680646552
end_time = start_time + (60*60*24)*29 + 36000
start_date = datetime.datetime.now()
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
house = AuctionHouse(conn, cur)
house.create_bot_table()
house.create_bot_portfolio_table()
house.create_bot_trade_history_table()
house.create_bot_order_table()

def get_price_from_database(company_id):
	cur.execute(f"""
          SELECT price_list from prices WHERE company_id='{company_id}';
        """)
	price = list(cur.fetchone()[0])
	return price

user_database_commands = UserDatabaseCommands(conn, cur)
user_database_commands.create_user_table()
user_database_commands.create_portfolio_table()
user_database_commands.create_trade_history_table()

import json
from flask import Flask, request, jsonify, request
import pyrebase
from flask_cors import CORS
import uuid
from itertools import accumulate
from functools import reduce
import operator

index_price = get_price_from_database("index")
ast_price = get_price_from_database("ast")
dsc_price = get_price_from_database("dsc")
fsin_price = get_price_from_database("fsin")
hhw_price = get_price_from_database("hhw")
jky_price = get_price_from_database("jky")
sgo_price = get_price_from_database("sgo")
wrkn_price = get_price_from_database("wrkn")

price_list = {
	"index": [index_price[x - y: x] for x, y in zip(
		accumulate([36000 for _ in range(len(index_price)//36000)]), [36000 for i in range(len(index_price)//36000)])],
	"ast": [ast_price[x - y: x] for x, y in zip(
		accumulate([36000 for _ in range(len(ast_price)//36000)]), [36000 for i in range(len(ast_price)//36000)])],
	"dsc": [dsc_price[x - y: x] for x, y in zip(
		accumulate([36000 for _ in range(len(dsc_price)//36000)]), [36000 for i in range(len(dsc_price)//36000)])],
	"fsin": [fsin_price[x - y: x] for x, y in zip(
		accumulate([36000 for _ in range(len(fsin_price)//36000)]), [36000 for i in range(len(fsin_price)//36000)])],
	"hhw": [hhw_price[x - y: x] for x, y in zip(
		accumulate([36000 for _ in range(len(hhw_price)//36000)]), [36000 for i in range(len(hhw_price)//36000)])],
	"jky": [jky_price[x - y: x] for x, y in zip(
		accumulate([36000 for _ in range(len(jky_price)//36000)]), [36000 for i in range(len(jky_price)//36000)])],
	"sgo": [sgo_price[x - y: x] for x, y in zip(
		accumulate([36000 for _ in range(len(sgo_price)//36000)]), [36000 for i in range(len(sgo_price)//36000)])],
	"wrkn": [wrkn_price[x - y: x] for x, y in zip(
		accumulate([36000 for _ in range(len(wrkn_price)//36000)]), [36000 for i in range(len(wrkn_price)//36000)])],
}

flat_price = {
	"ast": reduce(operator.concat, price_list["ast"]),
	"dsc": reduce(operator.concat, price_list["dsc"]),
	"fsin": reduce(operator.concat, price_list["fsin"]),
	"hhw": reduce(operator.concat, price_list["hhw"]),
	"jky": reduce(operator.concat, price_list["jky"]),
	"sgo": reduce(operator.concat, price_list["sgo"]),
	"wrkn": reduce(operator.concat, price_list["wrkn"]),
}

def get_current_prices(company_list):
	current_time = time.time()
	index_lst = int(int((current_time-start_time))/86400)
	index_tmp = int(current_time-start_time-index_lst*86400)
	if index_tmp <= 36000:
		current_prices = {}
		for company in company_list:
			current_prices[company] = price_list[company][index_lst][index_tmp]
		return current_prices
	elif index_tmp > 36000 and index_tmp <= 86400:
		current_prices = {}
		for company in company_list:
			current_prices[company] = price_list[company][index_lst][-1]
		return current_prices


chat_storeage = {
	"main": {
		"8408dd4a-7039-455f-bfa2-56dec9cace59": {
			"name": "Avril",
			"text": "Hello world",
			"timestamp": time.time(),
			"uid": "8408dd4a-7039-455f-bfa2-56dec9cace59"
		},
		"9999dd4a-7039-455f-bfa2-56dec9cace59": {
			"name": "Friday",
			"text": "Friday is bulldog.",
			"timestamp": time.time()+3,
			"uid": "9999dd4a-7039-455f-bfa2-56dec9cace59"
		},
		"7777dd4a-7039-455f-bfa2-56dec9cace59": {
			"name": "Daniel",
			"text": "Wakron is a very good stock, I think it will go up!",
			"timestamp": time.time()+6,
			"uid": "7777dd4a-7039-455f-bfa2-56dec9cace59"
		}

	},
	"fundamental": {},
	"quantitative": {},
	"technical": {}
}

app = Flask(__name__, static_url_path='')
CORS(app)
app.config["CORS_ORIGINS"] = ["https://aspect-finance.com",
							  "http://localhost:8080", "http://127.0.0.1:5000/"]
app.config['JSON_SORT_KEYS'] = False
config = {
	"apiKey": "AIzaSyAHY-ZeX87ObL6y3y_2n76GLNxU-24hHs0",
	"authDomain": "aspect-fb6c9.firebaseapp.com",
	"databaseURL":  "https://aspect-fb6c9-default-rtdb.firebaseio.com/",
	"storageBucket": "aspect-fb6c9.appspot.com",
}

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()

event = None

company_names = ["ast", "dsc", "fsin", "hhw", "jky", "sgo", "wrkn"]

@app.route("/result", methods=["POST", "GET"])
def result():
	if request.method == "POST":
		result = json.loads(request.data)
		email = result["user_email"]
		password = result["password"]
		try:
			user = auth.sign_in_with_email_and_password(email, password)
			return user["localId"]
		except:
			return "Invalid user request", 401


@app.route("/register", methods=["POST", "GET"])
def register():
	if request.method == "POST":
		data = json.loads(request.data)
		email = data["user_email"]
		password = data["password"]
		name = data["user_name"]

		try:
			auth.create_user_with_email_and_password(email, password)
			user = auth.sign_in_with_email_and_password(email, password)
			user_database_commands.intialize_user(user["localId"], name)
			return user["localId"]
		except:
			return "Invalid user request", 401

@app.route("/register-bot", methods=["POST"])
def register_bots():
	data = json.loads(request.data)
	bot_name = data["bot_name"]
	initial_price = data["initial_price"]
	house.initialize_bot(bot_name, initial_price)
	return "Bot registered!"

@app.route('/get-active-orders', methods=['POST'])
def active_orders():
	company_name = json.loads(request.data)
	orders = house.get_all_active_orders(company_name)
	return orders

@app.route('/get-order-book', methods=['POST'])
def order_book():
	company_name = json.loads(request.data)
	order_book = house.get_order_book(company_name)
	return jsonify(order_book)

@app.route('/get-user-pending-orders', methods=['POST'])
def pending_orders():
	user_uid = json.loads(request.data)
	pending_orders = house.get_user_pending_orders(user_uid)
	return jsonify(pending_orders)

@app.route('/bot-actions', methods=['POST'])
def bot_actions():
	action = json.loads(request.data)
	current_time = time.time()
	index_lst = int(int((current_time-start_time))/86400)
	index_tmp = int(current_time-start_time-index_lst*86400)
	if index_tmp <= 36000:
		current_price = {
			"index": price_list["index"][index_lst][index_tmp],
			"ast": price_list["ast"][index_lst][index_tmp],
			"dsc": price_list["dsc"][index_lst][index_tmp],
			"fsin": price_list["fsin"][index_lst][index_tmp],
			"hhw": price_list["hhw"][index_lst][index_tmp],
			"jky": price_list["jky"][index_lst][index_tmp],
			"sgo": price_list["sgo"][index_lst][index_tmp],
			"wrkn": price_list["wrkn"][index_lst][index_tmp]
		}
	else:
		current_price = {
			"index":round(price_list["index"][index_lst][-1], 2),
			"ast":round(price_list["ast"][index_lst][-1], 2),
			"dsc": round(price_list["dsc"][index_lst][-1], 2),
			"fsin": round(price_list["fsin"][index_lst][-1], 2),
			"hhw": round(price_list["hhw"][index_lst][-1], 2),
			"jky": round(price_list["jky"][index_lst][-1], 2),
			"sgo": round(price_list["sgo"][index_lst][-1], 2),
			"wrkn": round(price_list["wrkn"][index_lst][-1], 2)
		}
	
	response = house.bot_actions(action, current_price)
	if response == "Invalid 1":
			return "Bot do not owe enough shares of this stock.", 401
	elif response == "Invalid 2":
		return "Bot do not have enough money for this trade", 402
	elif response == "Invalid 3":
		return "Currently no shares available for trade. Bot's transaction will enter the pending state.", 403
	else:
		return "Success!"


@app.route('/trade-stock', methods=['POST'])
def trade_stock():
	trade_data = json.loads(request.data)
	share_number = trade_data["share_number"]
	target_price = trade_data["target_price"]
	comp_name = trade_data["comp_name"]
	user_uid = trade_data["user_uid"]

	current_time = time.time()
	index_lst = int(int((current_time-start_time))/86400)
	index_tmp = int(current_time-start_time-index_lst*86400)
	if index_tmp <= 36000:
		current_price = price_list[comp_name][index_lst][index_tmp]
	else:
		if index_tmp > 36000 and index_tmp <= 86400:
			current_price = round(price_list[comp_name][index_lst][-1], 2)

		else:
			current_price = round(price_list[comp_name][index_lst][-1], 2)

	if target_price == 0:
		target_price = current_price
		response = house.trade_stock(user_uid, share_number, target_price, comp_name)
		if response == "Invalid 1":
			return "You do not owe enough shares of this stock.", 401
		elif response == "Invalid 2":
			return "You do not have enough money for this trade", 402
		elif response == "Invalid 3":
			return "Currently no shares available for trade. Your transaction will enter the pending state.", 403
		else:
			company_list = user_database_commands.get_comp_holding_list(user_uid)
			current_prices = get_current_prices(company_list)
			portfolio = user_database_commands.get_portfolio_info(
				user_uid, current_prices)
			return jsonify(portfolio)
	else:
		response = house.put_order(user_uid, share_number, target_price, comp_name)
		if response == "Invalid 1":
			return "You do not owe enough shares of this stock.", 401
		elif response == "Invalid 2":
			return "You do not have enough money for this trade", 402
		elif response == "Invalid 3":
			return "Currently no shares available for trade. Your transaction will enter the pending state.", 403
		else:
			return "0"

@app.route('/cancel-order', methods=['POST'])
def cancel_order():
	order_id = json.loads(request.data)
	house.cancel_order(order_id)
	return "Order canceled."

@app.route('/portfolio-detail', methods=['POST'])
def portfolio_detail():
	user_uid = json.loads(request.data)
	company_list = user_database_commands.get_comp_holding_list(user_uid)
	current_prices = get_current_prices(company_list)
	portfolio = user_database_commands.get_portfolio_info(
		user_uid, current_prices)
	return jsonify(portfolio)


@app.route('/show-ranking', methods=['POST'])
def show_ranking():
	user_uid = json.loads(request.data)
	rank = user_database_commands.get_rank_user(user_uid)
	return str(rank)


@app.route('/total-rank', methods=['POST'])
def total_rank():
	user_rank = user_database_commands.get_total_rank()
	return user_rank

@app.route('/current-all-prices', methods=["POST"])
def current_all_prices():
	current_time = time.time()
	index_lst = int(int((current_time-start_time))/86400)
	index_tmp = int(current_time-start_time-index_lst*86400)
	if index_tmp <= 36000:
		current_price_dict = {}
		for key in price_list:
			open_price = price_list[key][index_lst][0]
			change = round(
				(price_list[key][index_lst][index_tmp] - open_price), 2)
			pct_change = round(
				(price_list[key][index_lst][index_tmp] - open_price) / open_price * 100, 2)
			current_price = price_list[key][index_lst][index_tmp]
			current_price_dict[key] = {"price":  round(
				current_price, 2), "change": change, "pct_change": pct_change}
		return jsonify(current_price_dict)
	elif index_tmp > 36000 and index_tmp <= 86400:
		current_price_dict = {}
		for key in price_list:
			final_price = price_list[key][index_lst][-1]
			current_price_dict[key] = {"price":  round(
				final_price, 2), "change": "N/A", "pct_change": "Market Closed"}
		return jsonify(current_price_dict)


@app.route('/current-price', methods=['POST'])
def current_price():
	current_time = time.time()
	index_lst = int(int((current_time-start_time))/86400)
	index_tmp = int(current_time-start_time-index_lst*86400)
	comp_name = json.loads(request.data)
	if index_tmp <= 36000:
		current_price = price_list[comp_name][index_lst][index_tmp]
		return {"price": round(current_price, 2)}
	else:
		if index_tmp > 36000 and index_tmp <= 86400:
			return {"price": round(price_list[comp_name][index_lst][-1], 2)}

		else:
			last_price = round(price_list[comp_name][index_lst][-1], 2)
			return {"price": last_price}


@app.route('/tick-graph', methods=["POST"])
def tick_graph():
	current_time = time.time()
	index_lst = int(int((current_time-start_time))/86400)
	comp_name = json.loads(request.data)
	index_tmp = int(current_time-start_time-index_lst*86400)
	if index_tmp <= 36000:
		tick_price_graph = []
		for index in range(index_tmp):
			if index % (300) == 0 and index != 36000 and index != 0:
				tick_price_graph.append({"time": (
					index+start_time+(index_lst)*(86400)-5*60*60), "value": round(price_list[comp_name][index_lst][index], 2)})
		if tick_price_graph == []:
			tick_price_graph.append({"time": 0, "value": 0})
		return jsonify(tick_price_graph)
	else:
		tick_price_graph = []
		for index in range(36000):
			if index % (300) == 0 and index != 36000 and index != 0:
				tick_price_graph.append({"time": (
					index+start_time+(index_lst)*(86400)-5*60*60), "value": round(price_list[comp_name][index_lst][index], 2)})
		return jsonify(tick_price_graph)

@app.route('/day-graph', methods=["POST"])
def day_graph():
	current_time = time.time()
	index_lst = int(int((current_time-start_time))/86400)
	comp_name = json.loads(request.data)
	graph_lst = []

	for index in range(index_lst):
		high = round(max(price_list[comp_name][index]), 2)
		low = round(min(price_list[comp_name][index]), 2)
		open_p = round(price_list[comp_name][index][0], 2)
		close_p = round(price_list[comp_name][index][-1], 2)
		dt_object = datetime.datetime.fromtimestamp(start_time+index*86400)
		month = dt_object.month
		day = dt_object.day
		date = f"{day}/{month}/2073"
		graph_lst.append([date, open_p, close_p, low, high])
	return jsonify(graph_lst)

@app.route('/hour-graph', methods=["POST"])
def hour_graph():
	current_time = time.time()
	index_lst = int(int((current_time-start_time))/86400)
	comp_name = json.loads(request.data)
	graph_lst = []

	for index in range(index_lst):
		for inx in range(len(price_list[comp_name][index])+1):
			if inx % 3600 == 0 and inx != 36000 and inx != 0:
				price_chunk = price_list[comp_name][index][int(
					inx):int(inx+3600)]
				high = round(max(price_chunk), 2)
				low = round(min(price_chunk), 2)
				open_p = round(price_chunk[0], 2)
				close_p = round(price_chunk[-1], 2)
				timestamp = start_time + (index)*60*60*24 + inx
				dt_object = datetime.datetime.fromtimestamp(timestamp)
				date = f"{dt_object.day}/{dt_object.month} {dt_object.time()}"
				graph_lst.append([date, open_p, close_p, low, high])
	return jsonify(graph_lst)


@app.route('/tick-graphs', methods=["POST"])
def tick_graphs():
	current_time = time.time()
	index_lst = int(int((current_time-start_time))/86400)
	index_tmp = int(current_time-start_time-index_lst*86400)
	if index_tmp <= 36000:
		graphs = {}
		for key in price_list:
			tick_price_graph = []
			for index in range(index_tmp):
				if index % (300) == 0 and index != 36000 and index != 0:
					tick_price_graph.append(
						{"time": (index+start_time+(index_lst)*(86400)-5*60*60), "value": round(price_list[key][index_lst][index], 2)})
			graphs[key] = tick_price_graph
		return jsonify(graphs)
	else:
		graphs = {}
		for key in price_list:
			tick_price_graph = []
			for index in range(36000):
				if index % (300) == 0 and index != 36000 and index != 0:
					tick_price_graph.append(
						{"time": (index+start_time+(index_lst)*(86400)-5*60*60), "value": round(price_list[key][index_lst][index], 2)})
			graphs[key] = tick_price_graph
		return jsonify(graphs)

@app.route('/is-end-game', methods=['POST'])
def is_end_game():
	current_time = time.time()
	if current_time >= end_time:
		return str(0) #True
	else:
		return str(1) #False

@app.route('/end-all-prices', methods=["POST"])
def end_all_prices():
	price_dict = {}
	for key in price_list:
			change = round(
				(price_list[key][-1][-1] - price_list[key][0][0]), 1)
			pct_change = round(
				(price_list[key][-1][-1] - price_list[key][0][0]) / price_list[key][0][0] * 100, 1)
			price_dict[key] = {"price":  round(
				price_list[key][-1][-1], 2), "change": change, "pct_change": pct_change}
	return jsonify(price_dict)


@app.route('/end-season-index-graph', methods=["POST"])
def end_season_index_graph():
	graph_lst = []
	for index in range(len(price_list["index"])):
		high = round(max(price_list["index"][index]))
		low = round(min(price_list["index"][index]))
		open_p = round(price_list["index"][index][0])
		close_p = round(price_list["index"][index][-1])
		if index > (31-int(start_date.day)):
			month = int(start_date.month) + 1
			day = index - ((31-int(start_date.day)))
			month = f"{month:02d}"
			day = f"{day:02d}"
			date = f"{day}/{month}/2073"
		else:
			month = int(start_date.month)
			day = int(start_date.day) + index
			month = f"{month:02d}"
			day = f"{day:02d}"
			date = f"{day}/{month}/2073"
		graph_lst.append([date, open_p, close_p, low, high])
	return jsonify(graph_lst)

@app.route('/send-message', methods=['POST'])
def send_message():
	"""
			message = {
					"section": "main",
					"name": "Avril",
					"text": "Hello world"
			}
	"""
	data = json.loads(request.data)
	uid = uuid.uuid4()
	dateTimeObj = datetime.now()
	chat_storeage[data["section"]][str(uid)] = {
		"name": data["name"],
		"text": data["text"],
		"timestamp": dateTimeObj,
		"uid": uid
	}

	return jsonify(chat_storeage[data["section"]][str(uid)])


@app.route('/get-message', methods=['POST'])
def get_message():
	section = json.loads(request.data)
	section_message = chat_storeage[section]
	section_message_lst = list(section_message.items())
	message_lst = []
	if len(section_message_lst) < 50:
		for index in range(len(section_message_lst)):
			message_lst.append({
				"timestamp": section_message_lst[index][1]["timestamp"],
				"name": section_message_lst[index][1]["name"],
				"text": section_message_lst[index][1]["text"],
				"uid": section_message_lst[index][1]["uid"]
			})
	else:
		for index in range(50):
			message_lst.append({
				"timestamp": section_message_lst[-index][1]["timestamp"],
				"name": section_message_lst[-index][1]["name"],
				"text": section_message_lst[-index][1]["text"],
				"uid": section_message_lst[index][1]["uid"]
			})
	return jsonify(list(message_lst))

if __name__ == '__main__':
	app.run()
    # app.run(host="localhost", port=5000)