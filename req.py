import pyrebase
config = {
    "apiKey": "AIzaSyBkqCpt7urvGI7bnDrB7J0Yw9Rq2tfZywI",
    "authDomain": "aspect-user-auth.firebaseapp.com",
    "databaseURL":  "https://aspect-user-auth-default-rtdb.firebaseio.com/",
    "storageBucket": "aspect-user-auth.appspot.com",
}

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
db = firebase.database()

portfolio_value = {'JYrUFo4wxvPmfbvWEiA8lAvr6nE3': 99667.49}
user_rank = {k: v for k, v in sorted(
    portfolio_value.items(), key=lambda item: item[1])}
rank = len(user_rank)-list(user_rank.keys()).index("JYrUFo4wxvPmfbvWEiA8lAvr6nE3")
db.child("users").child("bw6xQJIkmQMOFHhX1rVN2MzE50A3").child("wrkn").remove()