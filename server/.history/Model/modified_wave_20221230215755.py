"""
Note from 12/23: pandas datareader get_data_yahoo has some bug.
pdr_override is used to temperarily fix this bug.
This issue might be fixed by yahoo later.
"""

from unicodedata import name
import get_parameters
import matplotlib.pyplot as plt
from typing import Optional
import numpy as np
from copy import deepcopy
import pandas_datareader as web
from pandas_datareader import data as pdr
import yfinance as yf
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

    def ontk_price(self, theta, mu):
        simulated_price = self.price + theta * (mu-self.price)
        return simulated_price

    def price_loop(
        self
    ):
        mu_lst = self.macro_params["mu_sde"]
        theta_lst = self.macro_params["theta"]
        time_length = self.macro_params["time"]

        for index in range(time_length):
            mu = mu_lst[index]
            theta = theta_lst[index]
            next_price = self.ontk_price(theta, mu)
            self.price = next_price
            self.price_list.append(next_price)

        return (self.price_list)


class MidPriceGenerator:
    def __init__(self, start_date, end_date, symbol, ma_days):
        self.start_date = start_date
        self.end_date = end_date
        self.symbol = symbol
        self.ma_days = ma_days

    def generate_mid_price(self):
        # mid_price = web.get_data_yahoo(self.symbol, self.start_date, self.end_date)['Adj Close'][self.symbol[0]]
        mid_price = pdr.get_data_yahoo(
            self.symbol, self.start_date, self.end_date)['Adj Close']
        convolution_wave = mid_price.rolling(window=self.ma_days).mean()[
            self.ma_days:].to_list()
        return convolution_wave


class WaveModifier:
    def __init__(self):
        self.start_date = 1

    def normalize_price(self, price_list):
        price_lst = np.divide(price_list, price_list[0])
        return price_lst

    def price_wave_intensity(self, base_price, intensity_factor):
        new_price_wave = np.multiply(base_price, intensity_factor)
        return new_price_wave

    def price_wave_addition(self, transformation, intensity, length, *argv):
        price_list = [0 for _ in range(length)]
        for wave_info in argv:
            start_point = wave_info['start_point']
            end_point = start_point+wave_info['duration']
            normal_wave = self.normalize_price(
                wave_info['price_list'][start_point:end_point])
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
            micro_params: object,
            index_params: dict,
            price_range: Optional[float] = 2,
            minimum_simulation_tick: Optional[float] = 0.01,
            minimum_price_unit: Optional[float] = 0.01,
            fixed_random_seed: Optional[bool] = True,
            random_seed: Optional[int] = 17
    ):

        # price storage
        self.adjusted_factor = adjusted_factor
        self.initial_price = initial_price * adjusted_factor
        self.second_price = initial_price * adjusted_factor
        self.second_price_lst = []
        self.index = index

        self.day_price_lst = day_price_lst

        self.modified_lst = []

# price bound preparation
        self.price_range = price_range
        self.upper = self.second_price+self.price_range
        if self.second_price >= self.price_range:
            self.lower = self.second_price-self.price_range
        else:
            self.lower = 0

        # Dictionary parameters preparation
        self.minimum_second_unit = 1/(60*60)
        self.minimum_price_unit = minimum_price_unit
        self.minimum_simulation_tick = minimum_simulation_tick

        # Dictionary function preparation
        self.total_index = int((self.upper-self.lower) //
                               self.minimum_price_unit)
        self.price_change = 0
        self.micro_params = micro_params(
            self.total_index, self.price_change, index_params["scale_lamb"], index_params["scale_mu"])
        self.micro_params_function = micro_params

        # preparation for D&B process
        self.ask_bid_list = self.initial_trading_population()

        # set random seed
        if fixed_random_seed:
            np.random.seed(random_seed)

    def generate_price(self):
        adjust_price = self.adjusted_factor * self.day_price_lst[self.index]
        adjusted_last = self.adjusted_factor * self.day_price_lst[self.index-1]
        drift = (adjust_price - adjusted_last)/(adjusted_last)
        dt = 1/(60*60)
        num = int(1/dt)
        daily_price = []
        for _ in range(num):
            self.second_price += drift * self.second_price * dt
            daily_price.append(round(self.second_price, 2))

        # daily_price[-1] = adjust_price
        self.second_price_lst = daily_price
        return daily_price

    def generate_user_interaction_price_LOB(self):
        price_list = self.generate_price()
        user_interaction_price = []
        ask_bid = []

        for index in range(len(price_list)):
            if index > 0:
                previous_price = price_list[index-1]
                current_price = price_list[index]
                self.ask_bid_list = self.ontk_trading_population(
                    previous_price, current_price)
                price_index = int((current_price-self.lower) //
                                  self.minimum_price_unit)
                LOB = self.ask_bid_list[(price_index-5):(price_index+5)]
                micro_price = self.order_book_influence(LOB)
                ask_bid.append(LOB)
                print(micro_price)
                user_interaction_price.append(micro_price)
        return user_interaction_price, ask_bid

    # The following functions gives the algorithm-generated user interaction.
    def order_book_influence(
            self,
            ask_bid_list: list
    ):

        random_factor = np.random.normal(0, 0.05)
        try:
            imbalance_1 = abs(
                ask_bid_list[4])/(abs(ask_bid_list[4])+abs(ask_bid_list[5]))

        except ZeroDivisionError:
            imbalance_1 = 0
        try:
            imbalance_2 = abs(
                ask_bid_list[3])/(abs(ask_bid_list[3])+abs(ask_bid_list[6]))

        except ZeroDivisionError:
            imbalance_2 = 0
        try:
            imbalance_3 = abs(
                ask_bid_list[2])/(abs(ask_bid_list[2])+abs(ask_bid_list[7]))

        except ZeroDivisionError:
            imbalance_3 = 0
        try:
            imbalance_4 = abs(
                ask_bid_list[1])/(abs(ask_bid_list[1])+abs(ask_bid_list[8]))
        except ZeroDivisionError:
            imbalance_4 = 0
        try:
            imbalance_5 = abs(
                ask_bid_list[0])/(abs(ask_bid_list[0])+abs(ask_bid_list[9]))

        except ZeroDivisionError:
            imbalance_5 = 0

        micro_price = random_factor * (imbalance_1 * (-0.2638) + imbalance_2 * 0.1154 +
                                       imbalance_3 * (-0.4902) + imbalance_4 * (-0.1657) + imbalance_5 * (0.2239))
        return (micro_price)

    def initial_trading_population(
            self,
            initial_length: Optional[int] = 1000,
            normal_scale: Optional[int] = 10
    ):
        random_normal_dist = np.random.normal(
            loc=self.second_price, scale=normal_scale, size=initial_length)
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
        index_previous = int(
            (previous_comp_price-self.lower)//self.minimum_price_unit)
        index_current = int((current_comp_price-self.lower) //
                            self.minimum_price_unit)
        index_difference = index_current-index_previous
        ask_bid_list = [0 for _ in self.ask_bid_list]

        for index in range((index_current-markov_step), (index_current+markov_step)):
            old_index = index - index_difference
            if old_index >= 0 and old_index < len(ask_bid_list_tmp):
                ask_bid_list[index] = round(0.15 * ask_bid_list_tmp[old_index])
            else:
                ask_bid_list[index] = 0

        self.lower += current_comp_price - previous_comp_price
        self.upper += current_comp_price - previous_comp_price
        index_current = int(
            (current_comp_price-self.lower)/self.minimum_price_unit)
        iteration_number = np.arange(
            0, population_strength, self.minimum_simulation_tick)

        for index in range(0, index_current):
            lamb_low = self.micro_params['lamb_low'][index]
            mu_low = self.micro_params['mu_low'][index]

            if ask_bid_list[index] > 0:
                ask_bid_list[index] = 0
                reset_population = self.initial_trading_population(
                    initial_length=1500, normal_scale=7)
                middle_index = int(
                    (current_comp_price-self.lower)//self.minimum_price_unit)
                reset_list = reset_population[middle_index -
                                              abs(index_difference): middle_index]
                for value in reset_list:
                    ask_bid_list[index] = -abs(value)

            for _ in iteration_number:
                random = np.random.rand()
                if random <= lamb_low * self.minimum_simulation_tick:
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
                reset_population = self.initial_trading_population(
                    initial_length=1500, normal_scale=7)
                middle_index = int(
                    (current_comp_price-self.lower)//self.minimum_price_unit)
                reset_list = reset_population[middle_index: middle_index - abs(
                    index_difference)]
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

file_names = get_parameters.file_names
index_params = get_parameters.index_params
MidPrice = MidPriceGenerator("2015-3-9", "2016-9-1", ["^DJI"], 15)
micro = get_parameters.micro
length = get_parameters.length
index_price = []
for index in range(len(file_names)):
	name = file_names[index]
	macro = index_params[name]["macro"]
	stock_simulator = DayPriceGenerator(macro)
	base_price = stock_simulator.price_loop()
	mid_price = MidPrice.generate_mid_price()

	wave_1 = {
		'price_list': base_price,
		'start_point': 0,
		'duration': length[index],
		'weight': index_params[name]["fund_weight"],
		'intensity_factor': 1
	}

	wave_2 = {
		'price_list': mid_price,
		'start_point': len(index_price),
		'duration': len(base_price),
		'weight': 1-index_params[name]["fund_weight"],
		'intensity_factor': 1
	}
	print(len(mid_price[len(index_price):len(index_price)+len(base_price)]))

	# Combinator = WaveModifier()
	# combinated_price = Combinator.price_wave_addition(
	# 	1, 1, len(base_price), wave_1, wave_2)

	# if index_price == 0:
	# 	adjust_factor = 1200
	# else:
	# 	adjust_factor = index_price[-1]

	# final_price_list = []
	# for index in range(len(combinated_price)):
	# 	if index > 0:
	# 		price_generator = StockSimulator(
	# 			adjust_factor/combinated_price[1], combinated_price[index], combinated_price, index, micro, index_params[name])
	# 		result_price = price_generator.generate_price()
	# 		final_price_list.extend(result_price)

	# user_interaction_modifier = []
	# for index in range(len(final_price_list)):
	# 	random_modifier = np.random.normal(0, 3.5)
	# 	user_interaction_modifier.append(random_modifier)

	# final_price_list = np.add(user_interaction_modifier, final_price_list)
	# index_price.extend(final_price_list)



# tick = []
# for index in range(len(final_price_list)):
# 	if index % 300 == 0:
# 		tick.append(final_price_list[index])
	