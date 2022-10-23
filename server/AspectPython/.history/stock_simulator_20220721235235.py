from turtle import color
from get_parameters import event_mapping_dict, Wakron_macro, Wakron_micro
from typing import Optional
import numpy as np
import matplotlib.pyplot as plt 
from copy import deepcopy
import time
import pandas as pd

class StockSimulator:
	"""
	StockSimulator simulates stock prices under exceptional conditions, referencing past major financial events.
	The simulator considers two approachs: macro and micro.
	The macro situation focuses on market conditions such as extreme leverage, new monetary policies, etc.
	The core mathematical algorithm behind is the Stochastic Differential Equation (SDE).
	Some SDEs applied in this model is the Ornstein-Uhlenbeck (OU) process.
	The micro situation focuses on the stock trading, specifically the demand and supply for each given price (AKA ask and bid prices).
	The core mathematical algorithm behind is the Death and Birth Process, which is a stochastic Markov chain to simulate population.
	The Death and Birth Process is composed of two Poisson Distributions.
	Through a combination of both macro and micro approaches, the model is able to precisely simulate the "virtual" stock prices.
	All necessary parameters used in the models are saved in the get_parameters.py file in the form of dictionary.
	"""

	def __init__(
		self,  
		initial_price: float,
		original_price: float,
		macro_params: dict,
		micro_params: object,
		price_range: Optional[float] = 10,
		minimum_simulation_tick: Optional[float] = 0.01,
		minimum_price_unit: Optional[float] = 0.2,
		fixed_random_seed: Optional[bool] = True,
		random_seed: Optional[int] = 17
	):
		"""
		Parameters
		----------
		initial_price: float,
			The initialized-price for the price SDE simulation.
		original_price: float,
			The orginal initial price in history.
		macro_params: dict,
			Imported from get_paramters.py file, containers the required parameters for specific macro scenario.
		micro_params: function,
			Imported from get_paramters.py file, containers the required parameters for Death & Birth Process.
			The function returns a dictionary.
		price_range: float, default=10, Optional,
			The total number of prices documented during the Death & Birth Process.
		minimum_simulation_tick: float, default=0.01, Optional,
			The minimum time step used in the price simulations.
			0.01 unit resembles 1 day in real-world stock market.
		minimum_price_unit: float, default=0.5, Optional,
			The minimum price change unit applied in the Death & Birth model.
			Unit for each of the step_ask_bid_price.
		fixed_random_seed: bool, default=True, Optional,
			Asks whether a fixed random seed is needed.
		random_seed: int, default=17, Optional,
			Defines the random seed.
		"""
		#price storage
		self.original_price = original_price
		self.initial_price = initial_price
		self.price = initial_price
		self.second_price = initial_price
		self.price_list = []
		self.second_price_lst = []

		#price bound preparation
		self.price_range = price_range
		self.upper = self.second_price+self.price_range
		if self.price >= self.price_range:
			self.lower = self.second_price-self.price_range
		else:
			self.lower = 0

		#Dictionary parameters preparation
		self.minimum_second_unit = 1/(60*60)
		self.minimum_price_unit = minimum_price_unit
		self.minimum_simulation_tick = minimum_simulation_tick
		self.macro_params = macro_params

		#Dictionary function preparation
		self.total_index = int((self.upper-self.lower)//self.minimum_price_unit)
		self.price_change = 0
		self.micro_params = micro_params(self.total_index, self.price_change)

		#preparation for D&B process
		self.ask_bid_list = self._initial_trading_population()
		
		#timing output
		self.event_initial_time = time.time()

		#set random seed
		if fixed_random_seed:
			np.random.seed(random_seed)

	def ontk_price(self, theta, mu, sigma):
		"""
		ontk_price calculates the last-tick price through a stochastic process, 
		using the Stochastic Differential Equation (SDE).
		It applies the Ornstein-Uhlenbeck (OU) process.
		Brownian motion is applied to decribe the randomness in stock prices.

		Parameter
		---------
		theta: float,
			The speed for how fast the price converge to its mean.
			Ornstein-Uhlenbeck is also called a "mean reversion process".
		mu: float,
			The mean of the stock price.
			Can also be understanded as the "convolution" of prices or the "moving average".
		sigma: floast,
			The volatility of the stock price.

		Return
		------
		The function returns the next day's simulated price.
		"""
		tmp_bm = np.random.normal(0,1)
		simulated_price = self.price + theta * (mu-self.price) + sigma * tmp_bm
		return simulated_price


	def price_loop(
		self
	):
		"""
			This function loops each daily stock price changes into an entire event time dimension.
			The output of this function is a list with all the simulated day-dimension prices.
		"""
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

	def per_second_price(self, mu, sigma):
		"""
			This function is the second-order SDE for per-second price calculation.
			In this case, a Geometric Brownian Motion is used.
			Two parameters are required for this function, which are mu and sigma.
		"""
		tmp_bm = np.random.normal(0, self.minimum_second_unit)
		simulated_price = self.second_price + mu * self.second_price * self.minimum_price_unit + sigma * np.sqrt(self.second_price) * tmp_bm
		return simulated_price
	
	def loop_per_second(self):
		"""
			This function calculates the per-second stock price.
			Most available data online are daily-based.
			To solve this issues, a second layer of Brownian Motion is takened.
			In our "game world", 10 days in reality equals to one day in the game.
			Thus we take the derivatives between 10 points and apply random Brownian Motion based on the slope.
			It follows the real-world trend since most inner-day stock price movements are highly irregular and volatile.
		"""
		self.price_loop()
		adjust_factor = self.initial_price/self.original_price
		adjusted_price = [i*adjust_factor for i in self.price_list]

		split = [adjusted_price[i:i+10] for i in range(0, len(adjusted_price), 10)]


		price_lst = []
		
		for index in range(len(split[:-1])):
			one_day = split[index]
			one_day_df = pd.DataFrame(one_day, columns = ['one_day_price'])
			drift = one_day_df.pct_change()
			drift = drift[1:]['one_day_price'].tolist()
			        
			initial_price = one_day[0]
			num = int(9/self.minimum_second_unit) #9 denotes the market opens for 9 hours per day.
			initial_price = one_day[0]

			daily_price = [initial_price]

			for inx in range(num):
				mu_tmp = drift[int(inx*self.minimum_second_unit)] * 0.5
				sigma = 0
				next_price = self.per_second_price(mu_tmp, sigma)
				self.second_price = next_price
				daily_price.append(next_price)
			
			daily_price[-1] = one_day[-1]
			self.second_price_lst += daily_price
			price_lst += daily_price
		return (price_lst)

#Checkpoint: SDE is done.
#Micro algorithm below.

	def _initial_trading_population(
		self,
		initial_length: Optional[int] = 5000,
		normal_scale: Optional[int] = 10
	):
		"""
		_initial_trading_population is an internal attribute in StockSimulator.
		It helps to initialize the supply and demand for stock prices through normal distribution.
		It obeys the belief that closer to the current price, the supply and demand will both increase.
		If the randomized price is greater than price, people tend to sell (marks as +).
		If the randomized price is less than price, people tend to buy (marks as -).

		Parameters
		----------
		initial_length: int, default=5000, Optional,
			Size for the normal distribution.
		normal_scale: int, default=10, Optional,
			Standard deviation for the normal distribution.

		Return
		------
		The function returns the initialized population (supply and demand) for the given stock.
		"""
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

#Checkpoint: Population initialization is done.
	def ontk_trading_population(
		self,
		previous_comp_price: float,
		population_strength: Optional[int] = 15,
		markov_step: Optional[int] = 30
	):
		"""
		ontk_trading_population generates the supply and demand for different prices through the Death & Birth process.
		Lamb and Mu controls the supply and demand.
		Lamb modifies sell (+).
		Mu modifies buy (-).
		It reflects the micro side of the market condition.

		Parameters
		----------
		previous_comp_price: float,
			Company price from the last minimum_simulation_tick
		population_strength: int, default=15, Optional,
			Strength for the supply and demand population.
		markov_step: int, default=35, Optional,
			D&B process on poisson distribution is a Markov Chain.
			Current tick will inherite information from past ticks.
			markov_step measures the steps to inherite.

		Return
		------
		The function returns the initialized population (supply and demand) for the given stock.
		"""
		ask_bid_list_tmp = deepcopy(self.ask_bid_list)
		index_previous = int((previous_comp_price-self.lower)//self.minimum_price_unit)
		index_current = int((self.second_price-self.lower)//self.minimum_price_unit)
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
			lamb_low = self.comp_parameter_dict_micro['lamb_low'][index]
			mu_low = self.comp_parameter_dict_micro['mu_low'][index]

			if ask_bid_list[index] > 0:
				ask_bid_list[index] = 0
				reset_population = self._initial_trading_population(initial_length = 1500, normal_scale = 7)
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
			lamb_up = self.comp_parameter_dict_micro['lamb_up'][index]
			mu_up = self.comp_parameter_dict_micro['mu_up'][index]

			if ask_bid_list[index] < 0:
				ask_bid_list[index] = 0
				reset_population = self._initial_trading_population(initial_length = 1500, normal_scale = 7)
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

initial_price = 56.67 #randomly selected value for testing
original_price = 38.23 #start value for FaceBook IPO event
macro_params = Wakron_macro["IPO"]()
micro_params = Wakron_micro["IPO"]

simulator = StockSimulator(initial_price, original_price, macro_params, micro_params)
second_price_lst = simulator.loop_per_second()
# print(second_price_lst)

# x_value = range(0, len(second_price_lst), 1)
# plt.figure(figsize=(10, 6))
# plt.plot(x_value, second_price_lst, label="Per Second Simulated Price Plot", color="orange", alpha = 0.5, linewidth = 1.5)
# plt.show()