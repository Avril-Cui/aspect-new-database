from pandas_datareader import data as pdr
import yfinance as yf
import matplotlib.pyplot as plt
yf.pdr_override()

start_date = "2021-1-1"
end_date = "2021-6-1"
symbol = ['^GSPC']
data = pdr.get_data_yahoo(symbol, start_date, end_date)['Adj Close']

data.to_csv('Model/historical_price/index_data/mete5.csv')
# , , [""], 15

# plt.plot(base_price)
# plt.show()