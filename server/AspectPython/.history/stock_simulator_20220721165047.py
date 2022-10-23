from get_parameters import event_mapping_dict, Wraken_macro, Wraken_micro
from typing import Optional
import numpy as np
import matplotlib.pyplot as plt 
from copy import deepcopy
import time
import pandas as pd

class StockSimulator:
	"""
	StockSimulator simulates stock prices under exceptional conditions, referencing past financial events.
	The simulator considers two approachs: macro and micro.
	The macro situation focuses on market conditions such as extreme leverage, new monetary policies, etc.
	The core mathematical algorithm behind is the Stochastic Differential Equation (SDE).
	Some SDEs applied in this model are the Geometric Brownian Motion (GBM) and the Ornstein-Uhlenbeck (OU) process.
	There are three orders of SDE applied in the model, representating the convolution (moving-average), index price, and stock price respectively.
	The micro situation focuses on the stock trading, specifically the demand and supply for each given price (AKA ask and bid prices).
	The core mathematical algorithm behind is the Death and Birth Process, which is a stochastic Markov chain to simulate population.
	Through a combination of both macro and micro approaches, the model is able to precisely simulate the "virtual" stock prices.
	All necessary parameters used in the models are saved in the get_parameters.py file.
	"""

	def __init__(
		self,  
		index_initial_price: float, 
		comp_initial_price: float,
		event_mapping_dict: dict,
		company_mapping_dict_macro: dict,
		company_mapping_dict_micro: dict,
		event: Optional[str] = 'normal_event',
		comp_event: Optional[str] = 'normal',
		price_range: Optional[float] = 30,
		minimum_simulation_tick: Optional[float] = 0.01,
		minimum_price_unit: Optional[float] = 0.2,
		fixed_random_seed: Optional[bool] = True,
		random_seed: Optional[int] = 17
	):
		"""
		Parameters
		----------
		index_initial_price: float,
			The initialized-price for the index SDE simulation.
		comp_initial_price: float,
			The initialized_price for the company price and population simulation.
		event_mapping_dict: dict,
			Imports from the get_parameters.py file, contains parameters under specific macro scenarios.
		company_mapping_dict: dict,
			Imports from the get_parameters.py file, contains parameters for specific company's situations.
		event: str, default='normal', Optional,
			Macro events, key to get the index parameter for the index price.
		comp_event: str, default='normal', Optional,
			Event applied on each company, key to the company paramters for the company price.
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
		self.initial_index_price = index_initial_price
		self.index_price = index_initial_price
		self.index_price_list = [index_initial_price]
		self.index_sec_price = index_initial_price

		self.initial_comp_price = comp_initial_price
		self.comp_price = comp_initial_price
		self.comp_price_list = [comp_initial_price]
		self.comp_sec_price = comp_initial_price
		self.comp_tick_price = comp_initial_price

		self.first_order_price = index_initial_price
		self.third_order_price = comp_initial_price

		#price bound preparation
		self.price_range = price_range
		self.upper = self.comp_tick_price+self.price_range
		if self.comp_price >= self.price_range:
			self.lower = self.comp_tick_price-self.price_range
		else:
			self.lower = 0

		#Dictionary parameters preparation
		self.minimum_second_unit = 1/(60*12*9)
		self.minimum_price_unit = minimum_price_unit
		self.minimum_simulation_tick = minimum_simulation_tick
		self.event_parameter_dict = event_mapping_dict[event]()
		self.comp_parameter_dict_macro = company_mapping_dict_macro[comp_event]()

		#Dictionary function preparation
		self.total_index = int((self.upper-self.lower)//self.minimum_price_unit)
		self.price_change = 0
		self.company_mapping_dict = company_mapping_dict_micro
		self.comp_event = comp_event
		self.comp_parameter_dict_micro = company_mapping_dict_micro[comp_event](self.total_index, self.price_change)

		#preparation for D&B process
		self.ask_bid_list = self._initial_trading_population()
		
		#timing output
		self.event_initial_time = time.time()
		
		#set random seed
		if fixed_random_seed:
			np.random.seed(random_seed)
		
		#index and comp price in different time dimensions
		self.index_day_based_price_list =[]
		self.index_tick_based_price_list = []
		self.index_second_based_price_list = []
		self.comp_day_based_price_list =[]
		self.comp_tick_based_price_list = []
		self.comp_second_based_price_list = []

	def set_comp_parameter_micro(self):
		self.comp_parameter_dict_micro = self.company_mapping_dict[self.comp_event](self.total_index, self.price_change)

	def ontk_first_order_indx(self, mu_sde, sigma):
		"""
		ontk_first_order_indx simulates the convolution of the index prices.
		From a long-term macro-market perspective, the stock market's growth is controlled by the "drift".
		Short term volatility/fluctuation in prices is only noice caused by unstable and unknown factors.
		Based on this theory, the first order SDE is programmed upon a convolution of historical stock price.
		It references the convolution's derivative as the "drift (mu)", with less volatility (sigma).
		The SDE model applied here is a Geometric Brownian Motion (the Black Scholes Model).

		Parameter
		---------
		mu_sde: list,
			A list which stores mu values for each corresponding prices.

		Return
		------
		The function returns the first order price (convolution price) in the next minimum_simulation_tick.
		"""
		tmp_bm_first_order = np.random.normal(0,1) * np.sqrt(self.minimum_simulation_tick)
		first_order_sde = self.first_order_price + mu_sde * self.first_order_price * self.minimum_simulation_tick + sigma * np.sqrt(self.first_order_price) * tmp_bm_first_order 
		return first_order_sde

	def ontk_sde_indx(self, theta, sig1):
		"""
		ontk_sde_indx manipulates the last-tick index price through a stochastic process, 
		using the Stochastic Differential Equation (SDE).
		It is the second order SDE built upon the first order.
		It applies the Ornstein-Uhlenbeck (OU) process, with a balance parameter as the first_order_sde (convolution).
		Volatility of the prices are calculated through squared error of historical growth.
		Brownian motion is applied to decribe the randomness in stock prices.

		Parameter
		---------
		sig1: list,
			A list which stores the volatility values for corresponding prices.

		Return
		------
		The function returns the index price in the next minimum_simulation_tick.
		"""
		tmp_bm_second_order = np.random.normal(0,1) * np.sqrt(self.minimum_simulation_tick)
		index_next_tick_price = self.index_price + theta * (self.first_order_price-self.index_price)*self.minimum_simulation_tick + sig1 *tmp_bm_second_order
		return index_next_tick_price
	
	def ontk_third_order_comp(self, speed, sigma):
		"""
		ontk_first_order_indx simulates the convolution of the stock prices.
		It is the third order sde price build upon the index price.
		The third order is a Geometric Brownian Motion (GBM).
		The "drift (mu)" for the model considers both external market and internal company situations.
		Depends on the scenario, the mu takes a weight between market's drift and company's drift.
		This helps the model to match the reality that individual company price is correlated to the index price.
		
		Parameter
		---------
		speed: list,
			A list which stores the speed coefficient (drift) for corresponding prices.

		Return
		------
		The function returns the stock convolution price in the next minimum_simulation_tick.
		"""
		tm_bm_third_order = np.random.normal(0,1) * np.sqrt(self.minimum_simulation_tick)
		third_order_sde = self.third_order_price + speed * self.third_order_price * self.minimum_simulation_tick + sigma * self.third_order_price * tm_bm_third_order
		return third_order_sde

	def ontk_sde_comp(self, theta, volatility):
		"""
		ontk_sde_comp manipulates the last-tick company's stock price through a stochastic process.
		It is the fourth order sde price build upon the index price.
		The fourth order is an Ornstein-Uhlenbeck (OU) process.
		Volatility of the prices are calculated through squared error of historical growth and its moving averages (convolution).
		Sigma, together with a brownian motion, model the market "noise" factors.

		Parameters
		----------
		volatility: list,
			A list which stores the volatility values for corresponding prices.

		Return
		------
		The function returns the company's stock price in the next minimum_simulation_tick
		"""
		tm_bm_fourth_order = np.random.normal(0,1) * np.sqrt(self.minimum_simulation_tick)
		comp_next_price = self.comp_price + theta * (self.third_order_price - self.comp_price) * self.minimum_simulation_tick + volatility * tm_bm_fourth_order
		return comp_next_price

	def index_per_tick_price_simulation(
		self,
		mu_tmp,
		tick_unit
	):
		"""
		The function generates a random Brownian Motion based on the calculated drift and sigma.
		It helps to output the stock price in the next second.
		"""

		sigma = 0.1
		brownian_motion = np.random.normal(0,1) * np.sqrt(tick_unit)
		index_next_tick_price = self.index_sec_price + mu_tmp * self.index_sec_price * tick_unit + sigma * np.sqrt(self.index_sec_price) * brownian_motion
		return index_next_tick_price

	def per_day_index_price(
		self,
		initial_point,
		mu,
		daily_hour: Optional[int] = 9,
		tick_in_min: Optional[int] = 12
    ):
		"""
		This function loops the index_per_tick_price_simulation function.
		It outputs the daily price change.
		It's minimum unit is 1 second.
		"""
		tick_unit = 1/(60*tick_in_min)
		total_iteration_number = int(daily_hour/tick_unit)
		self.index_sec_price = initial_point
		daily_price_list = [initial_point] 
		for iteration in range(total_iteration_number):
			mu_tmp = mu[int(iteration*tick_unit)]*1.4
			self.index_sec_price = self.index_per_tick_price_simulation(mu_tmp, tick_unit)
			daily_price_list.append(self.index_sec_price)
		return daily_price_list

	def scaled_daily_index_price(
		self,
		daily_price_list,
		adjust_num: Optional[int] = 36
	):
		"""
		This function selections 1 tick per 36 seconds.
		It scales the daily index price from second based to tick based.
		"""
		daily_price_scaled = []
		for index in range(len(daily_price_list)):
			if index % adjust_num == 0:
				daily_price_scaled.append(daily_price_list[index])
		return daily_price_scaled

	def end_loop_tick_based_index_price(
		self
	):
		"""
		This function loops each daily stock price changes into an entire event time dimension.
		It first selects ten points from the original time dimension.
		According to the ten points, the function is able to calculate the daily drifts.
		The drift guides the random Brownian Motion.
		By looping the price changes together, price with three different time dimensions are generated.

		Return
		------
		day_based_price_list: list,
			The unit for this list is DAY.
			The closed price for each day is recorded.
		tick_based_price_list: list,
			The unit for this list is TICK. 
			The price per adjust_num (default=35) is recorded.
		second_based_price_list: list,
			The unit for this list is SECOND.
			The price per second is recorded..
		"""
		#Set up price, split the price changes into small lists with ten elements.
		split_ten_points = [self.index_price_list[index:index+10] for index in range(0, len(self.index_price_list), 10)]
		day_based_price_list = [self.index_sec_price]
		tick_based_price_list = [self.index_sec_price]
		second_based_price_list = [self.index_sec_price]
		#Start the For loop.
		for inx in range(len(split_ten_points[:-1])):
			#Set up daily drift.
			one_day_ten_points = split_ten_points[inx]
			one_day_ten_points_df = pd.DataFrame(one_day_ten_points, columns = ['one_day_ten_prices'])
			daily_drift = one_day_ten_points_df.pct_change()
			daily_drift = daily_drift[1:]['one_day_ten_prices'].tolist()
			#Set initial value and output daily price (second based).
			initial_point = one_day_ten_points[0]
			daily_price_list = self.per_day_index_price(initial_point, daily_drift)
			daily_price_list[-1] = one_day_ten_points[-1]
			#Output scaled-prices (tick based) and daily based prices.
			tick_based_price_list += self.scaled_daily_index_price(daily_price_list)
			day_based_price_list.append(daily_price_list[-1])
			second_based_price_list += daily_price_list
		self.index_day_based_price_list = day_based_price_list
		self.index_tick_based_price_list = tick_based_price_list
		self.index_second_based_price_list = second_based_price_list
		return day_based_price_list, tick_based_price_list, second_based_price_list
	# The following four functions share the same properties as the four functions above.
	def comp_per_tick_price_simulation(
		self,
		mu_tmp,
		tick_unit
	):
		sigma = 0.05
		brownian_motion = np.random.normal(0,1) * np.sqrt(tick_unit)
		comp_next_tick_price = self.comp_sec_price + mu_tmp * self.comp_sec_price * tick_unit + sigma * np.sqrt(self.comp_sec_price) * brownian_motion
		return comp_next_tick_price



	def per_day_comp_price(
		self,
		initial_point,
		mu,
		daily_hour: Optional[int] = 9,
		tick_in_min: Optional[int] = 12
    ):
		tick_unit = 1/(60*tick_in_min)
		total_iteration_number = int(daily_hour/tick_unit)
		self.comp_sec_price = initial_point
		daily_price_list = [initial_point] 
		for iteration in range(total_iteration_number):
			mu_tmp = mu[int(iteration*tick_unit)]
			self.comp_sec_price = self.comp_per_tick_price_simulation(mu_tmp, tick_unit)
			daily_price_list.append(self.comp_sec_price)
		return daily_price_list


	def scaled_daily_comp_price(
		self,
		daily_price_list,
		adjust_num: Optional[int] = 36,
		step: Optional[int] = 5
	):
		daily_price_list_adjusted = daily_price_list
		daily_price_scaled = []
		step_ask_bid_list = []
		for index in range(len(daily_price_list)):
			if index % adjust_num == 0:
				previous_comp_price = deepcopy(self.comp_tick_price)
				self.comp_tick_price = daily_price_list_adjusted[index]
				print(self.comp_tick_price)
				self.price_change = (self.comp_tick_price-previous_comp_price)/previous_comp_price
				self.set_comp_parameter_micro()
				self.ask_bid_list = self.ontk_trading_population(previous_comp_price)
				price_index = int((self.comp_tick_price-self.lower)//self.minimum_price_unit)
				step_ask_bid_list = self.ask_bid_list[(price_index-step):(price_index+step+1)]

				difference = self.comp_parameter_dict_micro['lamb']-self.comp_parameter_dict_micro['mu']
				self.comp_tick_price = self.comp_tick_price + 0.1*difference
				print(self.comp_tick_price)
				print(step_ask_bid_list)
				daily_price_scaled.append(self.comp_tick_price)
				daily_price_list_adjusted[index] = self.comp_tick_price

				

		return daily_price_scaled, step_ask_bid_list, daily_price_list_adjusted

	def end_loop_tick_based_comp_price(
		self
	):
		#Set up three lists, split the price changes into small lists with ten elements.
		split_ten_points = [self.comp_price_list[i:i+10] for i in range(0, len(self.comp_price_list), 10)]
		day_based_price_list = [self.comp_sec_price]
		tick_based_price_list = [self.comp_sec_price]
		second_based_price_list = [self.comp_sec_price]

		five_step_ask_bid_list = []

		#Start the For loop.
		for inx in range(len(split_ten_points[:-1])):
			#Set up daily drift.
			one_day_ten_points = split_ten_points[inx]
			one_day_ten_points_df = pd.DataFrame(one_day_ten_points, columns = ['one_day_ten_prices'])
			daily_drift = one_day_ten_points_df.pct_change()
			daily_drift = daily_drift[1:]['one_day_ten_prices'].tolist()
			#Set initial value and output daily price (second based).
			initial_point = one_day_ten_points[0]
			daily_price_list = self.per_day_comp_price(initial_point, daily_drift)
			daily_price_list[-1] = one_day_ten_points[-1]
			#Output scaled-prices (tick based) and daily based prices.
			daily_price_scaled, five_step_ask_bid_list, daily_price_list_adjusted = self.scaled_daily_comp_price(daily_price_list)
			second_based_price_list += daily_price_list_adjusted
			tick_based_price_list += daily_price_scaled
			day_based_price_list.append(daily_price_list_adjusted[-1])
			

		self.comp_day_based_price_list = day_based_price_list
		self.comp_tick_based_price_list = tick_based_price_list
		self.comp_second_based_price_list = second_based_price_list

		return day_based_price_list, tick_based_price_list, second_based_price_list, five_step_ask_bid_list


#Checkpoint: SDE is done.
	def _initial_trading_population(
		self,
		initial_length: Optional[int] = 5000,
		normal_scale: Optional[int] = 10
	):
		"""
		_initial_trading_population is an internal attribute in StockSimulator.
		It helps to initialize the supply and demand for stock prices through normal distribution.
		It obeys the belief that closer to the current price, the supply and demand will both increase.
		If the randomized price is greater than comp_price, people tend to sell (marks as +).
		If the randomized price is less than comp_price, people tend to buy (marks as -).

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
		random_normal_dist = np.random.normal(loc = self.comp_tick_price, scale = normal_scale, size = initial_length)
		list_size = np.arange(self.lower, self.upper, self.minimum_price_unit)
		ask_bid_list = [0 for _ in list_size]

		for price in random_normal_dist:
			if price < self.lower or price > self.upper:
				continue
			index = int((price-self.lower)//self.minimum_price_unit)
			if price >= int(self.comp_tick_price):
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
		index_current = int((self.comp_tick_price-self.lower)//self.minimum_price_unit)
		index_difference = index_current-index_previous
		ask_bid_list = [0 for _ in self.ask_bid_list]

		for index in range((index_current-markov_step),(index_current+markov_step)):
			old_index = index - index_difference
			if old_index >= 0 and old_index < len(ask_bid_list_tmp):
				ask_bid_list[index] = round(0.15 *  ask_bid_list_tmp[old_index])
			else:
				ask_bid_list[index] = 0

		self.lower += self.comp_tick_price - previous_comp_price
		self.upper += self.comp_tick_price - previous_comp_price
		index_current = int((self.comp_tick_price-self.lower)/self.minimum_price_unit)
		iteration_number = np.arange(0, population_strength, self.minimum_simulation_tick)

		for index in range(0, index_current):
			lamb_low = self.comp_parameter_dict_micro['lamb_low'][index]
			mu_low = self.comp_parameter_dict_micro['mu_low'][index]

			if ask_bid_list[index] > 0:
				ask_bid_list[index] = 0
				reset_population = self._initial_trading_population(initial_length = 1500, normal_scale = 7)
				middle_index = int((self.comp_tick_price-self.lower)//self.minimum_price_unit)
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
				middle_index = int((self.comp_tick_price-self.lower)//self.minimum_price_unit)
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

	def ontk_price_simulation(
		self,
		iteration
	):
		"""
		ontk_price_simulation simulates the three-order SDEs by inputting their drift and volitility parameters.
		It also simulates the ask_bid_list for one tick.

		Parameters
		----------
		iteration: int,
			Index for each iteration.
			Helps locating the drifts and volatilities correspond to the price.
		total_iteration_number: float,
			Total time for an event.
		"""
		mu_sde = self.event_parameter_dict['mu_sde'][iteration]
		sig1 = self.event_parameter_dict['sig1'][iteration]
		speed = self.comp_parameter_dict_macro['speed'][iteration]
		volatility = self.comp_parameter_dict_macro['volatility'][iteration]
		theta_index = self.event_parameter_dict['theta']
		theta_company = self.comp_parameter_dict_macro['theta']
		sigma_index = self.event_parameter_dict['sigma']
		sigma_company = self.comp_parameter_dict_macro['sigma']

		self.first_order_price = self.ontk_first_order_indx(mu_sde, sigma_index)
		self.index_price = self.ontk_sde_indx(theta_index, sig1)
		self.third_order_price = self.ontk_third_order_comp(speed, sigma_company)
		self.comp_price = self.ontk_sde_comp(theta_company, volatility)

		self.index_price_list.append(self.index_price)
		self.comp_price_list.append(self.comp_price)

	def end_loop_simulation(
		self
	):
		"""
		end_loop_simulation loops the ontk_price_simulation simulations.
		It loops the engine and provide a price change over a range of time.
		
		Parameter
		---------
		step

		Return
		------
		The function returns a list of price over range of time.
		"""
		self.index_price = self.initial_index_price
		self.comp_price = self.initial_comp_price
		first_order_simulation = [self.index_price]
		index_simulation = [self.index_price]
		third_order_simulation = [self.comp_price]
		comp_simulation = [self.comp_price]


		comp_iteration_number = int(self.comp_parameter_dict_macro['time']/self.minimum_simulation_tick)
		index_iteration_number = int(self.event_parameter_dict['time']/self.minimum_simulation_tick)
		total_iteration_number = min(comp_iteration_number, index_iteration_number)

		for iteration in range(total_iteration_number):
			self.ontk_price_simulation(iteration)
			first_order_simulation.append(self.first_order_price)
			index_simulation.append(self.index_price)
			third_order_simulation.append(self.third_order_price)
			comp_simulation.append(self.comp_price)

			if total_iteration_number-iteration < 10:
				print("Warning... Event with 10 ticks left.")
			
		return index_simulation, first_order_simulation, comp_simulation, third_order_simulation

	def return_day_based_price_list(self):
		return self.comp_day_based_price_list, self.index_day_based_price_list
	
	def return_tick_based_price_list(self):
		return self.comp_tick_based_price_list, self.index_tick_based_price_list

	def return_second_based_price_list(self):
		return self.comp_second_based_price_list, self.index_second_based_price_list

	def return_price_list(self):
		return self.index_price_list, self.comp_price_list

	def comp_price_output(self):
		return self.comp_price

	def indx_price_output(self):
		return self.index_price

	def step_ask_bid_list(self, step = 5):
		left_price = self.comp_price-(step-1)*self.minimum_price_unit-self.lower
		right_price = self.comp_price+(step+1)*self.minimum_price_unit-self.lower
		step_ask_bid_list = self.ask_bid_list[int(left_price//self.minimum_price_unit):int(right_price//self.minimum_price_unit)]
		return step_ask_bid_list

	def set_event(self, event, event_mapping_dict, index_initial_price):
		self.event_initial_time = time.time()
		self.event = event
		self.event_parameter_dict = event_mapping_dict[event](index_initial_price, self.index_price)
		warning = self.event_parameter_dict['warning']
		print(warning)
	
	def set_comp_event(self, comp_event, comp_parameter_dict, comp_initial_price):
		self.comp_event_initial_time = time.time()
		self.comp_event = comp_event
		self.comp_parameter_dict = comp_parameter_dict[comp_event](comp_initial_price, self.comp_price)
		warning = self.comp_parameter_dict['warning']
		print(warning)

	def print_event(self):
		timing = time.time()-self.event_initial_time
		return self.event, timing
	
	"""
		Below here are the necessary data used for the candlestick graph visualization.
		It includes:
			1. maximum price
			2. minimum price
			3. start price
			4. end price
	"""
	def daily_maximum_price(self):
		daily_maximum_price = max(self.comp_second_based_price_list)
		return daily_maximum_price
	
	def daily_minimum_price(self):
		daily_minimum_price = min(self.comp_second_based_price_list)
		return daily_minimum_price
	
	def daily_start_price(self):
		daily_start_price = self.comp_second_based_price_list[0]
		return daily_start_price

	def daily_end_price(self):
		daily_end_price = self.comp_second_based_price_list[-1]
		return daily_end_price


index_initial_price = 1000
comp_initial_price = 100
comp_event = 'new_product'
event = 'tech_blossom'

simulator = StockSimulator(index_initial_price, comp_initial_price, event_mapping_dict, Wraken_macro, Wraken_micro, event, comp_event)
index_simulation, first_order_simulation, comp_simulation, third_order_simulation = simulator.end_loop_simulation()
index_day_based_price_list, index_tick_based_price_list, index_second_based_price_list = simulator.end_loop_tick_based_index_price()
comp_day_based_price_list, comp_tick_based_price_list, comp_second_based_price_list, ask_bid_list = simulator.end_loop_tick_based_comp_price()


#index plot set_up
x_tick = range(0, len(index_tick_based_price_list), 1)
x_day = range(0, len(index_day_based_price_list), 1)
x_second = range(0, len(index_second_based_price_list), 1)
x_normal = range(0, len(index_simulation), 1)

fig1 = plt.figure(figsize = (20,15))

ax1 = fig1.add_subplot(321)
ax1.plot(x_normal,index_simulation,'y',label = 'Reality Time Dimension',alpha = 0.7, linewidth = 2)
ax1.plot(x_normal,first_order_simulation,'b',label = 'Reality Time Convolution',alpha = 0.35, linewidth = 2)
ax1.set_title('Reality Stock Growth')
ax1.legend()
ax1.grid(True)

ax2 = fig1.add_subplot(322)
ax2.plot(x_day, index_day_based_price_list,'b',label = 'Per Day Time Dimension',alpha = 0.5, linewidth = 2)
ax2.set_title('Daily-Based Price')
ax2.legend()
ax2.grid(True)

ax3 = fig1.add_subplot(323)
ax3.plot(x_tick,index_tick_based_price_list,'r',label = 'Per Tick Time Dimension',alpha = 0.5, linewidth = 2)
ax3.set_title('Tick-Based Price')
ax3.legend()
ax3.grid(True)

ax3 = fig1.add_subplot(324)
ax3.plot(x_second,index_second_based_price_list,'g',label = 'Per Second Time Dimension',alpha = 0.5, linewidth = 2)
ax3.set_title('Second-Based Price')
ax3.legend()
ax3.grid(True)
#company plot set_up
comp_x_tick = range(0, len(comp_tick_based_price_list), 1)
comp_x_day = range(0, len(comp_day_based_price_list), 1)
comp_x_second = range(0, len(comp_second_based_price_list), 1)
comp_x_normal = range(0, len(comp_simulation), 1)

fig2 = plt.figure(figsize = (20,15))

ax1 = fig2.add_subplot(321)
ax1.plot(comp_x_normal,comp_simulation,'y',label = 'Reality Time Dimension',alpha = 0.7, linewidth = 2)
ax1.plot(x_normal,third_order_simulation,'b',label = 'Reality Time Convolution',alpha = 0.35, linewidth = 2)
ax1.set_title('Reality Stock Growth')
ax1.legend()
ax1.grid(True)

ax2 = fig2.add_subplot(322)
ax2.plot(comp_x_day, comp_day_based_price_list,'b',label = 'Per Day Time Dimension',alpha = 0.5, linewidth = 2)
ax2.set_title('Daily-Based Price')
ax2.legend()
ax2.grid(True)

ax3 = fig2.add_subplot(323)
ax3.plot(comp_x_tick,comp_tick_based_price_list,'r',label = 'Per Tick Time Dimension',alpha = 0.5, linewidth = 2)
ax3.set_title('Tick-Based Price')
ax3.legend()
ax3.grid(True)

ax3 = fig2.add_subplot(324)
ax3.plot(comp_x_second,comp_second_based_price_list,'g',label = 'Per Second Time Dimension',alpha = 0.5, linewidth = 2)
ax3.set_title('Second-Based Price')
ax3.legend()
ax3.grid(True)

plt.show()

































