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
import matplotlib.pyplot as plt

index_price = []

index1 = pd.read_csv("Model/historical_price/index_data/mete1_1.csv")
print(index1)
index_price1 = index1.to_list()
# index_price1 = index_price1 / index_price1[0]
# index_price.append(index_price1)

# index2 = pd.read_csv("Model/historical_price/index_data/mete1_2.csv")
# index_price2 = index2.to_list()
# index_price2 = index_price2 / index_price2[0]
# index_price.append(index_price2)

# index3 = pd.read_csv("Model/historical_price/index_data/mete2.csv")
# index_price3 = index3.to_list()
# index_price3 = index_price3 / index_price3[0]
# index_price.append(index_price3)

# index4 = pd.read_csv("Model/historical_price/index_data/mete3.csv")
# index_price4 = index4.to_list()
# index_price4 = index_price4 / index_price4[0]
# index_price.append(index_price4)

# index5 = pd.read_csv("Model/historical_price/index_data/mete4.csv")
# index_price5 = index5.to_list()
# index_price5 = index_price5 / index_price5[0]
# index_price.append(index_price5)

# index6 = pd.read_csv("Model/historical_price/index_data/mete5.csv")
# index_price6 = index6.to_list()
# index_price6 = index_price6 / index_price6[0]
# index_price.append(index_price6)

plt.plot(index_price)
plt.show()

#INDEX
def s1_index_macro():
	index_price = []

	index1 = pd.read_csv("Model/historical_price/index_data/mete1_1.csv")
	index_price1 = index1.to_list()
	index_price1 = index_price1 / index_price1[0]
	index_price.append(index_price1)

	index2 = pd.read_csv("Model/historical_price/index_data/mete1_2.csv")
	index_price2 = index2.to_list()
	index_price2 = index_price2 / index_price2[0]
	index_price.append(index_price2)

	index3 = pd.read_csv("Model/historical_price/index_data/mete2.csv")
	index_price3 = index3.to_list()
	index_price3 = index_price3 / index_price3[0]
	index_price.append(index_price3)

	index4 = pd.read_csv("Model/historical_price/index_data/mete3.csv")
	index_price4 = index4.to_list()
	index_price4 = index_price4 / index_price4[0]
	index_price.append(index_price4)

	index5 = pd.read_csv("Model/historical_price/index_data/mete4.csv")
	index_price5 = index5.to_list()
	index_price5 = index_price5 / index_price5[0]
	index_price.append(index_price5)

	index6 = pd.read_csv("Model/historical_price/index_data/mete5.csv")
	index_price6 = index6.to_list()
	index_price6 = index_price6 / index_price6[0]
	index_price.append(index_price6)

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
# def wrkn_2012_IPO_macro():
# 	"""
# 		This function calculates the required parameters for the Roaring Twenties scenarios.
# 		The mechanism behind the calculation is the same as the index example above.
# 		According to the believe that individual stocks all have some level of correlation
# 		in respect with the index, the THETA parameter is calculated by taking a weighted average
# 		between the company's own theta and the index's theta value.
# 	"""
# 	comp_price_df = pd.read_csv("server/Model/historical_price/WRKN/WRKN_IPO.csv")
# 	print(len(comp_price_df))
# 	stock_price = comp_price_df["FB"].to_list()
# 	index_params = get_index_parameters_1929_roaring_twenties()
# 	index_theta = index_params["theta"]

# 	sampling_price_list = []
# 	for index in range(len(stock_price)):
# 		price_list = []
# 		if len(stock_price)-index > 10:
# 			for number in range(10):
# 				price_list.append(stock_price[index+number])
# 			sampling_price_list.append(price_list)

# 	theta_lst = []
# 	sigma_lst = []
# 	mu_lst = []

# 	for index in range(len(sampling_price_list)):
# 		X_t = np.array(sampling_price_list[index])
# 		y = np.diff(X_t)
# 		X = X_t[:-1].reshape(-1, 1)
# 		reg = LinearRegression(fit_intercept=True)
# 		reg.fit(X, y)
# 		theta = -reg.coef_[0]
# 		mu = reg.intercept_ / theta
# 		y_hat = reg.predict(X)
# 		sigma = np.std(y - y_hat)
# 		#The company weight in respect with index weight is assumed to be a fixed number in this case.
# 		company_weight = 0.99 #IPO is a highly company-driven case, so the weight is high.
# 		theta_lst.append(theta * company_weight + index_theta[index] * (1-company_weight))
# 		mu_lst.append(mu)
# 		sigma_lst.append(sigma)


# 	parameter_dict = {}
# 	parameter_dict['original_price'] = stock_price[0]
# 	parameter_dict['mu_sde'] = mu_lst
# 	parameter_dict['sigma'] = sigma_lst
# 	parameter_dict['theta'] = theta_lst
# 	parameter_dict['time'] = len(sampling_price_list)

# 	return parameter_dict

# def wrkn_2012_IPO_micro(
# 		total_index: int,
# 		price_change: float,
# 	):
# 	"""
# 		This function calculates the parameters for the micro side of the price.
# 		Lambda and mu are two required parameters for the Death and Birth process (following the Poisson Distribution).
# 		The adjust_number is set to model the belief that the demand/supply growths stronger when the price gets closer
# 		to the equilibrium (current price) -> since people want their transaction to complete.
# 		Variation SCALE measures the strength of the demand and supply.
# 		Since we do not have any user data now, the function assumes a static number for simplicity purpose.
# 	"""
# 	adjust_number = 1/(total_index)
# 	change = price_change * 0.65
# 	scale_lamb = 110
# 	scale_mu = 110
# 	parameter_dict = {}
# 	parameter_dict['lamb_low'] = [scale_lamb*(element*adjust_number) + change for element in range(total_index)]
# 	parameter_dict['mu_low'] = [scale_mu*(element*adjust_number) - change for element in range(total_index)]


# 	lamb = [scale_lamb*(element*adjust_number) + change for element in range(int(total_index+1))]
# 	mu = [scale_mu*(element*adjust_number) - change for element in range(int(total_index+1))]
# 	parameter_dict['lamb_up'] = list(reversed(lamb))
# 	parameter_dict['mu_up'] = list(reversed(mu))

# 	parameter_dict['lamb'] = parameter_dict['lamb_up'][0]
# 	parameter_dict['mu'] = parameter_dict['mu_up'][0]

# 	return parameter_dict

# def sgo_new_competition_macro():
# 	comp_price_df = pd.read_csv("server/Model/historical_price/SGO/new_competition.csv")
# 	stock_price = comp_price_df["MRNA"].to_list()
# 	index_params = get_index_parameters_1929_roaring_twenties()
# 	index_theta = index_params["theta"]

# 	sampling_price_list = []
# 	for index in range(len(stock_price)):
# 		price_list = []
# 		if len(stock_price)-index > 10:
# 			for number in range(10):
# 				price_list.append(stock_price[index+number])
# 			sampling_price_list.append(price_list)

# 	theta_lst = []
# 	sigma_lst = []
# 	mu_lst = []

# 	for index in range(len(sampling_price_list)):
# 		X_t = np.array(sampling_price_list[index])
# 		y = np.diff(X_t)
# 		X = X_t[:-1].reshape(-1, 1)
# 		reg = LinearRegression(fit_intercept=True)
# 		reg.fit(X, y)
# 		theta = -reg.coef_[0]
# 		mu = reg.intercept_ / theta
# 		y_hat = reg.predict(X)
# 		sigma = np.std(y - y_hat)
# 		#The company weight in respect with index weight is assumed to be a fixed number in this case.
# 		company_weight = 0.99 #IPO is a highly company-driven case, so the weight is high.
# 		theta_lst.append(theta * company_weight + index_theta[index] * (1-company_weight))
# 		mu_lst.append(mu)
# 		sigma_lst.append(sigma)


# 	parameter_dict = {}
# 	parameter_dict['original_price'] = stock_price[0]
# 	parameter_dict['mu_sde'] = mu_lst
# 	parameter_dict['sigma'] = sigma_lst
# 	parameter_dict['theta'] = theta_lst
# 	parameter_dict['time'] = len(sampling_price_list)

# 	return parameter_dict

# def sgo_new_competition_micro(
# 		total_index: int,
# 		price_change: float,
# 	):
# 	adjust_number = 1/(total_index)
# 	change = price_change * 0.65
# 	scale_lamb = 110
# 	scale_mu = 110
# 	parameter_dict = {}
# 	parameter_dict['lamb_low'] = [scale_lamb*(element*adjust_number) + change for element in range(total_index)]
# 	parameter_dict['mu_low'] = [scale_mu*(element*adjust_number) - change for element in range(total_index)]


# 	lamb = [scale_lamb*(element*adjust_number) + change for element in range(int(total_index+1))]
# 	mu = [scale_mu*(element*adjust_number) - change for element in range(int(total_index+1))]
# 	parameter_dict['lamb_up'] = list(reversed(lamb))
# 	parameter_dict['mu_up'] = list(reversed(mu))

# 	parameter_dict['lamb'] = parameter_dict['lamb_up'][0]
# 	parameter_dict['mu'] = parameter_dict['mu_up'][0]

# 	return parameter_dict

# def dsc_acquisition_macro():
# 	comp_price_df = pd.read_csv("server/Model/historical_price/DSC/acquisition.csv")
# 	stock_price = comp_price_df["VOD"].to_list()
# 	index_params = get_index_parameters_1929_roaring_twenties()
# 	index_theta = index_params["theta"]

# 	sampling_price_list = []
# 	for index in range(len(stock_price)):
# 		price_list = []
# 		if len(stock_price)-index > 10:
# 			for number in range(10):
# 				price_list.append(stock_price[index+number])
# 			sampling_price_list.append(price_list)

# 	theta_lst = []
# 	sigma_lst = []
# 	mu_lst = []

# 	for index in range(len(sampling_price_list)):
# 		X_t = np.array(sampling_price_list[index])
# 		y = np.diff(X_t)
# 		X = X_t[:-1].reshape(-1, 1)
# 		reg = LinearRegression(fit_intercept=True)
# 		reg.fit(X, y)
# 		theta = -reg.coef_[0]
# 		mu = reg.intercept_ / theta
# 		y_hat = reg.predict(X)
# 		sigma = np.std(y - y_hat)
# 		#The company weight in respect with index weight is assumed to be a fixed number in this case.
# 		company_weight = 0.99 #IPO is a highly company-driven case, so the weight is high.
# 		theta_lst.append(theta * company_weight + index_theta[index] * (1-company_weight))
# 		mu_lst.append(mu)
# 		sigma_lst.append(sigma)


# 	parameter_dict = {}
# 	parameter_dict['original_price'] = stock_price[0]
# 	parameter_dict['mu_sde'] = mu_lst
# 	parameter_dict['sigma'] = sigma_lst
# 	parameter_dict['theta'] = theta_lst
# 	parameter_dict['time'] = len(sampling_price_list)

# 	return parameter_dict

# def dsc_acquisition_micro(
# 		total_index: int,
# 		price_change: float,
# 	):
# 	adjust_number = 1/(total_index)
# 	change = price_change * 0.65
# 	scale_lamb = 110
# 	scale_mu = 110
# 	parameter_dict = {}
# 	parameter_dict['lamb_low'] = [scale_lamb*(element*adjust_number) + change for element in range(total_index)]
# 	parameter_dict['mu_low'] = [scale_mu*(element*adjust_number) - change for element in range(total_index)]


# 	lamb = [scale_lamb*(element*adjust_number) + change for element in range(int(total_index+1))]
# 	mu = [scale_mu*(element*adjust_number) - change for element in range(int(total_index+1))]
# 	parameter_dict['lamb_up'] = list(reversed(lamb))
# 	parameter_dict['mu_up'] = list(reversed(mu))

# 	parameter_dict['lamb'] = parameter_dict['lamb_up'][0]
# 	parameter_dict['mu'] = parameter_dict['mu_up'][0]

# 	return parameter_dict

# def fsin_advertisement_macro():
# 	comp_price_df = pd.read_csv("server/Model/historical_price/FSIN/advertisement.csv")
# 	stock_price = comp_price_df["NKE"].to_list()
# 	index_params = get_index_parameters_1929_roaring_twenties()
# 	index_theta = index_params["theta"]

# 	sampling_price_list = []
# 	for index in range(len(stock_price)):
# 		price_list = []
# 		if len(stock_price)-index > 10:
# 			for number in range(10):
# 				price_list.append(stock_price[index+number])
# 			sampling_price_list.append(price_list)

# 	theta_lst = []
# 	sigma_lst = []
# 	mu_lst = []

# 	for index in range(len(sampling_price_list)):
# 		X_t = np.array(sampling_price_list[index])
# 		y = np.diff(X_t)
# 		X = X_t[:-1].reshape(-1, 1)
# 		reg = LinearRegression(fit_intercept=True)
# 		reg.fit(X, y)
# 		theta = -reg.coef_[0]
# 		mu = reg.intercept_ / theta
# 		y_hat = reg.predict(X)
# 		sigma = np.std(y - y_hat)
# 		#The company weight in respect with index weight is assumed to be a fixed number in this case.
# 		company_weight = 0.99 #IPO is a highly company-driven case, so the weight is high.
# 		theta_lst.append(theta * company_weight + index_theta[index] * (1-company_weight))
# 		mu_lst.append(mu)
# 		sigma_lst.append(sigma)


# 	parameter_dict = {}
# 	parameter_dict['original_price'] = stock_price[0]
# 	parameter_dict['mu_sde'] = mu_lst
# 	parameter_dict['sigma'] = sigma_lst
# 	parameter_dict['theta'] = theta_lst
# 	parameter_dict['time'] = len(sampling_price_list)

# 	return parameter_dict

# def fsin_advertisement_micro(
# 		total_index: int,
# 		price_change: float,
# 	):
# 	adjust_number = 1/(total_index)
# 	change = price_change * 0.65
# 	scale_lamb = 110
# 	scale_mu = 110
# 	parameter_dict = {}
# 	parameter_dict['lamb_low'] = [scale_lamb*(element*adjust_number) + change for element in range(total_index)]
# 	parameter_dict['mu_low'] = [scale_mu*(element*adjust_number) - change for element in range(total_index)]


# 	lamb = [scale_lamb*(element*adjust_number) + change for element in range(int(total_index+1))]
# 	mu = [scale_mu*(element*adjust_number) - change for element in range(int(total_index+1))]
# 	parameter_dict['lamb_up'] = list(reversed(lamb))
# 	parameter_dict['mu_up'] = list(reversed(mu))

# 	parameter_dict['lamb'] = parameter_dict['lamb_up'][0]
# 	parameter_dict['mu'] = parameter_dict['mu_up'][0]

# 	return parameter_dict

# def hhw_pandemic_lockdown_macro():
# 	comp_price_df = pd.read_csv("server/Model/historical_price/HHW/pandemic_lockdown.csv")
# 	stock_price = comp_price_df["M"].to_list()
# 	index_params = get_index_parameters_1929_roaring_twenties()
# 	index_theta = index_params["theta"]

# 	sampling_price_list = []
# 	for index in range(len(stock_price)):
# 		price_list = []
# 		if len(stock_price)-index > 10:
# 			for number in range(10):
# 				price_list.append(stock_price[index+number])
# 			sampling_price_list.append(price_list)

# 	theta_lst = []
# 	sigma_lst = []
# 	mu_lst = []

# 	for index in range(len(sampling_price_list)):
# 		X_t = np.array(sampling_price_list[index])
# 		y = np.diff(X_t)
# 		X = X_t[:-1].reshape(-1, 1)
# 		reg = LinearRegression(fit_intercept=True)
# 		reg.fit(X, y)
# 		theta = -reg.coef_[0]
# 		mu = reg.intercept_ / theta
# 		y_hat = reg.predict(X)
# 		sigma = np.std(y - y_hat)
# 		#The company weight in respect with index weight is assumed to be a fixed number in this case.
# 		company_weight = 0.99 #IPO is a highly company-driven case, so the weight is high.
# 		theta_lst.append(theta * company_weight + index_theta[index] * (1-company_weight))
# 		mu_lst.append(mu)
# 		sigma_lst.append(sigma)


# 	parameter_dict = {}
# 	parameter_dict['original_price'] = stock_price[0]
# 	parameter_dict['mu_sde'] = mu_lst
# 	parameter_dict['sigma'] = sigma_lst
# 	parameter_dict['theta'] = theta_lst
# 	parameter_dict['time'] = len(sampling_price_list)

# 	return parameter_dict

# def hhw_pandemic_lockdown_micro(
# 		total_index: int,
# 		price_change: float,
# 	):
# 	adjust_number = 1/(total_index)
# 	change = price_change * 0.65
# 	scale_lamb = 110
# 	scale_mu = 110
# 	parameter_dict = {}
# 	parameter_dict['lamb_low'] = [scale_lamb*(element*adjust_number) + change for element in range(total_index)]
# 	parameter_dict['mu_low'] = [scale_mu*(element*adjust_number) - change for element in range(total_index)]


# 	lamb = [scale_lamb*(element*adjust_number) + change for element in range(int(total_index+1))]
# 	mu = [scale_mu*(element*adjust_number) - change for element in range(int(total_index+1))]
# 	parameter_dict['lamb_up'] = list(reversed(lamb))
# 	parameter_dict['mu_up'] = list(reversed(mu))

# 	parameter_dict['lamb'] = parameter_dict['lamb_up'][0]
# 	parameter_dict['mu'] = parameter_dict['mu_up'][0]

# 	return parameter_dict

# def jky_mortage_survival_macro():
# 	comp_price_df = pd.read_csv("server/Model/historical_price/JKY/mortage_survival.csv")
# 	stock_price = comp_price_df["JPM"].to_list()
# 	index_params = get_index_parameters_1929_roaring_twenties()
# 	index_theta = index_params["theta"]

# 	sampling_price_list = []
# 	for index in range(len(stock_price)):
# 		price_list = []
# 		if len(stock_price)-index > 10:
# 			for number in range(10):
# 				price_list.append(stock_price[index+number])
# 			sampling_price_list.append(price_list)

# 	theta_lst = []
# 	sigma_lst = []
# 	mu_lst = []

# 	for index in range(len(sampling_price_list)):
# 		X_t = np.array(sampling_price_list[index])
# 		y = np.diff(X_t)
# 		X = X_t[:-1].reshape(-1, 1)
# 		reg = LinearRegression(fit_intercept=True)
# 		reg.fit(X, y)
# 		theta = -reg.coef_[0]
# 		mu = reg.intercept_ / theta
# 		y_hat = reg.predict(X)
# 		sigma = np.std(y - y_hat)
# 		#The company weight in respect with index weight is assumed to be a fixed number in this case.
# 		company_weight = 0.99 #IPO is a highly company-driven case, so the weight is high.
# 		theta_lst.append(theta * company_weight + index_theta[index] * (1-company_weight))
# 		mu_lst.append(mu)
# 		sigma_lst.append(sigma)


# 	parameter_dict = {}
# 	parameter_dict['original_price'] = stock_price[0]
# 	parameter_dict['mu_sde'] = mu_lst
# 	parameter_dict['sigma'] = sigma_lst
# 	parameter_dict['theta'] = theta_lst
# 	parameter_dict['time'] = len(sampling_price_list)

# 	return parameter_dict

# def jky_mortage_survival_micro(
# 		total_index: int,
# 		price_change: float,
# 	):
# 	adjust_number = 1/(total_index)
# 	change = price_change * 0.65
# 	scale_lamb = 110
# 	scale_mu = 110
# 	parameter_dict = {}
# 	parameter_dict['lamb_low'] = [scale_lamb*(element*adjust_number) + change for element in range(total_index)]
# 	parameter_dict['mu_low'] = [scale_mu*(element*adjust_number) - change for element in range(total_index)]


# 	lamb = [scale_lamb*(element*adjust_number) + change for element in range(int(total_index+1))]
# 	mu = [scale_mu*(element*adjust_number) - change for element in range(int(total_index+1))]
# 	parameter_dict['lamb_up'] = list(reversed(lamb))
# 	parameter_dict['mu_up'] = list(reversed(mu))

# 	parameter_dict['lamb'] = parameter_dict['lamb_up'][0]
# 	parameter_dict['mu'] = parameter_dict['mu_up'][0]

# 	return parameter_dict

# def ast_national_positive_policy_macro():
# 	comp_price_df = pd.read_csv("server/Model/historical_price/AST/national_positive_policy.csv")
# 	stock_price = comp_price_df["BYDDY"].to_list()
# 	index_params = get_index_parameters_1929_roaring_twenties()
# 	index_theta = index_params["theta"]

# 	sampling_price_list = []
# 	for index in range(len(stock_price)):
# 		price_list = []
# 		if len(stock_price)-index > 10:
# 			for number in range(10):
# 				price_list.append(stock_price[index+number])
# 			sampling_price_list.append(price_list)

# 	theta_lst = []
# 	sigma_lst = []
# 	mu_lst = []

# 	for index in range(len(sampling_price_list)):
# 		X_t = np.array(sampling_price_list[index])
# 		y = np.diff(X_t)
# 		X = X_t[:-1].reshape(-1, 1)
# 		reg = LinearRegression(fit_intercept=True)
# 		reg.fit(X, y)
# 		theta = -reg.coef_[0]
# 		mu = reg.intercept_ / theta
# 		y_hat = reg.predict(X)
# 		sigma = np.std(y - y_hat)
# 		#The company weight in respect with index weight is assumed to be a fixed number in this case.
# 		company_weight = 0.99 #IPO is a highly company-driven case, so the weight is high.
# 		theta_lst.append(theta * company_weight + index_theta[index] * (1-company_weight))
# 		mu_lst.append(mu)
# 		sigma_lst.append(sigma)


# 	parameter_dict = {}
# 	parameter_dict['original_price'] = stock_price[0]
# 	parameter_dict['mu_sde'] = mu_lst
# 	parameter_dict['sigma'] = sigma_lst
# 	parameter_dict['theta'] = theta_lst
# 	parameter_dict['time'] = len(sampling_price_list)

# 	return parameter_dict

# def ast_national_positive_policy_micro(
# 		total_index: int,
# 		price_change: float,
# 	):
# 	adjust_number = 1/(total_index)
# 	change = price_change * 0.65
# 	scale_lamb = 110
# 	scale_mu = 110
# 	parameter_dict = {}
# 	parameter_dict['lamb_low'] = [scale_lamb*(element*adjust_number) + change for element in range(total_index)]
# 	parameter_dict['mu_low'] = [scale_mu*(element*adjust_number) - change for element in range(total_index)]


# 	lamb = [scale_lamb*(element*adjust_number) + change for element in range(int(total_index+1))]
# 	mu = [scale_mu*(element*adjust_number) - change for element in range(int(total_index+1))]
# 	parameter_dict['lamb_up'] = list(reversed(lamb))
# 	parameter_dict['mu_up'] = list(reversed(mu))

# 	parameter_dict['lamb'] = parameter_dict['lamb_up'][0]
# 	parameter_dict['mu'] = parameter_dict['mu_up'][0]

# 	return parameter_dict


event_mapping_dict={
	"roaring_twenties": get_index_parameters_1929_roaring_twenties
}

AST_macro={
	'national_positive_policy': ast_national_positive_policy_macro,
}

AST_micro={
	'national_positive_policy': ast_national_positive_policy_micro,
}

DSC_macro={
	'acquisition': dsc_acquisition_macro,
}

DSC_micro={
	'acquisition': dsc_acquisition_micro,
}

FSIN_macro={
	'advertisement': fsin_advertisement_macro,
}

FSIN_micro={
	'advertisement': fsin_advertisement_micro,
}

JKY_macro={
	'mortage_survival': jky_mortage_survival_macro,
}

JKY_micro={
	'mortage_survival': jky_mortage_survival_micro,
}

HHW_macro={
	'pandemic_lockdown': hhw_pandemic_lockdown_macro,
}

HHW_micro={
	'pandemic_lockdown': hhw_pandemic_lockdown_micro,
}

SGO_macro={
	'new_competition': sgo_new_competition_macro,
}

SGO_micro={
	'new_competition': sgo_new_competition_micro,
}

WRKN_macro={
	'IPO': wrkn_2012_IPO_macro,
}

WRKN_micro={
	'IPO': wrkn_2012_IPO_micro,
}