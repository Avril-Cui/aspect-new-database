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

#INDEX
def get_index_parameters_1929_roaring_twenties():
	'''
		This function calculates the required parameters for the Roaring Twenties scenarios.
		Historical data during this time frame is get through Yahoo Finance.
		Parameters for the Stochastic Differential Equation are get using the regression.
		In this case, an Ornstein–Uhlenbeck process is used to model the index price.
	'''

	index_price_df = pd.read_csv("./historical_price/index_data/1929_roaring_twenties.csv")
	index_price = index_price_df["^GSPC"].to_list()

	sampling_price_list = []
	for index in range(len(index_price)):
		price_list = []
		if len(index_price)-index > 10:
			for number in range(10):
				price_list.append(index_price[index+number])
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
	parameter_dict['mu_sde'] = mu_lst
	parameter_dict['sigma'] = sigma_lst
	parameter_dict['theta'] = theta_lst
	parameter_dict['time'] = len(sampling_price_list)

	return parameter_dict


#Company: WRKN
def wrkn_2012_IPO_macro():
	"""
		This function calculates the required parameters for the Roaring Twenties scenarios.
		The mechanism behind the calculation is the same as the index example above.
		According to the believe that individual stocks all have some level of correlation
		in respect with the index, the THETA parameter is calculated by taking a weighted average
		between the company's own theta and the index's theta value.
	"""
	comp_price_df = pd.read_csv("./historical_price/WRKN/WRKN_IPO.csv")
	stock_price = comp_price_df["FB"].to_list()
	index_params = get_index_parameters_1929_roaring_twenties()
	index_theta = index_params["theta"]

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
		#The company weight in respect with index weight is assumed to be a fixed number in this case.
		company_weight = 0.99 #IPO is a highly company-driven case, so the weight is high.
		theta_lst.append(theta * company_weight + index_theta[index] * (1-company_weight))
		mu_lst.append(mu)
		sigma_lst.append(sigma)


	parameter_dict = {}
	parameter_dict['mu_sde'] = mu_lst
	parameter_dict['sigma'] = sigma_lst
	parameter_dict['theta'] = theta_lst
	parameter_dict['time'] = len(sampling_price_list)

	return parameter_dict

def wrkn_2012_IPO_micro(
		total_index: int,
		price_change: float,
	):
	"""
		This function calculates the parameters for the micro side of the price.
		Lambda and mu are two required parameters for the Death and Birth process (following the Poisson Distribution).
		The adjust_number is set to model the belief that the demand/supply growths stronger when the price gets closer
		to the equilibrium (current price) -> since people want their transaction to complete.
		Variation SCALE measures the strength of the demand and supply.
		Since we do not have any user data now, the function assumes a static number for simplicity purpose.
	"""
	adjust_number = 1/(total_index)
	change = price_change*20
	scale_lamb = 110
	scale_mu = 120
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


event_mapping_dict={
	"roaring_twenties": get_index_parameters_1929_roaring_twenties
}

Wakron_macro={
	'IPO': wrkn_2012_IPO_macro,
}

Wakron_micro={
	'IPO': wrkn_2012_IPO_micro,
}