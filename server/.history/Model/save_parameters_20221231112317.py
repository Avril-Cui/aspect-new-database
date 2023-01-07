import numpy as np
from pandas_datareader import data as pdr
import yfinance as yf
import matplotlib.pyplot as plt
import pandas as pd
yf.pdr_override()

# start_date = "2022-6-9"
# end_date = "2022-9-10"
# symbol = ["^DJI"]
# index_data = pdr.get_data_yahoo(symbol, start_date, end_date)['Adj Close']
# index_data.to_csv('Model/historical_price/index_data/mete5.csv')

comp_price_df = [1, 1.00042208, 1.00065624, 1.00016405, 1.0006546,  1.00027421,
 1.00047346, 1.00003542, 1.00040321, 0.99984153 ,0.99954565 ,0.99992406,
 1.00136817, 1.00192037, 1.00312222, 1.00302257 ,1.00400021 ,1.00534467,
 1.00652649, 1.00711245, 1.0079878,  1.00848387, 1.00804302, 1.00791775,
 1.00826593, 1.0078613,  1.00685203, 1.00617438 ,1.00753487 ,1.00779682,
 1.00823927, 1.00832214, 1.00904395, 1.00976155 ,1.01073457 ,1.01148882,
 1.01242067, 1.01408104, 1.01485659, 1.01474896 ,1.01562457 ,1.01668421,
 1.01700724, 1.01644509, 1.0160974,  1.01612738, 1.01554967, 1.01404757,
 1.0121605,  1.0101659,  1.00900239, 1.00808486 ,1.00664198 ,1.00499791,
 1.00448678, 1.00363929, 1.00360095, 1.0036206  ,1.00391675 ,1.00440951,]
plt.plot(comp_price_df)
plt.show()