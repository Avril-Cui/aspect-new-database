import numpy as np
from pandas_datareader import data as pdr
import yfinance as yf
import matplotlib.pyplot as plt
import pandas as pd
yf.pdr_override()

start_date = "2021-12-09"
end_date = "2022-3-30"
symbol = ["^DJI"]
index_data = pdr.get_data_yahoo(symbol, start_date, end_date)['Adj Close']
index_data.to_csv('Model/historical_price/index_data/mete4.csv')

comp_price_df = pd.read_csv("Model/historical_price/index_data/mete4.csv")
print(len(comp_price_df))
# plt.plot(base_price)
# plt.show()