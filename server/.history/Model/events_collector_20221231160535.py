import get_parameters
from modified_wave import MidPriceGenerator, DayPriceGenerator, WaveModifier, StockSimulator
import matplotlib.pyplot as plt
import numpy as np

file_names = get_parameters.file_names
index_params = get_parameters.index_params
MidPrice = MidPriceGenerator("2015-3-9", "2017-1-1", ["^DJI"], 15)
mid_price = MidPrice.generate_mid_price()
micro = get_parameters.micro
length = get_parameters.length
index_price = []
index_for_lst = 0
event_intensity = [600, 700, 700, 750, 750, 700, 3200]


for i in range(len(file_names)):
	name = file_names[i]
	macro = index_params[name]["macro"]
	stock_simulator = DayPriceGenerator(macro)
	base_price = stock_simulator.price_loop()
	wave_1 = {
		'price_list': base_price,
		'start_point': 0,
		'duration': length[i],
		'weight': get_parameters.fund_weights[i],
		'intensity_factor': 1
	}

	wave_2 = {
		'price_list': mid_price,
		'start_point': index_for_lst,
		'duration': length[i],
		'weight': 1-get_parameters.fund_weights[i],
		'intensity_factor': 1
	}
	print(name)

	Combinator = WaveModifier()
	combinated_price = Combinator.price_wave_addition(
		0, event_intensity[i], length[i], wave_1, wave_2)
	
	index_for_lst += length[i]

	if len(index_price) == 0:
		adjust_factor = 1200
	else:
		adjust_factor = index_price[-1]

	final_price_list = []
	for index in range(len(combinated_price)):
		if index > 0:
			price_generator = StockSimulator(
				combinated_price[1]-adjust_factor, combinated_price[index], combinated_price, index, micro, index_params[name])
			result_price = price_generator.generate_price()
			final_price_list.extend(result_price)

	user_interaction_modifier = []
	for index in range(len(final_price_list)):
		random_modifier = np.random.normal(0, 6)
		random_modifier2 = np.random.normal(0, 2)
		if index % 100 == 0:
			user_interaction_modifier.append(random_modifier)
		elif index % 50 == 0:
			user_interaction_modifier.append(random_modifier2)
		else:
			user_interaction_modifier.append(0)

	final_price_list = np.add(user_interaction_modifier, final_price_list)
	index_price.extend(final_price_list)
tick = []
for index in range(len(index_price)):
	if index % 3000 == 0:
		tick.append(index_price[index])

tick2 = []
for index in range(len(index_price[0:86400])):
	if index % 1000 == 0:
		tick2.append(index_price[0:86400][index])

plt.figure()
plt.plot(index_price)
plt.ticklabel_format(useOffset=False)
plt.grid(True)

plt.figure()
plt.plot(tick)
plt.ticklabel_format(useOffset=False)
plt.grid(True)

plt.figure()
plt.plot(tick2)
plt.ticklabel_format(useOffset=False)
plt.grid(True)
plt.show()