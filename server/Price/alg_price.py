"""
Note from 12/23: pandas datareader get_data_yahoo has some bug.
pdr_override is used to temperarily fix this bug.
This issue might be fixed by yahoo later.
"""
from typing import Optional
import numpy as np
from pandas_datareader import data as pdr
import yfinance as yf
yf.pdr_override()
np.random.seed(17)

class DayPriceGenerator:
    def __init__(
        self,
        macro_params: dict,
    ):
        self.macro_params = macro_params
        self.price = macro_params['original_price']
        self.price_list = []
        self.minimum_simulation_tick = 1

    def ontk_price(self, theta, mu, sigma):
        bm = np.random.normal(0,1)
        tmp_bm_coeff = bm * np.sqrt(self.minimum_simulation_tick)
        simulated_price = self.price + theta * (mu-self.price) + sigma * tmp_bm_coeff 
        return simulated_price

    def price_loop(
        self
    ):
        for index in range(self.macro_params["time"]):
            mu = self.macro_params["mu_sde"][index]
            theta = self.macro_params["theta"][index]
            sigma = self.macro_params["sigma"][index]
            self.price = self.ontk_price(theta, mu, sigma)
            self.price_list.append(self.price)

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
            target_price: float,
            day_price_lst: list,
            sigma: float,
            fixed_random_seed: Optional[bool] = False,
            random_seed: Optional[int] = 17
    ):

        # price storage
        self.target_price = target_price
        self.second_price = target_price
        self.second_price_lst = []

        self.day_price_lst = day_price_lst
        self.modified_lst = []

        self.sigma = sigma
        # set random seed
        if fixed_random_seed:
            np.random.seed(random_seed)

    def generate_price(self):
        price_list = []
        adjusted_factor = self.target_price / self.day_price_lst[0]
        for index in range(1, len(self.day_price_lst)):
            adjust_price = self.day_price_lst[index]
            adjusted_last = self.day_price_lst[index-1] 
            drift = (adjust_price - adjusted_last)/(adjusted_last) * adjusted_factor
            dt = 1/(60*60)
            num = int(1/dt)
            daily_price = []
            for _ in range(num):
                self.second_price += drift * self.second_price * dt + np.random.normal(0,1) * np.sqrt(dt) * self.sigma
                daily_price.append(self.second_price)
            price_list.extend(daily_price)
        return price_list