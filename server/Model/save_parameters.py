import numpy as np
from pandas_datareader import data as pdr
import yfinance as yf
import matplotlib.pyplot as plt
import pandas as pd
yf.pdr_override()

start_date = "2015-4-15"
end_date = "2015-12-10"
symbol = ['AAPL']
data = pdr.get_data_yahoo(symbol, start_date, end_date)['Adj Close']
data.to_csv('Model/historical_price/wrkn/normal.csv')

# plt.plot(base_price)
# plt.show()