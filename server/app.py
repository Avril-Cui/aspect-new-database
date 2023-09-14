#import dependencies & functions
from User.user_database import UserDatabaseCommands
from House.auction_house import AuctionHouse
from Function.database import db
from Function.helper import helper
import time
from datetime import datetime
import json
from flask import Flask, request, jsonify, request
import pyrebase
from flask_cors import CORS, cross_origin
from itertools import accumulate
from functools import reduce
import operator

#initialize timeframe
seconds = time.time()
start_time = time.time() - 60*60*24*10 - 60*60*2
end_time = start_time + (60*60*24)*29 + 36000
start_date = datetime.now()

#initialize database, tables, and house&user classes
conn, cur = db.initialize_connection()
house = AuctionHouse(conn, cur)
house.create_order_table()
house.create_bot_table()
house.create_bot_portfolio_table()
house.create_bot_trade_history_table()
house.create_bot_order_table()
user_database_commands = UserDatabaseCommands(conn, cur)
# user_database_commands.create_user_table()
# user_database_commands.create_portfolio_table()
# user_database_commands.create_trade_history_table()

#initialize company prices
company_names = ["ast", "dsc", "fsin", "hhw", "jky", "sgo", "wrkn", "index"]
price_list = {}
flat_price = {}
for company in company_names:
	price_data = db.get_price_from_database(company, cur)
	price_list[company] = [price_data[x - y: x] for x, y in zip(
		accumulate([36000 for _ in range(len(price_data)//36000)]), [36000 for i in range(len(price_data)//36000)])]
	flat_price[company] = reduce(operator.concat, price_list[company])

#set configuration for flask server and firebase auth
app = Flask(__name__)
CORS(app)
app.config["CORS_ORIGINS"] = ["https://aspect-game.com",
							  "http://localhost:8080", "http://127.0.0.1:5000", "http://localhost:3000"]
app.config['JSON_SORT_KEYS'] = False
config = {
	"apiKey": "AIzaSyAHY-ZeX87ObL6y3y_2n76GLNxU-24hHs0",
	"authDomain": "aspect-fb6c9.firebaseapp.com",
	"databaseURL":  "https://aspect-fb6c9-default-rtdb.firebaseio.com/",
	"storageBucket": "aspect-fb6c9.appspot.com",
}
firebase = pyrebase.initialize_app(config)
auth = firebase.auth()

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

@app.route('/user-accept-order', methods=['POST'])
def user_accept_order():
	data = json.loads(request.data)
	price = float(data["price"])
	shares_number = float(data["shares_number"])
	available_shares = float(data["available_shares"])
	action = data["action"]
	company = data["company"]
	user_uid = data["user_uid"]
	response = house.accept_order(price, shares_number, available_shares, action, user_uid, company)
	if response == "Invalid 1":
		return "You do not owe enough shares of this stock.", 401
	elif response == "Invalid 2":
		return "You do not have enough money for this trade", 402
	elif response == "Invalid 3":
		return "Currently no shares available for trade. Enter less shares.", 403
	else:
		return "Order accepted!"

@app.route('/bot-actions', methods=['POST'])
def bot_actions():
	action = json.loads(request.data)
	current_time = time.time()
	index_lst = int(int((current_time-start_time))/86400)
	index_tmp = int(current_time-start_time-index_lst*86400)
	if index_tmp <= 36000:
		current_price = {
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
			"ast":round(price_list["ast"][index_lst][-1], 2),
			"dsc": round(price_list["dsc"][index_lst][-1], 2),
			"fsin": round(price_list["fsin"][index_lst][-1], 2),
			"hhw": round(price_list["hhw"][index_lst][-1], 2),
			"jky": round(price_list["jky"][index_lst][-1], 2),
			"sgo": round(price_list["sgo"][index_lst][-1], 2),
			"wrkn": round(price_list["wrkn"][index_lst][-1], 2)
		}
	
	house.bot_actions(action, current_price)
	# if response == "Invalid 1":
	# 		return "Bot do not owe enough shares of this stock.", 401
	# elif response == "Invalid 2":
	# 	return "Bot do not have enough money for this trade", 402
	# elif response == "Invalid 3":
	# 	return "Currently no shares available for trade. Bot's transaction will enter the pending state.", 403
	# else:
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
			return "You do not have enough money for this trade.", 403
		else:
			company_list = user_database_commands.get_comp_holding_list(user_uid)
			current_prices = helper.get_current_prices(company_list,start_time, price_list)
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
			return "Currently no shares available for trade. Your transaction will enter the pending state.", 404
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
	current_prices = helper.get_current_prices(company_list, start_time, price_list)
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
		dt_object = datetime.fromtimestamp(start_time+index*86400)
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
				dt_object = datetime.fromtimestamp(timestamp)
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

@cross_origin()
@app.route('/end-season-user-data', methods=['POST'])
def end_season_user_data():
	user_uid = json.loads(request.data)
	rank = user_database_commands.get_rank_user(user_uid)
	cash_value = user_database_commands.get_user_cash(user_uid)
	result = {
		"rank": rank,
		"cash": float(cash_value),
		"pct_change": float((cash_value-100000)/100000 * 100 )
	}
	return jsonify(result)

@cross_origin()
@app.route('/fifteen-rank', methods=['POST'])
def fifteen_rank():
	user_rank = user_database_commands.get_fifteen_rank()
	return user_rank

@cross_origin()
@app.route('/total-bot-rank', methods=['POST'])
def total_bot_rank():
	bot_rank = house.get_total_bot_rank()
	return bot_rank

@app.route('/is-end-game', methods=['POST'])
def is_end_game():
	return "1"

@app.route('/end-game-index-chart', methods=['POST'])
def end_game_index_chart():
	graph_lst = []
	for index in range((len(price_list["index"])-30), len(price_list["index"])):
		high = round(max(price_list["index"][index]), 2)
		low = round(min(price_list["index"][index]), 2)
		open_p = round(price_list["index"][index][0], 2)
		close_p = round(price_list["index"][index][-1], 2)
		dt_object = datetime.fromtimestamp(start_time+index*86400)
		month = dt_object.month
		day = dt_object.day
		date = f"{day}/{month}/2073"
		graph_lst.append([date, open_p, close_p, low, high])
	return jsonify(graph_lst)

@app.route('/end-game-companies-chart', methods=['POST'])
def end_game_companies_chart():
	comp_name = json.loads(request.data)
	graph_lst = []
	for index in range(len(price_list[comp_name])-30, len(price_list[comp_name])):
		high = round(max(price_list[comp_name][index]), 2)
		low = round(min(price_list[comp_name][index]), 2)
		open_p = round(price_list[comp_name][index][0], 2)
		close_p = round(price_list[comp_name][index][-1], 2)
		dt_object = datetime.fromtimestamp(start_time+index*86400)
		month = dt_object.month
		day = dt_object.day
		date = f"{day}/{month}/2073"
		graph_lst.append([date, open_p, close_p, low, high])
	print(len(graph_lst))
	return jsonify(graph_lst)

@app.route('/end-game-prices', methods=['POST'])
def end_game_prices():
	comp_price_data = {}
	for key in price_list:
		comp_price_data[key] = {
			"end_price": price_list[key][-1][-1],
			"pct_change": (price_list[key][-1][-1] - price_list[key][0][0]) / price_list[key][0][0]
		}
	return comp_price_data

if __name__ == '__main__':
	app.run(debug=True, host="localhost", port="5000")
    # app.run(host="localhost", port=5000)