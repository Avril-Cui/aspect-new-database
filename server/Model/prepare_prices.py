import get_parameters
from modified_wave import MidPriceGenerator, DayPriceGenerator, WaveModifier, StockSimulator
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd


def get_stock_price(
	file_names, params,
    intensity, length, weights, 
	mid_prices, mid_starts, 
	event_intensity, 
	target_price, sigma):
    price_list = []
    base_price_lst = []
    for i in range(len(file_names)):
        name = file_names[i]
        macro = params[name]["macro"]
        stock_simulator = DayPriceGenerator(macro)
        base_price = stock_simulator.price_loop()
        base_price_lst.extend(base_price)
        wave_1 = {
            'price_list': base_price,
            'start_point': 0,
            'duration': length[i],
            'weight': weights[i],
            'intensity_factor': intensity
        }

        wave_2 = {
            'price_list': mid_prices[i],
            'start_point': mid_starts[i],
            'duration': length[i],
            'weight': 1-weights[i],
            'intensity_factor': intensity
        }
        print(name)

        Combinator = WaveModifier()
        combinated_price = Combinator.price_wave_addition(
            0, event_intensity[i], length[i], wave_1, wave_2)
        if len(price_list) == 0:
            adjust_factor = target_price
        else:
            adjust_factor = price_list[-1]

        price_generator = StockSimulator(adjust_factor, combinated_price, sigma[i])
        result_price = price_generator.generate_price()
        price_list.extend(result_price)
    return price_list

intensity = [1,1,1,1,1,1,1]

sigma = [6,10,8,3,4,5,7]
mid_price_index1 = MidPriceGenerator.generate_mid_price("2015-3-9", "2017-1-1", ["^DJI"], 15)
mid_prices_index = [mid_price_index1, mid_price_index1, mid_price_index1,
                    mid_price_index1, mid_price_index1, mid_price_index1, mid_price_index1]
mid_start = [120, 50, 30, 50, 50, 60, 60]
index_price = get_stock_price(get_parameters.file_names_index, get_parameters.index_params_index, intensity, get_parameters.length_index,
get_parameters.fund_weights_index, mid_prices_index, mid_start, [900, 900, 1100, 900, 600, 700, 220], 1200, sigma)

mid_price_index1 = MidPriceGenerator.generate_mid_price("2019-1-1", "2019-10-20", ["^GSPC"], 15)
mid_price_index2 = MidPriceGenerator.generate_mid_price("2019-6-19", "2019-10-28", ["^GSPC"], 15)
mid_price_index3 = MidPriceGenerator.generate_mid_price("2019-6-19", "2019-10-28", ["^GSPC"], 15)
mid_price_index4 = MidPriceGenerator.generate_mid_price("2019-8-15", "2020-2-15", ["^GSPC"], 15)
mid_price_index5 = MidPriceGenerator.generate_mid_price("2019-8-15", "2020-2-15", ["^GSPC"], 15)
mid_prices_index = [mid_price_index1, mid_price_index2, mid_price_index3, mid_price_index4, mid_price_index5]
mid_start = [0, 0, 0, 0, 0]
sigma = [2,2,4.5,3,3]
ast_price = get_stock_price(get_parameters.file_names_ast, get_parameters.params_ast, intensity, get_parameters.length_ast,
get_parameters.fund_weights_ast, mid_prices_index, mid_start, [140, 300, 100, 250, 150], 50, sigma)

mid_price_index1 = MidPriceGenerator.generate_mid_price("2019-12-15", "2021-8-1", ["^GSPC"], 15)
mid_prices_index = [mid_price_index1, mid_price_index1, mid_price_index1, mid_price_index1]
mid_start = [0, 140, 170, 270]
sigma = [1, 0.4, 1.75, 0.5]
dsc_price = get_stock_price(get_parameters.file_names_dsc, get_parameters.params_dsc, intensity, get_parameters.length_dsc,
get_parameters.fund_weights_dsc, mid_prices_index, mid_start, [40, 135, 200, 120], 39.78, sigma)

mid_price_index1 = MidPriceGenerator.generate_mid_price("2019-12-15", "2021-8-1", ["^GSPC"], 15)
mid_prices_index = [mid_price_index1, mid_price_index1, mid_price_index1, mid_price_index1]
mid_start = [0, 150, 190, 270, 300]
sigma = [0.5, 0.2, 0.85, 0.5]
fsin_price = get_stock_price(get_parameters.file_names_fsin, get_parameters.params_fsin, intensity, get_parameters.length_fsin,
get_parameters.fund_weights_fsin, mid_prices_index, mid_start, [30, 100, 62, 40], 60, sigma)

mid_price_index1 = MidPriceGenerator.generate_mid_price("2021-8-15", "2022-12-1", ["^GSPC"], 15)
mid_prices_index = [mid_price_index1, mid_price_index1, mid_price_index1, mid_price_index1]
mid_start = [0, 20, 110, 190, 300]
sigma = [0.7, 1, 0.45, 0.35]
hhw_price = get_stock_price(get_parameters.file_names_hhw, get_parameters.params_hhw, intensity, get_parameters.length_hhw,
get_parameters.fund_weights_hhw, mid_prices_index, mid_start, [70, 170, 150, 40], 70, sigma)

mid_price_index1 = MidPriceGenerator.generate_mid_price("2021-8-15", "2022-12-1", ["^GSPC"], 15)
mid_prices_index = [mid_price_index1, mid_price_index1, mid_price_index1, mid_price_index1]
mid_start = [0, 20, 110, 190]
sigma = [0.55, 0.55, 0.6, 0.5]
jky_price = get_stock_price(get_parameters.file_names_jky, get_parameters.params_jky, intensity, get_parameters.length_jky,
get_parameters.fund_weights_jky, mid_prices_index, mid_start, [45, 50, 50, 80], 60, sigma)

mid_price_index1 = MidPriceGenerator.generate_mid_price("2021-8-15", "2022-12-1", ["^GSPC"], 15)
mid_prices_index = [mid_price_index1, mid_price_index1, mid_price_index1, mid_price_index1, mid_price_index1]
mid_start = [0, 10, 100, 160, 250]
sigma = [0.3, 0.55, 1, 0.85, 0.8]
sgo_price = get_stock_price(get_parameters.file_names_sgo, get_parameters.params_sgo, intensity, get_parameters.length_sgo,
get_parameters.fund_weights_sgo, mid_prices_index, mid_start, [100, 280, 2000, 80, 110], 80, sigma)

mid_price_index1 = MidPriceGenerator.generate_mid_price("2021-8-15", "2022-12-1", ["^GSPC"], 15)
mid_prices_index = [mid_price_index1, mid_price_index1, mid_price_index1]
mid_start = [0, 200, 230]
sigma = [0.4, 0.35, 0.5]
wrkn_price = get_stock_price(get_parameters.file_names_wrkn, get_parameters.params_wrkn, intensity, get_parameters.length_wrkn,
get_parameters.fund_weights_wrkn, mid_prices_index, mid_start, [70, 70, 50], 70, sigma)
