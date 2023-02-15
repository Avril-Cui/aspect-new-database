from pandas_datareader import data as pdr
import yfinance as yf
import matplotlib.pyplot as plt
yf.pdr_override()

start_date = "2015-3-9"
end_date = "2017-1-1"
symbol = ['^DJI']
data = pdr.get_data_yahoo(symbol, start_date, end_date)['Adj Close']
plt.plot(data)
plt.show()
# data.to_csv('Model/historical_price/wrkn/normal.csv')
# , , [""], 15

# plt.plot(base_price)
# plt.show()