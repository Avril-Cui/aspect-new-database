import time
import datetime
t = 1673406000 - 60*60*24*3 - 60*60*14

dt_object = datetime.datetime.fromtimestamp(t)
date = f"{dt_object.day}/{dt_object.month} {dt_object.time()}"
print(date)