import json
from flask_httpauth import HTTPBasicAuth
from flask import Flask, request, jsonify, request
import pyrebase
from Model.modified_wave import DayPriceGenerator
from Model.modified_wave import MidPriceGenerator
from Model.modified_wave import WaveModifier
from Model.modified_wave import StockSimulator
from Model.get_parameters import WRKN_macro, WRKN_micro, JKY_macro, JKY_micro, AST_macro, AST_micro, DSC_macro, DSC_micro, FSIN_macro, FSIN_micro, HHW_macro, HHW_micro, SGO_macro, SGO_micro
from User.user import UserPortfolio
import time
import numpy as np
from flask_cors import CORS
import uuid
from datetime import datetime
from functools import reduce
import operator

seconds = time.time()
start_time = 1669816866.243045
## Set up the price list by calling the class StockSimulator#####
parameters = {
    "ast": {
        "national_positive_policy": {
            "macro": AST_macro['national_positive_policy'](),
            "micro": AST_micro['national_positive_policy']
        }
    },
    "dsc": {
        "acquisition": {
            "macro": DSC_macro["acquisition"](),
            "micro": DSC_micro["acquisition"],
        }
    },
    "fsin": {
        "advertisement": {
            "macro": FSIN_macro["advertisement"](),
            "micro": FSIN_micro["advertisement"]
        }
    },
    "hhw": {
        "pandemic_lockdown": {
            "macro": HHW_macro["pandemic_lockdown"](),
            "micro": HHW_micro["pandemic_lockdown"]
        }
    },
    "jky": {
        "mortage_survival": {
            "macro": JKY_macro["mortage_survival"](),
            "micro": JKY_micro["mortage_survival"]
        }
    },
    "sgo": {
        "new_competition": {
            "macro": SGO_macro["new_competition"](),
            "micro": SGO_micro["new_competition"]
        }
    },
    "wrkn": {
        "IPO": {
            "macro": WRKN_macro["IPO"](),
            "micro": WRKN_micro["IPO"]
        }
    }
}


day_price_list = {
}


adjusted_factor = {
}

price_list = {
    "ast": [],
    "dsc": [],
    "fsin": [],
    "hhw": [],
    "jky": [],
    "sgo": [],
    "wrkn": []
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

flat_price = {
    "ast": None,
    "dsc": None,
    "fsin": None,
    "hhw": None,
    "jky": None,
    "sgo": None,
    "wrkn": None
}

tick_price_graph = {
    "ast": [],
    "dsc": [],
    "fsin": [],
    "hhw": [],
    "jky": [],
    "sgo": [],
    "wrkn": []
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

config = {
    "apiKey": "AIzaSyBkqCpt7urvGI7bnDrB7J0Yw9Rq2tfZywI",
    "authDomain": "aspect-user-auth.firebaseapp.com",
    "databaseURL":  "https://aspect-user-auth-default-rtdb.firebaseio.com/",
    "storageBucket": "aspect-user-auth.appspot.com",
}

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
db = firebase.database()

person = {"is_logged_in": False, "user_name": "", "user_email": "", "user_uid": "", "portfolio": None}

### Set up some maps for data storage ############################

user_rank = {}

current_price_dict = {
    "wrkn": None
}

price_history_dict = {
    "wrkn": None
}


@app.route('/')
def home():  # At the same home function as before
    return app.send_static_file('index.html')

@app.route("/result", methods = ["POST", "GET"])
def result():
    if request.method == "POST":        #Only if data has been posted
        result = json.loads(request.data)           #Get the data
        email = result["user_email"]
        password = result["password"]
        try:
            #Try signing in the user with the given information
            user = auth.sign_in_with_email_and_password(email, password)
            #Insert the user data in the global person
            global person
            person["is_logged_in"] = True
            person["user_email"] = user["email"]
            person["user_uid"] = user["localId"]
            data = db.child("users").get()
            person["user_name"] = data.val()[person["user_uid"]]["user_name"]
            return "valid"
        except:
            pass
    else:
        if person["is_logged_in"] == True:
            return "valid"

@app.route("/register", methods = ["POST", "GET"])
def register():
    if request.method == "POST":
        result =  json.loads(request.data)
        email = result["user_email"]
        password = result["password"]
        name = result["user_name"]

        auth.create_user_with_email_and_password(email, password)
        user = auth.sign_in_with_email_and_password(email, password)
        global person
        person["is_logged_in"] = True
        person["user_email"] = user["email"]
        person["user_uid"] = user["localId"]
        person["user_name"] = name
        global user_object
        user_object = UserPortfolio(name)
        initialized_portfolio = user_object.initialize_portfolio()
        person["portfolio"] = user_object.initialize_portfolio()
        db.child("users").child(person["user_uid"]).set(initialized_portfolio)
        return "valid"

    else:
        if person["is_logged_in"] == True:
            return "valid"

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
    share_number = trade_data["share_number"]
    target_price = trade_data["target_price"]
    comp_name = trade_data["comp_name"]

    current_time = time.time()
    index_lst = int((current_time-start_time)/3600)
    index_tmp = int(current_time-start_time)%3600
    current_price = price_list[comp_name][index_lst][index_tmp]

    response = user_object.trade_stock(
        comp_name, share_number, target_price, current_price)

    if response == "Invalid 1":
        return "You do not owe enough shares of this stock.", 401
    elif response == "Invalid 2":
        return "You do not have enough money for this trade", 402
    elif response == "Invalid 3":
        return "Currently no shares available for trade. Your transaction will enter the pending state.", 403
    else:
        db.child("users").child(person["user_uid"]).set(response)
        return str(response)

@app.route('/portfolio-detail', methods=['POST'])
def portfolio_detail():
    fetched_data = db.child("users").child(person["user_uid"]).get()
    data = dict(fetched_data.val())
    return jsonify(data)

@app.route('/update-value', methods=['POST'])
def update_value():
    input = json.loads(request.data)
    fetched_data = db.child("users").child(person["user_uid"]).get()
    data = dict(fetched_data.val())
    fetched_data = db.child("users").child(person["user_uid"]).get()
    data = dict(fetched_data.val())
    if len(data) > 1:
        portfolio = user_object.update_value(input["name_price_dict"])
        db.child("users").child(person["user_uid"]).set(portfolio)
        return(portfolio)
    else:
        return(data)


@app.route('/show-ranking', methods=['POST'])
def show_ranking():
    values = db.child("users").get()
    data = dict(values.val())
    portfolio_value = {}
    for key in data:
        portfolio_value[key] = data[key]["portfolio_value"]["accountValue"]
    user_rank = {k: v for k, v in sorted(
        portfolio_value.items(), key=lambda item: item[1])}
    rank = len(user_rank)-list(user_rank.keys()).index(person["user_uid"])
    return str(rank)

@app.route('/total-rank', methods=['POST'])
def total_rank():
    values = db.child("users").get()
    data = dict(values.val())
    portfolio_value = {}
    for key in data:
        portfolio_value[key] = data[key]["portfolio_value"]["accountValue"]
    user_rank = {k: v for k, v in sorted(
        portfolio_value.items(), key=lambda item: item[1])}
    return str(user_rank)

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

@app.route('/set-price', methods=["POST"])
def set_price():
    data = json.loads(request.data)
    mid_term_params = data["mid_term_events"]
    base_event_params = data["base_event"]
    day_price_generator = DayPriceGenerator(parameters[data["comp_name"]][base_event_params["name"]]["macro"])
    day_price_list[data["comp_name"]] = day_price_generator.price_loop()
    adjusted_factor[data["comp_name"]] = data["adjust_factor"]/day_price_list[data["comp_name"]][1]
    MidPrice = MidPriceGenerator(mid_term_params["start_date"], mid_term_params["end_date"], [mid_term_params["symbol"]], mid_term_params["ma_days"])
    mid_price = MidPrice.generate_mid_price()
    length = min(mid_term_params['duration'], base_event_params['duration'])
    wave_1 = {
        'price_list': day_price_list[data["comp_name"]],
        'start_point': base_event_params["start_point"],
        'duration': length,
        'weight': base_event_params["weight"],
        'intensity_factor': base_event_params["intensity_factor"]
    }

    wave_2 = {
        'price_list': mid_price,
        'start_point': mid_term_params["start_point"],
        'duration': length,
        'weight': mid_term_params["weight"],
        'intensity_factor': mid_term_params["intensity_factor"]
    }

    Combinator = WaveModifier()
    combinated_price = Combinator.price_wave_addition(data["transformation"], data["intensity"], length, wave_1, wave_2)

    final_price_list = []
    for index in range(len(combinated_price)):
        if index > 0:
            price_generator = StockSimulator(adjusted_factor[data["comp_name"]], combinated_price[index], combinated_price, index, parameters[data["comp_name"]][base_event_params["name"]]["micro"])
            result_price = price_generator.generate_price()
            final_price_list.append(result_price)
            
    user_interaction_modifier = []
    for index in range(len(final_price_list)):
        interaction_small_lst = []
        for inx in range(len(final_price_list[index])):
            random_modifier = np.random.normal(0, 0.007)
            interaction_small_lst.append(random_modifier)
        user_interaction_modifier.append(interaction_small_lst)

    final_price_list = np.add(user_interaction_modifier, final_price_list)
    price_list[data["comp_name"]] = final_price_list
    flat_price[data["comp_name"]] = reduce(operator.concat, price_list[data["comp_name"]].tolist())
    return (str(final_price_list))

# ROUTE 1: Need a function to serve the value of a stock at any PoT    -> Name of stock + POT -> Long
@app.route('/current-price', methods=['POST'])
def current_price():
    current_time = time.time()
    index_lst = int((current_time-start_time)/3600)
    index_tmp = int(current_time-start_time)%3600
    comp_name = json.loads(request.data)
    current_price = price_list[comp_name][index_lst][index_tmp]
    # if index_tmp % 15 == 0:
    tick_price_graph[comp_name].append({"time": current_time, "value": round(current_price, 2)})
    return {"price": round(current_price, 2)}

@app.route('/current-all-prices', methods=['POST'])
def all_current_price():
    for comp_name in price_list:
        current_time = time.time()
        index_lst = int((current_time-start_time)/3600)
        index_tmp = int(current_time-start_time)%3600
        current_price = price_list[comp_name][index_lst][index_tmp]
        current_prices[comp_name] = round(current_price, 2)
        tick_price_graph[comp_name].append({"time": current_time, "value": round(current_price, 2)})
    return current_prices

# ROUTE 2: Need a function to give you the entire history of a stock.   -> name of stock -> Array(Long)
@app.route('/price-history', methods=['POST'])
def price_history():
    comp_name = json.loads(request.data)
    second_price_lst = tick_price_graph[comp_name]

    return str(second_price_lst)

@app.route('/tick-graph', methods=["POST"])
def tick_graph():
    comp_name = json.loads(request.data)
    current_time = time.time()
    index_tmp = int(current_time-start_time)

    for index in range(len(flat_price[comp_name][:index_tmp])):
        if index % (5*60) == 0:
            tick_price_graph[comp_name].append({"time": (index+start_time), "value": round(flat_price[comp_name][index], 2)})
    return jsonify(tick_price_graph[comp_name])

app.run(host="localhost", port=5000, debug=True)