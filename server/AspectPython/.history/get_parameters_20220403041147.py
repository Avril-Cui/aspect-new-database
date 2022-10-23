"""
get_parameters.py contains two dictionaries:
1. event_mapping_dict
2. company_mapping_dict
The two dictionaries contains necessary parameters for the SDE and trading population models.
All parameters will contribute to the final price simulation.
"""
import pandas as pd

#INDEX
def get_index_paramters_1929_roaring_twenties():
	index_price_df = pd.read_csv("/Users/xiaokeai/Desktop/FLP Price Data/Market Situation/1929_roaring_twenties.csv")
	ten_day_convolution_df = index_price_df.rolling(window=20).mean()
	#Calculate the squared error.	
	convolution = ten_day_convolution_df['^GSPC'].tolist()
	convolution = convolution[20:]
	index_price = index_price_df['^GSPC'].tolist()
	index_price = index_price[20:]
	squared_difference = [index_price[i]-convolution[i] for i in range(len(index_price))]
	#Calculate the drift for the SDE model.
	bm_drift_df = ten_day_convolution_df.pct_change()
	bm_drift= bm_drift_df['^GSPC'].tolist()
	bm_drift = bm_drift[20:]
	parameter_dict = {}
	parameter_dict['mu_sde'] = [element * 140 for element in bm_drift]
	parameter_dict['sigma'] = 0.2
	parameter_dict['theta'] = 30
	parameter_dict['sig1'] = [element/0.004 for element in squared_difference]
	parameter_dict['time'] = 3.1
	return parameter_dict

def get_index_paramters_1930_great_depression():
	index_price_df = pd.read_csv("/Users/xiaokeai/Desktop/FLP Price Data/Market Situation/1930_great_depression.csv")
	ten_day_convolution_df = index_price_df.rolling(window=20).mean()
	#Calculate the squared error.	
	convolution = ten_day_convolution_df['^GSPC'].tolist()
	convolution = convolution[20:]
	index_price = index_price_df['^GSPC'].tolist()
	index_price = index_price[20:]
	squared_difference = [index_price[i]-convolution[i] for i in range(len(index_price))]
	#Calculate the drift for the SDE model.
	bm_drift_df = ten_day_convolution_df.pct_change()
	bm_drift= bm_drift_df['^GSPC'].tolist()
	bm_drift = bm_drift[20:]
	parameter_dict = {}
	parameter_dict['mu_sde'] = [element * 160 for element in bm_drift]
	parameter_dict['sigma'] = 0.2
	parameter_dict['theta'] = 30
	parameter_dict['sig1'] = [element/0.004 for element in squared_difference]
	parameter_dict['time'] = 3.1
	return parameter_dict

def get_index_paramters_1987_auto_trade():
	index_price_df = pd.read_csv("/Users/xiaokeai/Desktop/FLP Price Data/Market Situation/1987_auto_trade.csv")
	ten_day_convolution_df = index_price_df.rolling(window=20).mean()
	#Calculate the squared error.	
	convolution = ten_day_convolution_df['^GSPC'].tolist()
	convolution = convolution[20:]
	index_price = index_price_df['^GSPC'].tolist()
	index_price = index_price[20:]
	squared_difference = [index_price[i]-convolution[i] for i in range(len(index_price))]
	#Calculate the drift for the SDE model.
	bm_drift_df = ten_day_convolution_df.pct_change()
	bm_drift= bm_drift_df['^GSPC'].tolist()
	bm_drift = bm_drift[20:]
	parameter_dict = {}
	parameter_dict['mu_sde'] = [element * 140 for element in bm_drift]
	parameter_dict['sigma'] = 0.2
	parameter_dict['theta'] = 30
	parameter_dict['sig1'] = [element/0.03 for element in squared_difference]
	parameter_dict['time'] = 5.2
	return parameter_dict

def get_index_paramters_1990_tech_blossom():
	index_price_df = pd.read_csv("/Users/xiaokeai/Desktop/FLP Price Data/Market Situation/1990_tech_blossom.csv")
	ten_day_convolution_df = index_price_df.rolling(window=30).mean()
	#Calculate the squared error.	
	convolution = ten_day_convolution_df['^GSPC'].tolist()
	convolution = convolution[30:]
	index_price = index_price_df['^GSPC'].tolist()
	index_price = index_price[30:]
	squared_difference = [index_price[i]-convolution[i] for i in range(len(index_price))]
	#Calculate the drift for the SDE model.
	bm_drift_df = ten_day_convolution_df.pct_change()
	bm_drift= bm_drift_df['^GSPC'].tolist()
	bm_drift = bm_drift[30:]
	parameter_dict = {}
	parameter_dict['mu_sde'] = [element * 70 for element in bm_drift]
	parameter_dict['sigma'] = 0.2
	parameter_dict['theta'] = 20
	parameter_dict['sig1'] = [element/0.2 for element in squared_difference]
	parameter_dict['time'] = 4.7
	return parameter_dict

def get_index_paramters_2000_dot_com_bubble():
	index_price_df = pd.read_csv("/Users/xiaokeai/Desktop/FLP Price Data/Market Situation/2000_dot_com_bubble.csv")
	ten_day_convolution_df = index_price_df.rolling(window=20).mean()
	#Calculate the squared error.	
	convolution = ten_day_convolution_df['^GSPC'].tolist()
	convolution = convolution[20:]
	index_price = index_price_df['^GSPC'].tolist()
	index_price = index_price[20:]
	squared_difference = [index_price[i]-convolution[i] for i in range(len(index_price))]
	#Calculate the drift for the SDE model.
	bm_drift_df = ten_day_convolution_df.pct_change()
	bm_drift= bm_drift_df['^GSPC'].tolist()
	bm_drift = bm_drift[20:]
	parameter_dict = {}
	parameter_dict['mu_sde'] = [element * 170 for element in bm_drift]
	parameter_dict['sigma'] = 0.2
	parameter_dict['theta'] = 20
	parameter_dict['sig1'] = [element/0.4 for element in squared_difference]
	parameter_dict['time'] = 4.7
	return parameter_dict

def get_index_paramters_2008_CDO_crisis():
	index_price_df = pd.read_csv("/Users/xiaokeai/Desktop/FLP Price Data/Market Situation/2008_CDO_crisis.csv")
	ten_day_convolution_df = index_price_df.rolling(window=20).mean()
	#Calculate the squared error.	
	convolution = ten_day_convolution_df['^GSPC'].tolist()
	convolution = convolution[20:]
	index_price = index_price_df['^GSPC'].tolist()
	index_price = index_price[20:]
	squared_difference = [index_price[i]-convolution[i] for i in range(len(index_price))]
	#Calculate the drift for the SDE model.
	bm_drift_df = ten_day_convolution_df.pct_change()
	bm_drift= bm_drift_df['^GSPC'].tolist()
	bm_drift = bm_drift[20:]
	parameter_dict = {}
	parameter_dict['mu_sde'] = [element * 100 for element in bm_drift]
	parameter_dict['sigma'] = 0.2
	parameter_dict['theta'] = 10
	parameter_dict['sig1'] = [element/0.4 for element in squared_difference]
	parameter_dict['time'] = 2.3
	return parameter_dict

def get_index_paramters_2019_passive_trading():
	index_price_df = pd.read_csv("/Users/xiaokeai/Desktop/FLP Price Data/Market Situation/2019_passive_trading.csv")
	ten_day_convolution_df = index_price_df.rolling(window=10).mean()
	#Calculate the squared error.	
	convolution = ten_day_convolution_df['^GSPC'].tolist()
	convolution = convolution[10:]
	index_price = index_price_df['^GSPC'].tolist()
	index_price = index_price[10:]
	squared_difference = [index_price[i]-convolution[i] for i in range(len(index_price))]
	#Calculate the drift for the SDE model.
	bm_drift_df = ten_day_convolution_df.pct_change()
	bm_drift= bm_drift_df['^GSPC'].tolist()
	bm_drift = bm_drift[10:]
	parameter_dict = {}
	parameter_dict['mu_sde'] = [element * 195 for element in bm_drift]
	parameter_dict['sigma'] = 0.1
	parameter_dict['theta'] = 15
	parameter_dict['sig1'] = [element/0.2 for element in squared_difference]
	parameter_dict['time'] = 1.8
	return parameter_dict

def get_index_paramters_2020_covid():
	index_price_df = pd.read_csv("/Users/xiaokeai/Desktop/FLP Price Data/Market Situation/2020_COVID_situation.csv")
	ten_day_convolution_df = index_price_df.rolling(window=10).mean()
	#Calculate the squared error.	
	convolution = ten_day_convolution_df['^GSPC'].tolist()
	convolution = convolution[10:]
	index_price = index_price_df['^GSPC'].tolist()
	index_price = index_price[10:]
	squared_difference = [index_price[i]-convolution[i] for i in range(len(index_price))]
	#Calculate the drift for the SDE model.
	bm_drift_df = ten_day_convolution_df.pct_change()
	bm_drift= bm_drift_df['^GSPC'].tolist()
	bm_drift = bm_drift[10:]
	parameter_dict = {}
	parameter_dict['mu_sde'] = [element * 160 for element in bm_drift]
	parameter_dict['sigma'] = 0.2
	parameter_dict['theta'] = 20
	parameter_dict['sig1'] = [element/0.3 for element in squared_difference]
	parameter_dict['time'] = 1.8
	return parameter_dict

def get_index_paramters_normal():
	index_price_df = pd.read_csv("/Users/xiaokeai/Desktop/FLP Price Data/Market Situation/normal_situation.csv")
	ten_day_convolution_df = index_price_df.rolling(window=20).mean()
	#Calculate the squared error.	
	convolution = ten_day_convolution_df['^GSPC'].tolist()
	convolution = convolution[20:]
	index_price = index_price_df['^GSPC'].tolist()
	index_price = index_price[20:]
	squared_difference = [index_price[i]-convolution[i] for i in range(len(index_price))]
	#Calculate the drift for the SDE model.
	bm_drift_df = ten_day_convolution_df.pct_change()
	bm_drift= bm_drift_df['^GSPC'].tolist()
	bm_drift = bm_drift[20:]
	parameter_dict = {}
	parameter_dict['mu_sde'] = [element * 65 for element in bm_drift]
	parameter_dict['sigma'] = 0.2
	parameter_dict['theta'] = 15
	parameter_dict['sig1'] = [element/0.08 for element in squared_difference]
	parameter_dict['time'] = 4.5
	return parameter_dict

#WRKN
def wrkn_2012_IPO_macro():
	"""

	Statistics
	----------
	
	"""
	index_price_df = pd.read_csv("/Users/xiaokeai/Desktop/FLP Price Data/Market Situation/2019_passive_trading.csv")
	comp_price_df = pd.read_csv("/Users/xiaokeai/Desktop/FLP Price Data/WRKN/WRKN_IPO.csv")
	convolution_df = comp_price_df.rolling(window=10).mean()
	index_convolution_df = index_price_df.rolling(window=10).mean() #The convolution of the index price
	index_bm_drift_df = index_convolution_df.pct_change()
	index_bm_drift= index_bm_drift_df['^GSPC'].tolist()
	index_bm_drift = index_bm_drift[10:]

	#Calculate the squared error.
	convolution = convolution_df['FB'].tolist()
	convolution = convolution[10:]
	comp_price = comp_price_df['FB'].tolist()
	comp_price = comp_price[10:]
	squared_difference = [comp_price[i]-convolution[i] for i in range(len(comp_price))]
	#Calculate the drift for the SDE model.
	bm_drift_df = convolution_df.pct_change()
	bm_drift= bm_drift_df['FB'].tolist()
	bm_drift = bm_drift[10:]

	parameter_dict = {}
	index_weight = 0.3
	index_mu = [element * 120 for element in index_bm_drift]
	comp_mu = [element * 150 for element in bm_drift]
	parameter_dict['speed'] = []
	for index in range(len(index_bm_drift)):
		parameter_dict['speed'].append(index_mu[index]*index_weight+comp_mu[index]*(1-index_weight))
	parameter_dict['sigma'] = 0.1
	parameter_dict['volatility'] = [element/0.15 for element in squared_difference]
	parameter_dict['theta'] = 50
	parameter_dict['time'] = 2.7
	parameter_dict['warning'] = "Wraken's IPO had gain expectional attentions from the market. People are holding..."
	return parameter_dict

def wrkn_2012_IPO_micro(
		total_index: int,
		price_change: float,
	):
	adjust_number = 1/(total_index)
	change = price_change*20
	parameter_dict = {}
	parameter_dict['lamb_low'] = [110*(element*adjust_number) + change for element in range(total_index)]
	parameter_dict['mu_low'] = [110*(element*adjust_number) - change for element in range(total_index)]


	lamb = [110*(element*adjust_number) + change for element in range(int(total_index+1))]
	mu = [110*(element*adjust_number) - change for element in range(int(total_index+1))]
	parameter_dict['lamb_up'] = list(reversed(lamb))
	parameter_dict['mu_up'] = list(reversed(mu))

	parameter_dict['lamb'] = parameter_dict['lamb_up'][0]
	parameter_dict['mu'] = parameter_dict['mu_up'][0]

	return parameter_dict

def wrkn_industry_boost_macro():
	"""

	Statistics
	----------
	
	"""
	index_price_df = pd.read_csv("/Users/xiaokeai/Desktop/FLP Price Data/Market Situation/1929_roaring_twenties.csv")
	comp_price_df = pd.read_csv("/Users/xiaokeai/Desktop/FLP Price Data/WRKN/WRKN_industry_boost.csv")
	convolution_df = comp_price_df.rolling(window=20).mean()
	index_convolution_df = index_price_df.rolling(window=20).mean() #The convolution of the index price
	index_bm_drift_df = index_convolution_df.pct_change()
	index_bm_drift= index_bm_drift_df['^GSPC'].tolist()
	index_bm_drift = index_bm_drift[20:]

	#Calculate the squared error.
	convolution = convolution_df['AAPL'].tolist()
	convolution = convolution[20:]
	comp_price = comp_price_df['AAPL'].tolist()
	comp_price = comp_price[20:]
	squared_difference = [comp_price[i]-convolution[i] for i in range(len(comp_price))]
	#Calculate the drift for the SDE model.
	bm_drift_df = convolution_df.pct_change()
	bm_drift= bm_drift_df['AAPL'].tolist()
	bm_drift = bm_drift[20:]

	parameter_dict = {}
	index_weight = 0.4
	index_mu = [element * 90 for element in index_bm_drift]
	comp_mu = [element * 110 for element in bm_drift]
	parameter_dict['speed'] = []
	for index in range(len(bm_drift)):
		parameter_dict['speed'].append(index_mu[index]*index_weight+comp_mu[index]*(1-index_weight))
	parameter_dict['sigma'] = 0.01
	parameter_dict['volatility'] = [element/0.17 for element in squared_difference]
	parameter_dict['theta'] = 50
	parameter_dict['time'] = 2.2
	parameter_dict['warning'] = "Wraken's IPO had gain expectional attentions from the market. People are holding..."
	return parameter_dict

def wrkn_industry_boost_micro(
		total_index: int,
		price_change: float,
	):
	adjust_number = 1/(total_index)
	change = price_change*20
	parameter_dict = {}
	parameter_dict['lamb_low'] = [110*(element*adjust_number) + change for element in range(total_index)]
	parameter_dict['mu_low'] = [110*(element*adjust_number) - change for element in range(total_index)]


	lamb = [110*(element*adjust_number) + change for element in range(int(total_index+1))]
	mu = [110*(element*adjust_number) - change for element in range(int(total_index+1))]
	parameter_dict['lamb_up'] = list(reversed(lamb))
	parameter_dict['mu_up'] = list(reversed(mu))

	parameter_dict['lamb'] = parameter_dict['lamb_up'][0]
	parameter_dict['mu'] = parameter_dict['mu_up'][0]

	parameter_dict['warning'] = "WRKN lead a new fashion of technology..."

	return parameter_dict

def wrkn_anti_monopoly_fine_macro():
	"""

	Statistics
	----------
	
	"""
	index_price_df = pd.read_csv("/Users/xiaokeai/Desktop/FLP Price Data/Market Situation/2000_dot_com_bubble.csv")
	comp_price_df = pd.read_csv("/Users/xiaokeai/Desktop/FLP Price Data/WRKN/WRKN_antimonopoly_fine.csv")
	convolution_df = comp_price_df.rolling(window=10).mean()

	index_convolution_df = index_price_df.rolling(window=20).mean() #The convolution of the index price
	index_bm_drift_df = index_convolution_df.pct_change()
	index_bm_drift= index_bm_drift_df['^GSPC'].tolist()
	index_bm_drift = index_bm_drift[20:]

	#Calculate the squared error.
	convolution = convolution_df['BABA'].tolist()
	convolution = convolution[10:]
	comp_price = comp_price_df['BABA'].tolist()
	comp_price = comp_price[10:]
	squared_difference = [comp_price[i]-convolution[i] for i in range(len(comp_price))]
	#Calculate the drift for the SDE model.
	bm_drift_df = convolution_df.pct_change()
	bm_drift= bm_drift_df['BABA'].tolist()
	bm_drift = bm_drift[10:]

	parameter_dict = {}
	index_weight = 0.3
	index_mu = [element * 50 for element in index_bm_drift]
	comp_mu = [element * 70 for element in bm_drift]
	parameter_dict['speed'] = []
	for index in range(len(bm_drift)):
		parameter_dict['speed'].append(index_mu[index]*index_weight+comp_mu[index]*(1-index_weight))
	parameter_dict['sigma'] = 0.04
	parameter_dict['volatility'] = [element/0.7 for element in squared_difference]
	parameter_dict['theta'] = 20
	parameter_dict['time'] = 2.2
	parameter_dict['warning'] = "Wraken was fined according to the monopoly policy..."
	return parameter_dict

def wrkn_anti_monopoly_fine_micro(
		total_index: int,
		price_change: float,
	):
	parameter_dict = {}
	adjust_number = 1/(total_index)
	change = price_change*40
	parameter_dict['lamb_low'] = [50*(element*adjust_number) + change for element in range(total_index)]
	parameter_dict['mu_low'] = [50*(element*adjust_number) - change for element in range(total_index)]


	lamb = [50*(element*adjust_number) + change for element in range(int(total_index+1))]
	mu = [50*(element*adjust_number) - change for element in range(int(total_index+1))]
	parameter_dict['lamb_up'] = list(reversed(lamb))
	parameter_dict['mu_up'] = list(reversed(mu))

	parameter_dict['lamb'] = parameter_dict['lamb_up'][0]
	parameter_dict['mu'] = parameter_dict['mu_up'][0]

	parameter_dict['warning'] = "Lots of new players emerged into the market..."

	return parameter_dict

def wrkn_new_management_team_macro():
	"""

	Statistics
	----------
	
	"""
	index_price_df = pd.read_csv("/Users/xiaokeai/Desktop/FLP Price Data/Market Situation/normal_situation.csv")
	comp_price_df = pd.read_csv("/Users/xiaokeai/Desktop/FLP Price Data/WRKN/WRKN_new_management_team.csv")
	convolution_df = comp_price_df.rolling(window=10).mean()
	index_convolution_df = index_price_df.rolling(window=20).mean() #The convolution of the index price
	index_bm_drift_df = index_convolution_df.pct_change()
	index_bm_drift= index_bm_drift_df['^GSPC'].tolist()
	index_bm_drift = index_bm_drift[20:]

	#Calculate the squared error.
	convolution = convolution_df['IBM'].tolist()
	convolution = convolution[10:]
	comp_price = comp_price_df['IBM'].tolist()
	comp_price = comp_price[10:]
	squared_difference = [comp_price[i]-convolution[i] for i in range(len(comp_price))]
	#Calculate the drift for the SDE model.
	bm_drift_df = convolution_df.pct_change()
	bm_drift= bm_drift_df['IBM'].tolist()
	bm_drift = bm_drift[10:]

	parameter_dict = {}
	index_weight = 0.2
	index_mu = [element * 100 for element in index_bm_drift]
	comp_mu = [element * 140 for element in bm_drift]
	parameter_dict['speed'] = []
	for index in range(len(bm_drift)):
		parameter_dict['speed'].append(index_mu[index]*index_weight+comp_mu[index]*(1-index_weight))
	parameter_dict['sigma'] = 0.01
	parameter_dict['volatility'] = [element/0.01 for element in squared_difference]
	parameter_dict['theta'] = 25
	parameter_dict['time'] = 3.2
	parameter_dict['warning'] = "Wraken changed its management team..."
	return parameter_dict

def wrkn_new_management_team_micro(
		total_index: int,
		price_change: float,
	):
	adjust_number = 1/(total_index)
	change = price_change*20
	parameter_dict = {}
	parameter_dict['lamb_low'] = [110*(element*adjust_number) + change for element in range(total_index)]
	parameter_dict['mu_low'] = [110*(element*adjust_number) - change for element in range(total_index)]


	lamb = [110*(element*adjust_number) + change for element in range(int(total_index+1))]
	mu = [110*(element*adjust_number) - change for element in range(int(total_index+1))]
	parameter_dict['lamb_up'] = list(reversed(lamb))
	parameter_dict['mu_up'] = list(reversed(mu))

	parameter_dict['lamb'] = parameter_dict['lamb_up'][0]
	parameter_dict['mu'] = parameter_dict['mu_up'][0]

	parameter_dict['warning'] = "New CEO of WRKN made new decisions of..."

	return parameter_dict

def wrkn_new_game_macro():
	"""

	Statistics
	----------
	
	"""
	index_price_df = pd.read_csv("/Users/xiaokeai/Desktop/FLP Price Data/Market Situation/1990_tech_blossom.csv")
	comp_price_df = pd.read_csv("/Users/xiaokeai/Desktop/FLP Price Data/WRKN/WRKN_inventing_new_game.csv")
	convolution_df = comp_price_df.rolling(window=20).mean()
	index_convolution_df = index_price_df.rolling(window=30).mean() #The convolution of the index price
	index_bm_drift_df = index_convolution_df.pct_change()
	index_bm_drift= index_bm_drift_df['^GSPC'].tolist()
	index_bm_drift = index_bm_drift[30:]

	#Calculate the squared error.
	convolution = convolution_df['NTDOY'].tolist()
	convolution = convolution[20:]
	comp_price = comp_price_df['NTDOY'].tolist()
	comp_price = comp_price[20:]
	squared_difference = [comp_price[i]-convolution[i] for i in range(len(comp_price))]
	#Calculate the drift for the SDE model.
	bm_drift_df = convolution_df.pct_change()
	bm_drift= bm_drift_df['NTDOY'].tolist()
	bm_drift = bm_drift[20:]

	parameter_dict = {}
	index_weight = 0.2
	index_mu = [element * 100 for element in index_bm_drift]
	comp_mu = [element * 120 for element in bm_drift]
	parameter_dict['speed'] = []
	for index in range(len(bm_drift)):
		parameter_dict['speed'].append(index_mu[index]*index_weight+comp_mu[index]*(1-index_weight))
	parameter_dict['sigma'] = 0.01
	parameter_dict['volatility'] = [element/0.03 for element in squared_difference]
	parameter_dict['theta'] = 50
	parameter_dict['time'] = 4
	parameter_dict['warning'] = "Wraken just invented its new metaverse-based game..."
	return parameter_dict

def wrkn_new_game_micro(
		total_index: int,
		price_change: float,
	):
	adjust_number = 1/(total_index)
	change = price_change*20
	parameter_dict = {}
	parameter_dict['lamb_low'] = [110*(element*adjust_number) + change for element in range(total_index)]
	parameter_dict['mu_low'] = [110*(element*adjust_number) - change for element in range(total_index)]


	lamb = [110*(element*adjust_number) + change for element in range(int(total_index+1))]
	mu = [110*(element*adjust_number) - change for element in range(int(total_index+1))]
	parameter_dict['lamb_up'] = list(reversed(lamb))
	parameter_dict['mu_up'] = list(reversed(mu))

	parameter_dict['lamb'] = parameter_dict['lamb_up'][0]
	parameter_dict['mu'] = parameter_dict['mu_up'][0]

	parameter_dict['warning'] = "Lots of new players emerged into the market..."

	return parameter_dict


#SGO
def sgo_new_medicine_macro():
	"""

	Statistics
	----------
	
	"""
	index_price_df = pd.read_csv("/Users/xiaokeai/Desktop/FLP Price Data/Market Situation/normal_situation.csv")
	comp_price_df = pd.read_csv("/Users/xiaokeai/Desktop/FLP Price Data/WRKN/SGO_new_medicine_invention.csv")
	convolution_df = comp_price_df.rolling(window=20).mean()
	index_convolution_df = index_price_df.rolling(window=20).mean() #The convolution of the index price
	index_bm_drift_df = index_convolution_df.pct_change()
	index_bm_drift= index_bm_drift_df['^GSPC'].tolist()
	index_bm_drift = index_bm_drift[20:]

	#Calculate the squared error.
	convolution = convolution_df['JNJ'].tolist()
	convolution = convolution[10:]
	comp_price = comp_price_df['JNJ'].tolist()
	comp_price = comp_price[10:]
	squared_difference = [comp_price[i]-convolution[i] for i in range(len(comp_price))]
	#Calculate the drift for the SDE model.
	bm_drift_df = convolution_df.pct_change()
	bm_drift= bm_drift_df['JNJ'].tolist()
	bm_drift = bm_drift[10:]

	parameter_dict = {}
	index_weight = 0.2
	index_mu = [element * 90 for element in index_bm_drift]
	comp_mu = [element * 120 for element in bm_drift]
	parameter_dict['speed'] = []
	for index in range(len(bm_drift)):
		parameter_dict['speed'].append(index_mu[index]*index_weight+comp_mu[index]*(1-index_weight))
	parameter_dict['sigma'] = 0.01
	parameter_dict['volatility'] = [element/0.5 for element in squared_difference]
	parameter_dict['theta'] = 50
	parameter_dict['time'] = 2.7
	parameter_dict['warning'] = "Surgo invented the new medicine for..."
	return parameter_dict

def sgo_new_medicine_micro(
		total_index: int,
		price_change: float,
	):
	parameter_dict = {}
	adjust_number = 1/(total_index)
	change = price_change*100
	parameter_dict['lamb_low'] = [30*(element*adjust_number) + change for element in range(total_index)]
	parameter_dict['mu_low'] = [25*(element*adjust_number) - change for element in range(total_index)]


	lamb = [25*(element*adjust_number) + change for element in range(int(total_index+1))]
	mu = [30*(element*adjust_number) - change for element in range(int(total_index+1))]
	parameter_dict['lamb_up'] = list(reversed(lamb))
	parameter_dict['mu_up'] = list(reversed(mu))

	parameter_dict['lamb'] = parameter_dict['lamb_up'][0]
	parameter_dict['mu'] = parameter_dict['mu_up'][0]

	parameter_dict['warning'] = "Lots of new players emerged into the market..."

	return parameter_dict

def sgo_new_competition_macro():
	"""

	Statistics
	----------
	
	"""
	index_price_df = pd.read_csv("/Users/xiaokeai/Desktop/FLP Price Data/Market Situation/normal_situation.csv")
	comp_price_df = pd.read_csv("/Users/xiaokeai/Desktop/FLP Price Data/WRKN/SGO_new_competition.csv")
	convolution_df = comp_price_df.rolling(window=10).mean()
	index_convolution_df = index_price_df.rolling(window=20).mean() #The convolution of the index price
	index_bm_drift_df = index_convolution_df.pct_change()
	index_bm_drift= index_bm_drift_df['^GSPC'].tolist()
	index_bm_drift = index_bm_drift[20:]

	#Calculate the squared error.
	convolution = convolution_df['MRNA'].tolist()
	convolution = convolution[10:]
	comp_price = comp_price_df['MRNA'].tolist()
	comp_price = comp_price[10:]
	squared_difference = [comp_price[i]-convolution[i] for i in range(len(comp_price))]
	#Calculate the drift for the SDE model.
	bm_drift_df = convolution_df.pct_change()
	bm_drift= bm_drift_df['MRNA'].tolist()
	bm_drift = bm_drift[10:]

	parameter_dict = {}
	index_weight = 0.1
	index_mu = [element * 60 for element in index_bm_drift]
	comp_mu = [element * 80 for element in bm_drift]
	parameter_dict['speed'] = []
	for index in range(len(bm_drift)):
		parameter_dict['speed'].append(index_mu[index]*index_weight+comp_mu[index]*(1-index_weight))
	parameter_dict['sigma'] = 0.3
	parameter_dict['volatility'] = [element/0.3 for element in squared_difference]
	parameter_dict['theta'] = 100
	parameter_dict['time'] = 1.35
	parameter_dict['warning'] = "New manufacturers are entering the market..."
	return parameter_dict

def sgo_new_competition_micro(
		total_index: int,
		price_change: float,
	):
	parameter_dict = {}
	adjust_number = 1/(total_index)
	change = price_change*100
	parameter_dict['lamb_low'] = [30*(element*adjust_number) + change for element in range(total_index)]
	parameter_dict['mu_low'] = [25*(element*adjust_number) - change for element in range(total_index)]


	lamb = [25*(element*adjust_number) + change for element in range(int(total_index+1))]
	mu = [30*(element*adjust_number) - change for element in range(int(total_index+1))]
	parameter_dict['lamb_up'] = list(reversed(lamb))
	parameter_dict['mu_up'] = list(reversed(mu))

	parameter_dict['lamb'] = parameter_dict['lamb_up'][0]
	parameter_dict['mu'] = parameter_dict['mu_up'][0]

	parameter_dict['warning'] = "Lots of new players emerged into the market..."

	return parameter_dict

def sgo_share_purchase_macro():
	"""

	Statistics
	----------
	
	"""
	index_price_df = pd.read_csv("/Users/xiaokeai/Desktop/FLP Price Data/Market Situation/normal_situation.csv")
	comp_price_df = pd.read_csv("/Users/xiaokeai/Desktop/FLP Price Data/WRKN/SGO_share_purchase.csv")
	convolution_df = comp_price_df.rolling(window=2).mean()
	index_convolution_df = index_price_df.rolling(window=20).mean() #The convolution of the index price
	index_bm_drift_df = index_convolution_df.pct_change()
	index_bm_drift= index_bm_drift_df['^GSPC'].tolist()
	index_bm_drift = index_bm_drift[20:]

	#Calculate the squared error.
	convolution = convolution_df['VWAGY'].tolist()
	convolution = convolution[2:]
	comp_price = comp_price_df['VWAGY'].tolist()
	comp_price = comp_price[2:]
	squared_difference = [comp_price[i]-convolution[i] for i in range(len(comp_price))]
	#Calculate the drift for the SDE model.
	bm_drift_df = convolution_df.pct_change()
	bm_drift= bm_drift_df['VWAGY'].tolist()
	bm_drift = bm_drift[2:]

	parameter_dict = {}
	index_weight = 0.2
	index_mu = [element * 20 for element in index_bm_drift]
	comp_mu = [element * 40 for element in bm_drift]
	parameter_dict['speed'] = []
	for index in range(len(bm_drift)):
		parameter_dict['speed'].append(index_mu[index]*index_weight+comp_mu[index]*(1-index_weight))
	parameter_dict['sigma'] = 0.04
	parameter_dict['volatility'] = [element/0.14 for element in squared_difference]
	parameter_dict['theta'] = 25
	parameter_dict['time'] = 0.8
	parameter_dict['warning'] = "Share purchased by..."
	return parameter_dict

def sgo_share_purchase_micro(
		total_index: int,
		price_change: float,
	):
	parameter_dict = {}
	adjust_number = 1/(total_index)
	change = price_change*100
	parameter_dict['lamb_low'] = [30*(element*adjust_number) + change for element in range(total_index)]
	parameter_dict['mu_low'] = [25*(element*adjust_number) - change for element in range(total_index)]


	lamb = [25*(element*adjust_number) + change for element in range(int(total_index+1))]
	mu = [30*(element*adjust_number) - change for element in range(int(total_index+1))]
	parameter_dict['lamb_up'] = list(reversed(lamb))
	parameter_dict['mu_up'] = list(reversed(mu))

	parameter_dict['lamb'] = parameter_dict['lamb_up'][0]
	parameter_dict['mu'] = parameter_dict['mu_up'][0]

	parameter_dict['warning'] = "Lots of new players emerged into the market..."

	return parameter_dict

event_mapping_dict={
	'roaring_twenties': get_index_paramters_1929_roaring_twenties,
	'great_depression': get_index_paramters_1930_great_depression,
	'auto_trade_crush': get_index_paramters_1987_auto_trade,
	'tech_blossom': get_index_paramters_1990_tech_blossom,
	'dot_com_bubble': get_index_paramters_2000_dot_com_bubble,
	'CDO_crisis': get_index_paramters_2008_CDO_crisis,
	'passive_trading': get_index_paramters_2019_passive_trading,
	'covid': get_index_paramters_2020_covid,
	'normal': get_index_paramters_normal
}

Wraken_macro={
	'IPO': wrkn_2012_IPO_macro,
	'industry_boost': wrkn_industry_boost_macro,
	'anti_monopoly': wrkn_anti_monopoly_fine_macro,
	'new_management': wrkn_new_management_team_macro,
	'new_product': wrkn_new_game_macro
}
Wraken_micro={
	'IPO': wrkn_2012_IPO_micro,
	'industry_boost': wrkn_industry_boost_micro,
	'anti_monopoly': wrkn_anti_monopoly_fine_micro,
	'new_management': wrkn_new_management_team_micro,
	'new_product': wrkn_new_game_micro
}

Surgo_macro ={
	'new_medicine': sgo_new_medicine_macro,
	'competition': sgo_new_competition_macro,
	'share_purchase': sgo_share_purchase_macro
}

Surgo_micro ={
	'new_medicine': sgo_new_medicine_micro,
	'competition': sgo_new_competition_micro,
	'share_purchase': sgo_share_purchase_micro
}
















