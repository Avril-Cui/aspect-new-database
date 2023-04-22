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

def macro(file, length):
    comp_price_df = pd.read_csv(file)
    stock_price = comp_price_df["Adj Close"].tolist()

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


file_names_index = ['normal1', 'mete1_1', 'mete1_2', 'mete2', 'mete3', 'mete4', 'mete5']
length_index = [120, 50, 30, 50, 50, 60, 60]
fund_weights_index = [0.7, 0.6, 0.85, 0.85, 0.9, 1, 1]
index_params_index = {}
for index in range(len(file_names_index)):
	name = file_names_index[index]
	index_params_index[name] = {
		"macro": macro("server/Model/historical_price/index_data/{}.csv".format(name), length_index[index])
	}

# file_names_ast = ['gov_policy', 'normal', 'insider', 'normal', 'fs']
# length_ast = [85, 30, 75, 30, 100]
# fund_weights_ast = [0.6, 1, 0.75, 1, 0.75]
# params_ast = {}
# for index in range(len(file_names_ast)):
#     name = file_names_ast[index]
#     params_ast[name] = {
#         "macro": macro("server/Model/historical_price/AST/{}.csv".format(name)),
#         "scale_lamb": 100,
#         "scale_mu": 110,
#         "fund_weight": fund_weights_ast[index]
#     }

# file_names_dsc = ['acquisition', 'normal', 'chip', 'normal']
# length_dsc = [145, 30, 105, 30]
# fund_weights_dsc = [0.9, 0.9, 0.9,1]
# params_dsc = {}
# for index in range(len(file_names_dsc)):
#     name = file_names_dsc[index]
#     params_dsc[name] = {
#         "macro": macro("server/Model/historical_price/DSC/{}.csv".format(name)),
#         "scale_lamb": 100,
#         "scale_mu": 110,
#         "fund_weight": fund_weights_dsc[index]
#     }

# file_names_fsin = ['fast_fashion', 'normal', 'ceo_crisis', 'normal']
# length_fsin = [150, 40, 80, 30]
# fund_weights_fsin = [0.8, 0.8, 0.9,1]
# params_fsin = {}
# for index in range(len(file_names_fsin)):
#     name = file_names_fsin[index]
#     params_fsin[name] = {
#         "macro": macro("server/Model/historical_price/FSIN/{}.csv".format(name)),
        
#         "scale_lamb": 100,
#         "scale_mu": 110,
#         "fund_weight": fund_weights_fsin[index]
#     }

# file_names_hhw = ['normal', 'mete_business_1', 'mete_business_2', 'business_restructure']
# length_hhw = [20, 90, 80, 110]
# fund_weights_hhw = [0.8, 0.8, 0.8, 0.9]
# params_hhw = {}
# for index in range(len(file_names_hhw)):
#     name = file_names_hhw[index]
#     params_hhw[name] = {
#         "macro": macro("server/Model/historical_price/HHW/{}.csv".format(name)),
#         "scale_lamb": 100,
#         "scale_mu": 110,
#         "fund_weight": fund_weights_hhw[index]
#     }

# file_names_jky = ['margin_call', 'interest', 'crisis_survival', 'normal']
# length_jky = [110, 70, 80, 40]
# fund_weights_jky = [0.8, 0.8, 0.8, 0.9]
# params_jky = {}
# for index in range(len(file_names_jky)):
#     name = file_names_jky[index]
#     params_jky[name] = {
#         "macro": macro("server/Model/historical_price/JKY/{}.csv".format(name)),
#         "scale_lamb": 100,
#         "scale_mu": 110,
#         "fund_weight": fund_weights_jky[index]
#     }

# file_names_sgo = ['normal', 'new_medicine', 'share_purchase', 'competition', 'success_medicine']
# length_sgo = [10, 90, 60, 90, 50]
# fund_weights_sgo = [0.8, 0.8, 0.8, 0.9, 0.8]
# params_sgo = {}
# for index in range(len(file_names_sgo)):
#     name = file_names_sgo[index]
#     params_sgo[name] = {
#         "macro": macro("server/Model/historical_price/SGO/{}.csv".format(name)),
#         "scale_lamb": 100,
#         "scale_mu": 110,
#         "fund_weight": fund_weights_sgo[index]
#     }

# file_names_wrkn = ['IPO', 'normal', 'new_business_strategy']
# length_wrkn = [200, 30, 70]
# fund_weights_wrkn = [0.6, 0.8, 0.8]
# params_wrkn = {}
# for index in range(len(file_names_wrkn)):
#     name = file_names_wrkn[index]
#     params_wrkn[name] = {
#         "macro": macro("server/Model/historical_price/WRKN/{}.csv".format(name)),
#         "scale_lamb": 100,
#         "scale_mu": 110,
#         "fund_weight": fund_weights_wrkn[index]
#     }