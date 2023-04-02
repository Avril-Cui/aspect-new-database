"""
Note from 12/23: pandas datareader get_data_yahoo has some bug.
pdr_override is used to temperarily fix this bug.
This issue might be fixed by yahoo later.
"""
from typing import Optional
import numpy as np
from copy import deepcopy
from pandas_datareader import data as pdr
import yfinance as yf
np.random.seed(17)
yf.pdr_override()


class DayPriceGenerator:
    def __init__(
        self,
        macro_params: dict,
    ):
        self.original_price = macro_params['original_price']
        self.macro_params = macro_params
        self.price = macro_params['original_price']
        self.price_list = []
        self.minimum_simulation_tick = 0.01

    def ontk_price(self, theta, mu, sigma):
        tmp_bm_coeff = np.random.normal(0,1) * np.sqrt(self.minimum_simulation_tick)
        simulated_price = self.price + theta * (mu-self.price) * self.minimum_simulation_tick + sigma * tmp_bm_coeff 
        return simulated_price

    def price_loop(
        self
    ):
        mu_lst = self.macro_params["mu_sde"]
        theta_lst = self.macro_params["theta"]
        sigma_lst = self.macro_params["sigma"]
        time_length = self.macro_params["time"]

        for index in range(time_length):
            mu = mu_lst[index]
            theta = theta_lst[index]
            sigma = sigma_lst[index]
            next_price = self.ontk_price(theta, mu, sigma)
            self.price = next_price
            self.price_list.append(next_price)

        return (self.price_list)

class MidPriceGenerator:
    def generate_mid_price(start_date, end_date, symbol, ma_days):
        mid_price = pdr.get_data_yahoo(
            symbol, start_date, end_date)['Adj Close']
        convolution_wave = mid_price.rolling(window=ma_days).mean()[
            ma_days:].to_list()
        return convolution_wave

class WaveModifier:
	def __init__(self) -> None:
		pass

	def normalize_price(self, price_list):
		price_lst = np.divide(price_list, price_list[0])
		return price_lst

	def price_wave_intensity(self, base_price, intensity_factor):
		new_price_wave = np.multiply(base_price, intensity_factor)
		return new_price_wave

	def price_wave_addition(self, transformation, intensity, length, *argv):
		price_list = [0 for _ in range(length)]
		for wave_info in argv:
			price = wave_info["price_list"][wave_info["start_point"]:wave_info["start_point"]+wave_info["duration"]]
			normal_wave = self.normalize_price(
                price)
			weighted_wave = np.multiply(normal_wave, wave_info['weight'])
			price_list = np.add(price_list, weighted_wave)
		price_list = self.price_wave_intensity(price_list, intensity)
		price_list = np.add(price_list, transformation)
		return price_list

class StockSimulator:
    def __init__(
            self,
            adjusted_factor: float,
            initial_price: float,
            day_price_lst: list,
            index: int,
            fixed_random_seed: Optional[bool] = False,
            random_seed: Optional[int] = 17
    ):

        # price storage
        self.adjusted_factor = adjusted_factor
        self.initial_price = initial_price - adjusted_factor
        self.second_price = initial_price - adjusted_factor
        self.second_price_lst = []
        self.index = index

        self.day_price_lst = day_price_lst
        self.modified_lst = []
        # set random seed
        if fixed_random_seed:
            np.random.seed(random_seed)

    def generate_price(self):
        adjust_price =  self.day_price_lst[self.index] - self.adjusted_factor
        adjusted_last = self.day_price_lst[self.index-1] - self.adjusted_factor 
        drift = (adjust_price - adjusted_last)/(adjusted_last)
        sigma = 0.0001
        dt = 1/(60*60)
        num = int(1/dt)
        tmp_bm_coeff = np.random.normal(0,1) * (dt)
        daily_price = []
        for _ in range(num):
            self.second_price += drift * self.second_price * dt + sigma *(self.second_price) * tmp_bm_coeff
            daily_price.append(round(self.second_price, 2))

        # daily_price[-1] = adjust_price
        self.second_price_lst = daily_price
        return daily_price

from get_parameters import index_params_index
import matplotlib.pyplot as plt

file_names_index = ['normal1', 'mete1_1', 'mete1_2', 'mete2', 'mete3', 'mete4', 'mete5']
event_name = "mete1_2"
macro = index_params_index[event_name]["macro"]
stock_simulator = DayPriceGenerator(macro)
price = stock_simulator.price_loop()
print(price[0])
per_second_simulator = StockSimulator(300, price[0], price, 0)
price_list = per_second_simulator.generate_price()

plt.plot(price_list)
plt.show()