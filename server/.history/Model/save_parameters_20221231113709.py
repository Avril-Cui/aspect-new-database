import numpy as np
from pandas_datareader import data as pdr
import yfinance as yf
import matplotlib.pyplot as plt
import pandas as pd
yf.pdr_override()

start_date = "2020-01-15"
end_date = "2020-04-20"
symbol = ["^GSPC"]
index_data = pdr.get_data_yahoo(symbol, start_date, end_date)['Adj Close']
index_data.to_csv('Model/historical_price/index_data/normal2.csv')

# import get_parameters
# from modified_wave import DayPriceGenerator, MidPriceGenerator, WaveModifier, StockSimulator
# comp_price_df = pd.read_csv("Model/historical_price/index_data/mete1_1.csv")
# name = ["mete1_1"]
# index_params = get_parameters.index_params
# macro = index_params[name]["macro"]
# stock_simulator = DayPriceGenerator(macro)
# base_price = stock_simulator.price_loop()
# # plt.plot(base_price)
# # plt.show()