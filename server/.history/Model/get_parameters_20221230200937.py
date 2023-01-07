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

# Index
def s1_index_macro():
	file_lst = ["normal1", "normal2", "mete1_1",
                "mete1_2", "mete2", "mete3", "mete4", "mete5"]
	
	theta_lst = []
	sigma_lst = []
	mu_lst = []

	for index in range(len(file_lst)):
		comp_price_df = pd.read_csv(
			f"Model/historical_price/index_data/{file_lst[index]}.csv")
		stock_price = comp_price_df["Adj Close"].to_list()

		sampling_price_list = []
		for index in range(len(stock_price)):
			price_list = []
			if len(stock_price)-index > 10:
				for number in range(10):
					price_list.append(stock_price[index+number])
				sampling_price_list.append(price_list)
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

	print(parameter_dict)

	return parameter_dict

s1_index_macro()
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
    change = price_change * 0.65
    scale_lamb = 110
    scale_mu = 110
    parameter_dict = {}
    parameter_dict['lamb_low'] = [
        scale_lamb*(element*adjust_number) + change for element in range(total_index)]
    parameter_dict['mu_low'] = [
        scale_mu*(element*adjust_number) - change for element in range(total_index)]

    lamb = [scale_lamb*(element*adjust_number) +
            change for element in range(int(total_index+1))]
    mu = [scale_mu*(element*adjust_number) -
          change for element in range(int(total_index+1))]
    parameter_dict['lamb_up'] = list(reversed(lamb))
    parameter_dict['mu_up'] = list(reversed(mu))

    parameter_dict['lamb'] = parameter_dict['lamb_up'][0]
    parameter_dict['mu'] = parameter_dict['mu_up'][0]

    return parameter_dict


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


# event_mapping_dict={
# 	"roaring_twenties": get_index_parameters_1929_roaring_twenties
# }

# AST_macro={
# 	'national_positive_policy': ast_national_positive_policy_macro,
# }

# AST_micro={
# 	'national_positive_policy': ast_national_positive_policy_micro,
# }

# DSC_macro={
# 	'acquisition': dsc_acquisition_macro,
# }

# DSC_micro={
# 	'acquisition': dsc_acquisition_micro,
# }

# FSIN_macro={
# 	'advertisement': fsin_advertisement_macro,
# }

# FSIN_micro={
# 	'advertisement': fsin_advertisement_micro,
# }

# JKY_macro={
# 	'mortage_survival': jky_mortage_survival_macro,
# }

# JKY_micro={
# 	'mortage_survival': jky_mortage_survival_micro,
# }

# HHW_macro={
# 	'pandemic_lockdown': hhw_pandemic_lockdown_macro,
# }

# HHW_micro={
# 	'pandemic_lockdown': hhw_pandemic_lockdown_micro,
# }

# SGO_macro={
# 	'new_competition': sgo_new_competition_macro,
# }

# SGO_micro={
# 	'new_competition': sgo_new_competition_micro,
# }

# WRKN_macro={
# 	'IPO': wrkn_2012_IPO_macro,
# }

# WRKN_micro={
# 	'IPO': wrkn_2012_IPO_micro,
# }
