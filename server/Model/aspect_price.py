from typing import Optional
import numpy as np
from copy import deepcopy

from pydantic import NumberNotGeError

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
		micro_params: object,
		price_range: Optional[float] = 2,
		minimum_simulation_tick: Optional[float] = 0.01,
		minimum_price_unit: Optional[float] = 0.01,
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

#price bound preparation
		self.price_range = price_range
		self.upper = self.second_price+self.price_range
		if self.second_price >= self.price_range:
			self.lower = self.second_price-self.price_range
		else:
			self.lower = 0

		#Dictionary parameters preparation
		self.minimum_second_unit = 1/(60*60)
		self.minimum_price_unit = minimum_price_unit
		self.minimum_simulation_tick = minimum_simulation_tick

		#Dictionary function preparation
		self.total_index = int((self.upper-self.lower)//self.minimum_price_unit)
		self.price_change = 0
		self.micro_params = micro_params(self.total_index, self.price_change)
		self.micro_params_function = micro_params

		#preparation for D&B process
		self.ask_bid_list = self.initial_trading_population()

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
		ask_bid = []
		for _ in range(num):
			previous_price = self.second_price
			mu_tmp = drift
			sigma = 0.08
			next_price = self.per_second_price(mu_tmp, sigma)
			self.second_price = next_price

			self.ask_bid_list = self.ontk_trading_population(previous_price, self.second_price)
			price_index = int((self.second_price-self.lower)//self.minimum_price_unit)
			LOB = self.ask_bid_list[(price_index-4):(price_index+6)]
			daily_price.append(round(self.second_price,2))
			result_price = self.order_book_influence(LOB, next_price)
			print(round(self.second_price,2), round(result_price, 2))
			ask_bid.append(LOB)

		daily_price[-1] = adjust_price
		self.second_price_lst = daily_price
		return daily_price, ask_bid
        
	def order_book_influence(
		self,
		ask_bid_list: list,
		original_value: float,
	):

		random_factor = np.random.normal(0,1)
		try:
			imbalance_1 = abs(ask_bid_list[4])/(abs(ask_bid_list[4])+abs(ask_bid_list[5]))

		except ZeroDivisionError:
			imbalance_1 = 0
		try:
			imbalance_2 = abs(ask_bid_list[3])/(abs(ask_bid_list[3])+abs(ask_bid_list[6]))

		except ZeroDivisionError:
			imbalance_2 = 0
		try:
			imbalance_3 = abs(ask_bid_list[2])/(abs(ask_bid_list[2])+abs(ask_bid_list[7]))

		except ZeroDivisionError:
			imbalance_3 = 0
		try:
			imbalance_4 = abs(ask_bid_list[1])/(abs(ask_bid_list[1])+abs(ask_bid_list[8]))
		except ZeroDivisionError:
			imbalance_4 = 0
		try:
			imbalance_5 = abs(ask_bid_list[0])/(abs(ask_bid_list[0])+abs(ask_bid_list[9]))

		except ZeroDivisionError:
			imbalance_5 = 0

		micro_price = random_factor * (imbalance_1 * (-0.2638) + imbalance_2 * 0.1154 + imbalance_3 * (-0.4902) + imbalance_4 * (-0.1657) + imbalance_5 * (0.2239))
		print(micro_price)
		market_value = original_value + micro_price
		return (market_value)

	def initial_trading_population(
		self,
		initial_length: Optional[int] = 1000,
		normal_scale: Optional[int] = 10
	):
		random_normal_dist = np.random.normal(loc = self.second_price, scale = normal_scale, size = initial_length)
		list_size = np.arange(self.lower, self.upper, self.minimum_price_unit)
		ask_bid_list = [0 for _ in list_size]

		for price in random_normal_dist:
			if price < self.lower or price > self.upper:
				continue
			index = int((price-self.lower)//self.minimum_price_unit)
			if price >= int(self.second_price):
				ask_bid_list[int(index)] += 1
			else:
				ask_bid_list[int(index)] -= 1
		return ask_bid_list

	def ontk_trading_population(
		self,
		previous_comp_price: float,
		current_comp_price: float,
		population_strength: Optional[int] = 1,
		markov_step: Optional[int] = 10
	):
		ask_bid_list_tmp = deepcopy(self.ask_bid_list)
		index_previous = int((previous_comp_price-self.lower)//self.minimum_price_unit)
		index_current = int((current_comp_price-self.lower)//self.minimum_price_unit)
		index_difference = index_current-index_previous
		ask_bid_list = [0 for _ in self.ask_bid_list]

		for index in range((index_current-markov_step),(index_current+markov_step)):
			old_index = index - index_difference
			if old_index >= 0 and old_index < len(ask_bid_list_tmp):
				ask_bid_list[index] = round(0.15 *  ask_bid_list_tmp[old_index])
			else:
				ask_bid_list[index] = 0

		self.lower += self.second_price - previous_comp_price
		self.upper += self.second_price - previous_comp_price
		index_current = int((self.second_price-self.lower)/self.minimum_price_unit)
		iteration_number = np.arange(0, population_strength, self.minimum_simulation_tick)

		for index in range(0, index_current):
			lamb_low = self.micro_params['lamb_low'][index]
			mu_low = self.micro_params['mu_low'][index]

			if ask_bid_list[index] > 0:
				ask_bid_list[index] = 0
				reset_population = self.initial_trading_population(initial_length = 1500, normal_scale = 7)
				middle_index = int((self.second_price-self.lower)//self.minimum_price_unit)
				reset_list = reset_population[middle_index - abs(index_difference) : middle_index]
				for value in reset_list:
					ask_bid_list[index] = -abs(value)

			for _ in iteration_number:
				random = np.random.rand()
				if  random <= lamb_low * self.minimum_simulation_tick:
						ask_bid_list[index] -= 1
				elif random <= (mu_low + lamb_low) * self.minimum_simulation_tick and ask_bid_list[index] < 0:
						ask_bid_list[index] += 1
				else:
					continue

		for index in range(index_current, len(ask_bid_list)):
			lamb_up = self.micro_params['lamb_up'][index]
			mu_up = self.micro_params['mu_up'][index]

			if ask_bid_list[index] < 0:
				ask_bid_list[index] = 0
				reset_population = self.initial_trading_population(initial_length = 1500, normal_scale = 7)
				middle_index = int((self.second_price-self.lower)//self.minimum_price_unit)
				reset_list = reset_population[middle_index : middle_index - abs(index_difference)]
				for value in reset_list:
					ask_bid_list[index] = abs(value)

			for _ in iteration_number:
				random = np.random.rand()
				if random <= lamb_up * self.minimum_simulation_tick:
					ask_bid_list[index] += 1
				elif random <= (mu_up + lamb_up) * self.minimum_simulation_tick and ask_bid_list[index] > 0:
					ask_bid_list[index] -= 1
				else:
					continue
		return ask_bid_list

	def change_price(self, modifying_lst):
		self.modified_lst = np.add(self.second_price_lst, modifying_lst)
		return(self.modified_lst)




##Testing
from get_parameters import Wakron_macro, Wakron_micro

wrkn_macro_params = Wakron_macro["IPO"]()
wrkn_micro_params = Wakron_micro["IPO"]

wrkn_simulator = DayPriceGenerator(wrkn_macro_params)
day_price_list = {
    "wrkn": wrkn_simulator.price_loop()
}

adjusted_factor = {
    "wrkn": 50/day_price_list["wrkn"][1]
}
price_generator = StockSimulator(
    adjusted_factor["wrkn"], day_price_list["wrkn"][0], day_price_list["wrkn"], 1, wrkn_micro_params)

price_list, ask_bid_lst = price_generator.generate_price()
print(ask_bid_lst)