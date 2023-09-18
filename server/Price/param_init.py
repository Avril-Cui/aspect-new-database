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

    parameter_dict = {
        "original_price": stock_price[0],
        "mu_sde": mu_lst,
        "sigma": sigma_lst,
        "theta": theta_lst,
        "time": len(sampling_price_list)
    }

    return parameter_dict

file_names_index = ['normal1', 'mete1_1', 'mete1_2', 'mete2', 'mete3', 'mete4', 'mete5']
length_index = [120, 50, 30, 50, 50, 60, 60]
fund_weights_index = [0.7, 0.6, 0.85, 0.85, 0.9, 1, 1]
index_params_index = {}
for index in range(len(file_names_index)):
 name = file_names_index[index]
 index_params_index[name] = {
  "macro": macro("Price/historical_price/index_data/{}.csv".format(name))
 }

file_names_ast = ['gov_policy', 'normal', 'insider', 'normal', 'fs']
length_ast = [120, 50, 75, 50, 110]
fund_weights_ast = [0.6, 1, 0.75, 1, 1]
params_ast = {}
for index in range(len(file_names_ast)):
    name = file_names_ast[index]
    params_ast[name] = {
        "macro": macro("Price/historical_price/AST/{}.csv".format(name))
    }

file_names_dsc = ['acquisition', 'normal', 'chip', 'normal']
length_dsc = [145, 60, 105, 90]
fund_weights_dsc = [0.9, 1, 0.9, 0.3]
params_dsc = {}
for index1 in range(len(file_names_dsc)):
    name = file_names_dsc[index1]
    params_dsc[name] = {
        "macro": macro("Price/historical_price/DSC/{}.csv".format(name))
    }

file_names_fsin = ['fast_fashion', 'normal', 'ceo_crisis', 'normal']
length_fsin = [150, 60, 80, 110]
fund_weights_fsin = [0.8, 0.75, 0.9, 0.1]
params_fsin = {}
for index in range(len(file_names_fsin)):
    name = file_names_fsin[index]
    params_fsin[name] = {
        "macro": macro("Price/historical_price/FSIN/{}.csv".format(name))
    }

file_names_hhw = ['normal', 'mete_business_1', 'mete_business_2', 'business_restructure']
length_hhw = [110, 90, 80, 110]
fund_weights_hhw = [0.35, 1, 1, 1]
params_hhw = {}
for index in range(len(file_names_hhw)):
    name = file_names_hhw[index]
    params_hhw[name] = {
        "macro": macro("Price/historical_price/HHW/{}.csv".format(name))
    }

file_names_jky = ['margin_call', 'interest', 'crisis_survival', 'normal']
length_jky = [115, 80, 80, 120]
fund_weights_jky = [0.9, 1, 1, 0.1]
params_jky = {}
for index in range(len(file_names_jky)):
    name = file_names_jky[index]
    params_jky[name] = {
        "macro": macro("Price/historical_price/JKY/{}.csv".format(name))
    }

file_names_sgo = ['normal', 'new_medicine', 'share_purchase', 'competition', 'success_medicine']
length_sgo = [100, 90, 60, 90, 50]
fund_weights_sgo = [0.8, 0.8, 1, 0.9, 0.8]
params_sgo = {}
for index in range(len(file_names_sgo)):
    name = file_names_sgo[index]
    params_sgo[name] = {
        "macro": macro("Price/historical_price/SGO/{}.csv".format(name))
    }

file_names_wrkn = ['IPO', 'normal', 'new_business_strategy']
length_wrkn = [230, 100, 70]
fund_weights_wrkn = [0.75, 0.6, 1]
params_wrkn = {}
for index in range(len(file_names_wrkn)):
    name = file_names_wrkn[index]
    params_wrkn[name] = {
        "macro": macro("Price/historical_price/WRKN/{}.csv".format(name))
    }