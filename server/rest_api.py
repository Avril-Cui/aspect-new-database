import json
from flask import Flask, request, jsonify, request
import pyrebase
from User.user_database import UserDatabaseCommands
import time
import numpy as np
from flask_cors import CORS
import uuid
from datetime import datetime
from Model.prepare_prices import index_price, ast_price, dsc_price, fsin_price, hhw_price, jky_price, sgo_price, wrkn_price
from itertools import accumulate
from functools import reduce
import operator

seconds = time.time()
start_time = 1673121765.960407 - 60*60*6
end_time = start_time + (60*60*24)*27 + 60*60*8
index_lst = 0

price_list = {
	"index": [index_price[x - y: x] for x, y in zip(
		accumulate([28800 for _ in range(len(index_price)//28800)]), [28800 for i in range(len(index_price)//28800)])],
	"ast": [ast_price[x - y: x] for x, y in zip(
		accumulate([28800 for _ in range(len(ast_price)//28800)]), [28800 for i in range(len(ast_price)//28800)])],
	"dsc": [dsc_price[x - y: x] for x, y in zip(
		accumulate([28800 for _ in range(len(dsc_price)//28800)]), [28800 for i in range(len(dsc_price)//28800)])],
	"fsin": [fsin_price[x - y: x] for x, y in zip(
		accumulate([28800 for _ in range(len(fsin_price)//28800)]), [28800 for i in range(len(fsin_price)//28800)])],
	"hhw": [hhw_price[x - y: x] for x, y in zip(
		accumulate([28800 for _ in range(len(hhw_price)//28800)]), [28800 for i in range(len(hhw_price)//28800)])],
	"jky": [jky_price[x - y: x] for x, y in zip(
		accumulate([28800 for _ in range(len(jky_price)//28800)]), [28800 for i in range(len(jky_price)//28800)])],
	"sgo": [sgo_price[x - y: x] for x, y in zip(
		accumulate([28800 for _ in range(len(sgo_price)//28800)]), [28800 for i in range(len(sgo_price)//28800)])],
	"wrkn": [wrkn_price[x - y: x] for x, y in zip(
		accumulate([28800 for _ in range(len(wrkn_price)//28800)]), [28800 for i in range(len(wrkn_price)//28800)])],
}

flat_price = {
	"ast": reduce(operator.concat, price_list["ast"]),
	"dsc": reduce(operator.concat, price_list["dsc"]),
	"fsin": reduce(operator.concat, price_list["fsin"]),
	"hhw": reduce(operator.concat, price_list["hhw"]),
	"jky": reduce(operator.concat, price_list["jky"]),
	"sgo": reduce(operator.concat, price_list["sgo"]),
	"wrkn":reduce(operator.concat, price_list["wrkn"]),
}
current_prices = {
	"ast": None,
	"dsc": None,
	"fsin": None,
	"hhw": None,
	"jky": None,
	"sgo": None,
	"wrkn": None
}

def get_current_prices(company_list):
	current_time = time.time()
	index_lst = int(int((current_time-start_time))/28800)
	index_tmp = int((current_time-start_time))%28800
	current_prices = {}
	for company in company_list:
		current_prices[company] = price_list[company][index_lst][index_tmp]
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
app.config["CORS_ORIGINS"] = ["https://aspect.com",
							  "http://localhost:8080", "http://127.0.0.1:5000/"]
config = {
	"apiKey": "AIzaSyAHY-ZeX87ObL6y3y_2n76GLNxU-24hHs0",
	"authDomain": "aspect-fb6c9.firebaseapp.com",
	"databaseURL":  "https://aspect-fb6c9-default-rtdb.firebaseio.com/",
	"storageBucket": "aspect-fb6c9.appspot.com",
}

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()

event = None

@app.route('/')
def home():
	return app.send_static_file('index.html')

@app.route("/result", methods = ["POST", "GET"])
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

@app.route("/register", methods = ["POST", "GET"])
def register():
	if request.method == "POST":
		data = json.loads(request.data)
		email = data["user_email"]
		password = data["password"]
		name = data["user_name"]

		try:
			auth.create_user_with_email_and_password(email, password)
			user = auth.sign_in_with_email_and_password(email, password)
			UserDatabaseCommands.intialize_user(user["localId"], name)
			return user["localId"]
		except:
			return "Invalid user request", 401

@app.route('/is-end-game', methods=['POST'])
def is_end_game():
	current_time = time.time()
	if current_time >= end_time:
		return str(0) #True
	else:
		return str(1) #False

@app.route('/trade-stock', methods=['POST'])
def trade_stock():
	trade_data = json.loads(request.data)
	share_number = trade_data["share_number"]
	target_price = trade_data["target_price"]
	comp_name = trade_data["comp_name"]
	user_uid = trade_data["user_uid"]

	current_time = time.time()
	index_lst = int(int((current_time-start_time))/28800)
	index_tmp = int((current_time-start_time))%28800
	current_price = price_list[comp_name][index_lst][index_tmp]
	if target_price == 0:
		target_price = current_price
	response = UserDatabaseCommands.trade_stock(user_uid, share_number, target_price, current_price, comp_name)

	if response == "Invalid 1":
		return "You do not owe enough shares of this stock.", 401
	elif response == "Invalid 2":
		return "You do not have enough money for this trade", 402
	elif response == "Invalid 3":
		return "Currently no shares available for trade. Your transaction will enter the pending state.", 403
	else:
		company_list = UserDatabaseCommands.get_comp_holding_list(user_uid)
		current_prices = get_current_prices(company_list)
		portfolio = UserDatabaseCommands.get_portfolio_info(user_uid, current_prices)
		return jsonify(portfolio)

@app.route('/portfolio-detail', methods=['POST'])
def portfolio_detail():
	user_uid = json.loads(request.data)
	company_list = UserDatabaseCommands.get_comp_holding_list(user_uid)
	current_prices = get_current_prices(company_list)
	portfolio = UserDatabaseCommands.get_portfolio_info(user_uid, current_prices)
	return jsonify(portfolio)

@app.route('/show-ranking', methods=['POST'])
def show_ranking():
	user_uid = json.loads(request.data)
	rank = UserDatabaseCommands.get_rank_user(user_uid)
	return str(rank)

@app.route('/total-rank', methods=['GET'])
def total_rank():
	user_rank = UserDatabaseCommands.get_total_rank()
	return str(user_rank)

@app.route('/current-all-prices', methods=["POST"])
def current_all_prices():
	current_time = time.time()
	index_tmp = int((current_time-start_time) - index_lst * 28800 - index_lst * 60*60*(24-8))
	if index_tmp <= 28800:
		current_price_dict = {}
		for key in price_list:
			open_price = price_list[key][index_lst][0]
			change = round((price_list[key][index_lst][index_tmp] - open_price),2)
			pct_change = round((price_list[key][index_lst][index_tmp] - open_price) /open_price * 100,2)
			current_price = price_list[key][index_lst][index_tmp]
			current_price_dict[key] = {"price":  round(current_price, 2), "change": change, "pct_change": pct_change}
		return jsonify(current_price_dict)
	elif index_tmp > 28800 and index_tmp < 60*60*24:
		current_price_dict = {}
		for key in price_list:
			final_price = price_list[key][index_lst][-1]
			current_price_dict[key] = {"price":  round(final_price, 2), "change": "N/A", "pct_change": "N/A"}
		return jsonify(current_price_dict)

	else:
		current_price_dict = {}
		for key in price_list:
			final_price = price_list[key][index_lst][-1]
			current_price_dict[key] = {"price":  round(final_price, 2), "change": "N/A", "pct_change": "N/A"}
		index_lst+=1
		return jsonify(current_price_dict)

@app.route('/current-price', methods=['POST'])
def current_price():
	current_time = time.time()
	index_tmp = int((current_time-start_time) - index_lst * 28800 - index_lst * 60*60*(24-8))
	comp_name = json.loads(request.data)
	if index_tmp <= 28800:
		current_price = price_list[comp_name][index_lst][index_tmp]
		return {"price": round(current_price, 2)}
	else:
		if index_tmp > 28800 and index_tmp < 60*60*24:
			return {"price": round(price_list[comp_name][index_lst][-1], 2)}
		
		else:
			last_price = round(price_list[comp_name][index_lst][-1], 2)
			index_lst+=1
			return {"price": last_price}

# @app.route('/price-history', methods=['POST'])
# def price_history():
# 	comp_name = json.loads(request.data)
# 	second_price_lst = tick_price_graph[comp_name]

# 	return str(second_price_lst)

@app.route('/tick-graph', methods=["POST"])
def tick_graph():
    comp_name = json.loads(request.data)
    current_time = time.time()
    index_tmp = int((current_time-start_time) - index_lst * 28800 - index_lst * 60*60*(24-8))
    if index_tmp <= 28800:
        tick_price_graph = []
        for index in range(index_tmp):
            if index % (300) == 0 and index!=28800 and index!=0:
                tick_price_graph.append({"time": (index+start_time), "value": round(price_list[comp_name][index_lst][index], 2)})
        return jsonify(tick_price_graph)
    else:
        tick_price_graph = []
        for index in range(28800):
            if index % (300) == 0 and index!=28800 and index!=0:
                tick_price_graph.append({"time": (index+start_time), "value": round(price_list[comp_name][index_lst][index], 2)})
        
        return jsonify(tick_price_graph)
        

@app.route('/set-end-season-info', methods=["POST"])
def set_end_season_info():
	"""
		{
			"event_name": "Metadefect Virus Attact",
			"highlight": ["Pandemic", "Market Crash", "IPO", "Short", "Long", "ESG", "Stability", "Value", "Growth"]
		}
	"""
	global end_season_info
	end_season_info = json.loads(request.data)
	return jsonify(end_season_info)

@app.route('/get-end-season-info', methods=["POST"])
def get_end_season_info():
	return jsonify(end_season_info)

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

app.run(port=5000, debug=True)