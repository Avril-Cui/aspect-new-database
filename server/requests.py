import json
from flask_httpauth import HTTPBasicAuth
from flask import Flask, request, jsonify
from Model.price_generator import DayPriceGenerator
from Model.price_generator import StockSimulator
from Model.get_parameters import Wakron_macro, Wakron_micro
from User.user import UserPortfolio
from werkzeug.security import generate_password_hash, check_password_hash
import time
import numpy as np
from flask_cors import CORS
import uuid
from datetime import datetime
seconds = time.time()
start_time = 1664844479.822779

## Set up the price list by calling the class StockSimulator#####
wrkn_macro_params = Wakron_macro["IPO"]()
wrkn_micro_params = Wakron_micro["IPO"]

wrkn_simulator = DayPriceGenerator(wrkn_macro_params)
day_price_list = {
    "wrkn": wrkn_simulator.price_loop()
}


adjusted_factor = {
    "wrkn": 50/day_price_list["wrkn"][1]
}

price_generator = StockSimulator(
    adjusted_factor["wrkn"], day_price_list["wrkn"][0], day_price_list["wrkn"], 1, wrkn_macro_params)
price_list = {
    "wrkn": price_generator.generate_price()
}
price_list_graph = {
    "wrkn": []
}

#################################################################

# Set up some default users by calling the class UserPortfolio
user_mapping = {
    "Avril": UserPortfolio("Avril"),
    "Daniel": UserPortfolio("Daniel")
}

#################################################################

# Set up some default users by calling the class UserPortfolio
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
            "text": "I love computers.",
            "timestamp": time.time()+6,
            "uid": "7777dd4a-7039-455f-bfa2-56dec9cace59"
        }

    },
    "fundamental": {},
    "quantitative": {},
    "technical": {}
}

##################################################################

# Start requests
app = Flask(__name__, static_url_path='')
CORS(app)
app.config["CORS_ORIGINS"] = ["https://aspect.com",
                              "http://localhost:8080", "http://127.0.0.1:5000/"]
auth = HTTPBasicAuth()

### Set up some maps for data storage ############################
users = {
    "Avril": generate_password_hash("Cui0717"),
    "Daniel": generate_password_hash("Dyelamos")
}

user_rank = {}

current_price_dict = {
    "wrkn": None
}

price_history_dict = {
    "wrkn": None
}

user_portfolio = {
    "Avril": user_mapping["Avril"].initialize_portfolio(),
    "Daniel": user_mapping["Daniel"].initialize_portfolio()
}

portfolio_value = dict()
for key in user_portfolio:
    portfolio_value[key] = user_portfolio[key]["portfolio_value"]["accountValue"]


#################################################################
def current_price_function(comp_name):
    current_time = time.time()
    index_tmp = int((int(current_time-start_time) % 3600)/2)
    if (int(current_time-start_time) >= 3600):
        try:
            index = int((current_time-start_time)/7200)
            price_generator = StockSimulator(adjusted_factor[comp_name], day_price_list[comp_name][(
                index)-1], day_price_list[comp_name], index, wrkn_macro_params)
            inner_tick_lst = price_generator.generate_price()

            price_list_graph[comp_name].append(inner_tick_lst[index_tmp])
            return round(inner_tick_lst[index_tmp], 2)
        except:
            return("FINISH")
    else:
        price_list_graph[comp_name].append(price_list[comp_name][index_tmp])
        return round(price_list[comp_name][index_tmp], 2)


def all_current_price_function():
    current_time = time.time()
    index_tmp = int((int(current_time-start_time) % 3600)/2)
    if (int(current_time-start_time) >= 3600):
        try:
            for key in current_price_dict:
                index = int((current_time-start_time)/7200)
                price_generator = StockSimulator(adjusted_factor[key], day_price_list[key][(
                    index)-1], day_price_list[key], index, wrkn_macro_params)
                inner_tick_lst = price_generator.generate_price()
                price_list_graph[key].append(inner_tick_lst[index_tmp])
                current_price_dict[key] = inner_tick_lst[index_tmp]
                return current_price_dict
        except:
            return("FINISH")
    else:
        for key in current_price_dict:
            price_list_graph[key].append(price_list[key][index_tmp])
            current_price_dict[key] = inner_tick_lst[index_tmp]
            return current_price_dict

#################################################################
# Routes


@app.route('/')
def home():  # At the same home function as before
    return app.send_static_file('index.html')


@auth.verify_password
def verify_password(username, password):
    if username in users and \
            check_password_hash(users.get(username), password):
        return username


# register a new user-account
@app.route('/login', methods=['POST'])
def post_password():
    data = json.loads(request.data)
    user_name = str(data["user_name"])
    if data["user_name"] in users and check_password_hash(users.get(data["user_name"]), data["password"]) == True:
        return ("Verified")
    elif data["user_name"] in users and check_password_hash(users.get(data["user_name"]), data["password"]) == False:
        return "Error in password", 400
    else:
        users[data["user_name"]] = generate_password_hash(data["password"])
        user_mapping[data["user_name"]] = UserPortfolio(data["user_name"])
        user_portfolio[data["user_name"]
                       ] = user_mapping[data["user_name"]].initialize_portfolio(),
        portfolio_value[data["user_name"]
                        ] = user_portfolio[user_name][0]["portfolio_value"]["accountValue"]
        return jsonify(portfolio_value)

# store message info for chat feature


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

# ROUTE 1: Need a function to serve the value of a stock at any PoT    -> Name of stock + POT -> Long


@app.route('/current-price', methods=['POST'])
def current_price():
    comp_name = json.loads(request.data)
    current_price = current_price_function(comp_name)
    if current_price == "FINISH":
        return current_price
    else:
        return {"price": round(current_price, 2)}


@app.route('/current-all-prices', methods=['POST'])
def all_current_price():
    current_price_dict = all_current_price_function()
    return current_price_dict


# ROUTE 2: Need a function to give you the entire history of a stock.   -> name of stock -> Array(Long)
@app.route('/price-history', methods=['POST'])
def price_history():
    comp_name = json.loads(request.data)
    second_price_lst = price_list_graph[comp_name]

    return str(second_price_lst)


# ROUTE 3: Need an operation to sell or buy stock.    -> name of stock, number of stock to buy -> Wallet delta
@app.route('/trade-stock', methods=['POST'])
# @auth.login_required
def trade_stock():
    """
        Payload Structure:
        {
            "user_name"
            "comp_name": string,
            "share_number": float,
            "target_price": float
        }
    """
    trade_data = json.loads(request.data)
    user_name = trade_data["user_name"]
    share_number = trade_data["share_number"]
    target_price = trade_data["target_price"]
    comp_name = trade_data["comp_name"]

    current_price = current_price_function(comp_name)
    # return(str(current_price))

    response = user_mapping[user_name].trade_stock(
        comp_name, share_number, target_price, current_price)

    if response == "Invalid 1":
        return "You do not owe enough shares of this stock.", 401
    elif response == "Invalid 2":
        return "You do not have enough money for this trade", 402
    elif response == "Invalid 3":
        return "Currently no shares available for trade. Your transaction will enter the pending state.", 403
    else:
        return str(user_portfolio[user_name])


@app.route('/portfolio-detail', methods=['POST'])
def portfolio_detail():
    user_name = json.loads(request.data)
    return jsonify(user_portfolio[user_name])


@app.route('/update-value', methods=['POST'])
def update_value():
    input = json.loads(request.data)
    if type(user_portfolio[input["user_name"]]) is tuple and len(user_portfolio[input["user_name"]][0]) > 1:
        portfolio = user_mapping[input["user_name"]
                                 ].update_value(input["name_price_dict"])
        return(jsonify(portfolio))
    elif type(user_portfolio[input["user_name"]]) is tuple:
        return(jsonify(user_portfolio[input["user_name"]][0]))
    else:
        return str(user_portfolio[input["user_name"]][0])


@app.route('/show-ranking', methods=['POST'])
def show_ranking():
    user_name = json.loads(request.data)
    user_rank = {k: v for k, v in sorted(
        portfolio_value.items(), key=lambda item: item[1])}
    rank = len(user_rank)-list(user_rank.keys()).index(user_name)
    return str(rank)


@app.route('/total-rank', methods=['POST'])
def total_rank():
    user_rank = {k: v for k, v in sorted(
        portfolio_value.items(), key=lambda item: item[1])}
    return str(user_rank)


# app.run()
app.run(host="localhost", port=5000)