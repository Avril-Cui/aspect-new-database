import numpy as np
from pandas_datareader import data as pdr
import yfinance as yf
import matplotlib.pyplot as plt
import pandas as pd
yf.pdr_override()

# start_date = "2022-6-9"
# end_date = "2022-9-10"
# symbol = ["^DJI"]
# index_data = pdr.get_data_yahoo(symbol, start_date, end_date)['Adj Close']
# index_data.to_csv('Model/historical_price/index_data/mete5.csv')

comp_price_df = pd.read_csv("Model/historical_price/index_data/mete1_1.csv")["Adj Close"].to_list()
print(len(comp_price_df))
plt.plot(comp_price_df)
plt.show()