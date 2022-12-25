import pyrebase
config = {
    "apiKey": "AIzaSyAHY-ZeX87ObL6y3y_2n76GLNxU-24hHs0",
    "authDomain": "aspect-fb6c9.firebaseapp.com",
    "databaseURL":  "https://aspect-fb6c9-default-rtdb.firebaseio.com/",
    "storageBucket": "aspect-fb6c9.appspot.com",
}

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
db = firebase.database()