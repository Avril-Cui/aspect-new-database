import numpy as np
from pandas_datareader import data as pdr
import yfinance as yf
import matplotlib.pyplot as plt
yf.pdr_override()

start_date = "1987-9-15"
end_date = "1987-11-18"
symbol = ["^GSPC"]
index_data = pdr.get_data_yahoo(symbol, start_date, end_date)['Adj Close']
index_data.to_csv('Model/historical_price/index_data/mete1_2.csv')
