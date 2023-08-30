from pandas_datareader import data as pdr
import yfinance as yf
import matplotlib.pyplot as plt
yf.pdr_override()

start_date = "2021-2-25"
end_date = "2021-11-1"
symbol = ['HM-B.ST']
data = pdr.get_data_yahoo(symbol, start_date, end_date)['Adj Close']

data.to_csv('Model/historical_price/FSIN/fast_fashion.csv')