# from get_parameters import event_mapping_dict, Wakron_macro, Wakron_micro
from typing import Optional
import numpy as np
# import matplotlib.pyplot as plt 
from copy import deepcopy
import time
import pandas as pd

class DayPriceGenerator:
	def __init__(
		self,  
		macro_params: dict,
		fixed_random_seed: Optional[bool] = True,
		random_seed: Optional[int] = 17
	):
		self.original_price = macro_params['original_price']
		self.macro_params = macro_params
		self.price = macro_params['original_price']
		self.price_list = []

		if fixed_random_seed:
			np.random.seed(random_seed)
	
	def ontk_price(self, theta, mu, sigma):
		tmp_bm = np.random.normal(0,1)
		simulated_price = self.price + theta * (mu-self.price) + sigma * tmp_bm
		return simulated_price
	
	def price_loop(
		self
	):
		mu_lst = self.macro_params["mu_sde"]
		sigma_lst = self.macro_params["sigma"]
		theta_lst = self.macro_params["theta"]
		time_length = self.macro_params["time"]

		for index in range(time_length):
			mu = mu_lst[index]
			theta = theta_lst[index]
			sigma = sigma_lst[index]
			next_price = self.ontk_price(theta, mu, sigma)
			self.price = next_price
			self.price_list.append(next_price)
		
		return (self.price_list)

class StockSimulator:
	def __init__(
		self,  
		adjusted_factor: float,
		initial_price: float,
		day_price_lst: list,
		index: int,
		macro_params: dict,
		fixed_random_seed: Optional[bool] = True,
		random_seed: Optional[int] = 17
	):
		
		#price storage
		self.adjusted_factor = adjusted_factor
		self.initial_price = initial_price * adjusted_factor
		self.second_price = initial_price * adjusted_factor
		self.second_price_lst = []
		self.index = index

		self.day_price_lst = day_price_lst

		self.modified_lst = []

		#set random seed
		if fixed_random_seed:
			np.random.seed(random_seed)

	def per_second_price(self, mu, sigma):

		dt = 1/(60*60)
		tmp_bm = np.random.normal(0, np.sqrt(dt))
		next_price = self.second_price + mu * self.second_price * dt + sigma * np.sqrt(self.second_price) * tmp_bm
		return next_price

	def generate_price(self):
		adjust_price = self.adjusted_factor * self.day_price_lst[self.index]
		adjusted_last = self.adjusted_factor * self.day_price_lst[self.index-1]
		drift = (adjust_price - adjusted_last)/(adjusted_last)
		dt = 1/(60*60)
		num = int(1/dt)
		daily_price = []
		for _ in range(num):
			mu_tmp = drift
			sigma = 0.08
			next_price = self.per_second_price(mu_tmp, sigma)

			self.second_price = next_price
			daily_price.append(round(self.second_price,2))

		daily_price[-1] = adjust_price
		self.second_price_lst = daily_price
		return daily_price

	def change_price(self, modifying_lst):
		self.modified_lst = np.add(self.second_price_lst, modifying_lst)
		return(self.modified_lst)




###Testing
# from get_parameters import Wakron_macro, Wakron_micro

# wrkn_macro_params = Wakron_macro["IPO"]()
# wrkn_micro_params = Wakron_micro["IPO"]

# wrkn_simulator = DayPriceGenerator(wrkn_macro_params)
# day_price_list = {
#     "wrkn": wrkn_simulator.price_loop()
# }

# adjusted_factor = {
#     "wrkn": 50/day_price_list["wrkn"][1]
# }
# price_generator = StockSimulator(
#     adjusted_factor["wrkn"], day_price_list["wrkn"][0], day_price_list["wrkn"], 1, wrkn_macro_params)

# price_lst = price_generator.generate_price()

# adjust_factor = []
# for _ in range(len(price_lst)):
# 	adjust_factor.append(-1)

# changed_price_lst = price_generator.change_price(adjust_factor)

# print("original_lst: " + str(price_lst[:5]))
# print("modified_lst: " + str(changed_price_lst[:5]))