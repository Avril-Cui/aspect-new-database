import Price.param_init
from Price.alg_price import MidPriceGenerator
import numpy as np
import pandas as pd
from Price.get_price import get_stock_price
import numpy as np

intensity = [1, 1, 1, 1, 1, 1, 1]

def get_index_price():
    np.random.seed(17)
    mid_price_index1 = MidPriceGenerator.generate_mid_price(
    "2015-3-9", "2017-1-1", ["^DJI"], 15)
    mid_prices_index = [mid_price_index1, mid_price_index1, mid_price_index1,
                        mid_price_index1, mid_price_index1, mid_price_index1, mid_price_index1]
    mid_start = [120, 50, 30, 50, 50, 60, 60]
    index_price = get_stock_price(Price.param_init.file_names_index, Price.param_init.index_params_index, intensity, Price.param_init.length_index,
                                Price.param_init.fund_weights_index, mid_prices_index, mid_start, [900, 900, 1100, 900, 600, 700, 220], 1200, [6, 10, 8, 3, 4, 5, 7])
    return index_price

def get_ast_price():
    np.random.seed(17)
    mid_price_index1 = MidPriceGenerator.generate_mid_price(
    "2019-1-1", "2019-10-20", ["^GSPC"], 15)
    mid_price_index2 = MidPriceGenerator.generate_mid_price(
        "2019-6-19", "2019-10-28", ["^GSPC"], 15)
    mid_price_index3 = MidPriceGenerator.generate_mid_price(
        "2019-6-19", "2019-10-28", ["^GSPC"], 15)
    mid_price_index4 = MidPriceGenerator.generate_mid_price(
        "2019-8-15", "2020-2-15", ["^GSPC"], 15)
    mid_price_index5 = MidPriceGenerator.generate_mid_price(
        "2019-8-15", "2020-2-15", ["^GSPC"], 15)
    ast_price = get_stock_price(Price.param_init.file_names_ast, Price.param_init.params_ast, intensity, Price.param_init.length_ast,
                                Price.param_init.fund_weights_ast, [mid_price_index1, mid_price_index2,
                        mid_price_index3, mid_price_index4, mid_price_index5], [0, 0, 0, 0, 0], [180, 300, 100, 250, 120], 50,  [1, 0.5, 0.3, 0.5, 0.5])
    return ast_price

def get_dsc_price():
    np.random.seed(17)
    mid_price_index6 = MidPriceGenerator.generate_mid_price(
    "2019-12-15", "2021-8-1", ["^GSPC"], 15)
    dsc_price = get_stock_price(Price.param_init.file_names_dsc, Price.param_init.params_dsc, intensity, Price.param_init.length_dsc,
                                Price.param_init.fund_weights_dsc, [mid_price_index6, mid_price_index6,
                        mid_price_index6, mid_price_index6], [0, 140, 170, 270], [40, 135, 200, 120], 39.78, [1, 0.3, 0.75, 0.3])
    return dsc_price

def get_fsin_price():
    np.random.seed(17)
    mid_price_index1 = MidPriceGenerator.generate_mid_price(
    "2019-12-15", "2021-8-1", ["^GSPC"], 15)
    mid_prices_index = [mid_price_index1, mid_price_index1,
                        mid_price_index1, mid_price_index1]
    mid_start = [0, 150, 190, 270, 300]
    fsin_price = get_stock_price(Price.param_init.file_names_fsin, Price.param_init.params_fsin, intensity, Price.param_init.length_fsin,
                                Price.param_init.fund_weights_fsin, mid_prices_index, mid_start, [30, 100, 62, 40], 60, [0.2, 0.2, 0.85, 0.3])
    return fsin_price

def get_hhw_price():
    np.random.seed(17)
    mid_price_index1 = MidPriceGenerator.generate_mid_price(
    "2021-8-15", "2022-12-1", ["^GSPC"], 15)
    mid_prices_index = [mid_price_index1, mid_price_index1,
                        mid_price_index1, mid_price_index1]
    mid_start = [0, 20, 110, 190, 300]
    hhw_price = get_stock_price(Price.param_init.file_names_hhw, Price.param_init.params_hhw, intensity, Price.param_init.length_hhw,
                                Price.param_init.fund_weights_hhw, mid_prices_index, mid_start, [110, 170, 150, 100], 70, [0.7, 1, 0.45, 0.35])
    return hhw_price

def get_jky_price():
    np.random.seed(17)
    mid_price_index1 = MidPriceGenerator.generate_mid_price(
    "2021-8-15", "2022-12-1", ["^GSPC"], 15)
    mid_prices_index = [mid_price_index1, mid_price_index1,
                        mid_price_index1, mid_price_index1]
    mid_start = [0, 20, 110, 190]
    jky_price = get_stock_price(Price.param_init.file_names_jky, Price.param_init.params_jky, intensity, Price.param_init.length_jky,
                                Price.param_init.fund_weights_jky, mid_prices_index, mid_start, [45, 50, 50, 50], 60,  [0.55, 0.55, 0.6, 0.5])
    return jky_price

def get_sgo_price():
    np.random.seed(17)
    mid_price_index1 = MidPriceGenerator.generate_mid_price(
        "2021-8-15", "2022-12-1", ["^GSPC"], 15)
    mid_prices_index = [mid_price_index1, mid_price_index1,
                        mid_price_index1, mid_price_index1, mid_price_index1]
    mid_start = [0, 10, 100, 160, 250]
    sgo_price = get_stock_price(Price.param_init.file_names_sgo, Price.param_init.params_sgo, intensity, Price.param_init.length_sgo,
                                Price.param_init.fund_weights_sgo, mid_prices_index, mid_start, [100, 280, 2000, 80, 200], 80, [0.3, 0.55, 0.5, 0.5, 0.6])
    return sgo_price

def get_wrkn_price():
    np.random.seed(17)
    mid_price_index1 = MidPriceGenerator.generate_mid_price(
        "2021-8-15", "2022-12-1", ["^GSPC"], 15)
    mid_prices_index = [mid_price_index1, mid_price_index1, mid_price_index1]
    mid_start = [0, 200, 230]
    wrkn_price = get_stock_price(Price.param_init.file_names_wrkn, Price.param_init.params_wrkn, intensity, Price.param_init.length_wrkn,
                                Price.param_init.fund_weights_wrkn, mid_prices_index, mid_start, [70, 70, 50], 70, [0.4, 0.35, 0.5])
    return wrkn_price