from email.mime import base
from wave_modification import DayPriceGenerator, StockSimulator
import pandas_datareader as web
import numpy as np
import matplotlib.pyplot as plt

######Testing new functions
from get_parameters import Wakron_macro, Wakron_micro

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
    adjusted_factor["wrkn"], day_price_list["wrkn"][0], day_price_list["wrkn"], 1, wrkn_micro_params)

base_price = price_generator.generate_base_price()

start_date = "1993/6/1"
# end_date = "1994/10/1"
end_date = "1994/1/1"
symbol = ['IBM']
index_data = web.get_data_yahoo(symbol, start_date, end_date)
index_price_df_2 = index_data['Adj Close']["IBM"]
mid_term_price = price_generator.generate_per_second_price(index_price_df_2, 15)
user_interaction_modifier = []
for index in range(len(base_price)):
    random_modifier = np.random.normal(0, 0.006)
    user_interaction_modifier.append(random_modifier)

print(len(base_price), len(mid_term_price))
wave_1 = {
    'price_list': base_price,
    'start_point': 0,
    'duration': len(base_price),
    'weight': 0.5,
    'intensity_factor': 1
}

wave_2 = {
    'price_list': mid_term_price,
    'start_point': 10000,
    'duration': len(base_price),
    'weight': 0.5,
    'intensity_factor': 1
}
print(len(wave_2["price_list"]))
result_price = price_generator.price_wave_addition(1, 1, len(base_price), wave_1, wave_2)
plt.figure()
plt.plot(result_price)
plt.grid(True)
plt.figure()
plt.plot(wave_2['price_list'][10000:(10000+len(base_price))])
plt.figure()
plt.plot(base_price)
plt.show()