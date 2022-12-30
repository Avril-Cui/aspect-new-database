import numpy as np
from pandas_datareader import data as pdr
import yfinance as yf
yf.pdr_override()

start_date = "1968-1-1"
end_date = "1970-1-1"
symbol = ['^GSPC']
index_data = pdr.get_data_yahoo(symbol, start_date, end_date)['Adj Close']
index_data.to_csv('Model/historical_price/index_data/normal1.csv')

start_date = "2021-4-9"
end_date = "2021-10-25"
symbol = ['^GSPC']
index_data = pdr.get_data_yahoo(symbol, start_date, end_date)['Adj Close']
index_data.to_csv('Model/historical_price/index_data/normal2.csv')

