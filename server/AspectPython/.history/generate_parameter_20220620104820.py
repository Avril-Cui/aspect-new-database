import matplotlib.pyplot as plt 
import numpy as np
import pandas as pd

def generate_parameter(price_list):
    sampling_price_list = []
    for index in range(len(price_list)):
        price_list = []
        if len(price_list)-index > 10:
            for number in range(10):
                price_list.append(price_list[index+number])
            sampling_price_list.append(price_list)
