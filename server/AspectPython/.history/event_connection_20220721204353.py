"""
    This script is an experiment that connect different events together.
    It is used for final launch (output the final csv and prepare for the front-end).
    [NOT THAT IMPORTANT!]
"""



import pandas_datareader as web
import matplotlib.pyplot as plt 
import numpy as np
import pandas as pd

start_date_1 = "1988/4/1"
end_date_1 = "1989/5/1"
symbol_1 = ['^GSPC']
index_data_1 = web.get_data_yahoo(symbol_1, start_date_1, end_date_1)
index_price_df_1 = index_data_1['Adj Close']

index_convolution_df_1 = index_price_df_1.rolling(window=20).mean()

index_convolution_1 = index_convolution_df_1['^GSPC'].tolist()
index_price_1 = index_price_df_1['^GSPC'].tolist()
index_price_1 = index_price_1[20:]
index_convolution_1 = index_convolution_1[20:]
squared_different_1 = [index_price_1[i]-index_convolution_1[i] for i in range(len(index_price_1))]

mu_df_1 = index_convolution_df_1.pct_change()
mu_inx_1 = mu_df_1['^GSPC'].tolist()
mu_inx_1 = mu_inx_1[20:]

np.random.seed(17)


x0_1 = 256.089996
s0_1 = x0_1
dt_1 = 0.01
T_1 = 2.5
num_1 = int(T_1/dt_1)

B_1 = [0]
x_1 = np.arange(0,T_1+dt_1,dt_1)

W_1 = [0]
S_1 = [s0_1]
X_1 = [x0_1]
    
mu_1 = mu_inx_1
sig1_1 = squared_different_1


for i in range(num_1):
    mu_tmp_1 = mu_1[i]
    sig1_tmp_1 = sig1_1[i]/0.4

    sigma_1 = 0.01
    
    theta_1 = 15

    dBt_1 = np.random.normal(0,1) * np.sqrt(dt_1)
    dWt_1 = np.random.normal(0,1) * np.sqrt(dt_1)
    
    X_1.append(X_1[-1] + mu_tmp_1 * X_1[-1] + sigma_1 * X_1[-1] * dBt_1)
    S_1.append(S_1[-1] + theta_1 * (X_1[-1]-S_1[-1])*dt_1 + sig1_tmp_1*(dBt_1+dWt_1))

for price in range(len(X_1)):
    X_1[price] += 200
    S_1[price] += 200

start_date = "1999-1-1"
end_date = "2001-1-1"
symbol = ['^GSPC']
index_data = web.get_data_yahoo(symbol, start_date, end_date)
index_price_df = index_data['Adj Close']

index_convolution_df = index_price_df.rolling(window=25).mean()

index_convolution = index_convolution_df['^GSPC'].tolist()
index_price = index_price_df['^GSPC'].tolist()
index_price = index_price[25:]
index_convolution = index_convolution[25:]
squared_different = [index_price[i]-index_convolution[i] for i in range(len(index_price))]

mu_df = index_convolution_df.pct_change()
mu_inx = mu_df['^GSPC'].tolist()
mu_inx = mu_inx[25:]

np.random.seed(17)


x0 = 1228.099976
s0 = 1228.099976
dt = 0.01
T = 4.7
num = int(T/dt)

B = [0]
x = np.arange(0,T+dt,dt)

W = [0]
S = [s0]
X = [x0]
    
mu = mu_inx
sig1 = squared_different


for i in range(num):
    mu_tmp = mu[i]
    sig1_tmp = sig1[i]/0.7

    sigma = 0.01 
    theta = 10

    dBt = np.random.normal(0,1) * np.sqrt(dt)
    dWt = np.random.normal(0,1) * np.sqrt(dt)
    
    X.append(X[-1] + mu_tmp * X[-1] + sigma * np.sqrt(X[-1]) * dBt)
    S.append(S[-1] + theta * (X[-1]-S[-1])*dt + sig1_tmp*(dBt+dWt))

x = range(0, len(X), 1)

simulated_price = S_1
end_price = S_1[-1]
price_change = S[0] - end_price
price_change

for price in range(len(S)):
    S[price]-=price_change
    simulated_price.append(S[price])

plt.figure(figsize = (9,4))
x_value = x = range(0, len(simulated_price), 1)
plt.plot(x_value,simulated_price,'b',label = 'Connected Growth',alpha = 0.5, linewidth = 2)
plt.show()