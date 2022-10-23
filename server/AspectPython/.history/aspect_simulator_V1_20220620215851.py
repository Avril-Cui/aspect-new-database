import pandas_datareader as web
import matplotlib.pyplot as plt 
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
np.random.seed(17)


def generate_stock_parameter(original_price_list, original_price, original_index_price, target_adjustment, comp_weight, index_weight):
    index_price = original_index_price[:len(original_price_list)]
    convolution_df = index_price.rolling(window=10).mean()
    mu_df_index = convolution_df.pct_change()
    mu_list_index = mu_df_index["^GSPC"].to_list()[10:]


    sigma = []
    convolution_df = original_price.rolling(window=10).mean()
    mu_df = convolution_df.pct_change()
    mu = mu_df["META"].to_list()[10:]

    sampling_price_list = []
    for index in range(len(original_price_list)):
        price_list = []
        if len(original_price_list)-index > 10:
            for number in range(10):
                price_list.append(original_price_list[index+number])
            sampling_price_list.append(price_list)

    for index in range(len(sampling_price_list)):
        X_t = np.array(sampling_price_list[index])
        y = np.diff(X_t)
        X = X_t[:-1].reshape(-1, 1)
        reg = LinearRegression(fit_intercept=True)
        reg.fit(X, y)
        y_hat = reg.predict(X)
        beta = np.std(y - y_hat)
        sigma.append(beta)

    x0 = original_price_list[10]
    simulated_price = [x0]

    for index in range(len(sampling_price_list)):
        mean_company = mu[index]
        mean_index = mu_list_index[index]
        sigm = sigma[index]
        dWt = np.random.normal(0,1)
        
        simulated_price.append(simulated_price[-1]+(mean_company*comp_weight+mean_index*index_weight)*simulated_price[-1] + sigm * dWt)

    adjust_factor = target_adjustment/x0
    adjusted_price = [i*adjust_factor for i in simulated_price]
    adjusted_price[0] = np.round(adjusted_price[0])

    split = [adjusted_price[i:i + 10] for i in range(0, len(adjusted_price), 10)]

    # print(split[0])

    day_based_price_list = [adjusted_price[0]]
    tick_based_price_list = [adjusted_price[0]]
    second_based_price_list = [adjusted_price[0]]

    for index in range(len(split[:-1])):
        one_day = split[index]
        one_day_df = pd.DataFrame(one_day, columns = ['one_day_price'])
        drift = one_day_df.pct_change()
        drift = drift[1:]['one_day_price'].tolist()
        
        x0 = one_day[0]
        ticks_in_min = 12
        dt = 1/(60*ticks_in_min)
        T = 9
        num = int(T/dt)

        daily_price = [x0]

        for k in range(num):
            mu_tmp = drift[int(k*dt)]*0.9
            sigma = 0.1
            dBt = np.random.normal(0,np.sqrt(dt))
            next_price = daily_price[-1] + mu_tmp * daily_price[-1] * dt + sigma * np.sqrt(daily_price[-1]) * dBt
            daily_price.append(next_price)
        
        daily_price[-1] = one_day[-1]
        daily_price_scaled = []
        adjust_num = 36

        for inx in range(len(daily_price)):
            if inx % adjust_num == 0:
                daily_price_scaled.append(daily_price[inx])
        tick_based_price_list += daily_price_scaled
        
        day_based_price_list.append(daily_price[-1])
        second_based_price_list += daily_price

    return(simulated_price, tick_based_price_list, day_based_price_list, second_based_price_list)

start_date = "2020/1/1"
end_date = "2021/1/1"
symbol = ['^GSPC']
index_data = web.get_data_yahoo(symbol, start_date, end_date)
index_price_df = index_data['Adj Close']
index_price_list = index_price_df['^GSPC'].to_list()

start_date_1 = "2008-11-1"
end_date_1 = "2010-8-1"
symbol_1 = ['^GSPC']
index_data_1 = web.get_data_yahoo(symbol_1, start_date_1, end_date_1)
index_price_df_1 = index_data_1['Adj Close']
index_price_list_1 = index_price_df_1['^GSPC'].to_list()
index_price_list +=index_price_list_1

start_date_2 = "1968/1/1"
end_date_2 = "1970/1/1"
symbol_2 = ['^GSPC']
index_data_2 = web.get_data_yahoo(symbol_2, start_date_2, end_date_2)
index_price_df_2 = index_data_2['Adj Close']
index_price_list_2 = index_price_df_2['^GSPC'].to_list()
index_price_list +=index_price_list_2
index_price = pd.DataFrame(index_price_list, columns=['^GSPC'])



start_date_comp = "2012/5/18"
end_date_comp = "2013/12/1"
symbol_comp = ["META"]
stock_data_comp = web.get_data_yahoo(symbol_comp, start_date_comp, end_date_comp)
stock_price_comp = stock_data_comp['Adj Close']
stock_price_list = stock_price_comp['META'].to_list()
target_adjustment = 57.66
comp_weight = 0.2
index_weight = 0.8


simulated_price, tick_based_price_list, day_based_price_list, second_based_price_list = generate_stock_parameter(stock_price_list, stock_price_comp, index_price, target_adjustment, comp_weight, index_weight)

aspect_simulator_wrkn_tick = pd.DataFrame(tick_based_price_list, columns=["tick_based"])
aspect_simulator_wrkn_day = pd.DataFrame(day_based_price_list, columns=["day_based"])
aspect_simulator_wrkn_second = pd.DataFrame(second_based_price_list, columns=["second_based"])

aspect_simulator_wrkn_tick.to_csv('/Users/xiaokeai/Desktop/wrkn_tick_price.csv')
aspect_simulator_wrkn_day.to_csv('/Users/xiaokeai/Desktop/wrkn_day_price.csv')
aspect_simulator_wrkn_second.to_csv('/Users/xiaokeai/Desktop/wrkn_second_price.csv')




# def generate_parameter(original_price_list, target_adjustment):
    
#     sampling_price_list = []
#     for index in range(len(original_price_list)):
#         price_list = []
#         if len(original_price_list)-index > 10:
#             for number in range(10):
#                 price_list.append(original_price_list[index+number])
#             sampling_price_list.append(price_list)

#     theta = []
#     sigma = []
#     mu = []

#     for index in range(len(sampling_price_list)):
#         X_t = np.array(sampling_price_list[index])
#         y = np.diff(X_t)
#         X = X_t[:-1].reshape(-1, 1)
#         reg = LinearRegression(fit_intercept=True)
#         reg.fit(X, y)
#         alpha = -reg.coef_[0]
#         gamma = reg.intercept_ / alpha
#         y_hat = reg.predict(X)
#         beta = np.std(y - y_hat)
#         theta.append(alpha)
#         mu.append(gamma)
#         sigma.append(beta)


#     x0 = original_price_list[10]
#     simulated_price = [x0]

#     for index in range(len(sampling_price_list)):
#         mean = mu[index]
#         theta_tmp = theta[index]
#         sigm = sigma[index]
#         dWt = np.random.normal(0,1)
#         simulated_price.append(simulated_price[-1]+theta_tmp * (mean-simulated_price[-1]) + sigm * dWt)
    
#     adjust_factor = target_adjustment/x0
#     adjusted_price = [i*adjust_factor for i in simulated_price]
#     adjusted_price[0] = np.round(adjusted_price[0])

#     split = [adjusted_price[i:i + 10] for i in range(0, len(adjusted_price), 10)]

#     # print(split[0])

#     day_based_price_list = [adjusted_price[0]]
#     tick_based_price_list = [adjusted_price[0]]
#     second_based_price_list = [adjusted_price[0]]

#     for index in range(len(split[:-1])):
#         one_day = split[index]
#         one_day_df = pd.DataFrame(one_day, columns = ['one_day_price'])
#         drift = one_day_df.pct_change()
#         drift = drift[1:]['one_day_price'].tolist()
        
#         x0 = one_day[0]
#         ticks_in_min = 12
#         dt = 1/(60*ticks_in_min)
#         T = 9
#         num = int(T/dt)

#         daily_price = [x0]

#         for k in range(num):
#             mu_tmp = drift[int(k*dt)]*0.9
#             sigma = 0.1
#             dBt = np.random.normal(0,np.sqrt(dt))
#             next_price = daily_price[-1] + mu_tmp * daily_price[-1] * dt + sigma * np.sqrt(daily_price[-1]) * dBt
#             daily_price.append(next_price)
        
#         daily_price[-1] = one_day[-1]
#         daily_price_scaled = []
#         adjust_num = 36

#         for inx in range(len(daily_price)):
#             if inx % adjust_num == 0:
#                 daily_price_scaled.append(daily_price[inx])
#         tick_based_price_list += daily_price_scaled
        
#         day_based_price_list.append(daily_price[-1])
#         second_based_price_list += daily_price

#     return(simulated_price, tick_based_price_list, day_based_price_list, second_based_price_list)

# start_date = "2020/1/1"
# end_date = "2021/1/1"
# symbol = ['^GSPC']
# index_data = web.get_data_yahoo(symbol, start_date, end_date)
# index_price_df = index_data['Adj Close']
# index_price_list = index_price_df['^GSPC'].to_list()
# target_adjustment = 1077.77

















# start_date = "2020/1/1"
# end_date = "2021/1/1"
# symbol = ['^GSPC']
# index_data = web.get_data_yahoo(symbol, start_date, end_date)
# index_price_df = index_data['Adj Close']
# index_price_list = index_price_df['^GSPC'].to_list()
# target_adjustment = 1077.77

# simulated_price, tick_based_price_list, day_based_price_list, second_based_price_list = generate_parameter(index_price_list, target_adjustment)

# aspect_simulator_index_tick = pd.DataFrame(tick_based_price_list, columns=["tick_based"])
# aspect_simulator_index_day = pd.DataFrame(day_based_price_list, columns=["day_based"])
# aspect_simulator_index_second = pd.DataFrame(second_based_price_list, columns=["second_based"])


# start_date_1 = "2008-11-1"
# end_date_1 = "2010-8-1"
# symbol_1 = ['^GSPC']
# index_data_1 = web.get_data_yahoo(symbol_1, start_date_1, end_date_1)
# index_price_df_1 = index_data_1['Adj Close']
# index_price_list_1 = index_price_df_1['^GSPC'].to_list()
# target_adjustment_1 = second_based_price_list[-1]

# simulated_price_1, tick_based_price_list_1, day_based_price_list_1, second_based_price_list_1 = generate_parameter(index_price_list_1, target_adjustment_1)

# aspect_simulator_index_tick_1 = pd.DataFrame(tick_based_price_list_1, columns=["tick_based"])
# aspect_simulator_index_day_1 = pd.DataFrame(day_based_price_list_1, columns=["day_based"])
# aspect_simulator_index_second_1 = pd.DataFrame(second_based_price_list_1, columns=["second_based"])


# start_date_2 = "1968/1/1"
# end_date_2 = "1970/1/1"
# symbol_2 = ['^GSPC']
# index_data_2 = web.get_data_yahoo(symbol_2, start_date_2, end_date_2)
# index_price_df_2 = index_data_2['Adj Close']
# index_price_list_2 = index_price_df_2['^GSPC'].to_list()
# target_adjustment_2 = second_based_price_list_1[-1]

# simulated_price_2, tick_based_price_list_2, day_based_price_list_2, second_based_price_list_2 = generate_parameter(index_price_list_2, target_adjustment_2)

# aspect_simulator_index_tick_2 = pd.DataFrame(tick_based_price_list_2, columns=["tick_based"])
# aspect_simulator_index_day_2 = pd.DataFrame(day_based_price_list_2, columns=["day_based"])
# aspect_simulator_index_second_2 = pd.DataFrame(second_based_price_list_2, columns=["second_based"])




# aspect_simulator_index_tick=aspect_simulator_index_tick.append(aspect_simulator_index_tick_1)
# aspect_simulator_index_day=aspect_simulator_index_day.append(aspect_simulator_index_day_1)
# aspect_simulator_index_second=aspect_simulator_index_second.append(aspect_simulator_index_second_1)

# aspect_simulator_index_tick=aspect_simulator_index_tick.append(aspect_simulator_index_tick_2)
# aspect_simulator_index_day=aspect_simulator_index_day.append(aspect_simulator_index_day_2)
# aspect_simulator_index_second=aspect_simulator_index_second.append(aspect_simulator_index_second_2)

# print(tick_based_price_list_2[0], tick_based_price_list_1[-1])



# aspect_simulator_index_tick.to_csv('/Users/xiaokeai/Desktop/index_tick_price.csv')
# aspect_simulator_index_day.to_csv('/Users/xiaokeai/Desktop/index_day_price.csv')
# aspect_simulator_index_second.to_csv('/Users/xiaokeai/Desktop/index_second_price.csv')














# x_tick = np.arange(0, len(tick_based_price_list), 1)
# x_second = range(0, len(second_based_price_list), 1)
# x_a = range(0, len(day_based_price_list), 1)
# x = range(0, len(simulated_price), 1)



# plt.figure(figsize = (9,4))
# plt.plot(x_tick,tick_based_price_list,'b',label = 'Per Day Price Trend',alpha = 0.3, linewidth = 2)

# plt.figure(figsize = (9,4))
# plt.plot(x,simulated_price,'green',label = 'price_simulation',alpha = 0.5, linewidth = 1)

# plt.show()