"""
get_parameters.py contains two dictionaries:
1. event_mapping_dict
2. company_mapping_dict
The two dictionaries contains necessary parameters for the SDE and trading population models.
All parameters will contribute to the final price simulation.
For demonstration purpose, the 1929 Roaring Twenties scenario + Facebook 2012 IPO scarnio are shown.
"""
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression

def macro(file):
	comp_price_df = pd.read_csv(file)
	stock_price = comp_price_df["Adj Close"].to_list()

	sampling_price_list = []
	for index in range(len(stock_price)):
		price_list = []
		if len(stock_price)-index > 10:
			for number in range(10):
				price_list.append(stock_price[index+number])
			sampling_price_list.append(price_list)

	theta_lst = []
	sigma_lst = []
	mu_lst = []

	for index in range(len(sampling_price_list)):
		X_t = np.array(sampling_price_list[index])
		y = np.diff(X_t)
		X = X_t[:-1].reshape(-1, 1)
		reg = LinearRegression(fit_intercept=True)
		reg.fit(X, y)
		theta = -reg.coef_[0]
		mu = reg.intercept_ / theta
		y_hat = reg.predict(X)
		sigma = np.std(y - y_hat)
		theta_lst.append(theta)
		mu_lst.append(mu)
		sigma_lst.append(sigma)


	parameter_dict = {}
	parameter_dict['original_price'] = stock_price[0]
	parameter_dict['mu_sde'] = mu_lst
	parameter_dict['sigma'] = sigma_lst
	parameter_dict['theta'] = theta_lst
	parameter_dict['time'] = len(sampling_price_list)
	return parameter_dict

def micro(
		total_index: int,
		price_change: float,
		scale_lamb: float,
		scale_mu: float
	):
	adjust_number = 1/(total_index)
	change = price_change * 0.65

	parameter_dict = {}
	parameter_dict['lamb_low'] = [scale_lamb*(element*adjust_number) + change for element in range(total_index)]
	parameter_dict['mu_low'] = [scale_mu*(element*adjust_number) - change for element in range(total_index)]


	lamb = [scale_lamb*(element*adjust_number) + change for element in range(int(total_index+1))]
	mu = [scale_mu*(element*adjust_number) - change for element in range(int(total_index+1))]
	parameter_dict['lamb_up'] = list(reversed(lamb))
	parameter_dict['mu_up'] = list(reversed(mu))

	parameter_dict['lamb'] = parameter_dict['lamb_up'][0]
	parameter_dict['mu'] = parameter_dict['mu_up'][0]

	return parameter_dict
#Index
file_names = ['mete1_1', 'mete1_2', 'mete2', 'mete3', 'mete4', 'mete5']
index_params = {}
for name in file_names:
	index_params[name] = {
		"macro": macro(f"Model/historical_price/index_data/{name}.csv"),
		"scale_lamb": 120,
		"scale_mu": 130
	}

print(index_params)