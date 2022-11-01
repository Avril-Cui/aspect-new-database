import pandas_datareader as web
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

def normalize_price(price_list, start_index):
    normalized_price = np.divide(price_list, price_list[start_index])
    return normalized_price

def convolution_wave(price_df, days):
    convolution_wave = price_df.rolling(window=days).mean()
    convolution_wave = convolution_wave[days:]
    return convolution_wave

def price_wave_addition(base_price1, base_price2, duration, start_point=0, weight=0.5):
    wave_1 = np.multiply(base_price1[start_point:(start_point+duration)], weight)
    wave_2 = np.multiply(base_price2[start_point:(start_point+duration)], (1-weight))
    new_price_wave = np.add(wave_1, wave_2)
    return new_price_wave

def price_wave_intensitive(base_price, duration, start_point, intensity_factor):
    new_price_wave = np.multiply(base_price[start_point:(start_point+duration)], intensity_factor)
    return new_price_wave


start_date = "2000/1/1"
end_date = "2002/5/1"
symbol = ['^GSPC']
index_data = web.get_data_yahoo(symbol, start_date, end_date)
index_price_df = index_data['Adj Close']
index_convolution_df = convolution_wave(index_price_df, 50)
index_convolution = index_convolution_df["^GSPC"].to_list()
normalized_index_convolution = normalize_price(index_convolution, 0)

start_date_2 = "1993/6/1"
end_date_2 = "1994/10/1"
symbol_2 = ['IBM']
index_data_2 = web.get_data_yahoo(symbol_2, start_date_2, end_date_2)
index_price_df_2 = index_data_2['Adj Close']
index_convolution_df_2 = convolution_wave(index_price_df_2, 15)
index_convolution_2 = index_convolution_df_2["IBM"].to_list()
normalized_index_convolution_2 = normalize_price(index_convolution_2, 0)

mid_price = price_wave_addition(normalized_index_convolution, normalized_index_convolution_2, len(normalized_index_convolution_2), 0, 0.5)
print(normalized_index_convolution_2[0]+normalized_index_convolution[0])
plt.figure(figsize = (6,3))
plt.plot(mid_price, color='orange', linewidth=1)
plt.grid(True)
plt.show()