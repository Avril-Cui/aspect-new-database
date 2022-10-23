import matplotlib.pyplot as plt 
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression

def generate_parameter(price_list):
    sampling_price_list = []
    for index in range(len(price_list)):
        price_list = []
        if len(price_list)-index > 10:
            for number in range(10):
                price_list.append(price_list[index+number])
            sampling_price_list.append(price_list)

    theta = []
    sigma = []
    mu = []

    for index in range(len(sampling_price_list)):
        X_t = np.array(sampling_price_list[index])
        y = np.diff(X_t)
        X = X_t[:-1].reshape(-1, 1)
        reg = LinearRegression(fit_intercept=True)
        reg.fit(X, y)
        alpha = -reg.coef_[0]
        gamma = reg.intercept_ / alpha
        y_hat = reg.predict(X)
        beta = np.std(y - y_hat)
        theta.append(alpha)
        mu.append(gamma)
        sigma.append(beta)

    return(theta, sigma, mu)
    
